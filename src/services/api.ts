import axios, { AxiosError, AxiosInstance } from "axios";

import { storageAuthTokenGet, storageAuthTokenSave } from '@storage/storageAuthToken';
import { AppError } from "@utils/AppError";

// Definindo tipos personalizados para a lógica de autenticação
type SignOut = () => void
type PromiseType = {
    onSuccess: (token: string) => void
    onFailure: (error: AxiosError) => void
}
type APIInstanceProps = AxiosInstance & {
    registerInterceptTokenManager: (signOut: SignOut) => () => void // signOut é uma função que faz logout do usuário recebido no contexto de autenticação
}

// Criando uma instância do Axios com a URL base do servidor API
const api = axios.create({
    baseURL: 'http://192.168.1.6:3333'
}) as APIInstanceProps


// Inicializando a fila de solicitações falhadas e a flag de atualização do token
let failedQueue: Array<PromiseType> = []
let isRefreshing = false

// Adicionando um método para registrar o gerenciador de interceptação de token
api.registerInterceptTokenManager = signOut => {
    // Registrando um interceptor de resposta
    const InterceptTokenManager = api.interceptors.response.use(response => response, async (requestError) => {
        // Verificando se o status da resposta é 401 (Não autorizado)
        if (requestError?.response?.status === 401) {
            // Verificando se a mensagem de erro é 'token.expired' ou 'token.invalid'
            if (requestError.response.data?.message === 'token.expired' || requestError.response.data?.message === 'token.invalid') {
                // Tentando obter um refresh_token do armazenamento
                const { refresh_token } = await storageAuthTokenGet();

                // Se não houver refresh_token, chama a função signOut e rejeita a solicitação original
                if (!refresh_token) {
                    signOut()
                    return Promise.reject(requestError)
                }


                const originalRequestConfig = requestError.config


                // Se o token de autenticação estiver sendo atualizado
                if (isRefreshing) {
                    // Retorna uma nova promessa que será resolvida ou rejeitada quando o token for atualizado
                    return new Promise((resolve, reject) => {
                        // Adiciona a solicitação falhada à fila para ser reenviada quando o token for atualizado
                        failedQueue.push({
                            onSuccess: (token: string) => {
                                // Atualiza o token de autenticação no cabeçalho da solicitação original
                                originalRequestConfig.headers['Authorization'] = `Bearer ${token}`
                                // Reenvia a solicitação original com o novo token
                                resolve(api(originalRequestConfig))
                            },
                            onFailure: (error: AxiosError) => {
                                // Rejeita a solicitação com o erro
                                reject(error)
                            },
                        })
                    })
                }
                // Se o token de autenticação não estiver sendo atualizado
                isRefreshing = true

                // Retorna uma nova promessa que será resolvida ou rejeitada quando o token for atualizado
                return new Promise(async (resolve, reject) => {
                    try {
                        // Solicita um novo token de autenticação
                        const { data } = await api.post('/sessions/refresh-token', { refresh_token })
                        // Salva o novo token no armazenamento
                        await storageAuthTokenSave({ token: data.token, refresh_token: data.refresh_token })

                        // Se a solicitação original tiver dados, os converte de volta para um objeto
                        if (originalRequestConfig.data) {
                            originalRequestConfig.data = JSON.parse(originalRequestConfig.data)
                        }

                        // Atualiza o token de autenticação no cabeçalho da solicitação original e nas configurações padrão do Axios
                        originalRequestConfig.headers = { 'Authorization': `Bearer ${data.token}` }
                        api.defaults.headers.common['Authorization'] = `Bearer ${data.token}`

                        // Reenvia todas as solicitações que falharam devido ao token expirado
                        failedQueue.forEach(request => {
                            request.onSuccess(data.token)
                        })

                        console.log("TOKEN ATUALIZADO!")

                        // Resolve a promessa com a resposta da solicitação original
                        resolve(api(originalRequestConfig))

                    } catch (error: any) {
                        // Se a atualização do token falhar, rejeita todas as solicitações na fila
                        failedQueue.forEach(request => {
                            request.onFailure(error)
                        });

                        // Faz logout do usuário
                        signOut()
                        // Rejeita a promessa com o erro
                        reject(error)

                    } finally {
                        // Reseta o estado de atualização do token e a fila de solicitações falhadas
                        isRefreshing = false
                        failedQueue = []
                    }


                })


            }
            // Se o erro não for devido a um token expirado ou inválido, faz logout do usuário
            signOut()
        }

        // Se a resposta tiver dados, rejeita a promessa com um novo erro contendo a mensagem de erro da resposta
        if (requestError.response && requestError.response.data) {
            return Promise.reject(new AppError(requestError.response.data.message))
        } else {
            // Caso contrário, rejeita a promessa com o erro original
            return Promise.reject(requestError)

        }
    })


    // Removendo o interceptor quando não for mais necessário
    return () => {
        api.interceptors.response.eject(InterceptTokenManager)
    }
}







export { api };


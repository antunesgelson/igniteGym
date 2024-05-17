
import { useNavigation } from '@react-navigation/native'
import { ImageBackground, ScrollView, Text, View } from "react-native"
import { SafeAreaView } from 'react-native-safe-area-context'

import { AuthNavigatorRoutesProps } from '@routes/auth.routes'

import { yupResolver } from '@hookform/resolvers/yup'
import { Controller, useForm } from 'react-hook-form'
import * as yup from 'yup'

import { api } from '@services/api'

import { AppError } from '@utils/AppError'

import Toast from 'react-native-toast-message'

import BackgroundImg from '@assets/background.png'
import LogoSvg from '@assets/logo.svg'

import { Button } from "@components/Button"
import { Input } from "@components/Input"



type FormDataProps = {
    name: string
    email: string
    password: string
    password_confirm: string

}

const signUpSchema = yup.object({
    name: yup.string().required('Infome o nome.'),
    email: yup.string().required('Infome o e-mail.').email('E-mail inválido.'),
    password: yup.string().required('Infome a senha.').min(6, 'A senha deve ter no mínimo 6 caracteres.'),
    password_confirm: yup.string().required('Confirme a senha.').oneOf([yup.ref('password')], 'A confirmação da senha não confere'),

})

export function SignUp() {
    const { control, handleSubmit, formState: { errors } } = useForm<FormDataProps>({
        resolver: yupResolver(signUpSchema)

    })

    const navigation = useNavigation<AuthNavigatorRoutesProps>()



    function handleBack() {
        navigation.goBack()
    }


    async function handleSignUp({ name, email, password }: FormDataProps) {
        try {
            const response = await api.post('/users', { name, email, password })
            console.log(response.data)
        }
        catch (error) {
            const isAppError = error instanceof AppError;
            const title = isAppError ? error.menssage : 'Não foi possível criar a conta.'

            Toast.show({
                type: 'error',
                text1: title,
                text2: isAppError ? 'Insira um endereço de e-mail válido' : 'Tente novamente mais tarde.'

            })
        }

    }





    return (
        <View className="flex-1 bg-gray-700  relative ">

            <ImageBackground
                source={BackgroundImg}
                defaultSource={BackgroundImg}
                className="  flex-1 absolute top-0 left-0 right-0 bottom-72 "
                alt="Pessoas treinando"
                resizeMode='cover'

            />

            <ScrollView contentContainerStyle={{ alignItems: 'center', flexGrow: 1 }}>
                <SafeAreaView className="  w-full items-center h-full justify-between">

                    <View className=" pt-14">
                        <LogoSvg />
                        <Text className=" text-gray-100 text-sm">
                            Treine sua mente e o seu corpo
                        </Text>
                    </View>

                    <View className="w-10/12 ">
                        <Text className=" text-gray-100  text-xl text-center font-heading mb-3">
                            Cire sua conta
                        </Text>


                        <Controller
                            control={control}
                            name="name"
                            render={({ field: { onChange, value } }) => (
                                <Input
                                    placeholder="Nome"
                                    onChangeText={onChange}
                                    value={value}
                                    errorMenssage={errors.name?.message}
                                />
                            )}
                        />


                        <Controller
                            control={control}
                            name="email"
                            render={({ field: { onChange, value } }) => (
                                <Input
                                    placeholder="E-mail"
                                    keyboardType="email-address"
                                    autoCapitalize="none"
                                    onChangeText={onChange}
                                    value={value}
                                    errorMenssage={errors.email?.message}
                                />
                            )}
                        />


                        <Controller
                            control={control}
                            name="password"
                            render={({ field: { onChange, value } }) => (
                                <Input
                                    placeholder="Senha"
                                    secureTextEntry
                                    onChangeText={onChange}
                                    value={value}
                                    errorMenssage={errors.password?.message}
                                />
                            )}

                        />

                        <Controller
                            control={control}
                            name="password_confirm"
                            render={({ field: { onChange, value } }) => (
                                <Input
                                    placeholder="Confirmar a Senha"
                                    secureTextEntry
                                    onChangeText={onChange}
                                    value={value}
                                    onSubmitEditing={handleSubmit(handleSignUp)}
                                    returnKeyType='send'
                                    errorMenssage={errors.password_confirm?.message}
                                />
                            )}

                        />



                        <Button
                            className="mt-3"
                            onPress={handleSubmit(handleSignUp)}
                            title="Criar e acessar"
                        />
                    </View>


                    <View className="w-10/12 ">
                        <Button
                            onPress={handleBack}
                            variant="outline"
                            title="Voltar para login"
                        />
                    </View>

                </SafeAreaView>
            </ScrollView>
        </View>


    )
}




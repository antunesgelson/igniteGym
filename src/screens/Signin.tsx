import { useNavigation } from '@react-navigation/native'
import { ImageBackground, ScrollView, Text, View } from "react-native"
import { SafeAreaView } from 'react-native-safe-area-context'

import { AuthNavigatorRoutesProps } from '@routes/auth.routes'

import { useAuth } from '@hooks/useAuth'

import { yupResolver } from '@hookform/resolvers/yup'
import { Controller, useForm } from 'react-hook-form'
import * as yup from 'yup'

import BackgroundImg from '@assets/background.png'
import LogoSvg from '@assets/logo.svg'

import { Button } from "@components/Button"
import { Input } from "@components/Input"


type FormDataProps = {
    email: string
    password: string

}

const signUpSchema = yup.object({
    email: yup.string().required('Infome o e-mail.').email('E-mail inválido.'),
    password: yup.string().required('Infome a senha.').min(6, 'A senha deve ter no mínimo 6 caracteres.')

})

export function SignIn() {
    const { signIn } = useAuth()
    const navigation = useNavigation<AuthNavigatorRoutesProps>()

    const { control, handleSubmit, formState: { errors } } = useForm<FormDataProps>({
        resolver: yupResolver(signUpSchema)
    })


    async function handleSignIn({ email, password }: FormDataProps) {
        await signIn(email, password)
    }

    function handleNewAccount() {
        navigation.navigate('signUp')
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

                    <View className="py-14">
                        <LogoSvg />
                        <Text className=" text-gray-100 text-sm">
                            Treine sua mente e o seu corpo
                        </Text>
                    </View>

                    <View className="w-10/12 ">
                        <Text className=" text-gray-100  text-xl text-center font-heading mb-3">
                            Acesse sua conta
                        </Text>

                        <Controller
                            control={control}
                            name='email'
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
                            name='password'
                            render={({ field: { onChange, value } }) => (
                                <Input
                                    placeholder="Senha"
                                    secureTextEntry
                                    onChangeText={onChange}
                                    value={value}
                                    errorMenssage={errors.password?.message}
                                    onSubmitEditing={handleSubmit(handleSignIn)}
                                    returnKeyType="send"
                                />
                            )}
                        />


                        <Button
                            className="mt-3"
                            onPress={handleSubmit(handleSignIn)}
                            title="Acessar"
                        />
                    </View>


                    <View className="w-10/12 ">
                        <Text className=" text-gray-100 text-sm text-center mb-4">
                            Ainda não tem acesso?
                        </Text>

                        <Button
                            onPress={handleNewAccount}
                            variant="outline"
                            title="Criar conta"
                        />
                    </View>

                </SafeAreaView>
            </ScrollView>
        </View>


    )
}





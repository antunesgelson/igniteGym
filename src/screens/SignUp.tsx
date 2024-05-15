import BackgroundImg from '@assets/background.png'
import { useNavigation } from '@react-navigation/native'
import { AuthNavigatorRoutesProps } from '@routes/auth.routes'
import { ImageBackground, ScrollView, Text, View } from "react-native"
import { SafeAreaView } from 'react-native-safe-area-context'


import LogoSvg from '@assets/logo.svg'

import { Button } from "@components/Button"
import { Input } from "@components/Input"

export function SignUp() {

    const navigation = useNavigation<AuthNavigatorRoutesProps>()

    function handleBack() {
        navigation.goBack()
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

                    <View className="w-10/12  ">
                        <Text className=" text-gray-100  text-xl text-center font-heading mb-8">
                            Cire sua conta
                        </Text>

                        <Input
                            placeholder="Nome"
                        />

                        <Input
                            placeholder="E-mail"
                            keyboardType="email-address"
                            autoCapitalize="none"
                        />

                        <Input
                            placeholder="Senha"
                            secureTextEntry
                        />

                        <Button
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




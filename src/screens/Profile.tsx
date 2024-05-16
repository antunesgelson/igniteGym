import { Button } from "@components/Button";
import { Input } from "@components/Input";
import { ScreenHeader } from "@components/ScreenHeader";
import { UserPhoto } from "@components/UserPhoto";

import { useState } from "react";
import ContentLoader, { Circle } from 'react-content-loader/native';
import { ScrollView, Text, TouchableOpacity, View, useWindowDimensions } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';

import colors from "tailwindcss/colors";

export function Profile() {

    const { height, width } = useWindowDimensions()
    const [photoIsLoading, setPhotoIsLoading] = useState(false)

    return (
        <View className=" ">
            <SafeAreaView className="h-full">
                <ScreenHeader title='Perfil' />





                <ScrollView className=" px-6">
                    <View className="items-center ">

                        {photoIsLoading ?
                            <ContentLoader
                                viewBox="0 0 280 164" height={164} width={280}
                                backgroundColor={colors.gray[500]}
                                foregroundColor={colors.gray[400]}
                            >
                                <Circle cx={'140'} cy={'100'} r={'62'} />

                            </ContentLoader>
                            :
                            <UserPhoto
                                className="mt-8"
                                size={130}
                                source={{ uri: `https://github.com/smkwow.png` }}
                                alt="Imagem do usuário"
                            />

                        }

                        <TouchableOpacity>
                            <Text className="text-green-500 text-center font-heading mt-2 mb-8">
                                Alterar foto
                            </Text>
                        </TouchableOpacity>

                    </View>

                    <View>
                        <Input
                            placeholder="Nome"
                            className="bg-gray-600"
                        />

                        <Input
                            placeholder="Email"
                            // value="gelsonantunesv@hotmail.com"
                            className="bg-gray-600 opacity-40 "
                            editable={false}

                        />
                    </View>



                    <View className="mt-12 mb-9">
                        <Text className="text-gray-200 text-md font-heading py-3 ml-2">
                            Alterar Senha
                        </Text>

                        <Input
                            placeholder="Senha antiga"
                            className="bg-gray-600"
                            secureTextEntry
                        />

                        <Input
                            placeholder="Nova senha"
                            className="bg-gray-600"
                            secureTextEntry
                        />

                        <Input
                            placeholder="Confirme a nova senha"
                            className="bg-gray-600"
                            secureTextEntry
                        />

                        <Button title="Atualizar" />
                    </View>


                </ScrollView>

            </SafeAreaView>
        </View>
    )
}
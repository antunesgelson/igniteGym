import { Button } from "@components/Button";
import { Input } from "@components/Input";
import { ScreenHeader } from "@components/ScreenHeader";
import { UserPhoto } from "@components/UserPhoto";

import * as FileSystem from 'expo-file-system';
import * as ImagePicker from 'expo-image-picker';

import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { Controller, useForm } from 'react-hook-form';

import Toast from 'react-native-toast-message';

import { useState } from "react";
import ContentLoader, { Circle } from 'react-content-loader/native';
import { ScrollView, Text, TouchableOpacity, View, useWindowDimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import colors from "tailwindcss/colors";

type FormProfileData = {
    name: string
    old_password: string
    new_password: string
    new_password_confirm: string

}


const signUpSchema = yup.object({
    name: yup.string().required('Infome o nome.'),
    old_password: yup.string().required('A senha antiga.').min(6, 'A senha deve ter no mínimo 6 caracteres.'),
    new_password: yup.string().required('Infome a nova senha.').min(6, 'A senha deve ter no mínimo 6 caracteres.'),
    new_password_confirm: yup.string().required('Confirme a senha.').oneOf([yup.ref('new_password')], 'A confirmação da senha não confere'),
})


export function Profile() {
    const { height, width } = useWindowDimensions()
    const [photoIsLoading, setPhotoIsLoading] = useState(false)
    const [userPhoto, setUserPhoto] = useState('https://github.com/smkwow.png')

    const { control, handleSubmit, formState: { errors } } = useForm<FormProfileData>({
        resolver: yupResolver(signUpSchema)
    })




    async function handleUserPhotoSelect() {
        setPhotoIsLoading(true)
        try {
            const photoSelected = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                quality: 1,
                aspect: [4, 4],
                allowsEditing: true, //permite cortar a imagem
            })
            if (photoSelected.canceled) {
                return
            }


            if (photoSelected.assets[0].uri) {
                const photoInfo = await FileSystem.getInfoAsync(photoSelected.assets[0].uri) //busca o tamanho da imagem
                if ('size' in photoInfo && photoInfo.size && (photoInfo.size / 1024 / 1024) > 5) {
                    return Toast.show({
                        type: 'error',
                        text1: 'Imagem muito grande',
                        text2: 'A imagem selecionada é muito grande, selecione uma imagem com até 5MB'
                    });

                }

                setUserPhoto(photoSelected.assets[0].uri)
            }

        }
        catch (error) {
            console.log(error)
        }
        finally {
            setPhotoIsLoading(false)
        }
    }

    function handleUpdateProfile(data: FormProfileData) {

    }


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
                                source={{ uri: userPhoto }}
                                alt="Imagem do usuário"
                            />

                        }

                        <TouchableOpacity onPress={handleUserPhotoSelect}>
                            <Text className="text-green-500 text-center font-heading mt-2 mb-8">
                                Alterar foto
                            </Text>
                        </TouchableOpacity>

                    </View>

                    <View>

                        <Controller
                            control={control}
                            name="name"
                            render={({ field: { onChange, value } }) => (
                                <Input
                                    placeholder="Nome"
                                    className="bg-gray-600"
                                    onChangeText={onChange}
                                    value={value}
                                    errorMenssage={errors.name?.message}
                                />
                            )}
                        />



                        <Input
                            placeholder="Email"
                            className="bg-gray-600 opacity-40 "
                            editable={false}

                        />
                    </View>



                    <View className="mt-12 mb-9">
                        <Text className="text-gray-200 text-md font-heading py-3 ml-2">
                            Alterar Senha
                        </Text>


                        <Controller
                            control={control}
                            name="old_password"
                            render={({ field: { onChange, value } }) => (
                                <Input
                                    placeholder="Senha antiga"
                                    className="bg-gray-600"
                                    onChangeText={onChange}
                                    value={value}
                                    errorMenssage={errors.old_password?.message}
                                    secureTextEntry

                                />
                            )}
                        />

                        <Controller
                            control={control}
                            name="new_password"
                            render={({ field: { onChange, value } }) => (
                                <Input
                                    placeholder="Nova senha"
                                    className="bg-gray-600"
                                    onChangeText={onChange}
                                    value={value}
                                    errorMenssage={errors.new_password?.message}
                                    secureTextEntry

                                />
                            )}
                        />

                        <Controller
                            control={control}
                            name="new_password_confirm"
                            render={({ field: { onChange, value } }) => (
                                <Input
                                    placeholder="Confirme a nova senha"
                                    className="bg-gray-600"
                                    onChangeText={onChange}
                                    value={value}
                                    errorMenssage={errors.new_password_confirm?.message}
                                    onSubmitEditing={handleSubmit(handleUpdateProfile)}
                                    returnKeyType="send"
                                    secureTextEntry

                                />
                            )}
                        />

                        <Button
                            onPress={handleSubmit(handleUpdateProfile)}
                            className="mt-3"
                            title="Atualizar" />
                    </View>


                </ScrollView>

            </SafeAreaView>
        </View>
    )
}
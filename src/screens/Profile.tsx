import { useState } from "react";
import ContentLoader, { Circle } from 'react-content-loader/native';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import * as FileSystem from 'expo-file-system';
import * as ImagePicker from 'expo-image-picker';

import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { Controller, useForm } from 'react-hook-form';

import Toast from 'react-native-toast-message';

import defaultUserPhotoImg from '@assets/userPhotoDefault.png';


import { Button } from "@components/Button";
import { Input } from "@components/Input";
import { ScreenHeader } from "@components/ScreenHeader";
import { UserPhoto } from "@components/UserPhoto";

import { useAuth } from "@hooks/useAuth";

import { api } from "@services/api";
import { AppError } from "@utils/AppError";
import colors from "tailwindcss/colors";

interface FormProfileData {
    name: string;
    old_password?: string | null;
    password?: string | null;
    confirm_password?: string | null;

}


const profileSchema = yup.object({
    name: yup.string().required('Informe o nome'),
    old_password: yup
        .string()
        .nullable()
        .transform((value) => (!!value ? value : null)),
    password: yup
        .string()
        .min(6, 'A senha deve ter pelo menos 6 dígitos.')
        .nullable()
        .transform((value) => (!!value ? value : null)),
    confirm_password: yup
        .string()
        .nullable()
        .transform((value) => (!!value ? value : null))
        .oneOf([yup.ref('password'), null], 'As senhas devem ser iguais.')
        .when('password', {
            is: (Field: any) => Field,
            then: (schema) =>
                schema
                    .nullable()
                    .required('Informe a confirmação da senha.')
                    .transform((value) => (!!value ? value : null)),
        }),
})


export function Profile() {
    const [isUpdate, setIsUpate] = useState(false)
    const [photoIsLoading, setPhotoIsLoading] = useState(false)
    const [userPhoto, setUserPhoto] = useState('')

    const { user, updateUserProfile } = useAuth()

    const { control, handleSubmit, formState: { errors } } = useForm<FormProfileData>({
        resolver: yupResolver(profileSchema),
        defaultValues: {
            name: user.name,

        }
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
                // setUserPhoto(photoSelected.assets[0].uri)

                const fileExtension = photoSelected.assets[0].uri.split('.').pop()

                const photoFile = {
                    name: `${user.name}.${fileExtension}`.toLocaleLowerCase(),
                    uri: photoSelected.assets[0].uri,
                    type: `${photoSelected.assets[0].type}/${fileExtension}`
                } as any

                const userPhotoUploadForm = new FormData()
                userPhotoUploadForm.append('avatar', photoFile)

                const avatarUpdatedResponse = await api.patch('/users/avatar', userPhotoUploadForm, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });

                const userUpdated = user
                userUpdated.avatar = avatarUpdatedResponse.data.avatar
                updateUserProfile(userUpdated)

                console.log('userUpdated', userUpdated)

                Toast.show({
                    type: 'success',
                    text1: 'Sucesso!',
                    text2: 'foto atualizada com sucesso.😎'
                });
            }

        } catch (error) {
            console.log(error)
        } finally {
            setPhotoIsLoading(false)
        }
    }

    async function handleUpdateProfile(data: FormProfileData) {
        try {
            setIsUpate(true)

            const userUpdated = user
            userUpdated.name = data.name


            await api.put('/users', data)

            await updateUserProfile(userUpdated)

            console.log("data", data)

            Toast.show({
                type: 'success',
                text1: 'Perfil atualizado',
                text2: 'Seu perfil foi atualizado com sucesso'
            })

        }
        catch (error) {
            const isAppError = error instanceof AppError
            const title = isAppError ? error.menssage : 'Naõ foi possivel atualizar o perfil'
            Toast.show({
                type: 'error',
                text1: title,
                text2: isAppError ? ' ' : 'Tente novamente mais tarde.'

            })
        }

        finally {
            setIsUpate(false)
        }

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
                                source={
                                    user.avatar
                                        ? { uri: `${api.defaults.baseURL}/avatar/${user.avatar}` }
                                        : defaultUserPhotoImg}
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
                            defaultValue={user.email}
                            placeholder="Email"
                            className="bg-gray-600 opacity-40 "
                            editable={false}
                        />
                    </View>



                    <View className="mt-12 mb-9">
                        <Text className="text-gray-200 text-md font-heading  ml-2">
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
                                    value={value || ''}
                                    errorMenssage={errors.old_password?.message}
                                    secureTextEntry
                                />
                            )}
                        />

                        <Controller
                            control={control}
                            name="password"
                            render={({ field: { onChange, value } }) => (
                                <Input
                                    placeholder="Nova senha"
                                    className="bg-gray-600"
                                    onChangeText={onChange}
                                    value={value || ''}
                                    errorMenssage={errors.password?.message}
                                    secureTextEntry

                                />
                            )}
                        />

                        <Controller
                            control={control}
                            name="confirm_password"
                            render={({ field: { onChange, value } }) => (
                                <Input
                                    placeholder="Confirme a nova senha"
                                    className="bg-gray-600"
                                    onChangeText={onChange}
                                    value={value || ''}
                                    errorMenssage={errors.confirm_password?.message}
                                    onSubmitEditing={handleSubmit(handleUpdateProfile)}
                                    returnKeyType="send"
                                    secureTextEntry

                                />
                            )}
                        />

                        <Button
                            className="mt-3"
                            title="Atualizar"
                            disabled={isUpdate}
                            isLoading={isUpdate}
                            onPress={handleSubmit(handleUpdateProfile)}
                        />
                    </View>


                </ScrollView>

            </SafeAreaView>
        </View>
    )
}
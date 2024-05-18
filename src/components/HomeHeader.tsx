import { Text, TouchableOpacity, View } from "react-native";

import { useAuth } from "@hooks/useAuth";

import defaultUserPhotoImg from '@assets/userPhotoDefault.png';
import { MaterialIcons } from '@expo/vector-icons';

import colors from 'tailwindcss/colors';

import { UserPhoto } from "./UserPhoto";

import { api } from "@services/api";


export function HomeHeader() {

    const { user, signOut } = useAuth()

    return (
        <View className="flex-row  items-center  bg-gray-600 pt-10 pb-5 px-8 ">
            <UserPhoto
                className="mr-4"
                size={62}
                source={
                    user.avatar
                        ? { uri: `${api.defaults.baseURL}/avatar/${user.avatar}` }
                        : defaultUserPhotoImg}
                alt="Imagem do usuário"
            />

            <View className="flex-1">
                <Text className="text-gray-100 text-md">
                    Olá,
                </Text>

                <Text className="text-gray-100 font-heading text-md">
                    {user.name}
                </Text>
            </View>

            <TouchableOpacity onPress={signOut}>
                <MaterialIcons
                    name="logout"
                    color={colors.gray[200]}
                    size={24}
                />
            </TouchableOpacity>
        </View>
    )
}
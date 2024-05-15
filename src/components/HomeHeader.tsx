import { MaterialIcons } from '@expo/vector-icons';
import { Text, TouchableOpacity, View } from "react-native";
import colors from 'tailwindcss/colors';
import { UserPhoto } from "./UserPhoto";

export function HomeHeader() {
    return (
        <View className="flex-row  items-center  bg-gray-600 pt-10 pb-5 px-8 ">
            <UserPhoto
                className="mr-4"
                size={62}
                source={{ uri: `https://github.com/smkwow.png` }}
                alt="Imagem do usuário"
            />

            <View className="flex-1">
                <Text className="text-gray-100 text-md">
                    Olá,
                </Text>

                <Text className="text-gray-100 font-heading text-md">
                    Gelson Antunes
                </Text>
            </View>

            <TouchableOpacity>
                <MaterialIcons
                    name="logout"
                    color={colors.gray[200]}
                    size={24}
                />
            </TouchableOpacity>
        </View>
    )
}
import { ExerciseDTO } from '@dtos/ExerciseDTO'
import { Entypo } from '@expo/vector-icons'
import { Image, Text, TouchableOpacity, TouchableOpacityProps, View } from "react-native"

import colors from 'tailwindcss/colors'

import { api } from "@services/api"

type Props = TouchableOpacityProps & {
    data: ExerciseDTO
}

export function ExerciseCard({ data, ...rest }: Props) {
    return (
        <TouchableOpacity {...rest}>
            <View className="flex-row items-center  bg-gray-500 p-2 pr-4 rounded-md mb-3">
                <Image
                    source={{ uri: `${api.defaults.baseURL}/exercise/thumb/${data.thumb}` }}
                    alt="Imagem do exercício"
                    width={60}
                    height={60}
                    className="rounded-lg mr-4"
                    resizeMode="cover"
                />

                <View className="flex-1">
                    <Text className="text-white text-lg font-heading">
                        {data.name}
                    </Text>

                    <Text
                        className="text-gray-200 text-sm mt-1"
                        numberOfLines={2}
                    >
                        {data.series} séries x {data.repetitions} repetições
                    </Text>
                </View>

                <Entypo
                    name="chevron-right"
                    size={24}
                    color={colors.gray[500]}
                />



            </View>
        </TouchableOpacity>
    )
}
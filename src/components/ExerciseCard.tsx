import { Entypo } from '@expo/vector-icons'
import { Image, Text, TouchableOpacity, TouchableOpacityProps, View } from "react-native"

import colors from 'tailwindcss/colors'

type Props = TouchableOpacityProps & {

}

export function ExerciseCard({ ...rest }: Props) {
    return (
        <TouchableOpacity {...rest}>
            <View className="flex-row items-center  bg-gray-500 p-2 pr-4 rounded-md mb-3">
                <Image
                    source={{ uri: 'https://blog.ciaathletica.com.br/wp-content/uploads/2023/05/Cia-Athletica-Remada-curvada-Autores-Grupo-S2-Marketing-Freepik.jpg' }}
                    alt="Imagem do exercício"
                    width={60}
                    height={60}
                    className="rounded-lg mr-4"
                    resizeMode="cover"
                />

                <View className="flex-1">
                    <Text className="text-white text-lg font-heading">
                        Remada Curvada
                    </Text>

                    <Text
                        className="text-gray-200 text-sm mt-1"
                        numberOfLines={2}
                    >
                        3 séries x 12 repetições
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
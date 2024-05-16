import { Text, View } from "react-native"


export function HistoryCard() {
    return (
        <View className="flex-row items-center px-5 py-4 mb-3 bg-gray-600 rounded-md ">
            <View className="flex-1">
                <Text
                    className="text-white text-md font-heading"
                    style={{ textTransform: 'capitalize' }}
                    numberOfLines={1}>
                    costas
                </Text>

                <Text className="text-gray-100 text-lg" numberOfLines={1}>
                    Puxada Frontal
                </Text>


            </View>

            <View>
                <Text className="text-gray-300 text-md">
                    08:56
                </Text>
            </View>

        </View>
    )
}
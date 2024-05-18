import { HistoryDTO } from "@dtos/HistoryDTO"
import { Text, View } from "react-native"

type Props = {
    data: HistoryDTO
}
export function HistoryCard({ data }: Props) {
    return (
        <View className="flex-row items-center px-5 py-4 mb-3 bg-gray-600 rounded-md ">
            <View className="flex-1">
                <Text
                    className="text-white text-md font-heading"
                    style={{ textTransform: 'capitalize' }}
                    numberOfLines={1}>
                    {data.group}
                </Text>

                <Text className="text-gray-100 text-lg" numberOfLines={1}>
                    {data.name}

                </Text>
            </View>

            <View>
                <Text className="text-gray-300 text-md">
                    {data.hour}
                </Text>
            </View>

        </View>
    )
}
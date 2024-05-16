import { Text, View } from "react-native";

type Props = {
    title: string;
}


export function ScreenHeader({ title }: Props) {
    return (
        <View className="bg-gray-600 pb-6 pt-16">
            <Text className="text-gray-100 text-xl text-center font-heading">{title}</Text>
        </View>
    )
}
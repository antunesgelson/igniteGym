import { Pressable, PressableProps, Text } from "react-native";

type Props = PressableProps & {
    name: string;
    isActive?: boolean;
}


export function Group({ name, isActive, ...rest }: Props) {
    return (

        <Pressable
            className={` mr-3 w-24 h-10 bg-gray-600 rounded-md items-center justify-center overflow-hidden ${isActive ? 'border-2 border-green-500' : 'border-2 border-gray-600'}`}
            {...rest}
        >
            <Text className={` uppercase font-bold font-lg ${isActive ? 'text-green-500' : 'text-gray-200'}`}>
                {name}
            </Text>

        </Pressable>

    )
}
import { Pressable, PressableProps, Text } from "react-native";

type Props = PressableProps & {
    name: string;
    isActive?: boolean;
}


export function Group({ name, isActive, ...rest }: Props) {



    return (

        <Pressable

            // className={` mr-3 w-24 h-10  bg-gray-600 rounded-md items-center justify-center overflow-hidden ${isActive ? 'border-2 border-green-500' : 'border-2 border-gray-600'}`}
            style={({ pressed }) => ({
                borderWidth: pressed || isActive ? 2 : 0,
                borderColor: pressed || isActive ? '#00B37E' : '',
                marginRight: 10,
                width: 100,
                height: 40,
                backgroundColor: '#202024',
                borderRadius: 10,
                justifyContent: 'center',
                alignItems: 'center',
                overflow: 'hidden',

            })}

            {...rest}
        >
            <Text className={`  uppercase font-bold text-[12px] ${isActive ? 'text-green-500' : 'text-gray-200'}`}>
                {name}
            </Text>

        </Pressable>

    )
}
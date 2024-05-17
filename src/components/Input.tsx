import { Text, TextInput, TextInputProps, View } from 'react-native';


import colors from 'tailwindcss/colors';

type Props = TextInputProps & {
    errorMenssage?: string
}


export function Input({ errorMenssage, ...rest }: Props) {
    return (

        <View className="  ">
            <Text className="text-red-500 ml-1 mt-1 text-sm" >
                {errorMenssage}
            </Text>
            
            <TextInput
                className={`bg-gray-700 h-14 w-full px-4 text-white rounded-xl text-md font-body focus:border focus:border-green-500 ${errorMenssage ? `border border-red-500` : 'border-green-500'}  `}
                placeholderTextColor={colors.gray[400]}
                {...rest}

            />
        </View>

    )


}


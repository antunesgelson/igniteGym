import { TextInput, TextInputProps } from 'react-native';

import colors from 'tailwindcss/colors';

type Props = TextInputProps & {

}


export function Input({ ...rest }: Props) {
    return (
        <TextInput
            className="bg-gray-700 h-14 w-full px-4 text-white rounded-xl text-md font-body mb-4 focus:border focus:border-green-500  "
            placeholderTextColor={colors.gray[400]}
            {...rest}

        />
    )
}
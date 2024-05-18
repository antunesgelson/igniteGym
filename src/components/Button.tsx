import { StyledComponent } from 'nativewind';
import { ActivityIndicator, Text, TouchableOpacity, TouchableOpacityProps } from 'react-native';
import colors from 'tailwindcss/colors';

type Props = TouchableOpacityProps & {
    title: string;
    variant?: 'solid' | 'outline'
    isLoading?: boolean

}
export function Button({ title, isLoading = false, variant = 'solid', ...rest }: Props) {
    return (
        <StyledComponent component={TouchableOpacity} {...rest}>
            <TouchableOpacity
                className={` rounded-lg w-full h-14 flex justify-center ${isLoading && 'opacity-40'} ${variant === 'outline' ? 'bg-transparent border border-green-700' : 'bg-green-700'}`}
                {...rest}
            >

                {isLoading ? <ActivityIndicator color={variant === 'solid' ? colors.white : colors.green[500]} /> : (
                    <Text className={`text-center  text-sm font-heading ${variant === 'outline' ? 'text-green-500' : 'text-white'}`}>
                        {title}
                    </Text>
                )}

            </TouchableOpacity>
        </StyledComponent>

    )
}




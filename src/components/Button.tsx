import { StyledComponent } from 'nativewind';
import { Text, TouchableOpacity, TouchableOpacityProps } from 'react-native';

type Props = TouchableOpacityProps & {
    title: string;
    variant?: 'solid' | 'outline'

}
export function Button({ title, variant = 'solid', ...rest }: Props) {
    return (
        <StyledComponent component={TouchableOpacity} {...rest}>
            <TouchableOpacity
                className={` rounded-lg w-full h-14 flex justify-center ${variant === 'outline' ? 'bg-transparent border border-green-700' : 'bg-green-700'}`}
                {...rest}
            >
                <Text className={`text-center  text-sm font-heading ${variant === 'outline' ? 'text-green-500' : 'text-white'}`}>
                    {title}
                </Text>
            </TouchableOpacity>
        </StyledComponent>

    )
}




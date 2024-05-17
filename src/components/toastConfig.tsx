
import { Text, View } from 'react-native';

import { BaseToast, BaseToastProps, ErrorToast, ToastConfigParams } from 'react-native-toast-message';

import colors from 'tailwindcss/colors';



interface CustomToastProps extends BaseToastProps {
    uuid: string;
}


export const toastConfig = {

    success: (props: BaseToastProps) => (
        <BaseToast
            {...props}
            style={{ borderLeftColor: colors.green[500], backgroundColor: '#121214' }}
            contentContainerStyle={{ paddingHorizontal: 15 }}
            text1Style={{
                color: '#FFFF',
                fontSize: 15,
                fontWeight: '400'
            }}
        
        />
    ),

    error: (props: BaseToastProps) => (
        <ErrorToast
            {...props}
            style={{ borderLeftColor: colors.red[500], backgroundColor: '#121214' }}
            contentContainerStyle={{ paddingHorizontal: 15 }}
            text1Style={{
                color: '#FFFF',
                fontSize: 15,
                fontWeight: '400'
            }}

        />
    ),

    info: (props: BaseToastProps) => (
        <BaseToast
            {...props}
            style={{ borderLeftColor: colors.yellow[500], backgroundColor: '#121214' }}
            contentContainerStyle={{ paddingHorizontal: 15 }}
            text1Style={{
                color: '#FFFF',
                fontSize: 15,
                fontWeight: '400'
            }}
        />
    ),
    // Custom Toast
    tomatoToast: ({ text1, ...props }: ToastConfigParams<CustomToastProps>) => (
        <View className=" bg-gray-200 w-full h-14 p-2 rounded-lg " >
            <Text className="text-white font-heading">{text1}</Text>
            <Text className="font-body">{props.props.uuid}</Text>
        </View>
    )
};
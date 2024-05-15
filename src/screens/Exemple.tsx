import { MaterialIcons } from '@expo/vector-icons';
import { Text, TextInput, View } from 'react-native';

import colors from 'tailwindcss/colors';

import { ToggleTheme } from '@components/ToggleTheme';




export function Exemple() {
    return (

        <View className=" items-center p-8 gap-3 ">

            <ToggleTheme />

            <View className="flex-row items-center gap-2">
                <MaterialIcons name="home" size={32} color={colors.green[500]} />
                <Text className='text-3xl dark:text-white light:text-black '>NativeWind</Text>
            </View>


            <TextInput className="w-full h-14 dark:border-white light:border-black border rounded-lg focus:border-green-400 " />

            {/* <Button className="bg-green-500 h-14 flex justify-center rounded-lg w-full " /> */}

        </View>
    )

}
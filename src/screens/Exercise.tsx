import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { AppnavigatorRoutesProps } from '@routes/app.routes';

import BodySvg from '@assets/body.svg';
import RepetionsSvg from '@assets/repetitions.svg';
import SeriesSvg from '@assets/series.svg';

import { Button } from '@components/Button';
import colors from 'tailwindcss/colors';

export function Exercise() {

    const navigation = useNavigation<AppnavigatorRoutesProps>()

    function handleGoBack() {
        navigation.goBack()
    }
    return (
        <SafeAreaView className="flex-1">
            <View className="  bg-gray-600 pt-12 px-8">


                <TouchableOpacity onPress={handleGoBack} >
                    <Feather
                        name="arrow-left"
                        color={colors.green[500]}
                        size={24}
                    />
                </TouchableOpacity>


                <View className="flex-row items-center  mt-4 mb-8 ">
                    <Text numberOfLines={2} className="text-lg font-heading text-gray-100 flex-1">
                        Puxada frontal
                    </Text>

                    <View className="flex-row items-center">
                        <BodySvg />

                        <Text style={{ textTransform: 'capitalize' }}
                            className=" font-heading text-gray-200 ml-1 ">
                            costas
                        </Text>
                    </View>
                </View>

            </View>

            <ScrollView>
                <View className="px-8 pt-8">
                    <Image
                        source={{ uri: 'https://blog.ciaathletica.com.br/wp-content/uploads/2023/05/Cia-Athletica-Remada-curvada-Autores-Grupo-S2-Marketing-Freepik.jpg' }}
                        alt="Nome do exercício"
                        className="rounded-lg mb-3 w-full"
                        height={300}
                        resizeMode="cover"
                    />
                </View>

                <View className="px-8 ">
                    <View className="bg-gray-600 rounded-md px-4 pb-4">
                        <View className="flex-row items-center  pt-4  justify-around mb-6 ">
                            <View className="flex-row items-center">
                                <SeriesSvg />
                                <Text className="text-gray-200 ml-2">
                                    3 séries
                                </Text>
                            </View>

                            <View className="flex-row items-center">
                                <RepetionsSvg />

                                <Text className="text-gray-200 ml-2">
                                    12 repetições
                                </Text>
                            </View>
                        </View>

                        <Button title='Marcar como realizado' />

                    </View>
                </View>

            </ScrollView>

        </SafeAreaView>

    )
}
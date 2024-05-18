import { useNavigation, useRoute } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { AppnavigatorRoutesProps } from '@routes/app.routes';

import Toast from 'react-native-toast-message';

import { AppError } from '@utils/AppError';

import { Feather } from '@expo/vector-icons';

import BodySvg from '@assets/body.svg';
import RepetionsSvg from '@assets/repetitions.svg';
import SeriesSvg from '@assets/series.svg';

import { Button } from '@components/Button';

import { ExerciseDTO } from '@dtos/ExerciseDTO';
import { api } from '@services/api';

import { Loading } from '@components/Loading';
import colors from 'tailwindcss/colors';

type RouteParamsProps = {
    exerciseId: string

}

export function Exercise() {
    const [sendRegister, setSendRegister] = useState(false)
    const [isLoading, setIsloading] = useState(true)
    const [exercise, setExercise] = useState<ExerciseDTO>({} as ExerciseDTO)
    const navigation = useNavigation<AppnavigatorRoutesProps>()

    const route = useRoute()

    const { exerciseId } = route.params as RouteParamsProps


    async function fetchExerciseDetails() {
        try {
            setIsloading(true)
            const { data } = await api.get(`/exercises/${exerciseId}`)
            setExercise(data)

        }
        catch (error) {
            const isAppError = error instanceof AppError
            const title = isAppError ? error.menssage : 'Naõ foi possivel carregar os detalhes do exercício'
            Toast.show({
                type: 'error',
                text1: title,
                text2: isAppError ? ' ' : 'Tente novamente mais tarde.'

            })
        }
        finally {
            setIsloading(false)

        }
    }

    function handleGoBack() {
        navigation.goBack()
    }

    async function handleExerciseHistory(exerciseId: string) {
        try {
            setSendRegister(true)
            await api.post('/history', { exercise_id: exerciseId })
            Toast.show({
                type: 'success',
                text1: 'Parabéns!',
                text2: 'Exercício registrado no seu histórico.'

            })
            navigation.navigate('history')
        }
        catch (error) {
            console.log(error)
            const isAppError = error instanceof AppError
            const title = isAppError ? error.menssage : 'Naõ foi possivel marcar o exercício como realizado.'
            Toast.show({
                type: 'error',
                text1: title,
                text2: isAppError ? ' ' : 'Tente novamente mais tarde.'

            })
        }
        finally {
            setSendRegister(false)
        }
    }


    useEffect(() => {
        fetchExerciseDetails()
    }, [exerciseId]);
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
                        {exercise.name}
                    </Text>

                    <View className="flex-row items-center">
                        <BodySvg />

                        <Text style={{ textTransform: 'capitalize' }}
                            className=" font-heading text-gray-200 ml-1 ">
                            {exercise.group}
                        </Text>
                    </View>
                </View>

            </View>


            {isLoading ? <Loading /> :

                <ScrollView>
                    <View className="px-8 pt-8">
                        <Image
                            source={{ uri: `${api.defaults.baseURL}/exercise/demo/${exercise.demo}` }}
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
                                        {exercise.series} séries
                                    </Text>
                                </View>

                                <View className="flex-row items-center">
                                    <RepetionsSvg />

                                    <Text className="text-gray-200 ml-2">
                                        {exercise.repetitions} repetições
                                    </Text>
                                </View>
                            </View>

                            <Button
                                title='Marcar como realizado'
                                onPress={() => handleExerciseHistory(exercise.id)}
                                disabled={sendRegister}
                                isLoading={sendRegister}
                            />

                        </View>
                    </View>

                </ScrollView>

            }



        </SafeAreaView>

    )
}
import { useCallback, useState } from "react";
import { SectionList, Text, View } from "react-native";

import { useFocusEffect } from "@react-navigation/native";
import { SafeAreaView } from 'react-native-safe-area-context';
import Toast from "react-native-toast-message";

import { HistoryCard } from "@components/HistoryCard";
import { Loading } from "@components/Loading";
import { ScreenHeader } from "@components/ScreenHeader";

import { api } from "@services/api";
import { AppError } from "@utils/AppError";

import { HistoryDTO } from "@dtos/HistoryDTO";
import { HistoryDayDTO } from "@dtos/HistorybyDayDTO";





export function History() {
    const [isLoading, setIsloading] = useState(false)
    const [exercises, setExercises] = useState<HistoryDayDTO[]>([])



    async function fetchHisotry() {
        try {
            setIsloading(true)

            const { data } = await api.get('/history')
            setExercises(data)
        }
        catch (error) {
            const isAppError = error instanceof AppError
            const title = isAppError ? error.menssage : 'Naõ foi possivel carregar o histórico'
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


    useFocusEffect(useCallback(() => {
        fetchHisotry()
    }, []))
    return (
        <View className=" ">
            <SafeAreaView className="h-full">
                <ScreenHeader title='Histórico de Exercícios' />


                {isLoading ? <Loading /> :
                    <SectionList
                        className="px-6"
                        sections={exercises}
                        keyExtractor={item => item.id}
                        renderItem={({ item }) => (
                            <HistoryCard
                                data={item as HistoryDTO}
                            />

                        )}

                        renderSectionHeader={({ section }) => (
                            <Text className="text-gray-200 text-md mt-10 mb-3">{section.title}</Text>
                        )}

                        contentContainerStyle={exercises.length === 0 && { flex: 1, justifyContent: 'center' }}

                        ListEmptyComponent={() => (
                            <Text className="text-gray-100 text-center">
                                Não há exercícios registrados ainda. {'\n'}
                                Vamos fazer exercícios hoje ?
                            </Text>
                        )}

                        showsVerticalScrollIndicator={false}
                    />



                }



            </SafeAreaView>
        </View>
    )
}
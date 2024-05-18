import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { useCallback, useEffect, useState } from 'react';
import { FlatList, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { ExerciseCard } from '@components/ExerciseCard';
import { Group } from "@components/Group";
import { HomeHeader } from "@components/HomeHeader";

import { AppnavigatorRoutesProps } from '@routes/app.routes';
import { api } from '@services/api';
import { AppError } from '@utils/AppError';

import { Loading } from '@components/Loading';
import { ExerciseDTO } from '@dtos/ExerciseDTO';
import Toast from 'react-native-toast-message';

export function Home() {
    const [isLoading, setIsloading] = useState(true)
    const [groups, setGroups] = useState<string[]>([])
    const [exercises, setExercises] = useState<ExerciseDTO[]>([])
    const [groupSelected, setGroupSelected] = useState("antebraço")


    const navigation = useNavigation<AppnavigatorRoutesProps>()


    function handleOpenExerciseDetails(exerciseId: string) {
        navigation.navigate('exercise', { exerciseId })
    }


    async function fetchGroups() {
        try {
            const { data } = await api.get('/groups');
            setGroups(data)

        }
        catch (error) {
            const isAppError = error instanceof AppError
            const title = isAppError ? error.menssage : 'Naõ foi possivel carregar os grupos musculares'
            Toast.show({
                type: 'error',
                text1: title,
                text2: isAppError ? ' ' : 'Tente novamente mais tarde.'

            })
        }
    }

    async function fetchExercisesByGroup() {
        try {
            setIsloading(true)
            const { data } = await api.get(`/exercises/bygroup/${groupSelected}`);
            setExercises(data)

        }
        catch (error) {
            const isAppError = error instanceof AppError
            const title = isAppError ? error.menssage : 'Naõ foi possivel registrar o exercicio'
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



    useEffect(() => {
        fetchGroups()
    }, []);


    useFocusEffect(useCallback(() => {
        fetchExercisesByGroup()
    }, [groupSelected]))

    return (
        <View className="flex-1 ">
            <SafeAreaView className="    ">
                <HomeHeader />


                <View>
                    <FlatList
                        data={groups}
                        keyExtractor={item => item}
                        renderItem={({ item }) => (
                            <Group
                                isActive={groupSelected.toLocaleUpperCase() === item.toLocaleUpperCase()}
                                name={item}
                                onPress={() => setGroupSelected(item)}
                            />
                        )}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={{ paddingHorizontal: 20, marginVertical: 30, maxHeight: 40 }}

                    />

                </View>

                {
                    isLoading ?
                        <View className=" h-4/6  ">
                            <Loading />
                        </View>

                        :

                        <View className="px-6">
                            <View className="flex-row items-center justify-between mb-5  ">
                                <Text className="text-gray-200 text-lg">
                                    Exercícios
                                </Text>

                                <Text className="text-gray-200 text-sm">
                                    {exercises.length}
                                </Text>
                            </View>




                            <FlatList
                                data={exercises}
                                keyExtractor={item => item.id}
                                renderItem={({ item }) => (
                                    <ExerciseCard
                                        onPress={() => handleOpenExerciseDetails(item.id)}
                                        data={item}
                                    />

                                )}
                                showsVerticalScrollIndicator={false}
                                contentContainerStyle={{ paddingBottom: 550 }}
                            />



                        </View>

                }

            </SafeAreaView>
        </View>
    )
}
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import { FlatList, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { ExerciseCard } from '@components/ExerciseCard';
import { Group } from "@components/Group";
import { HomeHeader } from "@components/HomeHeader";

import { AppnavigatorRoutesProps } from '@routes/app.routes';

export function Home() {

    const [groups, setGroups] = useState(['Costas', 'Biceps', 'Triceps', 'Ombro', 'Pernas', 'Peito', 'Abdomen', 'Gluteos', 'Panturrilha'])
    const [exercises, setExercises] = useState(['Remada Curvada', 'Rosca Direta', 'Triceps Pulley', 'Elevação Lateral', 'Agachamento Livre', 'Supino Reto', 'Agachamento Frontal', 'Abdominal', 'Elevação Pélvica', 'Gêmeos Sentado'])
    const [groupSelected, setGroupSelected] = useState("Costas")


    const navigation = useNavigation<AppnavigatorRoutesProps>()


    function handleOpenExerciseDetails() {
        navigation.navigate('exercise')
    }

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
                        keyExtractor={item => item}
                        renderItem={({ item }) => (
                            <ExerciseCard
                                onPress={handleOpenExerciseDetails}
                            />

                        )}
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={{ paddingBottom: 550 }}
                    />

                </View>



            </SafeAreaView>
        </View>
    )
}
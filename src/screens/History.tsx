import { useState } from "react";
import { SectionList, Text, View } from "react-native";

import { SafeAreaView } from 'react-native-safe-area-context';

import { HistoryCard } from "@components/HistoryCard";
import { ScreenHeader } from "@components/ScreenHeader";


export function History() {

    const [exercises, setExercises] = useState([
        {
            title: '16/09/2024',
            data: ['Puxada Frontal', 'Remada unilateral']
        },

        {
            title: '24/09/2024',
            data: ['Puxada Frontal']
        }
    ])


    return (
        <View className=" ">
            <SafeAreaView className="h-full">
                <ScreenHeader title='Histórico de Exercícios' />
 

                <SectionList
                className="px-6"
                    sections={exercises}
                    keyExtractor={item => item}
                    renderItem={({ item }) => (
                        <HistoryCard />

                    )}

                    renderSectionHeader={({ section }) => (
                        <Text className="text-gray-200 text-md mt-10 mb-3">{section.title}</Text>
                    )}

                    contentContainerStyle={exercises.length === 0 && {flex: 1, justifyContent: 'center'}}

                    ListEmptyComponent={() => (
                        <Text className="text-gray-100 text-center">
                            Não há exercícios registrados ainda. {'\n'}
                            Vamos fazer exercícios hoje ?
                        </Text>
                    )}
                    
                    showsVerticalScrollIndicator={false}
                />


            </SafeAreaView>
        </View>
    )
}
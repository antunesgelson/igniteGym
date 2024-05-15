import { useState } from 'react';
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { Group } from "@components/Group";
import { HomeHeader } from "@components/HomeHeader";

export function Home() {

    const [groupSelected, setGroupSelected] = useState("costas")

    return (
        <View className="flex-1 ">
            <SafeAreaView>

                <HomeHeader />


                <View className="flex-row p-4">
                    <Group
                        isActive={groupSelected === "costas"}
                        name="costas"
                        onPress={() => setGroupSelected("costas")}
                    />
                    <Group
                        isActive={groupSelected === "ombro"}
                        name="ombro"
                        onPress={() => setGroupSelected("ombro")}

                    />
                </View>


            </SafeAreaView>
        </View>
    )
}
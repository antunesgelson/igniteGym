import { Loading } from '@components/Loading';
import { Roboto_400Regular, Roboto_700Bold, useFonts } from '@expo-google-fonts/roboto';
import { Routes } from '@routes/index';
import { StatusBar, View } from 'react-native';




export default function App() {

  const [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_700Bold
  })

  return (

    <View className="flex-1   bg-gray-700 ">
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent />

      {fontsLoaded ? <Routes /> : <Loading />}

    </View>
  );
}


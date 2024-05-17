import { Routes } from '@routes/index';

import { StatusBar, View } from 'react-native';
import Toast from 'react-native-toast-message';

import { AuthContextProvider } from '@contexts/AuthContext';

import { Loading } from '@components/Loading';
import { toastConfig } from '@components/toastConfig';

import { Roboto_400Regular, Roboto_700Bold, useFonts } from '@expo-google-fonts/roboto';


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
        translucent
      />


      <AuthContextProvider>

        {fontsLoaded ? <Routes /> : <Loading />}

        <Toast config={toastConfig} />

      </AuthContextProvider>
    </View>
  );
}


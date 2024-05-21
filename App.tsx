import { Routes } from '@routes/index';

import { StatusBar, View } from 'react-native';
import Toast from 'react-native-toast-message';

import { AuthContextProvider } from '@contexts/AuthContext';

import { NotificationClickEvent, OneSignal } from 'react-native-onesignal';

import { toastConfig } from '@components/toastConfig';

import { Loading } from '@components/Loading';
import { Roboto_400Regular, Roboto_700Bold, useFonts } from '@expo-google-fonts/roboto';
import { useEffect } from 'react';
import { tagUserInfoCreate } from 'src/notifications/notificationsTags';





OneSignal.initialize('fb4cece6-b0df-4362-aae7-eb7320596cf9')
OneSignal.Notifications.requestPermission(true)

export default function App() {

  const [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_700Bold
  });

  tagUserInfoCreate() //criando tag no OneSignal


  useEffect(() => {
    const handleNotificationClick = (event: NotificationClickEvent): void => {
      const { actionId } = event.result

      switch (actionId) {
        case '1':
          console.log("Ver todos")
          break;

        case '2':
          console.log("Ver pedido")
          break;

        default: console.log("Nenhum botão de ação selecionado.")
          break;
      }
    }
    OneSignal.Notifications.addEventListener('click', handleNotificationClick)

    return () => OneSignal.Notifications.removeEventListener('click', handleNotificationClick)

  }, []);

  return (

    <View className="flex-1    bg-gray-700 ">
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />


      <AuthContextProvider>

        {fontsLoaded ? <Routes /> : <Loading size='large' />}

        <Toast config={toastConfig} />

      </AuthContextProvider>
    </View>
  );
}


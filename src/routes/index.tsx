
import { DefaultTheme, NavigationContainer } from '@react-navigation/native'
import { AppRoutes } from './app.routes'
import { AuthRoutes } from './auth.routes'

import { useEffect } from 'react'
import { NotificationWillDisplayEvent, OneSignal } from 'react-native-onesignal'

import Toast from 'react-native-toast-message'

// import * as Linking from 'expo-linking'



import { Loading } from '@components/Loading'
import { useAuth } from '@hooks/useAuth'

const linking = {
    prefixes: ['igniteGym://', 'com.SeuDev.igniteGym://'],
    config: {
        screens: {
            exercise: {
                path: 'exercise/:exerciseId',
                parse: {
                    exerciseId: (exerciseId: string) => exerciseId,

                }
            }
        }
    }
}

export function Routes() {
    const { user, isLoadingUserStorageData } = useAuth()

    const theme = DefaultTheme
    theme.colors.background = 'transparent'




    useEffect(() => {

        //Forground notification
        const handleNotification = (event: NotificationWillDisplayEvent): void => {
            event.preventDefault()
            const response = event.getNotification()
            // console.log("notification =>", response)
            Toast.show({
                type: 'info',
                text1: response.title,
                text2: response.body,
                onPress: () => {
                    if (response.launchURL) {
                        // Linking.openURL(response.launchURL)
                    }
                }

            })
        }

        OneSignal.Notifications.addEventListener('foregroundWillDisplay', handleNotification)

        return () => OneSignal.Notifications.removeEventListener('foregroundWillDisplay', handleNotification)
    }, []);


    if (isLoadingUserStorageData) {
        return <Loading />

    }

    return (
        <NavigationContainer linking={linking} >
            {user.id ? <AppRoutes /> : <AuthRoutes />}
        </NavigationContainer>

    )
}
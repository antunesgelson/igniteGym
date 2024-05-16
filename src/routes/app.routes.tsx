import { Platform } from 'react-native'

import { BottomTabNavigationProp, createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import HistorySvg from '@assets/history.svg'
import HomeSvg from '@assets/home.svg'
import ProfileSvg from '@assets/profile.svg'

import { Exercise } from '@screens/Exercise'
import { History } from '@screens/History'
import { Home } from '@screens/Home'
import { Profile } from '@screens/Profile'

import colors from 'tailwindcss/colors'



type AppRoutes = {
    home: undefined
    history: undefined
    profile: undefined
    exercise: undefined

}

export type AppnavigatorRoutesProps = BottomTabNavigationProp<AppRoutes>

const { Navigator, Screen } = createBottomTabNavigator<AppRoutes>()

const iconSize = 25

export function AppRoutes() {
    return (
        <Navigator screenOptions={{
            headerShown: false,
            tabBarShowLabel: false,
            tabBarActiveTintColor: colors.green[500],
            tabBarInactiveTintColor: colors.gray[200],
            tabBarStyle: {
                backgroundColor: '#202024',
                borderTopWidth: 0,
                height: Platform.OS === 'android' ? 'auto' : 76,
                paddingBottom: Platform.OS === 'android' ? 32 : 28,
                paddingTop: Platform.OS === 'android' ? 32 : 0,

            }
        }}>
            <Screen
                name="home"
                component={Home}
                options={{
                    tabBarIcon: ({ color }) => (
                        <HomeSvg fill={color} width={iconSize} height={iconSize} />
                    )
                }}
            />

            <Screen
                name="history"
                component={History}
                options={{
                    tabBarIcon: ({ color }) => (
                        <HistorySvg fill={color} width={iconSize} height={iconSize} />
                    )
                }}
            />

            <Screen
                name="profile"
                component={Profile}
                options={{
                    tabBarIcon: ({ color }) => (
                        <ProfileSvg fill={color} width={iconSize} height={iconSize} />
                    )
                }}
            />

            <Screen
                name="exercise"
                component={Exercise}
                options={{
                    tabBarButton: () => null
                }}
            />
        </Navigator>
    )
}
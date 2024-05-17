
import { DefaultTheme, NavigationContainer } from '@react-navigation/native'
import { AuthRoutes } from './auth.routes'
// import { AppRoutes } from './app.routes'


import { useAuth } from '@hooks/useAuth'

export function Routes() {
    const { user } = useAuth()


    console.log('Usuario Logado => ', user)

    const theme = DefaultTheme
    theme.colors.background = 'transparent'


    return (
        <NavigationContainer >

            {/* <AppRoutes /> */}
            <AuthRoutes />
        </NavigationContainer>

    )
}
import { DefaultTheme, NavigationContainer } from '@react-navigation/native'
// import { AuthRoutes } from './auth.routes'
import { AppRoutes } from './app.routes'

export function Routes() {

    const theme = DefaultTheme
    theme.colors.background = 'transparent'

    return (
        <NavigationContainer >

            <AppRoutes />
            {/* <AuthRoutes /> */}
        </NavigationContainer>

    )
}
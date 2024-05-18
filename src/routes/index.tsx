
import { DefaultTheme, NavigationContainer } from '@react-navigation/native'
import { AppRoutes } from './app.routes'
import { AuthRoutes } from './auth.routes'



import { Loading } from '@components/Loading'
import { useAuth } from '@hooks/useAuth'

export function Routes() {
    const { user, isLoadingUserStorageData } = useAuth()

    const theme = DefaultTheme
    theme.colors.background = 'transparent'


    if (isLoadingUserStorageData) {
        return <Loading  />

    }

    return (
        <NavigationContainer >
            {user.id ? <AppRoutes /> : <AuthRoutes />}
        </NavigationContainer>

    )
}
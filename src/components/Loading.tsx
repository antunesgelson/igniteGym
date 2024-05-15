import { ActivityIndicator } from 'react-native'

import colors from 'tailwindcss/colors'


export function Loading() {
    return (
        <ActivityIndicator color={colors.green[500]} />
    )
}
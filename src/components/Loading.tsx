import { ActivityIndicator, View } from 'react-native'

import colors from 'tailwindcss/colors'

type Props = {
    size?: 'small' | 'large'
}

export function Loading({ size = 'small' }: Props) {
    return (
        <View className="flex-1 justify-center">
            <ActivityIndicator size={size} color={colors.green[500]} />
        </View>
    )
}
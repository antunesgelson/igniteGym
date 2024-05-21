import { OneSignal } from "react-native-onesignal";

export function tagUserInfoCreate() {
    OneSignal.User.addTags({
        user_name: 'Gelson',
        user_email: 'gelsondeveloper@hotmail.com'
    })
}
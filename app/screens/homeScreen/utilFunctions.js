import { Alert } from 'react-native'

const backButtonPressed = () =>{
    Alert.alert('Heyy!!','You wanna exit??',[
        {
            text : 'Cancel',
        },
        {
            text : 'Exit', onPress : () => BackHandler.exitApp()
        }
    ])
    return true;
}

export { backButtonPressed }
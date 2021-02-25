import React , { useState ,useEffect } from 'react'
import { View , Text, Image, TouchableOpacity, TextInput } from 'react-native'
import styles from './styles'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { tweet } from './utilsFunctions'

export default createTweet = ({ navigation }) =>{
    const [tweetText, changeText] = useState('')
    const [ userData,changeUserData ] = useState({
        userName : '',
        userEmail : '',
        userId : undefined
    })
      
    const getUserData = async () => {
        changeUserData({
            userName : await AsyncStorage.getItem('@userName'),
            userEmail : await AsyncStorage.getItem('@userEmail'),
            userId : Number(await AsyncStorage.getItem('@userId'))
        })
    }
    useEffect(() =>{
         getUserData()
    },[])

    return (
        <View style={styles.container}>
            <View style={styles.navigationBar} >
                <Text onPress = {()=>navigation.goBack()} style={{width : 60,height : 20}}>
                    Cancel
                </Text>
                <TouchableOpacity style={styles.buttonContainer}>
                    <Text style={styles.buttonText} onPress = {()=>tweet(userData,tweetText, changeText,navigation)}>
                        Tweet
                    </Text>
                </TouchableOpacity>
            </View>
            <View style={styles.tweetField}>
                <Image
                    source = {require('../../assests/images/shared/default_profile.png')}
                    style = {styles.image}
                />
                <TextInput
                    style={styles.inputBox}
                    placeholder= "What's happening ??"
                    placeholderTextColor = "gray"
                    onChangeText = {(text)=> changeText(text)}
                    value = {tweetText}
                />
            </View>
        </View>
    )
}

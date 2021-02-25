import React , { useState ,useEffect } from 'react'
import { View , Text, Image, TouchableOpacity, TextInput } from 'react-native'
import styles from './styles'
import { getFromStorage, tweet } from './utilsFunctions'

export default createTweet = ({ navigation }) =>{
    const [tweetText, changeText] = useState('')

    let userName,userEmail,userId
    useEffect(() =>{
         userName,userEmail,userId = getFromStorage()
    },[])

    return (
        <View style={styles.container}>
            <View style={styles.navigationBar} >
                <Text onPress = {()=>navigation.goBack()} style={{width : 60,height : 20}}>
                    Cancel
                </Text>
                <TouchableOpacity style={styles.buttonContainer}>
                    <Text style={styles.buttonText} onPress = {()=>tweet(tweetText, changeText,navigation)}>
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

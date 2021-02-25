import React , { useState ,useEffect } from 'react'
import { View , Text, Image, TouchableOpacity, TextInput } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import config from '../../utils/config'
import styles from './styles'


export default createTweet = ({route,navigation}) =>{
    const [tweetText, changeText] = useState('')

    let userName,userEmail,userId;
    const getFromStorage = async () => {
        userEmail = await AsyncStorage.getItem('@userEmail')
        userName = await AsyncStorage.getItem('@userName')
        userId = 3
    }

    const tweet = async () => {
        if(tweetText.length==0){
            alert('Please write something....')
            return
        }
        try{
            const response = await fetch(config.url+'/tweets/create',{
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    uid : userId,
                    tweet : tweetText
                })
            })
            let data = await response.json()
            changeText('')
            navigation.navigate('ShowTweets')
        }
        catch(err){
            console.log(err)
        }
    }

    useEffect(() =>{
        getFromStorage()
    },[])
    return (
        <View style={styles.container}>
            <View style={styles.navigationBar} >
                <Text onPress = {()=>navigation.goBack()} style={{width : 60,height : 20}}>
                    Cancel
                </Text>
                <TouchableOpacity style={styles.buttonContainer}>
                    <Text style={styles.buttonText} onPress = {()=>tweet()}>
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

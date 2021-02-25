import AsyncStorage from '@react-native-async-storage/async-storage'
import config from '../../utils/config'

const getFromStorage = async () => {
    userEmail = await AsyncStorage.getItem('@userEmail')
    userName = await AsyncStorage.getItem('@userName')
    userId = 3
    return { userEmail, userName, userId }
}

const tweet = async (tweetText, changeText,navigation) => {
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

export { getFromStorage, tweet }
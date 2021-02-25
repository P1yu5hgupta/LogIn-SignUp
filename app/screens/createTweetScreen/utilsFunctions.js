import AsyncStorage from '@react-native-async-storage/async-storage'
import config from '../../utils/config'

const tweet = async (userData,tweetText, changeText,navigation) => {
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
                uid : userData.userId,
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

export { tweet }
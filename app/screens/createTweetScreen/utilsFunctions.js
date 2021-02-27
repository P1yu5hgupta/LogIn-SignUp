import { createTweetApi } from '../../apiCalls/postsApi'

const tweet = async (userData,tweetText, changeText,navigation) => {
    if(tweetText.length==0){
        alert('Please write something....')
        return
    }
    try{
        const data = await createTweetApi(userData,tweetText)
        if(data.success){
            changeText('')
            navigation.navigate('ShowTweets')
        }
        
    }
    catch(err){
        console.log(err)
    }
}

export { tweet }
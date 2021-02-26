import config from '../utils/config'

const createTweetApi = async (userData,tweetText) => {
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
        return await response.json()
    }
    catch(err){
        console.log(err)
    }
}

const sendCommentApi = async (route,userData,commentText) =>{
    try {
        const response = await fetch(config.url+'/comments/create',{
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                tid : route.params.tweetId,
                uid : userData.userId,
                comment : commentText,
            })
        })
        return await response.json()
    }
    catch(err){
        console.log(err)
    }
}
export {
    createTweetApi,
    sendCommentApi,

}
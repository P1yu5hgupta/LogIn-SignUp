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

const likeTweet = async (userData,changeState,item) => {
    let flag = true;
    changeState(prevState =>({
        ...prevState,
        data : prevState.data.map(userObj =>{
            if(userObj.id === item.id){
                flag = userObj.isTweetLikedByMe
                return flag ? 
                ({
                    ...userObj,
                    isTweetLikedByMe : !item.isTweetLikedByMe,
                    tweetLikesCount : userObj.tweetLikesCount-1
                }) :
                ({
                    ...userObj,
                    isTweetLikedByMe : !item.isTweetLikedByMe,
                    tweetLikesCount : userObj.tweetLikesCount+1
                })
            } 
            else{
                return userObj
            }
        })
    })) 
    let response = flag ? await fetch(config.url + '/tweetLikes/delete/userid/'+userData.userId+'/tweetid/'+item.id) : 
                          await fetch(config.url + '/tweetLikes/create/userid/'+userData.userId+'/tweetid/'+item.id) 

    response = await response.json()
    if(!response.success)
        console.log(response.error)
}


export {
    createTweetApi,
    sendCommentApi,
    likeTweet
}
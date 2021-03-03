import config from '../utils/config'

// API call for creating a tweet which is done by the loggedIn user
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

// API call for adding a comment on particular tweet which is done by the loggedIn user
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

// API call for liking a particular tweet by loggedIn user
const likeTweet = async (userData,changeState,item,type) => {
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
                    totalReactCount : userObj.totalReactCount-1,
                    likeType : undefined,
                    modalView : false
                }) :
                ({
                    ...userObj,
                    isTweetLikedByMe : !item.isTweetLikedByMe,
                    totalReactCount : userObj.totalReactCount+1,
                    likeType : type,
                    modalView : false
                })
            } 
            else{
                return userObj
            }
        })
    }))
    let response = flag ? await fetch(config.url + '/tweetLikes/delete/userid/'+userData.userId+'/tweetid/'+item.id):
                          await fetch(config.url + '/tweetLikes/create/userid/'+userData.userId+'/tweetid/'+item.id+'/likeType/'+type)
    response = await response.json()
    if(!response.success){
        console.log(response.error)
    }
}

// API call for liking a particular comment on a particular tweet by loggedIn user
const likeComment = async (userData,changeState,item) => {
    let flag = true;
    changeState(prevState =>({
        ...prevState,
        comments : prevState.comments.map(userObj =>{
            if(userObj.id === item.id){
                flag = userObj.isCommentLikedByMe
                return flag ? 
                ({
                    ...userObj,
                    isCommentLikedByMe : !item.isCommentLikedByMe,
                    totalReactCount : userObj.totalReactCount-1
                }) :
                ({
                    ...userObj,
                    isCommentLikedByMe : !item.isCommentLikedByMe,
                    totalReactCount : userObj.totalReactCount+1
                })
            } 
            else{
                return userObj
            }
        })
    }))
    let response = flag ? await fetch(config.url + '/commentLikes/delete/userid/'+userData.userId+'/commentid/'+item.id):
                          await fetch(config.url + '/commentLikes/create/userid/'+userData.userId+'/commentid/'+item.id+'/likeType/like')
    response = await response.json()
    if(!response.success){
        console.log(response.error)
    }
}

// API call for reacting on tweet by loggedIn user
const reactOnTweet = async (userData,changeState,item,type) => {
    changeState(prevState =>({
        ...prevState,
        data : prevState.data.map(userObj =>{
            if(userObj.id === item.id){
                flag = userObj.isTweetLikedByMe
                return flag ?  // check if user already liked the tweet or not
                ({ 
                    ...userObj,
                    isTweetLikedByMe : true,
                    likeType : type,
                    modalView : false
                }) :
                ({
                    ...userObj,
                    isTweetLikedByMe : true,
                    totalReactCount : userObj.totalReactCount+1,
                    likeType : type,
                    modalView : false
                })
            } 
            else{
                return userObj
            }
        })
    }))
    if(flag && item.likeType !== type){
        let response = await fetch(config.url + '/tweetLikes/create/userid/'+userData.userId+'/tweetid/'+item.id+'/likeType/'+type)
        response = await response.json()
        if(!response.success){
            console.log(response.error)
        }
    }
}

export {
    createTweetApi,
    sendCommentApi,
    likeTweet,
    likeComment,
    reactOnTweet
}
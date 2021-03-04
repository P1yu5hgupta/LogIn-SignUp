import {
    logIn ,
    logOut ,
    nameUpdated,
    feedsOnScreen,
    tweetLiked,
    tweetDisliked,
    removeTweets,
    commentsOnScreen,
    commentLiked,
    commentDisliked,
    removeComments
} from './actions'

const INITIAL_STATE = {
    userData : {
        userName : '',
        userEmail : '',
        userId : undefined
    },
    feeds : []
}

const reducer = ( state = INITIAL_STATE, action ) => {
    switch(action.type) {
        case logIn :
            return {
                ...state,
                userData : {
                    userName : action.payload.userName,
                    userEmail : action.payload.userEmail,
                    userId : action.payload.userId
                }
            }
        case logOut :
            return INITIAL_STATE
        case nameUpdated : 
            return {
                ...state,
                userData : {
                    ...state.userData,
                    userName : action.payload.updatedName
                }
            }
        case feedsOnScreen :
            return {
                ...state,
                feeds : action.payload.data
            }
        case tweetLiked :
            return {

            }
        case tweetDisliked :
            return {

            }
        case removeTweets :
            return {

            }
        case commentsOnScreen :
            return {

            }
        case commentLiked :
            return {

            }
        case commentDisliked :
            return {

            }
        case removeComments :
            return {

            }
        default :
            return INITIAL_STATE
    }
    
}

export default reducer
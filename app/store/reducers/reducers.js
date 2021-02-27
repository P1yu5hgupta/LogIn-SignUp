
const INITIAL_STATE = {
    userName : '',
    userEmail : '',
    userId : undefined
}

const reducer = ( state = INITIAL_STATE, action ) => {
    switch(action.type) {
        case "LOGGED_IN":
            return {
                ...state,
                userName : action.payload.userName,
                userEmail : action.payload.userEmail,
                userId : action.payload.userId
            }
        case "LOGGED_OUT":
            return INITIAL_STATE
        case "NAME_UPDATED" : 
            return {
                ...state,
                userName : action.payload.updatedName
            }
        default :
            return INITIAL_STATE
    }
    
}

export default reducer
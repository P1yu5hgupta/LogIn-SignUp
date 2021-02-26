
const reducer = ( state, action ) => {
    switch(action.type) {
        case "LOGGED_IN":
            return {
                ...state,
                userData : {
                    userName : action.payload.userName,
                    userEmail : action.payload.userEmail,
                    userId : action.payload.userId
                }
            }
        case "LOGGED_OUT":
            return {
                ...state,
                userData : {
                    userName : '',
                    userEmail : '',
                    userId : undefined
                }
            }
    }
    
}

export default reducer
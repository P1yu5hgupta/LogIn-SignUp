import { authenticateUser } from '../../apiCalls/authenticationApi'

const INITIAL_STATE = {
    userDetails : {
        password : {
            value : '',
            errMsg : '',
            placeholder : 'Password',
            imageURL: require('../../assests/images/getPasswordScreen/lockLogo.png'),
            style: 'lockLogo',
            secureText : true
        }
    }
}

const handleChange = (state,setState,key,text) =>{
    setState({
        ...state,
        userDetails :{
            ...state.userDetails,
            [key] : {
                ...state.userDetails[key],
                value : text,
                errMsg : ''
            }
        }
    })
}

const isValidFields = (state,setState) =>{
    let flag=true

    if(state.userDetails.password.value.length==0){
        setState({
            ...state,
            userDetails : {
                ...state.userDetails,
                password :{
                    ...state.userDetails.password,
                    errMsg : "Password Required!!!"
                }
            }
        })
        flag=false
    }

    return flag       
}
const submit = async (dispatch,route,navigation, state,setState) => {
    if(isValidFields(state,setState)){
        try{
            const data = await authenticateUser(route,state)
            console.log(data)
            if(!data.success){
                alert(data.error)
            }
            else{
                dispatch({
                    type : 'LOGGED_IN',
                    payload : {
                        userName : data.data.name,
                        userEmail : data.data.email,
                        userId : data.data.userId
                    }
                })
                setState(INITIAL_STATE)
                navigation.navigate("ShowTweets")
            }
        }
        catch(err){
            console.log(err)
        }
    }
}

export { INITIAL_STATE, handleChange, submit }
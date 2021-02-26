import { authenticateUser } from '../../apiCalls/authenticationApi'
import store from '../../store/store'

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
const submit = async (route,state,setState) => {
    if(isValidFields(state,setState)){
        try{
            const data = await authenticateUser(route,state)
            if(!data.status){
                alert(data.message)
            }
            else{
                store.dispatch({
                    type : 'LOGGED_IN',
                    payload : {
                        userName : data.name,
                        userEmail : data.email,
                        userId : data.userId
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
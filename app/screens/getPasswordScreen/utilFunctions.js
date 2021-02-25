import AsyncStorage from '@react-native-async-storage/async-storage'
import config from '../../utils/config'

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
            const response = await fetch(config.url+'/user/login',{
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email : route.params.data,
                    password : state.userDetails.password.value
                })
            })
            let data = await response.json()
            if(!data.status){
                alert(data.message)
            }
            else{
                await AsyncStorage.setItem('@userEmail',data.email)
                await AsyncStorage.setItem('@userName',data.name)
                await AsyncStorage.setItem('@userId',data.userId.toString())
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
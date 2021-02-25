import AsyncStorage from '@react-native-async-storage/async-storage'
import config from '../../utils/config'

const INITIAL_STATE={
    nameEdit : {
        name : {
            value : '',
            errMsg : '',
            placeholder : 'Enter your name'
        },
        password :{
            value : '',
            errMsg : '',
            placeholder : 'Current Password',
            secureText : true
        }
    },
    passwordEdit : {
        currentPassword : {
            value : '',
            errMsg : '',
            placeholder : 'Current Password',
            secureText : true
        },
        newPassword :{
            value : '',
            errMsg : '',
            placeholder : 'New Password',
            secureText : true
        },
        newPassword1 : {
            value : '',
            errMsg : '',
            placeholder : 'Re-enter New Password',
            secureText : true
        }
    }
}

let userEmail,userName,userId
const getFromStorage = async () => {
    userEmail = await AsyncStorage.getItem('@userEmail')
    userName = await AsyncStorage.getItem('@userName')
    userId = 3
    return { userEmail,userName,userId }
}

const isValidNameFields = (state, updateState) => {
    let nameRegex=/^[A-Za-z\s ]+$/;
    let flag = true
    if(state.nameEdit.name.value.length==0){
        updateState(prevState => ({
            ...prevState,
            nameEdit : {
                ...prevState.nameEdit,
                name : {
                    ...prevState.nameEdit.name,
                    errMsg : "Name is Mandatory!!!"
                },
                
            }
        }))
        flag = false
    }
    else if(!nameRegex.test(state.nameEdit.name.value)){
        updateState(prevState => ({
            ...prevState,
            nameEdit : {
                ...prevState.nameEdit,
                name : {
                    ...prevState.nameEdit.name,
                    errMsg : "Must be Alphabatic!!!"
                },
                
            }
        })) 
        flag =false
    }
    
    if(state.nameEdit.password.value.length==0){
        updateState(prevState => ({
            ...prevState,
            nameEdit : {
                ...prevState.nameEdit,
                password : {
                    ...prevState.nameEdit.password,
                    errMsg : "Password is required!!!"
                },
            }
        })) 
        flag=false
    }
    return flag
}

const isValidPasswordFields = (state, updateState) =>{
    let flag = true
    if(state.passwordEdit.currentPassword.value.length==0){
        updateState(prevState => ({
            ...prevState,
            passwordEdit : {
                ...prevState.passwordEdit,
                currentPassword : {
                    ...prevState.passwordEdit.currentPassword,
                    errMsg : "**Required"
                },
                
            }
        }))
        flag=false
    }
    if(state.passwordEdit.newPassword.value.length<6){
        updateState(prevState => ({
            ...prevState,
            passwordEdit : {
                ...prevState.passwordEdit,
                newPassword : {
                    ...prevState.passwordEdit.newPassword,
                    errMsg : "Must be atleast 6 characters long!!"
                },
            }
        }))
        flag=false
    }
    else if(state.passwordEdit.newPassword.value !=state.passwordEdit.newPassword1.value){
        updateState(prevState => ({
            ...prevState,
            passwordEdit : {
                ...prevState.passwordEdit,
                newPassword1 : {
                    ...prevState.passwordEdit.newPassword1,
                    errMsg : "Password don't match!!"
                },
            }
        }))
        flag=false
    }
    return flag
}

const handleChange = (editType , key,text, updateState) => {
    updateState(prevState => ({
        ...prevState,
        [editType] : {
            ...prevState[editType],
            [key] : {
                ...prevState[editType][key],
                value : text,
                errMsg : ''
            },
            
        }
    })) 
}

const resetPassword = async (state, updateState,navigation)=>{
    if(isValidPasswordFields(state, updateState)){
        try{
            const response = await fetch(config.url+'/user/update/2',{
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    uid : userId,
                    currentPassword : state.passwordEdit.currentPassword.value,
                    newPassword : state.passwordEdit.newPassword.value,
                })
            })
            const data = await response.json()
            if(data.status){
                alert(data.message)
                navigation.navigate('Profile')
            }
            else{
                alert(data.message)
            }
        }
        catch(err){
            console.log(err)
        }
    }
}

const editName = async (state, updateState,navigation) =>{
    if(isValidNameFields(state, updateState)){
        try{
            const response = await fetch(config.url+'/user/update/1',{
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    uid : userId,
                    name : state.nameEdit.name.value,
                    currentPassword : state.nameEdit.password.value,
                })
            })
            const data = await response.json()
            if(data.status){
                alert(data.message)
                navigation.navigate('Profile')
            }
            else{
                alert(data.message)
            }
        }
        catch(err){
            console.log(err)
        }
    }
}

export {
    INITIAL_STATE,
    getFromStorage,
    resetPassword,
    editName,
    handleChange,
}
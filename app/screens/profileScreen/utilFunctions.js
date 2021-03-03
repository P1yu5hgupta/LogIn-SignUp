import {
    updatePasswordApi,
    updateNameApi   
} from '../../apiCalls/updateProfileApi'

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

const resetPassword = async (userData, state, updateState,changePasswordModal)=>{
    if(isValidPasswordFields(state, updateState)){
        try{
            const data = await updatePasswordApi(userData,state)
            if(data.success){
                updateState(INITIAL_STATE)
                changePasswordModal(false)
            }
            else{
                alert(data.error)
            }
        }
        catch(err){
            console.log(err)
        }
    }
}

const editName = async (dispatch, userData, state, updateState,changeNameModal) =>{
    if(isValidNameFields(state, updateState)){
        try{
            const data = await updateNameApi(userData, state)
            if(data.success){
                updateState(INITIAL_STATE)
                await dispatch({
                    type : 'NAME_UPDATED',
                    payload : {
                        updatedName : state.nameEdit.name.value
                    }
                })
                changeNameModal(false)
            }
            else{
                alert(data.error)
            }
        }
        catch(err){
            console.log(err)
        }
    }
}

export {
    INITIAL_STATE,
    resetPassword,
    editName,
    handleChange
}
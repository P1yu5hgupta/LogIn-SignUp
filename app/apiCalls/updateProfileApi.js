import config from '../utils/config'

// API call for updating the password of the loggedIn account
const updatePasswordApi = async (userData, state) => {
    try{
        console.log()
        const response = await fetch(config.url+'/user/update/2',{
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                uid : userData.userId,
                password : state.passwordEdit.currentPassword.value,
                newpassword : state.passwordEdit.newPassword.value,
            })
        })
        return await response.json()
    }
    catch(err){
        console.log(err)
    }
}

// API call for updating the name of loggedIn user
const updateNameApi = async (userData, state) => {
    try{
        const response = await fetch(config.url+'/user/update/1',{
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                uid : userData.userId,
                name : state.nameEdit.name.value,
                password : state.nameEdit.password.value,
            })
        })
        return await response.json()
    }
    catch(err){
        console.log(err)
    }
}

export {
    updatePasswordApi,
    updateNameApi,
}
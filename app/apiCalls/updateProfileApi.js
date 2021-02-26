import config from '../utils/config'

const updatePasswordApi = async (userData, state) => {
    try{
        const response = await fetch(config.url+'/user/update/2',{
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                uid : userData.userId,
                currentPassword : state.passwordEdit.currentPassword.value,
                newPassword : state.passwordEdit.newPassword.value,
            })
        })
        return await response.json()
    }
    catch(err){
        console.log(err)
    }
}

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
                currentPassword : state.nameEdit.password.value,
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
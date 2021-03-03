import config from '../utils/config'

// API call for verifying the email entered by user
const verifyEmail = async (state) => {
    try{
        const response = await fetch(config.url+'/user/email',{
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email : state.userDetails.userId.value,
            })
        })
        return await response.json()
    }
    catch(err){
        console.log(err)
    }
}

// API call for matching the entered credentials for login the user
const authenticateUser = async (route,state) =>{
    try {
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
        return await response.json()
    }
    catch(err){
        console.log(err)
    }
}

// API call for making an entry of a user who is signing Up to platform
const userRegistration = async (state) =>{
    try {
        const response = await fetch(config.url+'/user/signup',{
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name : state.userDetails.fname.value + ' ' +state.userDetails.lname.value,
                email : state.userDetails.email.value,
                password : state.userDetails.password.value,
            })
        })
        return await response.json()
    }
    catch(err){
        console.log(err)
    }
}


export {
    verifyEmail,
    authenticateUser,
    userRegistration,
}
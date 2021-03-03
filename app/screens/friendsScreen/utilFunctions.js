import config from '../../utils/config'

// Validating the Email/Mobile No. entered by user while searching for friends
const isValidFields = (userName, updateName) => {
    let mailRegex=/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/
    let phoneRegex = /^[6-9]\d{9}$/
    if(userName.value.length==0){
        return false
    }
    if(!mailRegex.test(userName.value) && !phoneRegex.test(userName.value)){
        updateName({
            ...userName,
            errMsg: 'Invalid Entry!!!'
        })
        return false
    }
    return true
}

// Handling function for searching a friend on platform
const searchFriends = async (userData,userName,updateName,friendStatus,changeStatus)=>{
    if(isValidFields(userName, updateName)){
        try{
            const response = await fetch(config.url+'/user/search',{
                method : 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body : JSON.stringify({
                    email : userName.value,
                    uid : userData.userId
                })
            })
            let data = await response.json()
            if(!data.success){
                changeStatus({
                    ...friendStatus,
                    requested : true,
                })
            }
            else{
                if(data.data.data===undefined)
                    changeStatus({
                        ...friendStatus,
                        requested : true,
                        status: true,
                        friendEmail : data.data.email,
                        friendName : data.data.name,
                        friendId : data.data.id,
                        relation : data.data.relationStatus
                    })
                else{
                    changeStatus({
                        ...friendStatus,
                        requested : true,
                        status: true,
                        friendEmail : data.data.email,
                        friendName : data.data.name,
                        friendId : data.data.id,
                        relation : true,
                        relationStatus : data.data.data.status,
                        actionId : data.data.data.action_uid
                    })
                }
            }
        }
        catch(err){
            console.log(err)
        }
    }
}

// Handling function for sending a request to a friend
const sendRequest = async (userData,friendStatus,changeStatus) =>{
    try{
        const response = await fetch(config.url+'/friendship/friendRequest/'+userData.userId+'/'+friendStatus.friendId)
        let data = await response.json()
        if(data.success){
            changeStatus({
                ...friendStatus,
                relation : true,
                relationStatus : '0',
                actionId : userData.userId
            })
        }
    }
    catch(err){
        console.log(err)
    }
}

// Handling function which is called after user click on accept friend request
const acceptRequest = async (userData,friendStatus,changeStatus) =>{
    try{
        const response = await fetch(config.url+'/friendship/friendAccept/'+userData.userId+'/'+friendStatus.friendId)
        let data = await response.json()
        if(data.success){
            changeStatus({
                ...friendStatus,
                relationStatus : '1'
            })
        }
    }
    catch(err){
        console.log(err)
    }
}

// Handling function which is called after user click on reject friend request
const rejectRequest = async (userData,friendStatus,changeStatus) =>{
    try{
        const response = await fetch(config.url+'/friendship/friendReject/'+userData.userId+'/'+friendStatus.friendId)
        let data = await response.json()
        if(data.success){
            changeStatus({
                ...friendStatus,
                relationStatus : '2'
            })
        }
    }
    catch(err){
        console.log(err)
    }
}

// handling function of TextInput to get email/mobile of friend to be searched by user
const handleChange = (updateName,text,changeStatus,friendStatus) =>{
    updateName({
        value : text,
        errMsg : ''
    })
    changeStatus({
        ...friendStatus,
        requested : false
    })
}


export { 
    handleChange, 
    rejectRequest, 
    sendRequest, 
    acceptRequest, 
    searchFriends 
}
import AsyncStorage from '@react-native-async-storage/async-storage'
import config from '../../utils/config'

let userEmail , user , userId
const getFromStorage = async () => {
    userEmail = await AsyncStorage.getItem('@userEmail')
    user = await AsyncStorage.getItem('@userName')
    userId = 3

    return { userEmail , user , userId }
}

const isValidFields = (userName, updateName) =>{
    let flag=true
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

const searchFriends = async (userName,updateName,friendStatus,changeStatus)=>{
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
                    uid : userId
                })
            })
            let data = await response.json()
            if(!data.status){
                changeStatus({
                    ...friendStatus,
                    requested : true,
                })
            }
            else{
                if(data.data===undefined)
                    changeStatus({
                        ...friendStatus,
                        requested : true,
                        status: true,
                        friendEmail : data.email,
                        friendName : data.name,
                        friendId : data.id,
                        relation : data.relationshipStatus
                    })
                else{
                    changeStatus({
                        ...friendStatus,
                        requested : true,
                        status: true,
                        friendEmail : data.email,
                        friendName : data.name,
                        friendId : data.id,
                        relation : true,
                        relationStatus : data.data.status,
                        actionId : data.data.action_uid
                    })
                }
            }
        }
        catch(err){
            console.log(err)
        }
    }
}

const sendRequest = async (friendStatus,changeStatus) =>{
    try{
        const response = await fetch(config.url+'/friendship/friendRequest/'+userId+'/'+friendStatus.friendId)
        let data = await response.json()
        if(data.status){
            changeStatus({
                ...friendStatus,
                relation : true,
                relationStatus : '0'
            })
        }
    }
    catch(err){
        console.log(err)
    }
}

const acceptRequest = async (friendStatus,changeStatus) =>{
    try{
        const response = await fetch(config.url+'/friendship/friendAccept/'+userId+'/'+friendStatus.friendId)
        let data = await response.json()
        if(data.status){
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

const rejectRequest = async (friendStatus,changeStatus) =>{
    try{
        const response = await fetch(config.url+'/friendship/friendReject/'+userId+'/'+friendStatus.friendId)
        let data = await response.json()
        if(data.status){
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

export { handleChange, rejectRequest, sendRequest, acceptRequest, getFromStorage, searchFriends }
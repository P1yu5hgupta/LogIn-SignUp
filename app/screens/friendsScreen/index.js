import React , { useState ,useEffect } from 'react'
import { View , Text, StyleSheet, ActivityIndicator,Image } from 'react-native'
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler'
import { FontAwesome } from '@expo/vector-icons'; 
import { AntDesign } from '@expo/vector-icons'; 
import AsyncStorage from '@react-native-async-storage/async-storage'
import config from '../../utils/config'
import styles from './styles'

const searchFriends = ({route,navigation}) =>{

    const [userName, updateName] = useState({
        value : '',
        errMsg : ''
    })
    
    let user,userEmail,userId;
    const getFromStorage = async () => {
        userEmail = await AsyncStorage.getItem('@userEmail')
        user = await AsyncStorage.getItem('@userName')
        userId = 3
    }

    const [friendStatus,changeStatus] = useState({
        requested : false,
        status : false,
        friendId : '',
        friendEmail : '',
        friendName : '',
        relation : false,
        relationStatus : '',
        actionId : userId
    })

    useEffect(()=>{
        getFromStorage()
    },[])
    const isValidFields = () =>{
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

    const searchFriends = async ()=>{
        if(isValidFields()){
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

    const sendRequest = async () =>{
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
    
    const acceptRequest = async () =>{
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
    
    const rejectRequest = async () =>{
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

    const handleChange = (text) =>{
        updateName({
            value : text,
            errMsg : ''
        })
        changeStatus({
            ...friendStatus,
            requested : false
        })
    }
    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={()=>navigation.goBack()}>
                <AntDesign name="back" size={24} color="black" style={styles.backButton}/>
            </TouchableOpacity>
            <Text style={styles.text}>
                Search for friends
            </Text>
            <View style={styles.searchBar}>
                <TextInput
                    style = {styles.inputBox}
                    placeholder = "Email/Mobile"
                    onChangeText = {(text) => handleChange(text)}
                />
                <TouchableOpacity onPress={()=>searchFriends()}>
                    <FontAwesome name="search" size={24} color="gray" />
                </TouchableOpacity>
            </View>
            <Text style={styles.errorMsg}>
                {userName.errMsg}
            </Text>
            {
                friendStatus.requested && !friendStatus.status && 
                <Text style={{...styles.text,alignSelf:'center'}}>
                    No User Found
                </Text>
            }
            {
                friendStatus.requested && friendStatus.status && 
                <View style = {styles.friendView}>
                    <Image
                        source = {require('../../assests/images/shared/default_profile.png')}
                        style = {styles.image}
                    />
                    <View style={styles.friendDetails}>
                        <Text style = {{fontSize : 20,fontWeight : 'bold',textTransform : 'uppercase', color : 'white'}}>
                            {friendStatus.friendName}
                        </Text>
                        <Text style = {{fontSize : 15, marginLeft : 10,color : '#1E0A6E'}}>
                            {friendStatus.friendEmail}
                        </Text>
                        <View style = {{alignSelf : 'flex-end'}}>
                            {
                                !friendStatus.relation && 
                                <View>
                                    <TouchableOpacity onPress={() => sendRequest()}>
                                        <Text style = {styles.button}>
                                            Send Request
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            }
                            {
                                friendStatus.relation && friendStatus.relationStatus=='0' && friendStatus.actionId == userId && 
                                <Text style = {styles.button}>
                                    Requested
                                </Text>
                            }
                            {
                                friendStatus.relation && friendStatus.relationStatus=='0' && friendStatus.actionId != userId && 
                                <View style={{flexDirection : 'row'}}>
                                    <TouchableOpacity onPress={() => acceptRequest()}>
                                        <Text style = {styles.button}>
                                            Accept
                                        </Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => rejectRequest()}>
                                        <Text style = {styles.button}>
                                            Reject
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            }
                            {
                                friendStatus.relation && friendStatus.relationStatus=='1' &&
                                <Text style = {styles.button}>
                                    Friends
                                </Text>
                            }
                            {
                                friendStatus.relation && friendStatus.relationStatus=='2' &&
                                <Text style = {styles.button}>
                                    Blocked
                                </Text>
                            }
                        </View>
                    </View>
                </View>
            }
        </View>
    )
}

export default searchFriends
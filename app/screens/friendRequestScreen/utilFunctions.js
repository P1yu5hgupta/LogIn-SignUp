import React from 'react'
import { View , Text,Image } from 'react-native'
import config from '../../utils/config'
import styles from './styles'
import { TouchableOpacity } from 'react-native-gesture-handler';
import { getAllFriendRequest } from '../../apiCalls/postsApi'

const getFriendsData = async (userId, changeRequestData) =>{
    try {
        const data = await getAllFriendRequest(userId)
        if(data.success) {
            if(data.data !== "")
                changeRequestData(data.data)
        }
        else{
            console.log(data.error)
        }
    }
    catch(err) {
        console.log(err)
    }
}

const renderView = (item,userId) => {
    return (
        <View style = {styles.friendView}>
            <Image
                source = {require('../../assests/images/shared/default_profile.png')}
                style = {styles.image}
            />
            <View style={styles.friendDetails}>
                <Text style = {{fontSize : 20,fontWeight : 'bold',textTransform : 'uppercase', color : 'white'}}>
                    {item.name}
                </Text>
                <Text style = {{fontSize : 15, marginLeft : 10,color : '#1E0A6E'}}>
                    {item.email}
                </Text>
                <View style = {{alignSelf : 'flex-end'}}>
                    <View style={{flexDirection : 'row'}}>
                        <TouchableOpacity onPress={() => acceptRequest(userId,item.id)}>
                            <Text style = {styles.button}>
                                Accept
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => rejectRequest(userId,item.id)}>
                            <Text style = {styles.button}>
                                Reject
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    )
}

const renderEmptyListComponent = () => {
    return (
        <Text style={{...styles.text,alignSelf:'center'}}>
            No Friend Requests
        </Text>
    )
}
const seperatorLine = ()=>{
    return (
        <View 
            style ={styles.baseline}
        />
    );
}

const renderHeader = () =>{
    return (
        <View style={styles.header}>
            <Text style={{color : 'white',fontSize : 15,fontWeight: 'bold'}}>Friend Requests</Text>
        </View>
    );
}

// Handling function which is called after user click on accept friend request
const acceptRequest = async (userId,friendId) =>{
    try{
        const response = await fetch(config.url+'/friendship/friendAccept/'+userId+'/'+friendId)
        let data = await response.json()
        if(!data.success){
            console.log(data.error)
        }
        else{
            getFriendsData()
        }
    }
    catch(err){
        console.log(err)
    }
}

// Handling function which is called after user click on reject friend request
const rejectRequest = async (userData,friendId) =>{
    try{
        const response = await fetch(config.url+'/friendship/friendReject/'+userData.userId+'/'+friendId)
        let data = await response.json()
        if(data.success){
            console.log(data.error)
        }
        else{
            getFriendsData()
        }
    }
    catch(err){
        console.log(err)
    }
}
export {
    seperatorLine,
    renderHeader,
    getFriendsData,
    renderView,
    renderEmptyListComponent
}
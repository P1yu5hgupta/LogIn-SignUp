import React , { useState ,useEffect } from 'react'
import { View , Text, StyleSheet, ActivityIndicator,Image } from 'react-native'
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler'
import { FontAwesome } from '@expo/vector-icons'; 
import { AntDesign } from '@expo/vector-icons'; 
import styles from './styles'
import { handleChange, rejectRequest, sendRequest, acceptRequest, getFromStorage, searchFriends } from './utilFunctions'

const searchFriendsScreen = ({navigation}) =>{

    const [userName, updateName] = useState({
        value : '',
        errMsg : ''
    })
    
    let user,userEmail,userId
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
        user,userEmail,userId = getFromStorage()
    },[])
    
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
                    onChangeText = {(text) => handleChange(updateName,text,changeStatus,friendStatus)}
                />
                <TouchableOpacity onPress={()=>searchFriends(userName,updateName, friendStatus, changeStatus)}>
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
                                    <TouchableOpacity onPress={() => sendRequest(friendStatus,changeStatus)}>
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
                                    <TouchableOpacity onPress={() => acceptRequest(friendStatus,changeStatus)}>
                                        <Text style = {styles.button}>
                                            Accept
                                        </Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => rejectRequest(friendStatus,changeStatus)}>
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

export default searchFriendsScreen
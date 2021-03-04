import React , { useState ,useEffect } from 'react'
import { TextInput, TouchableOpacity, View , Text, Image } from 'react-native'
import { AntDesign,FontAwesome } from '@expo/vector-icons';  
import styles from './styles'
import { useSelector } from 'react-redux'
import { 
    handleChange, 
    rejectRequest, 
    sendRequest, 
    acceptRequest, 
    searchFriends 
} from './utilFunctions'

const searchFriendsScreen = ({navigation}) =>{

    const [friendName, updateName] = useState({
        value : '',
        errMsg : ''
    })

    const [friendStatus,changeStatus] = useState({
        requested : false,
        status : false,
        friendId : '',
        friendEmail : '',
        friendName : '',
        relation : false,
        relationStatus : '',
        actionId : undefined
    })
    
    const userData = useSelector(state => state.userData)

    useEffect(() => {
        if(userData.userId === undefined)
            navigation.navigate('Home')
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
                <TouchableOpacity onPress={()=>searchFriends(userData,friendName,updateName, friendStatus, changeStatus)}>
                    <FontAwesome name="search" size={24} color="gray" />
                </TouchableOpacity>
            </View>
            <Text style={styles.errorMsg}>
                {friendName.errMsg}
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
                                    <TouchableOpacity onPress={() => sendRequest(userData,friendStatus,changeStatus)}>
                                        <Text style = {styles.button}>
                                            Send Request
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            }
                            {
                                friendStatus.relation && friendStatus.relationStatus=='0' && friendStatus.actionId == userData.userId && 
                                <Text style = {styles.button}>
                                    Requested
                                </Text>
                            }
                            {
                                friendStatus.relation && friendStatus.relationStatus=='0' && friendStatus.actionId != userData.userId && 
                                <View style={{flexDirection : 'row'}}>
                                    <TouchableOpacity onPress={() => acceptRequest(userData,friendStatus,changeStatus)}>
                                        <Text style = {styles.button}>
                                            Accept
                                        </Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => rejectRequest(userData,friendStatus,changeStatus)}>
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
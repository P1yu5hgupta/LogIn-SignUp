import React , { useState ,useEffect, isValidElement } from 'react'
import { View , Text, StyleSheet,Image, FlatList, ActivityIndicator } from 'react-native'
import { AntDesign } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons'; 
import { EvilIcons } from '@expo/vector-icons'; 
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import { FontAwesome } from '@expo/vector-icons'; 
import AsyncStorage from '@react-native-async-storage/async-storage'
import config from '../../utils/config'
import styles from './styles'

export default userList = ({route,navigation}) =>{

    // defining states
    const [state,changeState] = useState({comments : [], isLoading : false, page: 1,moreAvailable : true })
    const [commentText,updateComment] = useState('')

    let userName,userEmail,userId;
    const getFromStorage = async () => {
        userEmail = await AsyncStorage.getItem('@userEmail')
        userName = await AsyncStorage.getItem('@userName')
        userId = 3
    }

    // http request to fetch user list
    const getComment = async () =>{
        try{
            const response = await fetch(config.url+'/comments/tweets/'+route.params.tweetId+'/'+state.page);
            let res = await response.json()
            res=res.map(item => (
                {...item,liked : false}
            ))
            if(res.length<10){
                changeState(prevState => ({
                    ... state,
                    comments : prevState.page==1?  res : [...prevState.comments,...res],
                    isLoading : false,
                    moreAvailable : false
                }))
            }                
            else{
                changeState(prevState => ({
                    ... state,
                    comments : prevState.page==1?  res : [...prevState.comments,...res], 
                    isLoading: false,
                }))
            }
        }
        catch(err){
            console.log(err)
        }
    }

    // Event Handlers
    useEffect(()=>{
        getFromStorage()
    },[])
    useEffect(()=>{
        getComment()
    },[state.page])
    
    const handleLoad = ()=>{
        if(state.moreAvailable)
            changeState({...state, page: state.page+1})
    }
    const handleRefresh = ()=>{
        changeState({...state, page: 1,moreAvailable : true})
    }

    const isValidComment = () => {
        if(commentText.length===0)
            return false
        return true
    }
    const sendComment = async () =>{
        if(isValidComment()){
            try{
                const response = await fetch(config.url+'/comments/create',{
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        tid : route.params.tweetId,
                        uid : userId,
                        comment : commentText,
                    })
                })
                let data = await response.json()
                if(data.id!=undefined){
                    updateComment('');
                    getComment()
                }
            }
            catch(err){
                console.log(err)
            }
        }
    }
    // Rendering Views
    const renderView = ({item}) =>{
        return (
            <View style = {styles.listItem}>
                <View style={{flex: 10}}>
                    <Text style = {styles.commentName}>
                       {item.user.name}
                    </Text>
                    <Text style = {styles.comment}>
                        {item.comment}
                    </Text>
                </View>
                <AntDesign 
                    style = {{alignSelf : 'flex-end'}}
                    name={item.liked ? 'heart':'hearto'} 
                    size= {15} 
                    hitSlop={{top: 20, bottom: 20, left: 20, right: 20}}
                    onPress = {()=>{
                        changeState(prevState =>({
                            ...prevState,
                            comments : prevState.comments.map(userObj =>(
                                userObj.id === item.id ?
                                {
                                    ...userObj,
                                    liked : !item.liked
                                } : userObj
                            ))
                        }))
                    }}
                />
            </View>
        );
    }

    const seperatorLine = ()=>{
        return (
            <View 
                style ={styles.baseline}
            />
        );
    }
    const renderFooter = () =>{
        return (
            <TouchableOpacity style={styles.container,{marginBottom:20}} onPress = {()=>handleLoad()}>
                <Text style={styles.moreComments} >View More comments</Text>
            </TouchableOpacity>
        );
    }
    const renderFinished = () =>{
        return (
            <View style={styles.container,{marginBottom:20}}>
                <Ionicons style = {{alignSelf:'center'}} name="checkmark-done-circle-outline" size={44} color="white" />
                <Text style={{fontWeight: 'bold',alignSelf:'center',color : 'white'}}>No further comments</Text>
            </View>
        );
    }
    return (
        <View style={styles.container}>
            <View style = {styles.upperSection}>
                <AntDesign name="back" size={24} color="black" onPress = {()=>navigation.goBack()}/>
                <View style={styles.tweetSection}>
                    <Image source={require('../../assests/images/shared/default_profile.png')} style={styles.image}/>
                    <View style={styles.tweetInfo}>
                        <Text style={styles.tweetName}>
                            {route.params.name}
                        </Text>
                        <Text style={styles.tweetTime}>
                            Tweeted On : {route.params.createdAt.substring(0,10)} at {route.params.createdAt.substring(11,16)}
                        </Text>
                        <Text style={styles.tweet}>
                            {route.params.tweet}
                        </Text>
                    </View>
                </View>
                <View style={styles.actionTab}>
                        <View>
                        <AntDesign 
                            name={route.params.liked ? 'like1':'like2'} 
                            size= {20} 
                            hitSlop={{top: 20, bottom: 20, left: 20, right: 20}}
                        />
                        </View>
                        <View>
                            <EvilIcons name="share-google" size={24} color="black" />
                        </View>
                    </View>
            </View>
            <View style={styles.commentSection}>
                <FlatList
                    data = {state.comments}
                    renderItem = {renderView}
                    keyExtractor ={ item => item.id.toString()}
                    ItemSeparatorComponent = {seperatorLine}
                    ListFooterComponent = {state.moreAvailable?renderFooter : renderFinished}
                    onRefresh = {handleRefresh}
                    refreshing = {state.isLoading}
                />
            </View>
            <View style={styles.addComment}>
                <TextInput 
                    placeholder = 'Add Comment'
                    placeholderTextColor = 'gray'
                    style= {styles.inputBox}
                    onChangeText = {(text)=>updateComment(text)}
                    value = {commentText}
                />
                <FontAwesome name="send" size={24} color="black" onPress = {()=>sendComment()}/>
            </View>
        </View>
    )
}


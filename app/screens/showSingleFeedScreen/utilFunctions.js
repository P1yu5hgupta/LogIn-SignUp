import React from 'react'
import { View , Text,TouchableOpacity } from 'react-native'
import { Ionicons,AntDesign } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage'
import config from '../../utils/config'
import styles from './styles'

let userEmail, userName, userId
const getFromStorage = async () => {
    userEmail = await AsyncStorage.getItem('@userEmail')
    userName = await AsyncStorage.getItem('@userName')
    userId = 3
    return { userEmail, userName, userId }
}

// http request to fetch user list
const getComment = async (route,state,changeState) =>{
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

const handleLoad = (state,changeState)=>{
    if(state.moreAvailable)
        changeState({...state, page: state.page+1})
}
const handleRefresh = (state,changeState)=>{
    changeState({...state, page: 1,moreAvailable : true})
}

const isValidComment = (commentText) => {
    if(commentText.length===0)
        return false
    return true
}
const sendComment = async (route,commentText,updateComment,state,changeState) =>{
    if(isValidComment(commentText)){
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
                getComment(state,changeState)
            }
        }
        catch(err){
            console.log(err)
        }
    }
}
// Rendering Views
const renderView = (item,state,changeState) =>{
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
const renderFooter = (state,changeState) =>{
    return (
        <TouchableOpacity style={styles.container,{marginBottom:20}} onPress = {()=>handleLoad(state,changeState)}>
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

export {
    getFromStorage,
    getComment,
    handleLoad,
    handleRefresh,
    sendComment,
    renderView,
    seperatorLine,
    renderFinished,
    renderFooter
}
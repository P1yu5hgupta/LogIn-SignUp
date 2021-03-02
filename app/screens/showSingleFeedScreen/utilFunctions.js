import React from 'react'
import { View , Text,TouchableOpacity } from 'react-native'
import { Ionicons,AntDesign } from '@expo/vector-icons';
import config from '../../utils/config'
import styles from './styles'
import { sendCommentApi,likeComment } from '../../apiCalls/postsApi'

// http request to fetch user list
const getComment = async (route,state,changeState) =>{
    try{
        let res = await fetch(config.url+'/comments/tweets/tweetid/'+route.params.tweetId+'/userid/'+route.params.userId+'/'+state.page);
        res = await res.json()
        console.log(res)
        if(res.success){
            res=res.data
            res.map((item) => {
                item.totalReactCount = item.commentLikesCount.likeTypeLikeCount + 
                                        item.commentLikesCount.likeTypeLoveCount +
                                        item.commentLikesCount.likeTypeHappyCount +
                                        item.commentLikesCount.likeTypeSadCount +
                                        item.commentLikesCount.likeTypeCuriousCount
            })
            if(res.length<5){
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
const sendComment = async (route,userData,commentText,updateComment,state,changeState) =>{
    if(isValidComment(commentText)){
        try{
            const data = await sendCommentApi(route,userData,commentText)
            if(data.success){
                updateComment('')
                getComment(route,state,changeState)
            }
        }
        catch(err){
            console.log(err)
        }
    }
}

// Rendering Views
const renderView = (userData,item,changeState) =>{
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
            <View style = {{flexDirection : 'column'}}>
                <AntDesign 
                    style = {{alignSelf : 'flex-end'}}
                    name={item.isCommentLikedByMe ? 'heart':'hearto'} 
                    size= {15} 
                    hitSlop={{top: 20, bottom: 20, left: 20, right: 20}}
                    onPress = {()=> likeComment(userData,changeState,item) }
                />
                <Text style = {{alignSelf : 'center'}}>{item.totalReactCount}</Text>
            </View>
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
    getComment,
    handleLoad,
    handleRefresh,
    sendComment,
    renderView,
    seperatorLine,
    renderFinished,
    renderFooter
}
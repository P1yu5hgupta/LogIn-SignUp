import React from 'react'
import { View , Text,Image, ActivityIndicator, BackHandler, Alert } from 'react-native'
import { EvilIcons, Ionicons,AntDesign } from '@expo/vector-icons';
import config from '../../utils/config'
import styles from './styles'
import { likeTweet } from '../../apiCalls/postsApi'
import  { useSelector } from 'react-redux'

// http request to fetch user list
const getData = async (userData,state,changeState) =>{
    try{
        const response = await fetch(config.url+'/friendship/getTweets/'+userData.userId+'/'+state.page)
        let res = await response.json()
        if(res.success){
            res=res.data
            res.map((item) => {
                item.totalReactCount = item.tweetLikesCount.likeTypeLikeCount + 
                                        item.tweetLikesCount.likeTypeLoveCount +
                                        item.tweetLikesCount.likeTypeHappyCount +
                                        item.tweetLikesCount.likeTypeSadCount +
                                        item.tweetLikesCount.likeTypeCuriousCount
            })
            if(res.length<10){
                changeState(prevState => ({
                    ... state,
                    data : prevState.page==1?  res : [...prevState.data,...res],
                    isLoading : false,
                    moreAvailable : false
                }))
            }
            else{
                changeState(prevState => ({
                    ... state,
                    data : prevState.page==1?  res : [...prevState.data,...res], 
                    isLoading: false,
                }))
            }
        }
        else {
            console.log(res.error)
        }
    }
    catch(err){
        console.log(err)
    }
}

const backButtonPressed = (dispatch,navigation) =>{
    Alert.alert('Heyy!!','Are you Sure??',[
        {
            text : 'Cancel',
        },
        {
            text : 'Log Out',onPress : () => {
                dispatch({
                    type : 'LOGGED_OUT',
                    payload : {}
                })
                navigation.navigate('Home')
            }
        }
    ])
    return true;
}

const handleLoad = (state,changeState)=>{
    if(state.moreAvailable)
        changeState({...state, page: state.page+1})
}
const handleRefresh = (state,changeState)=>{
    changeState({...state, page: 1,moreAvailable : true})
}


// Rendering Views
const renderView = (userData,item,changeState,navigation) => {
    return (
        <View style = {styles.listItem}>
            <Image
                source = {require('../../assests/images/shared/default_profile.png')}
                style = {styles.image}
            />
            <View style = {styles.userInfo}>
                <Text style = {styles.userName}>{item.user.name}</Text>
                <Text style={styles.time}>Tweeted On : {item.createdAt.substring(0,10)} at {item.createdAt.substring(11,16)}</Text>
                <Text style={styles.tweet}>{item.tweet}</Text>
                <View style={styles.actionTab}>
                    <View style = {{flexDirection : 'column'}}>
                    <AntDesign 
                        name={item.isTweetLikedByMe? 'like1':'like2'}
                        size= {20} 
                        hitSlop={{top: 20, bottom: 20, left: 20, right: 20}}
                        onPress = {() => {likeTweet(userData,changeState,item)}}
                        onLongPress = {() => {reactOnTweet(userData,changeState,item)}}
                    />
                    <Text style = {{alignSelf : 'center'}}>{item.totalReactCount}</Text>
                    </View>
                    <View>
                        <EvilIcons name="comment" size={24} color="black" 
                            onPress = {()=>{
                                navigation.navigate('SingleTweet',{
                                    tweetId : item.id,
                                    tweet : item.tweet,
                                    createdAt : item.createdAt,
                                    name : item.user.name,
                                    isTweetLikedByMe : item.isTweetLikedByMe,
                                    likesCount : item.totalReactCount,
                                    userId: userData.userId
                                })
                            }}
                        />
                    </View>
                    <View>
                        <EvilIcons name="share-google" size={24} color="black" />
                    </View>
                </View>
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
const renderHeader = () =>{
    return (
        <View style={styles.header}>
            <Text style={{color : 'white',fontSize : 25,fontWeight: 'bold'}}>Twitter</Text>
        </View>
    );
}
const renderFooter = () =>{
    return (
        <View style={styles.container,{marginBottom:20}}>
            <ActivityIndicator size="large" color="black" />
        </View>
    );
}
const renderFinished = () =>{
    return (
        <View style={styles.container,{marginBottom:20}}>
            <Ionicons style = {{alignSelf:'center'}} name="checkmark-done-circle-outline" size={44} color="black" />
            <Text style={{fontWeight: 'bold',alignSelf:'center'}}>All Done</Text>
        </View>
    );
}

export {
    getData, 
    backButtonPressed, 
    handleLoad, 
    handleRefresh, 
    renderView, 
    seperatorLine, 
    renderHeader, 
    renderFooter, 
    renderFinished 
}
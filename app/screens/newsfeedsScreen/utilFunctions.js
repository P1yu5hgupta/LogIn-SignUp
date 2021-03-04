import React from 'react'
import { View , Text,Image, ActivityIndicator, Alert, Dimensions } from 'react-native'
import { EvilIcons, Ionicons } from '@expo/vector-icons';
import config from '../../utils/config'
import styles from './styles'
import { likeTweet, reactOnTweet } from '../../apiCalls/postsApi'
import Modal from 'react-native-modal'
import { TouchableOpacity } from 'react-native-gesture-handler';

// http request to fetch user list
const getData = async (userData,state,changeState,dispatch) =>{
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
                item.modalView = false
            })
            if(state.page==1){
                dispatch({
                    type : 'TWEETS_FETCHED',
                    payload : {
                        data : res
                    }
                })
            }
            if(res.length<10){
                changeState(prevState => ({
                    ...state,
                    data : prevState.page==1?  res : [...prevState.data,...res],
                    isLoading : false,
                    moreAvailable : false,
                    skeleton :false
                }))
            }
            else{
                changeState(prevState => ({
                    ...state,
                    data : prevState.page==1?  res : [...prevState.data,...res], 
                    isLoading: false,
                    skeleton : false
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

const changeModalVisibility = (item,changeState) => {
    changeState(prevState =>({
        ...prevState,
        data : prevState.data.map(userObj =>{
            if(userObj.id === item.id){
                return ({
                    ...userObj,
                    modalView : true
                })
            } 
            else{
                return  ({
                    ...userObj,
                    modalView : false
                })
            }
        })
    }))
}

const modalDisapper = (item, changeState) => {
    changeState(prevState =>({
        ...prevState,
        data : prevState.data.map(userObj =>{
            return  ({
                ...userObj,
                modalView : false
            })
        })
    }))
}




// Rendering Views
const renderView = (userData,item,changeState,navigation) => {
    const reactionType = {
        like : "heart-sharp",
        love : "heart-circle-outline",
        happy : 'ios-happy-outline',
        sad : 'sad-outline',
        curious : 'bulb-outline',
    }
    return (
        <>
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
                        <TouchableOpacity
                            onPress = {() => {likeTweet(userData,changeState,item,'like')}}
                            onLongPress = {() => changeModalVisibility(item, changeState)}
                            delayLongPress = {200}>
                                <Ionicons 
                                    name={item.isTweetLikedByMe? reactionType[item.likeType] : 'heart-outline'}
                                    size= {20}
                                    hitSlop={{top: 20, bottom: 20, left: 20, right: 20}}
                                />
                        </TouchableOpacity>
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
                <Modal isVisible={item.modalView}
                    onBackdropPress = {() => modalDisapper(item,changeState)}
                    backdropOpacity = {0.2}
                    deviceHeight = {Dimensions.get('screen').height}
                    deviceWidth = {Dimensions.get('screen').width}
                    coverScreen = {false}
                    animationIn = 'fadeInLeft'
                    animationOut = 'fadeOutRight'
                    animationInTiming = {400}>
                        <View style={styles.modalComponent}>
                            {
                                Object.keys(reactionType).map((reaction) => {
                                    return (
                                        <Ionicons 
                                            key = {reaction}
                                            name={reactionType[reaction]} 
                                            size={30} 
                                            color="black" 
                                            onPress={() => reactOnTweet(userData,changeState,item,reaction)}
                                        />
                                    )
                                })
                            }
                        </View>
                </Modal>
            </View>
        </>
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
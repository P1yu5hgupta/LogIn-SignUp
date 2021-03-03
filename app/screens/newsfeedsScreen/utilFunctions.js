import React from 'react'
import { View , Text,Image, ActivityIndicator, Alert, Dimensions } from 'react-native'
import { EvilIcons, Ionicons,AntDesign } from '@expo/vector-icons';
import config from '../../utils/config'
import styles from './styles'
import { likeTweet } from '../../apiCalls/postsApi'
import Modal from 'react-native-modal'
import Emoji from 'react-native-emoji';

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
                item.modalView = false
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
    const reactionType = [
        {
            name : 'like-outline',
            type : 'like'
        },
        {
            name : "heart-circle-outline",
            type : 'love'
        },
        {
            name : 'ios-happy-outline',
            type : 'happy'
        },
        {
            name : 'sad-outline',
            type : 'sad'
        },
        {
            name : 'bulb-outline',
            type : 'curious'
        },
    ]
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
                        <AntDesign 
                            name={item.isTweetLikedByMe? 'like1':'like2'}
                            size= {20}
                            hitSlop={{top: 20, bottom: 20, left: 20, right: 20}}
                            onPress = {() => {likeTweet(userData,changeState,item,'like')}}
                            onLongPress = {() => changeModalVisibility(item, changeState)}
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
                <Modal isVisible={item.modalView}
                    onBackdropPress = {() => modalDisapper(item,changeState)}
                    backdropOpacity = {0.2}
                    deviceHeight = {Dimensions.get('screen').height}
                    deviceWidth = {Dimensions.get('screen').width}
                    coverScreen = {false}
                    animationIn = 'fadeInLeft'
                    animationOut = 'fadeOutRight'
                >
                    <View style={styles.modalComponent}>
                        {
                            reactionType.map((reaction) => {
                                return (
                                    <Ionicons 
                                        key = {reaction.type}
                                        name={reaction.name} 
                                        size={30} 
                                        color="black" 
                                        onPress={() => likeTweet(userData,changeState,item,reaction.type)}
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

const fakeData = [
     {
      "createdAt": "2021-03-02T08:54:47.729Z",
      "id": 67,
      "isTweetLikedByMe": false,
      "likes":  [],
      "totalReactCount": 0,
      "tweet": "Hello guys, I am user 4.",
      "tweetLikesCount":  {
        "likeTypeCuriousCount": 0,
        "likeTypeHappyCount": 0,
        "likeTypeLikeCount": 0,
        "likeTypeLoveCount": 0,
        "likeTypeSadCount": 0,
      },
      "uid": 4,
      "user":  {
        "id": 4,
        "name": "UserFour Name",
      },
    },
     {
      "createdAt": "2021-02-25T15:39:38.844Z",
      "id": 57,
      "isTweetLikedByMe": true,
      "likeType": "like",
      "likes":  [
         {
          "createdAt": "2021-03-02T11:35:57.594Z",
          "entity_id": 57,
          "entity_type": "tweet",
          "id": 57,
          "like_type": "like",
          "updatedAt": "2021-03-02T11:35:57.594Z",
          "user_id": 24,
        },
      ],
      "totalReactCount": 1,
      "tweet": "Thanks tweet update",
      "tweetLikesCount":  {
        "likeTypeCuriousCount": 0,
        "likeTypeHappyCount": 0,
        "likeTypeLikeCount": 1,
        "likeTypeLoveCount": 0,
        "likeTypeSadCount": 0,
      },
      "uid": 1,
      "user":  {
        "id": 1,
        "name": "UserOne Name",
      },
    },
     {
      "createdAt": "2021-02-24T11:49:01.704Z",
      "id": 54,
      "isTweetLikedByMe": false,
      "likes":  [
         {
          "createdAt": "2021-03-02T10:18:16.230Z",
          "entity_id": 54,
          "entity_type": "tweet",
          "id": 30,
          "like_type": "curious",
          "updatedAt": "2021-03-02T10:18:16.230Z",
          "user_id": 7,
        },
      ],
      "totalReactCount": 1,
      "tweet": "Thanks for the tweet",
      "tweetLikesCount":  {
        "likeTypeCuriousCount": 1,
        "likeTypeHappyCount": 0,
        "likeTypeLikeCount": 0,
        "likeTypeLoveCount": 0,
        "likeTypeSadCount": 0,
      },
      "uid": 2,
      "user":  {
        "id": 2,
        "name": "user2",
      },
    },
     {
      "createdAt": "2021-02-24T11:48:38.762Z",
      "id": 53,
      "isTweetLikedByMe": true,
      "likeType": "like",
      "likes":  [
         {
          "createdAt": "2021-03-02T10:56:13.022Z",
          "entity_id": 53,
          "entity_type": "tweet",
          "id": 35,
          "like_type": "like",
          "updatedAt": "2021-03-02T10:56:13.022Z",
          "user_id": 24,
        },
      ],
      "totalReactCount": 1,
      "tweet": "USER 2 welcome tweet",
      "tweetLikesCount":  {
        "likeTypeCuriousCount": 0,
        "likeTypeHappyCount": 0,
        "likeTypeLikeCount": 1,
        "likeTypeLoveCount": 0,
        "likeTypeSadCount": 0,
      },
      "uid": 2,
      "user":  {
        "id": 2,
        "name": "user2",
      },
    },
     {
      "createdAt": "2021-02-23T08:34:36.572Z",
      "id": 15,
      "isTweetLikedByMe": true,
      "likeType": "like",
      "likes":  [
         {
          "createdAt": "2021-03-02T10:56:15.187Z",
          "entity_id": 15,
          "entity_type": "tweet",
          "id": 36,
          "like_type": "like",
          "updatedAt": "2021-03-02T10:56:15.187Z",
          "user_id": 24,
        },
      ],
      "totalReactCount": 1,
      "tweet": "USER 1 This tweet of user 3 hdochwo oj odhod oejdo odh odo odhd odheo9i09i0 e odoij",
      "tweetLikesCount":  {
        "likeTypeCuriousCount": 0,
        "likeTypeHappyCount": 0,
        "likeTypeLikeCount": 1,
        "likeTypeLoveCount": 0,
        "likeTypeSadCount": 0,
      },
      "uid": 1,
      "user":  {
        "id": 1,
        "name": "UserOne Name",
      },
    },
     {
      "createdAt": "2021-02-22T05:30:32.270Z",
      "id": 7,
      "isTweetLikedByMe": true,
      "likeType": "like",
      "likes":  [
         {
          "createdAt": "2021-03-02T09:12:55.632Z",
          "entity_id": 7,
          "entity_type": "tweet",
          "id": 12,
          "like_type": "like",
          "updatedAt": "2021-03-02T09:12:55.632Z",
          "user_id": 24,
        },
         {
          "createdAt": "2021-03-02T10:56:24.167Z",
          "entity_id": 7,
          "entity_type": "tweet",
          "id": 38,
          "like_type": "like",
          "updatedAt": "2021-03-02T10:56:24.167Z",
          "user_id": 24,
        },
      ],
      "totalReactCount": 2,
      "tweet": "Thanks for this",
      "tweetLikesCount":  {
        "likeTypeCuriousCount": 0,
        "likeTypeHappyCount": 0,
        "likeTypeLikeCount": 2,
        "likeTypeLoveCount": 0,
        "likeTypeSadCount": 0,
      },
      "uid": 1,
      "user":  {
        "id": 1,
        "name": "UserOne Name",
      },
    },
     {
      "createdAt": "2021-02-22T05:30:12.074Z",
      "id": 5,
      "isTweetLikedByMe": true,
      "likeType": "like",
      "likes":  [
         {
          "createdAt": "2021-03-02T10:56:37.193Z",
          "entity_id": 5,
          "entity_type": "tweet",
          "id": 41,
          "like_type": "like",
          "updatedAt": "2021-03-02T10:56:37.193Z",
          "user_id": 24,
        },
         {
          "createdAt": "2021-03-02T10:56:21.839Z",
          "entity_id": 5,
          "entity_type": "tweet",
          "id": 37,
          "like_type": "like",
          "updatedAt": "2021-03-02T10:56:21.839Z",
          "user_id": 24,
        },
         {
          "createdAt": "2021-03-02T10:59:07.910Z",
          "entity_id": 5,
          "entity_type": "tweet",
          "id": 46,
          "like_type": "like",
          "updatedAt": "2021-03-02T10:59:07.910Z",
          "user_id": 24,
        },
      ],
      "totalReactCount": 3,
      "tweet": "This is my tweet",
      "tweetLikesCount":  {
        "likeTypeCuriousCount": 0,
        "likeTypeHappyCount": 0,
        "likeTypeLikeCount": 3,
        "likeTypeLoveCount": 0,
        "likeTypeSadCount": 0,
      },
      "uid": 2,
      "user":  {
        "id": 2,
        "name": "user2",
      },
    },
     {
      "createdAt": "2021-02-22T05:29:57.161Z",
      "id": 4,
      "isTweetLikedByMe": true,
      "likeType": "like",
      "likes":  [
         {
          "createdAt": "2021-03-03T05:48:26.211Z",
          "entity_id": 4,
          "entity_type": "tweet",
          "id": 68,
          "like_type": "like",
          "updatedAt": "2021-03-03T05:48:26.211Z",
          "user_id": 24,
        },
      ],
      "totalReactCount": 1,
      "tweet": "This is hello tweet",
      "tweetLikesCount":  {
        "likeTypeCuriousCount": 0,
        "likeTypeHappyCount": 0,
        "likeTypeLikeCount": 1,
        "likeTypeLoveCount": 0,
        "likeTypeSadCount": 0,
      },
      "uid": 1,
      "user":  {
        "id": 1,
        "name": "UserOne Name",
      },
    },
     {
      "createdAt": "2021-02-22T05:28:04.574Z",
      "id": 3,
      "isTweetLikedByMe": true,
      "likeType": "like",
      "likes":  [
         {
          "createdAt": "2021-03-03T05:48:56.709Z",
          "entity_id": 3,
          "entity_type": "tweet",
          "id": 70,
          "like_type": "like",
          "updatedAt": "2021-03-03T05:48:56.709Z",
          "user_id": 24,
        },
      ],
      "totalReactCount": 1,
      "tweet": "This is my tweet's tweet",
      "tweetLikesCount":  {
        "likeTypeCuriousCount": 0,
        "likeTypeHappyCount": 0,
        "likeTypeLikeCount": 1,
        "likeTypeLoveCount": 0,
        "likeTypeSadCount": 0,
      },
      "uid": 1,
      "user":  {
        "id": 1,
        "name": "UserOne Name",
      },
    },
     {
      "createdAt": "2021-02-22T04:29:02.357Z",
      "id": 1,
      "isTweetLikedByMe": true,
      "likeType": "like",
      "likes":  [
         {
          "createdAt": "2021-03-02T10:58:59.851Z",
          "entity_id": 1,
          "entity_type": "tweet",
          "id": 44,
          "like_type": "like",
          "updatedAt": "2021-03-02T10:58:59.851Z",
          "user_id": 24,
        },
         {
          "createdAt": "2021-03-02T08:50:14.321Z",
          "entity_id": 1,
          "entity_type": "tweet",
          "id": 11,
          "like_type": "like",
          "updatedAt": "2021-03-02T08:50:14.321Z",
          "user_id": 24,
        },
      ],
      "totalReactCount": 2,
      "tweet": "Thanks for your tweet update",
      "tweetLikesCount":  {
        "likeTypeCuriousCount": 0,
        "likeTypeHappyCount": 0,
        "likeTypeLikeCount": 2,
        "likeTypeLoveCount": 0,
        "likeTypeSadCount": 0,
      },
      "uid": 1,
      "user":  {
        "id": 1,
        "name": "UserOne Name",
      },
    },
  ]
export {
    getData, 
    backButtonPressed, 
    handleLoad, 
    handleRefresh, 
    renderView, 
    seperatorLine, 
    renderHeader, 
    renderFooter, 
    renderFinished,
    fakeData
}
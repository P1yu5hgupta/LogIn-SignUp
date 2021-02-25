import React from 'react'
import { View , Text,Image, ActivityIndicator, BackHandler, Alert } from 'react-native'
import { EvilIcons, Ionicons,AntDesign } from '@expo/vector-icons';
import config from '../../utils/config'
import styles from './styles'

// http request to fetch user list
const getData = async (userData,state,changeState) =>{
    try{
        const response = await fetch(config.url+'/tweets/all/'+userData.userId+'/'+state.page);
        let res = await response.json()
        res=res.map(item => (
            {...item,liked : false}
        ))
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
    catch(err){
        console.log(err)
    }
}

const backButtonPressed = () =>{
    Alert.alert('Heyy!!','Are you Sure??',[
        {
            text : 'Cancel',
        },
        {
            text : 'Exit App',onPress : () => BackHandler.exitApp()
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
const renderView = (item,state,changeState,navigation) =>{
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
                    <View>
                    <AntDesign 
                        name={item.liked ? 'like1':'like2'} 
                        size= {20} 
                        hitSlop={{top: 20, bottom: 20, left: 20, right: 20}}
                        onPress = {()=>{
                            changeState(prevState =>({
                                ...prevState,
                                data : prevState.data.map(userObj =>(
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
                    <View>
                        <EvilIcons name="comment" size={24} color="black" 
                            onPress = {()=>{
                                navigation.navigate('SingleTweet',{
                                    tweetId : item.id,
                                    tweet : item.tweet,
                                    createdAt : item.createdAt,
                                    name : item.user.name,
                                    liked : item.liked,
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
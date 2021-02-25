import React , { useState ,useEffect } from 'react'
import { View , Text, StyleSheet,Image, Linking, FlatList, ActivityIndicator, BackHandler, Alert } from 'react-native'
import { AntDesign } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons'; 
import { EvilIcons } from '@expo/vector-icons'; 
import AsyncStorage from '@react-native-async-storage/async-storage'
import config from '../../utils/config'
import styles from './styles'

export default userList = ({route,navigation}) =>{

    const [state,changeState] = useState({data : [], isLoading : false, page: 1,moreAvailable : true })

    let userName,userEmail,userId;
    const getFromStorage = async () => {
        userEmail = await AsyncStorage.getItem('@userEmail')
        userName = await AsyncStorage.getItem('@userName')
        userId = 3
    }
    // http request to fetch user list
    const getData = async () =>{
        try{
            const response = await fetch(config.url+'/tweets/all/3/'+state.page);
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
    
    // Event Handlers
    useEffect(() => {
        getFromStorage()
        BackHandler.addEventListener('hardwareBackPress', backButtonPressed)
        return () => BackHandler.removeEventListener('hardwareBackPress',backButtonPressed)
    },[]);
    
    useEffect(()=>{
        getData()
    },[state.page])
    
    const handleLoad = ()=>{
        if(state.moreAvailable)
            changeState({...state, page: state.page+1})
    }
    const handleRefresh = ()=>{
        changeState({...state, page: 1,moreAvailable : true})
    }

    // Rendering Views
    const renderView = ({item}) =>{
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
    return (
        <View style={styles.container}>
            <View style={{flex: 14,backgroundColor: 'gray'}}>
                <FlatList
                    data = {state.data}
                    renderItem = {renderView}
                    keyExtractor ={ item => item.id.toString()}
                    ItemSeparatorComponent = {seperatorLine}
                    ListHeaderComponent = {renderHeader}
                    ListFooterComponent = {state.moreAvailable?renderFooter : renderFinished}
                    stickyHeaderIndices={[0]}
                    onRefresh = {handleRefresh}
                    refreshing = {state.isLoading}
                    onEndReached = {state.moreAvailable?handleLoad:null}
                    onEndReachedThreshold = {0.2}
                />
            </View>
            <View style={styles.footer}>
                <AntDesign 
                    name="adduser" 
                    size={35} 
                    color="white" 
                    onPress = {()=>navigation.navigate('SearchFriends')}
                />
                <View>
                    <Ionicons 
                        name="ios-add-circle-outline" 
                        size={44} 
                        color="white" 
                        onPress = {()=>navigation.navigate('CreateTweet')}/>
                </View>
                <View>
                    <EvilIcons 
                        name="user" 
                        size={44} 
                        color="white" 
                        onPress = {()=>navigation.navigate('Profile')}    
                    />
                </View>
            </View>
        </View>
    )
}


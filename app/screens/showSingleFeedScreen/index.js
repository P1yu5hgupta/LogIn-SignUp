import React , { useState ,useEffect, isValidElement } from 'react'
import { TextInput,View , Text, StyleSheet,Image, FlatList } from 'react-native'
import { FontAwesome,EvilIcons,AntDesign } from '@expo/vector-icons';
import styles from './styles'
import {
    getFromStorage,
    handleRefresh,
    getComment,
    sendComment,
    renderView,
    seperatorLine,
    renderFinished,
    renderFooter
} from './utilFunctions'

const singleFeed = ({route,navigation}) =>{

    // defining states
    const [state,changeState] = useState({comments : [], isLoading : false, page: 1,moreAvailable : true })
    const [commentText,updateComment] = useState('')

    let userName,userEmail,userId;
    useEffect(()=>{
        userName,userEmail,userId = getFromStorage()
    },[])
    useEffect(()=>{
        getComment(route,state,changeState)
    },[state.page])
    
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
                    renderItem = {({item}) => renderView(item,state,changeState)}
                    keyExtractor ={ item => item.id.toString()}
                    ItemSeparatorComponent = {seperatorLine}
                    ListFooterComponent = {()=>state.moreAvailable?renderFooter(state,changeState) : renderFinished()}
                    onRefresh = {() => handleRefresh(state,changeState)}
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
                <FontAwesome name="send" size={24} color="black" onPress = {()=>sendComment(route,commentText,updateComment,state,changeState)}/>
            </View>
        </View>
    )
}

export default singleFeed
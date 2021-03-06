import React , { useState ,useEffect } from 'react'
import { View, FlatList, BackHandler } from 'react-native'
import { EvilIcons,Ionicons,AntDesign } from '@expo/vector-icons'
import { useSelector, useDispatch } from 'react-redux'
import styles from './styles'
import {
    getData, 
    backButtonPressed, 
    handleLoad, 
    handleRefresh, 
    renderView, 
    renderFooter,
    seperatorLine, 
    renderHeader, 
    renderFinished 
} from './utilFunctions'
import SkeletonPlaceholder from '../../utils/skeletonPlaceholder'

const newsfeeds = ({ navigation }) =>{
    const dispatch = useDispatch()
    const globalState = useSelector(state => state)
    const userData = globalState.userData
    const feeds = globalState.feeds
    const [state,changeState] = useState({data : feeds, isLoading : false, page: 1, moreAvailable : true,skeleton : true })
    
    useEffect(()=>{
        if(userData.userId === undefined)
            navigation.navigate('Home')
        else
            getData(userData,state,changeState,dispatch)
    },[state.page])

    useEffect(()=>{
        BackHandler.addEventListener('hardwareBackPress', (()=>backButtonPressed(dispatch, navigation)))
        return () => BackHandler.removeEventListener('hardwareBackPress',(()=>backButtonPressed(dispatch, navigation)))
    },[]);

    return (
        <View style={styles.container}>
            <View style={{flex: 14,backgroundColor: 'gray'}}>
                <FlatList
                    data = {state.data}
                    renderItem = {({item})=>renderView(userData, item,changeState,navigation)}
                    keyExtractor ={ item => item.id.toString()}
                    ItemSeparatorComponent = {seperatorLine}
                    ListHeaderComponent = {renderHeader}
                    ListFooterComponent = {state.moreAvailable?(state.page==1?SkeletonPlaceholder:renderFooter) : renderFinished}
                    stickyHeaderIndices={[0]}
                    onRefresh = {()=>handleRefresh(state,changeState)}
                    refreshing = {state.isLoading}
                    onEndReached = {()=>state.moreAvailable?handleLoad(state,changeState):null}
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


export default newsfeeds
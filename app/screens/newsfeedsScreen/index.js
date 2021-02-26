import React , { useState ,useEffect } from 'react'
import { View, FlatList, BackHandler } from 'react-native'
import { EvilIcons,Ionicons,AntDesign } from '@expo/vector-icons'; 
import store from '../../store/store'
import styles from './styles'
import { 
    getData, 
    backButtonPressed, 
    handleLoad, 
    handleRefresh, 
    renderView, 
    seperatorLine, 
    renderHeader, 
    renderFooter, 
    renderFinished 
} from './utilFunctions'

export default userList = ({ navigation }) =>{

    const [state,changeState] = useState({data : [{id: 'jhb',user : {name: 'sfsdf'},tweet : 'asdaf',createdAt : 'gfkjn'}], isLoading : false, page: 1,moreAvailable : true })

    useEffect(()=>{
        BackHandler.addEventListener('hardwareBackPress', backButtonPressed)
        return () => BackHandler.removeEventListener('hardwareBackPress',backButtonPressed)
    },[]);
    
    useEffect(()=>{
        getData(store.getState().userData,state,changeState)
    },[state.page])

    return (
        <View style={styles.container}>
            <View style={{flex: 14,backgroundColor: 'gray'}}>
                <FlatList
                    data = {state.data}
                    renderItem = {({item})=>renderView(item,state,changeState,navigation)}
                    keyExtractor ={ item => item.id.toString()}
                    ItemSeparatorComponent = {seperatorLine}
                    ListHeaderComponent = {renderHeader}
                    ListFooterComponent = {state.moreAvailable?renderFooter : renderFinished}
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


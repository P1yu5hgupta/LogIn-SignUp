import React , { useState ,useEffect } from 'react'
import { View,Text } from 'react-native'
import styles from './styles'
import { useSelector } from 'react-redux'
import { FlatList } from 'react-native-gesture-handler'
import {
    seperatorLine,
    renderHeader,
    getFriendsData,
    renderView,
    renderEmptyListComponent
} from './utilFunctions'

const FriendScreen = ({ navigation }) =>{
    const [requestData,changeRequestData] = useState([])
    const userData = useSelector(state => state.userData)

    useEffect(() => {
        getFriendsData(userData.userId, changeRequestData)
    },[])
    return (
        <View style = {styles.container}>
            <Text onPress = {() => navigation.goBack()} style= {{margin :20, fontSize : 15}}>Go Back</Text>
            <FlatList
                data = {requestData}
                renderItem = {({item})=>renderView(item,userData.userId,changeRequestData)}
                ListEmptyComponent = { renderEmptyListComponent }
                keyExtractor ={ item => item.id.toString()}
                ItemSeparatorComponent = {seperatorLine}
                ListHeaderComponent = {renderHeader}
                stickyHeaderIndices={[0]}
                onRefresh = {() => getFriendsData(userData.userId, changeRequestData)}
                refreshing = {true}
            />
        </View>
    )
}

export default FriendScreen
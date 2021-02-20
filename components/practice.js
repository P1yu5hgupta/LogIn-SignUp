import React , { useState ,useEffect }from 'react'
import { View , Text, StyleSheet,Image, Linking, FlatList, ActivityIndicator } from 'react-native'
import { AntDesign } from '@expo/vector-icons';


export default practice = () =>{

    // defining states
    const [state,changeState] = useState({data : [], isLoading : false, page: 1})

    // http request to fetch user list
    const getData = async () =>{
        try{
            const response = await fetch('https://randomuser.me/api/?seed=1&page='+state.page+'&results=20');
            let res = await response.json()
            res=res.results
            res=res.map(item => (
                {...item,liked : false}
            ))
            changeState(prevState => ({
                ... state,
                data : prevState.page==1?  res : [...prevState.data,...res], 
                isLoading: false,
            }))
        }
        catch(err){
            console.log(err)
        }
    }

    // Event Handlers
    useEffect(()=>{
        getData()
    },[state.page])
    
    const handleLoad = ()=>{
        changeState({...state, page: state.page+1})
    }
    const handleRefresh = ()=>{
        changeState({...state, isLoading:true, page: 1})
    }

    // Rendering Views
    const renderView = ({item}) =>{
        return (
            <View style = {styles.listItem}>
                <Image 
                    source = {{uri : item.picture.thumbnail}}
                    style = {styles.image}
                />
                <View style = {styles.userInfo}>
                    <Text style = {styles.userName}>{item.name.first}</Text>
                    <Text>{item.email}</Text>
                </View> 
                <AntDesign 
                    name={item.liked ? 'heart':'hearto'} 
                    size= {20} 
                    style={styles.likeIcon}
                    hitSlop={{top: 200, bottom: 200, left: 200, right: 200}}
                    onPress = {()=>{
                        changeState(prevState =>({
                            ...prevState,
                            data : prevState.data.map(userObj =>(
                                userObj.email === item.email ? 
                                {
                                    ...userObj,
                                    liked : !item.liked
                                } : userObj
                            ))
                        }))
                    }}
                />
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
                <Text style={{color : 'white',fontSize : 25,fontWeight: 'bold'}}>Github Users</Text>
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

    return (
        <View style={styles.container}>
                <FlatList
                    data = {state.data}
                    renderItem = {renderView}
                    keyExtractor ={ item => item.email}
                    ItemSeparatorComponent = {seperatorLine}
                    ListHeaderComponent = {renderHeader}
                    ListFooterComponent = {renderFooter}
                    stickyHeaderIndices={[0]}
                    onRefresh = {handleRefresh}
                    refreshing = {state.isLoading}
                    onEndReached = {handleLoad}
                    onEndReachedThreshold = {0.2}
                />
        </View>
    )
}

const styles = StyleSheet.create({
    container : {
        flex: 1,
        display : 'flex',
        flexDirection : 'row',
        justifyContent : 'center',
        marginTop : 35,
    },
    listItem : {
        flexDirection : 'row',
        padding : 5
    },
    baseline : {
        backgroundColor : 'black',
        height : 1,
        marginLeft : 40
    },
    image : {
        flex :1,
        height : 40,
        width : 40,
        borderRadius : 40
    },
    userInfo : {
        flex : 9,
        flexDirection : 'column',
        marginLeft : 10,
    },
    userName : {
        textTransform:'uppercase',
        fontSize: 15,
        fontWeight: 'bold',
        color : 'gray'
    },
    likeIcon: {
        flex: 1,
        alignSelf : 'flex-end',
    },
    header : {
        flexDirection: 'row',
        justifyContent : 'center',
        backgroundColor : 'black',
        padding : 10,
        marginBottom : 10,
    }
})
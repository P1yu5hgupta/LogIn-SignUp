import React , { useState ,useEffect }from 'react'
import { View , Text, StyleSheet,Image, Linking, FlatList } from 'react-native'

export default practice = () =>{

    const [state,changeState] = useState({data : [], isLoading : false, page: 1})

    const getData = async () =>{
        try{
            changeState({...state,isLoading : true})
            const response = await fetch('https://randomuser.me/api/?seed=1&page='+state.page+'&results=20');
            const res = await response.json()
            changeState({
                ... state,
                data : state.page==1?  res.results : state.data.concat(res.results), 
                isLoading: false,
            })
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
        changeState({...state, page: 1})
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
            <Text>
                
            </Text>
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
                    onEndReachedThreshold = {0.1}
                />
        </View>
    )
}

const styles = StyleSheet.create({
    container : {
        flex: 1,
        display : 'flex',
        flexDirection : 'row',
        marginTop : 40,
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
    header : {
        flexDirection: 'row',
        justifyContent : 'center',
        backgroundColor : 'black',
        padding : 10,
        marginBottom : 10,
    }
})
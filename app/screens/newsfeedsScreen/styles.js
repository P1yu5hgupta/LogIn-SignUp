import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
    container : {
        flex: 1,
        display : 'flex',
        flexDirection : 'column',
        marginTop : 29,
        justifyContent: 'center'
    },
    listItem : {
        flexDirection : 'row',
        padding : 5,
        borderWidth : 1,
        borderColor : 'black',
        margin : 10,
        shadowColor: "black",
        shadowOpacity: 0.8,
        shadowRadius: 2,
        backgroundColor: 'white',
        borderRadius : 10
    },
    baseline : {
        backgroundColor : 'gray',
        height : 1
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
    },
    time : {
        color: 'gray'
    },
    header : {
        flexDirection: 'row',
        justifyContent : 'center',
        backgroundColor : 'black',
        padding : 10,
        marginBottom : 10,
    },
    tweet : {
        marginTop : 10,
        marginLeft : 20,
        fontSize : 18,
        fontWeight : "100",
        color: '#585858'
    },
    footer : {
        display : 'flex',
        flexDirection : 'row',
        flex: 1,
        justifyContent: 'space-around',
        backgroundColor : 'black'
    },
    actionTab : {
        marginTop : 20,
        padding: 10,
        borderTopWidth:.5,
        borderTopColor : 'gray',
        display : 'flex',
        flexDirection : 'row',
        flex: 1,
        justifyContent: 'space-around',
    },
    modalComponent : {
        backgroundColor : 'white',
        width : 300,
        height : 50,
        alignSelf : 'center',
        borderRadius : 8,
        flexDirection : 'row',
        justifyContent : 'space-evenly',
        alignItems : 'center'
    },
    modalView : {
        backgroundColor: 'black',
        alignItems: 'center',
        justifyContent: 'center',
        maxHeight : 20
    }
})

export default styles
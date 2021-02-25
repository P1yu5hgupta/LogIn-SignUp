import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
    container : {
        flex: 1,
        display : 'flex',
        flexDirection : 'column',
        marginTop : 29,
    },
    backButton : {
        margin : 10
    },
    text :{
        fontSize : 20,
        fontWeight : 'bold',
        alignSelf : 'flex-start',
        margin : 10
    },
    searchBar : {
        flexDirection : 'row',
        padding : 10,
        margin : 5,
        borderRadius :25,
        borderWidth : 4,
        borderColor : 'gray',
    },
    inputBox : {
        flex: 1,
        fontSize : 15
    },
    errorMsg: {
        color: '#B00000',
        marginTop: 5,
        marginLeft: 15,
    },
    friendView : {
        margin : 10,
        borderColor : 'black',
        backgroundColor : 'gray',
        borderWidth : 2,
        flexDirection : 'row',
        borderRadius : 4,
        padding :10
    },
    image : {
        flex :1,
        height : 40,
        width : 40,
        borderRadius : 40
    },
    friendDetails : {
        flex : 9,
        marginLeft : 20,
    },
    button : {
        borderRadius : 20,
        borderWidth : 2,
        marginRight : 15,
        padding : 8,
        backgroundColor : 'black',
        color : 'white',
        fontSize : 15,
        fontWeight : 'bold'
    }
})

export default styles
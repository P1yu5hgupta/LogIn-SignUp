import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
    container : {
        flex: 1,
        display : 'flex',
        flexDirection : 'column',
        marginTop : 0,
        justifyContent: 'center'
    },
    navigationBar:{
        flex:1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingTop : 39,
        paddingBottom : 20,
        padding: 20,
        backgroundColor : 'gray'
    },
    tweetField : {
        borderWidth : 1,
        flexDirection : 'row',
        flex: 40,
        padding : 10
    },
    buttonText : {
        color : 'white',
        textAlign :'center'
    },
    buttonContainer : {
        backgroundColor : 'black',
        borderRadius : 20,
        width : 60,
        height : 20
    },
    image : {
        flex :1,
        height : 40,
        width : 40,
        borderRadius : 40
    },
    inputBox : {
        alignSelf: 'flex-start',
        marginLeft : 10,
        flex: 8,
    }
})

export default styles
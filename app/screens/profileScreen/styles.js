import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
    container : {
        flex: 1,
        display : 'flex',
        flexDirection : 'column',
    },
    cover : {
        backgroundColor : 'gray',
        flex: 3,
        justifyContent : 'center',
        flexDirection : 'column'
    },
    userInfo : {
        flex: 10
    },
    backIcon : {
        width : 30,
        height : 30,
        alignSelf : 'flex-start',
        marginLeft :20,
        marginTop : 20
    },
    image : {
        alignSelf : 'center',
        width : 100,
        height: 100,
        marginBottom : 20,
        borderRadius : 60,
        borderWidth : 4,
        borderColor : 'black'
    },
    nameText : {
        alignSelf : 'center',
        fontWeight : 'bold',
        fontSize : 30,
        marginTop : 20
    },
    editText : {
        alignSelf : 'center',
        fontSize : 20,
        marginTop : 20,
        color : 'skyblue'
    },
    changePassword : {
        alignSelf : 'center',
        marginTop : 40,
        fontSize : 20,
        borderColor : 'black',
        borderWidth : 2,
        borderRadius : 8,
        padding: 10
    },
    modalView : {
        flex:1,
        flexDirection: 'column'
    },
    form:{
        marginTop: 30,
    },
    errorMsg: {
        color: '#B00000',
        marginTop: 5,
        marginLeft: 50,
    },
    inputBox:{
        color: 'black'
    },
    inputView:{
        marginTop: 20,
        borderBottomColor: 'gray',
        borderBottomWidth: 1,
        width: 300,
        marginLeft : 50,
    },
    cancelText:{
        alignSelf : 'center',
        fontSize :20,
        fontWeight :'bold',
        marginTop : 10
    },
    button:{
        marginTop:60,
        width: 250,
        marginLeft: 75,
        backgroundColor: 'black',
        paddingVertical: 14,
        borderRadius: 400,
        borderColor: 'black',
        borderWidth: 2,
    },
    buttonText:{
        textAlign: 'center',
        color: 'white',
        fontWeight: 'bold',
        fontSize: 20,
    },
})

export default styles
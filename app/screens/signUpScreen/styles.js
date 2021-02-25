import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#303030',
        paddingLeft: 40,   
    },
    backIcon: {
        width: 25,
        height: 25,
        marginTop: 80,
    }, 
    text:{
        color: 'white',
        fontWeight: 'bold',
        fontSize: 40,
        marginTop: 60,    
    },
    form:{
        marginTop: 30,
    },
    errorMsg: {
        color: '#B00000',
        marginTop: 5,
        marginLeft: 15,
    },
    inputBox:{
        color: 'white'
    },
    inputView:{
        marginTop: 20,
        borderBottomColor: 'gray',
        borderBottomWidth: 1,
        width: 300
    },
    button:{
        marginTop:60,
        width: 250,
        marginLeft: 30,
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
    signUpText:{
        color: 'white',
        marginTop: 10,
        marginLeft: 55,
    },
    innerText:{
        fontWeight:'bold',
        color: '#99FFFF',
    }
});

export default styles
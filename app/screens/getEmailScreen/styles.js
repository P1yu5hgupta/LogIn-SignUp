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
    loginText:{
        color: 'white',
        fontWeight: 'bold',
        fontSize: 50,
        marginTop: 80,    
    },
    form:{
        marginTop: 80,
    },
    personLogo:{
        width: 40,
        height: 40,
    },
    lockLogo:{
        width: 35,
        height: 35,
    },
    errorMsg: {
        color: '#B00000',
        marginTop: 5,
        marginLeft: 15,
    },
    inputBox:{
        color: 'white',
    },
    inputView:{
        flexDirection:'row',
        flexWrap:'wrap',
        marginTop: 20,
        borderBottomColor: 'gray',
        borderBottomWidth: 1,
        width: 300,
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
        marginLeft: 30,
    },
    innerText:{
        fontWeight:'bold',
        color: '#99FFFF',
    }
});

export default styles
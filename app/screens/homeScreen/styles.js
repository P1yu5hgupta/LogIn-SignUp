import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    logo:{
        width: 80,
        height: 80,
        marginTop: 150,
        marginLeft: 40,
    },
    text: {
        color: 'black',
        fontWeight: 'bold',
        fontSize: 40,
        marginLeft: 40,
        marginTop: 100,
    },
    button:{
        marginTop:160,
        width: 200,
        marginLeft: 100,
        backgroundColor: 'orange',
        paddingVertical: 14,
        borderRadius: 400,
        borderColor: 'black',
        borderWidth: 2,
    },
    buttonText:{
        textAlign: 'center',
        color: 'white',
        fontWeight: 'bold',
        fontSize: 17,
    },
    signUpText:{
        textAlign: 'center',
        marginTop: 10,
    },
    innerText:{
        fontWeight:'bold'
    }
});

export default styles
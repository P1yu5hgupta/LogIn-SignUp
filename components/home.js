import React,{ Component } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, TouchableHighlight } from 'react-native';

export default class home extends Component{
    render(){
        return(
            <View style={styles.container}>
                <Image 
                    style= {styles.logo} 
                    source={require('../assets/home/logo.png')} 
                />
    
                <Text style={styles.text}>
                    Start {'\n'}your {'\n'}adventure
                </Text>
                
                <TouchableOpacity style={styles.button} onPress={()=>{this.props.navigation.navigate('SignIn')}}>
                    <Text style={styles.buttonText}>
                        Log In
                    </Text>
                </TouchableOpacity>
                
                <Text style={styles.signUpText}>
                    You don't have any account!
                    <Text style={styles.innerText} onPress={()=>{this.props.navigation.navigate('SignUp')}}>
                        Sign Up here
                    </Text>
                </Text>
            </View>
        );
    }
}


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

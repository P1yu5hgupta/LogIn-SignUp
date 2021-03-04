import React,{ useEffect } from 'react';
import { Text, View, Image, TouchableOpacity, BackHandler } from 'react-native';
import styles from './styles'
import { backButtonPressed } from './utilFunctions'

const home = ({ navigation })=>{

    useEffect(()=>{
        BackHandler.addEventListener('hardwareBackPress', backButtonPressed)
        return ()=>  BackHandler.removeEventListener('hardwareBackPress', backButtonPressed)
    })

    return(
        <View style={styles.container}>
            <Image 
                style= {styles.logo}
                source={require('../../assests/images/homeScreen/logo.png')} 
            />

            <Text style={styles.text}>
                Start {'\n'}your {'\n'}adventure
            </Text>
            
            <TouchableOpacity style={styles.button} onPress={()=>{navigation.navigate('Email')}}>
                <Text style={styles.buttonText}>
                    Log In
                </Text>
            </TouchableOpacity>
            
            <Text style={styles.signUpText}>
                You don't have any account!
                <Text style={styles.innerText} onPress={()=>{navigation.navigate('SignUp')}}>
                    Sign Up here
                </Text>
            </Text>
        </View>
    );
}

export default home
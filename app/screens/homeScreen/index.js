import React,{ Component } from 'react';
import { Text, View, Image, TouchableOpacity, Alert, BackHandler } from 'react-native';
import styles from './styles'

export default class home extends Component{
    
    backButtonPressed = () =>{
        Alert.alert('Heyy!!','You wanna exit??',[
            {
                text : 'Cancel',
            },
            {
                text : 'Exit', onPress : () => BackHandler.exitApp()
            }
        ])
        return true;
    }

    componentDidMount(){
        BackHandler.addEventListener('hardwareBackPress', this.backButtonPressed)
    }
    componentWillUnmount(){
        BackHandler.removeEventListener('hardwareBackPress',this.backButtonPressed)
    }
    render(){
        return(
            <View style={styles.container}>
                <Image 
                    style= {styles.logo} 
                    source={require('../../assests/images/homeScreen/logo.png')} 
                />
    
                <Text style={styles.text}>
                    Start {'\n'}your {'\n'}adventure
                </Text>
                
                <TouchableOpacity style={styles.button} onPress={()=>{this.props.navigation.navigate('Email')}}>
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



import React, { useState } from 'react'
import { Text, View, TextInput, Image,TouchableOpacity , ScrollView } from 'react-native'
import styles from './styles'
import {
    INITIAL_STATE,
    handleChange,
    submit
} from './utilFunctions'

const signUp = ({ navigation }) => {

    const [ state, setState ] = useState(INITIAL_STATE)

    return(
        <ScrollView style={styles.container}>
            
            <TouchableOpacity 
                onPress={()=>{
                    setState(INITIAL_STATE)
                    navigation.goBack()
                }}
            >
                <Image 
                    style={styles.backIcon}
                    source={require('../../assests/images/shared/backLogo.png')}
                />
            </TouchableOpacity>
            
            <Text style={styles.text}>
                New {'\n'}Account
            </Text>

            <View style={styles.form}>
                {
                    Object.keys(INITIAL_STATE.userDetails).map( (key) => {
                        const inputObj = state.userDetails[key]
                        return(
                            <View key={inputObj.placeholder}>
                                <View style={styles.inputView}>
                                <TextInput 
                                    style={styles.inputBox}
                                    placeholder = {inputObj.placeholder}
                                    placeholderTextColor = "gray"
                                    onChangeText = {(text) => handleChange(key,text,state,setState)}
                                    value={inputObj.value}
                                    secureTextEntry = {inputObj.secureText}
                                />
                                </View>

                                <Text style={styles.errorMsg}>
                                    {inputObj.errMsg}
                                </Text>
                            </View>
                        )
                    })
                }
            </View>

            <TouchableOpacity style={styles.button} onPress={()=>{submit(navigation,state, setState)}}>
                <Text style={styles.buttonText}>
                    Sign Up
                </Text>
            </TouchableOpacity>

            <Text style={styles.signUpText}>
                Already have an account?
                <Text style={styles.innerText} onPress={()=>{
                    setState(INITIAL_STATE)
                    navigation.navigate('Email')
                }}>
                    LogIn!
                </Text>
            </Text>
            
        </ScrollView>
    );
}

export default signUp
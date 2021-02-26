import React, { useState, useEffect } from 'react'
import { Text, View, TextInput, Image,TouchableOpacity,ScrollView } from 'react-native'
import styles from './styles'
import { INITIAL_STATE, handleChange, submit } from './utilFunctions'

const signIn = ({ navigation }) => {
    
    const [state,setState] = useState(INITIAL_STATE)
    
    return(
        <ScrollView style={styles.container}>
            <TouchableOpacity 
                onPress={()=>{
                    setState(INITIAL_STATE);
                    navigation.goBack()
                }}>
                <Image 
                    style={styles.backIcon}
                    source={require('../../assests/images/shared/backLogo.png')}
                />
            </TouchableOpacity>
            
            <Text style={styles.loginText}>
                Log In
            </Text>

            <View style={styles.form}>
                {
                    Object.keys(INITIAL_STATE.userDetails).map( (key) => {
                        const inputObj= state.userDetails[key]
                        return(
                            <View key={inputObj.placeholder}>
                                <View style={styles.inputView}>
                                    <Image
                                        style={styles[inputObj.style]}
                                        source={inputObj.imageURL}
                                    />
                                    <TextInput 
                                        style={styles.inputBox}
                                        placeholder= {inputObj.placeholder}
                                        placeholderTextColor = "gray"
                                        onChangeText = {(text)=>handleChange(state,setState,key,text)}
                                        value = {inputObj.value}
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

            <TouchableOpacity style={styles.button} onPress={()=>submit(state,setState)}>
                <Text style={styles.buttonText}>
                    Next
                </Text>
            </TouchableOpacity>
            
            <Text style={styles.signUpText}>
                You don't have any account! 
                <Text style={styles.innerText} onPress={()=>{
                    setState(INITIAL_STATE)
                    navigation.navigate('SignUp')
                }}>
                    Sign Up here
                </Text>
            </Text>
            
        </ScrollView>
    );
}

export default signIn
import React, { useState, useEffect } from 'react'
import { Text, View, TextInput, Image,TouchableOpacity, ScrollView } from 'react-native'
import { handleChange, submit, INITIAL_STATE } from './utilFunctions'
import styles from './styles'
import { useDispatch } from 'react-redux'

const signIn = ({route, navigation }) => {

    const dispatch = useDispatch()
    const [ state,setState ] = useState(INITIAL_STATE)

    return(
        <ScrollView style={styles.container}>

            <TouchableOpacity 
                onPress={()=>{
                    setState(INITIAL_STATE)
                    navigation.goBack()
                }}>
                <Image
                    style={styles.backIcon}
                    source={require('../../assests/images/shared/backLogo.png')}
                />
            </TouchableOpacity>
            
            <Text style={styles.loginText}>
                Welcome!!
            </Text>
            <Text style={{color:'white',fontSize : 20,marginLeft : 50,marginTop :20}}>
                {route.params.data}
            </Text>
            <View style={styles.form}>
                {
                    Object.keys(INITIAL_STATE.userDetails).map( (key) => {
                        const inputObj=state.userDetails[key]
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
                                        placeholderTextColor = "white"
                                        onChangeText = {(text)=>handleChange(state,setState,key,text)}
                                        secureTextEntry = {inputObj.secureText}
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

            <TouchableOpacity style={styles.button} onPress={()=> submit(dispatch, route,navigation,state,setState)}>
                <Text style={styles.buttonText}>
                    Log In
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
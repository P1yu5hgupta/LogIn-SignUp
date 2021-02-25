import React, { Component } from 'react'
import { Text, View, TextInput, Image,TouchableOpacity, ScrollView } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import config from '../../utils/config'
import styles from './styles'

export default class signIn extends Component{
    constructor(){
        super();
        this.state = this.initialState
    }
    
    get initialState() {
        return {
            userDetails : {
                password : {
                    value : '',
                    errMsg : '',
                    placeholder : 'Password',
                    imageURL: require('../../assests/images/getPasswordScreen/lockLogo.png'),
                    style: 'lockLogo',
                    secureText : true
                }
            }
        }
    }
    handleChange = (key,text) =>{
        this.setState((state)=>{
            state.userDetails[key].value=text
            state.userDetails[key].errMsg=''
            return state
        })
    }

    isValidFields = () =>{
        let flag=true
        let mailRegex=/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/

        if(this.state.userDetails.password.value.length==0){
            this.setState((state)=>{
                state.userDetails.password.errMsg = "Password Required!!!" 
            })
            flag=false
        }

        return flag       
    }
    submit = async () => {
        if(this.isValidFields()){
            try{
                const response = await fetch(config.url+'/user/login',{
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        email : this.props.route.params.data,
                        password : this.state.userDetails.password.value
                    })
                })
                let data = await response.json()
                if(!data.status){
                    alert(data.message)
                }
                else{
                    console.log(data)
                    await AsyncStorage.setItem('@userEmail',data.email)
                    await AsyncStorage.setItem('@userName',data.name)
                    this.setState(this.initialState,()=>{
                        this.props.navigation.navigate("ShowTweets")
                    })
                }
            }
            catch(err){
                console.log(err)
            }
        }
    }
    render(){
        return(
            <ScrollView style={styles.container}>

                <TouchableOpacity onPress={()=>{this.setState(this.initialState,()=>{this.props.navigation.goBack()})}}>
                    <Image
                        style={styles.backIcon}
                        source={require('../../assests/images/shared/backLogo.png')}
                    />
                </TouchableOpacity>
                
                <Text style={styles.loginText}>
                    Welcome!!
                </Text>
                <Text style={{color:'white',fontSize : 20,marginLeft : 50,marginTop :20}}>
                    {this.props.route.params.data}
                </Text>
                <View style={styles.form}>
                    {
                        Object.keys(this.state.userDetails).map( (key) => {
                            const inputObj=this.state.userDetails[key]
                            return(
                                <View key={inputObj.email}>
                                    <View style={styles.inputView}>
                                        <Image
                                            style={styles[inputObj.style]}
                                            source={inputObj.imageURL}
                                        />
                                        <TextInput 
                                            style={styles.inputBox}
                                            placeholder= {inputObj.placeholder}
                                            placeholderTextColor = "white"
                                            onChangeText = {(text)=>this.handleChange(key,text)}
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
    
                <TouchableOpacity style={styles.button} onPress={()=>this.submit()}>
                    <Text style={styles.buttonText}>
                        Log In
                    </Text>
                </TouchableOpacity>
                
                <Text style={styles.signUpText}>
                    You don't have any account! 
                    <Text style={styles.innerText} onPress={()=>{
                        this.setState(this.initialState,()=>{
                            this.props.navigation.navigate('SignUp')
                        })
                    }}>
                        Sign Up here
                    </Text>
                </Text>
                
            </ScrollView>
        );
    }
}



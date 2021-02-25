import React, { Component } from 'react'
import { Text, View, TextInput, Image,TouchableOpacity,ScrollView } from 'react-native'
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
                userId : {
                    value : '',
                    errMsg : '',
                    placeholder : 'Email/Mobile No.',
                    imageURL: require('../../assests/images/getEmailScreen/personLogo.png'),
                    style: 'personLogo'
                }
            },
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
        let phoneRegex = /^[6-9]\d{9}$/
        let type=2
        if(this.state.userDetails.userId.value.length==0){
            this.setState((state)=>{
                state.userDetails.userId.errMsg = "Mandatory!!!"
                return state
            })
            flag=false
        }
        else if(!mailRegex.test(this.state.userDetails.userId.value) && !phoneRegex.test(this.state.userDetails.userId.value)){
            this.setState((state)=>{
                state.userDetails.userId.errMsg = "Invalid Entry!!!"
                return state
            })
            flag=false
        }
        else if(mailRegex.test(this.state.userDetails.userId.value)){
            type=1
        }
        return { flag , type }
    }
    submit = async () => {
        const {flag,type} = this.isValidFields()
        if(flag){
            try{
                const response = await fetch(config.url+'/user/email',{
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        email : this.state.userDetails.userId.value,
                    })
                })
                let data = await response.json()
                if(!data.status){
                    alert(data.message)
                    this.setState(this.initialState,()=>{
                        this.props.navigation.navigate("SignUp")
                    })
                }
                else{
                    this.props.navigation.navigate("Password",{
                        data : this.state.userDetails.userId.value
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
                    Log In
                </Text>
    
                <View style={styles.form}>
                    {
                        Object.keys(this.state.userDetails).map( (key) => {
                            const inputObj=this.state.userDetails[key]
                            return(
                                <View key={inputObj.userId}>
                                    <View style={styles.inputView}>
                                        <Image
                                            style={styles[inputObj.style]}
                                            source={inputObj.imageURL}
                                        />
                                        <TextInput 
                                            style={styles.inputBox}
                                            placeholder= {inputObj.placeholder}
                                            placeholderTextColor = "gray"
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
                        Next
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



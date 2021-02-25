import React, { Component } from 'react'
import { Text, View, TextInput, Image,TouchableOpacity , ScrollView } from 'react-native'
import styles from './styles'

export default class signUp extends Component{
    constructor(){
        super();
        this.state= this.initialState
    }

    get initialState(){
        return {
            userDetails: {
                fname : {
                    value : '',
                    errMsg : '',
                    placeholder : 'First Name',
                },
                lname : {
                    value : '',
                    errMsg : '',
                    placeholder : 'Last Name',
                },
                email : {
                    value : '',
                    errMsg : '',
                    placeholder : 'Email/Mobile No.',
                },
                password : {
                    value : '',
                    errMsg : '',
                    placeholder : 'Password',
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
        let nameRegex=/^[A-Za-z\s ]+$/;
        let mailRegex=/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/
        let phoneRegex = /^[6-9]\d{9}$/

        if(this.state.userDetails.fname.value.length==0){
            this.setState((state)=>{
                state.userDetails.fname.errMsg = "First Name is mandatory!!!"
                return state
            })
            flag=false
        }
        else if(!nameRegex.test(this.state.userDetails.fname.value)){
            this.setState((state)=>{
                state.userDetails.fname.errMsg = "Must be Alphabatic!!!"
                return state
            })
            flag=false
        }

        if(this.state.userDetails.lname.value.length==0){
            this.setState((state)=>{
                state.userDetails.lname.errMsg = "Last Name is mandatory!!!"
                return state
            })
            flag=false
        }
        else if(!nameRegex.test(this.state.userDetails.lname.value)){
            this.setState((state)=>{
                state.userDetails.lname.errMsg = "Must be Alphabatic!!!"
                return state
            })
            flag=false
        }

        if(this.state.userDetails.password.value.length<6){
            this.setState((state)=>{
                state.userDetails.password.errMsg = "Password must be of atleast 6 characters!!!!"
                return state
            })
            flag=false
        }

        if(this.state.userDetails.email.value.length==0){
            this.setState((state)=>{
                state.userDetails.email.errMsg = "Mandatory!!!"
                return state
            })
            flag=false
        }
        else if(!mailRegex.test(this.state.userDetails.email.value) && !phoneRegex.test(this.state.userDetails.email.value)){
            this.setState((state)=>{
                state.userDetails.email.errMsg = "Invalid Entry!!!"
                return state
            })
            flag=false
        }
        
        return flag 
    }
    submit = async () =>{
        if(this.isValidFields()){
            try{
                const response = await fetch(config.url+'/user/signup',{
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        name : this.state.userDetails.fname.value + ' ' +this.state.userDetails.lname.value,
                        email : this.state.userDetails.email.value,
                        password : this.state.userDetails.password.value,
                    })
                })
                const data = await response.json()
                if(data.status){
                    alert("User registered!! LogIn Now..")
                    this.setState(this.initialState,()=>{this.props.navigation.navigate('Email')})
                }
                else{
                    alert("User Already Exists!!!!")
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
                
                <Text style={styles.text}>
                    New {'\n'}Account
                </Text>
    
                <View style={styles.form}>
                    {
                        Object.keys(this.state.userDetails).map( (key) => {
                            const inputObj = this.state.userDetails[key]
                            return(
                                <View key={inputObj.email}>
                                    <View style={styles.inputView}>
                                    <TextInput 
                                        style={styles.inputBox}
                                        placeholder = {inputObj.placeholder}
                                        placeholderTextColor = "gray"
                                        onChangeText = {(text) => this.handleChange(key,text)}
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
    
                <TouchableOpacity style={styles.button} onPress={()=>{this.submit()}}>
                    <Text style={styles.buttonText}>
                        Sign Up
                    </Text>
                </TouchableOpacity>

                <Text style={styles.signUpText}>
                    Already have an account?  
                    <Text style={styles.innerText} onPress={()=>{
                        this.setState(this.initialState,()=>{this.props.navigation.navigate('Email')})
                    }}>
                        LogIn!
                    </Text>
                </Text>
                
            </ScrollView>
        );
    }
}


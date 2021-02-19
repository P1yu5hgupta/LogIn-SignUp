import React, { Component } from 'react'
import { StyleSheet, Text, View, TextInput, Image,TouchableOpacity } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler';


export default class signUp extends Component{
    constructor(){
        super();
        this.state={
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
                    placeholder : 'Email',
                },
                password : {
                    value : '',
                    errMsg : '',
                    placeholder : 'Password',
                    secureText : true
                }
            }
        }
        this.baseState=this.state
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
                state.userDetails.email.errMsg = "Email is mandatory!!!"
                return state
            })
            flag=false
        }
        else if(!mailRegex.test(this.state.userDetails.email.value)){
            this.setState((state)=>{
                state.userDetails.email.errMsg = "Invalid Email Address!!!"
                return state
            })
            flag=false
        }

        return flag 
    }
    submit = async () =>{
        if(this.isValidFields()){
            try{
                const response = await fetch('http://192.168.1.43:8000/signup',{
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        fname : this.state.userDetails.fname.value,
                        lname : this.state.userDetails.lname.value,
                        email : this.state.userDetails.email.value,
                        password : this.state.userDetails.password.value
                    })
                })
                const data = await response.json()
                alert(data.message)
                if(data.status){
                    this.setState(this.baseState,()=>{this.props.navigation.navigate('SignIn')})
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
                
                <TouchableOpacity onPress={()=>{this.props.navigation.goBack()}}>
                    <Image 
                        style={styles.backIcon}
                        source={require('../assets/signIn/backLogo.png')}
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
                                <View>
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
                        this.setState(this.baseState,()=>{this.props.navigation.navigate('SignIn')})  
                    }}>
                        LogIn!
                    </Text>
                </Text>
                
            </ScrollView>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#303030',
        paddingLeft: 40,   
    },
    backIcon: {
        width: 25,
        height: 25,
        marginTop: 80,
    }, 
    text:{
        color: 'white',
        fontWeight: 'bold',
        fontSize: 40,
        marginTop: 60,    
    },
    form:{
        marginTop: 30,
    },
    errorMsg: {
        color: '#B00000',
        marginTop: 5,
        marginLeft: 15,
    },
    inputBox:{
        color: 'white'
    },
    inputView:{
        marginTop: 20,
        borderBottomColor: 'gray',
        borderBottomWidth: 1,
        width: 300
    },
    button:{
        marginTop:60,
        width: 250,
        marginLeft: 30,
        backgroundColor: 'black',
        paddingVertical: 14,
        borderRadius: 400,
        borderColor: 'black',
        borderWidth: 2,
    },
    buttonText:{
        textAlign: 'center',
        color: 'white',
        fontWeight: 'bold',
        fontSize: 20,
    },
    signUpText:{
        color: 'white',
        marginTop: 10,
        marginLeft: 55,
    },
    innerText:{
        fontWeight:'bold',
        color: '#99FFFF',
    }
});

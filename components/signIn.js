import React, { Component } from 'react'
import { StyleSheet, Text, View, TextInput, Image,TouchableOpacity } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler';
import Practice from './practice'

export default class signIn extends Component{
    constructor(){
        super();
        this.state = {
            userDetails : {
                email : {
                    value : '',
                    errMsg : '',
                    placeholder : 'Email',
                    imageURL: require('../assets/signIn/personLogo.png'),
                    style: 'personLogo'
                },
                password : {
                    value : '',
                    errMsg : '',
                    placeholder : 'Password',
                    imageURL: require('../assets/signIn/lockLogo.png'),
                    style: 'lockLogo',
                    secureText : true
                }
            }
        }
        this.baseState = this.state
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
    submit = async () => {
        console.log(this.baseState)
        if(this.isValidFields()){
            try{
                const response = await fetch('http://192.168.1.43:8000/signin',{
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        email : this.state.userDetails.email.value,
                        password : this.state.userDetails.password.value
                    })
                })
                let data = await response.json()
                if(!data.status){
                    alert(data.message)
                }
                else{
                    this.setState(this.baseState,()=>{
                        this.props.navigation.navigate("Profile")
                        // <Practice/>
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

                <TouchableOpacity onPress={()=>{this.props.navigation.goBack()}}>
                    <Image 
                        style={styles.backIcon}
                        source={require('../assets/signIn/backLogo.png')}
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
                                <View>
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
                        this.setState(this.baseState,()=>{
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
    loginText:{
        color: 'white',
        fontWeight: 'bold',
        fontSize: 50,
        marginTop: 80,    
    },
    form:{
        marginTop: 80,
    },
    personLogo:{
        width: 40,
        height: 40,
    },
    lockLogo:{
        width: 35,
        height: 35,
    },
    errorMsg: {
        color: '#B00000',
        marginTop: 5,
        marginLeft: 15,
    },
    inputBox:{
        color: 'white',
    },
    inputView:{
        flexDirection:'row',
        flexWrap:'wrap',
        marginTop: 20,
        borderBottomColor: 'gray',
        borderBottomWidth: 1,
        width: 300,
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
        marginLeft: 30,
    },
    innerText:{
        fontWeight:'bold',
        color: '#99FFFF',
    }
});

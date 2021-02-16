import React, { Component } from 'react'
import { StyleSheet, Text, View, TextInput, Image,TouchableOpacity } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler';


export default class signUp extends Component{
    constructor(){
        super();
        this.state={
            fname: '',
            lname: '',
            email: '',
            password: '',
            emailErr: '',
            fnameErr: '',
            passErr: '',
            lnameErr: '',
        }
        this.baseState=this.state
        this.inputFields = [
            {
                fieldName: 'fname',
                placeholder: 'First Name',
                err: 'fnameErr'
            },
            {
                fieldName: 'lname',
                placeholder: 'Last Name',
                err: 'lnameErr'
            },
            {
                fieldName: 'email',
                placeholder: 'Email',
                err: 'emailErr'
            },
            {
                fieldName: 'password',
                placeholder: 'Password',
                err: 'passErr',
                textTypePass : true
            }
        ]
    }
    isValidFields = () =>{
        let flag=true
        let nameRegex=/^[A-Za-z\s ]+$/;
        let mailRegex=/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/
            
        if(this.state.fname.length==0){
            this.setState({fnameErr : "First Name is mandatory!!!"})
            flag=false
        }
        else if(!nameRegex.test(this.state.fname)){
            this.setState({fnameErr : "Must be Alphabatic!!!"})
            flag=false
        }

        if(this.state.lname.length==0){
            this.setState({lnameErr : "Last Name is mandatory!!!"})
            flag=false
        }
        else if(!nameRegex.test(this.state.lname)){
            this.setState({lnameErr : "Must be Alphabatic!!!"})
            flag=false
        }

        if(this.state.password.length<6){
            this.setState({passErr : "Password must be of atleast 6 characters!!!!"})
            flag=false
        }

        if(this.state.email.length==0){
            this.setState({emailErr : "Email is mandatory!!!"})
            flag=false
        }
        else if(!mailRegex.test(this.state.email)){
            this.setState({emailErr : "Invalid email address"})
            flag=false
        }

        return flag        
    }
    submit = async () =>{
        console.log(this.state)
        if(this.isValidFields()){
            try{
                const response = await fetch('http://192.168.1.43:8000/signup',{
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        fname : this.state.fname,
                        lname : this.state.lname,
                        email : this.state.email,
                        password : this.state.password
                    })
                })
                const data = await response.json()
                alert(data.message)
                if(data.status){
                    console.log(this.baseState)
                    this.setState(this.baseState)
                    this.props.navigation.navigate('SignIn')
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
                        this.inputFields.map( (inputObj) => {
                            return(
                                <View>
                                    <View style={styles.inputView}>
                                    <TextInput 
                                        style={styles.inputBox}
                                        placeholder = {inputObj.placeholder}
                                        placeholderTextColor = "gray"
                                        onChangeText = {(text)=>{
                                            this.setState({ [inputObj.fieldName] : text })
                                            this.setState({ [inputObj.err] : '' })
                                        }}
                                        secureTextEntry = {inputObj.textTypePass}
                                    />
                                    </View>

                                    <Text style={styles.errorMsg}>
                                        {this.state[inputObj.err]}
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
                    <Text style={styles.innerText} onPress={()=>{this.props.navigation.navigate('SignIn')}}>
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
        flexDirection:'row',
        flexWrap:'wrap',
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

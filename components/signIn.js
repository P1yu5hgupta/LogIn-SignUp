import React, { Component } from 'react'
import { StyleSheet, Text, View, TextInput, Image,TouchableOpacity } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler';

export default class signIn extends Component{
    constructor(){
        super();
        this.state={
            email: '',
            password: '',
            emailErr: '',
            passErr: ''
        }
        this.baseState=this.state
        this.inputFields = [
            {
                fieldName: 'email',
                placeholder: 'Email',
                err: 'emailErr',
                imageURL: require('../assets/signIn/personLogo.png'),
                style: 'personLogo'
            },
            {
                fieldName: 'password',
                placeholder: 'Password',
                err: 'passErr',
                imageURL: require('../assets/signIn/lockLogo.png'),
                style: 'lockLogo',
                textTypePass: true
            }
        ]
    }
    isValidFields = () =>{
        let flag=true
        let mailRegex=/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/

        if(this.state.password.length==0){
            this.setState({passErr : "Password is mandatory!!!!"})
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
    submit = async () => {
        if(this.isValidFields()){
            try{
                const response = await fetch('http://192.168.1.43:8000/signin',{
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
                let data = await response.json()
                if(!data.status){
                    alert(data.message)
                }
                else{
                    this.setState(this.baseState)
                    this.props.navigation.navigate("Profile",{
                        fname : data.firstName,
                        lname : data.lastName,
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
                        this.inputFields.map( (inputObj) => {
                            console.log(inputObj)
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
                                            onChangeText = {(text)=>{
                                                this.setState({ [inputObj.fieldName] : text })
                                                this.setState({ [inputObj.err] : "" })
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
    
                <TouchableOpacity style={styles.button} onPress={()=>this.submit()}>
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

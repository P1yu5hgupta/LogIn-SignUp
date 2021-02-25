import React , { useState ,useEffect } from 'react'
import { View , Text, Image ,Modal, TextInput,TouchableOpacity} from 'react-native'
import { Feather } from '@expo/vector-icons'; 
import AsyncStorage from '@react-native-async-storage/async-storage'
import config from '../../utils/config'
import styles from './styles'

const profile = ({route,navigation}) =>{

    const INITIAL_STATE={
        nameEdit : {
            name : {
                value : '',
                errMsg : '',
                placeholder : 'Enter your name'
            },
            password :{
                value : '',
                errMsg : '',
                placeholder : 'Current Password',
                secureText : true
            }
        },
        passwordEdit : {
            currentPassword : {
                value : '',
                errMsg : '',
                placeholder : 'Current Password',
                secureText : true
            },
            newPassword :{
                value : '',
                errMsg : '',
                placeholder : 'New Password',
                secureText : true
            },
            newPassword1 : {
                value : '',
                errMsg : '',
                placeholder : 'Re-enter New Password',
                secureText : true
            }
        }
    }
    const [nameModalVisible,changeNameModal] = useState(false)
    const [passwordModalVisible,changePasswordModal] = useState(false)
    const [state, updateState] = useState(INITIAL_STATE)

    let userName,userEmail,userId;
    const getFromStorage = async () => {
        userEmail = await AsyncStorage.getItem('@userEmail')
        userName = await AsyncStorage.getItem('@userName')
        userId = 3
    }

    useEffect(()=>{
        getFromStorage()
    },[])
    const isValidNameFields = () => {
        let nameRegex=/^[A-Za-z\s ]+$/;
        let flag = true
        if(state.nameEdit.name.value.length==0){
            updateState(prevState => ({
                ...prevState,
                nameEdit : {
                    ...prevState.nameEdit,
                    name : {
                        ...prevState.nameEdit.name,
                        errMsg : "Name is Mandatory!!!"
                    },
                    
                }
            }))
            flag = false
        }
        else if(!nameRegex.test(state.nameEdit.name.value)){
            updateState(prevState => ({
                ...prevState,
                nameEdit : {
                    ...prevState.nameEdit,
                    name : {
                        ...prevState.nameEdit.name,
                        errMsg : "Must be Alphabatic!!!"
                    },
                    
                }
            })) 
            flag =false
        }
        
        if(state.nameEdit.password.value.length==0){
            updateState(prevState => ({
                ...prevState,
                nameEdit : {
                    ...prevState.nameEdit,
                    password : {
                        ...prevState.nameEdit.password,
                        errMsg : "Password is required!!!"
                    },
                }
            })) 
            flag=false
        }
        return flag
    }
    const isValidPasswordFields = () =>{
        let flag = true
        if(state.passwordEdit.currentPassword.value.length==0){
            updateState(prevState => ({
                ...prevState,
                passwordEdit : {
                    ...prevState.passwordEdit,
                    currentPassword : {
                        ...prevState.passwordEdit.currentPassword,
                        errMsg : "**Required"
                    },
                    
                }
            }))
            flag=false
        }
        if(state.passwordEdit.newPassword.value.length<6){
            updateState(prevState => ({
                ...prevState,
                passwordEdit : {
                    ...prevState.passwordEdit,
                    newPassword : {
                        ...prevState.passwordEdit.newPassword,
                        errMsg : "Must be atleast 6 characters long!!"
                    },
                }
            }))
            flag=false
        }
        else if(state.passwordEdit.newPassword.value !=state.passwordEdit.newPassword1.value){
            updateState(prevState => ({
                ...prevState,
                passwordEdit : {
                    ...prevState.passwordEdit,
                    newPassword1 : {
                        ...prevState.passwordEdit.newPassword1,
                        errMsg : "Password don't match!!"
                    },
                }
            }))
            flag=false
        }
        return flag
    }

    const handleChange = (editType , key,text) => {
        updateState(prevState => ({
            ...prevState,
            [editType] : {
                ...prevState[editType],
                [key] : {
                    ...prevState[editType][key],
                    value : text,
                    errMsg : ''
                },
                
            }
        })) 
    }

    const resetPassword = async ()=>{
        if(isValidPasswordFields()){
            try{
                const response = await fetch(config.url+'/user/update/2',{
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        uid : userId,
                        currentPassword : state.passwordEdit.currentPassword.value,
                        newPassword : state.passwordEdit.newPassword.value,
                    })
                })
                const data = await response.json()
                if(data.status){
                    alert(data.message)
                    navigation.navigate('Profile')
                }
                else{
                    alert(data.message)
                }
            }
            catch(err){
                console.log(err)
            }
        }
    }

    const editName = async () =>{
        if(isValidNameFields()){
            try{
                const response = await fetch(config.url+'/user/update/1',{
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        uid : userId,
                        name : state.nameEdit.name.value,
                        currentPassword : state.nameEdit.password.value,
                    })
                })
                const data = await response.json()
                if(data.status){
                    alert(data.message)
                    navigation.navigate('Profile')
                }
                else{
                    alert(data.message)
                }
            }
            catch(err){
                console.log(err)
            }
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.cover}>
                <TouchableOpacity onPress={()=>navigation.goBack()}>
                    <Image 
                        style={styles.backIcon}
                        source={require('../../assests/images/shared/backLogo.png')}
                    />
                </TouchableOpacity>
                <Image 
                    style = {styles.image}
                    source={require('../../assests/images/profileScreen/profile_photo.jpg')}
                />
            </View>
            <View style={styles.userInfo}>
                <Text style={styles.nameText}>
                    {userName}
                </Text>
                <Text style={styles.editText} onPress={()=> changeNameModal(true)}>
                    Edit
                    <Feather name="edit-3" size={24} color="black" />
                </Text>
                <TouchableOpacity onPress={()=>changePasswordModal(true)}>
                    <Text style={styles.changePassword}>
                        Change Password
                    </Text>
                </TouchableOpacity>
            </View>
            {/* Update Screens */}
            <Modal visible = {nameModalVisible} style = {styles.modalView} animationType='slide'>
                <Text 
                    onPress={()=>{
                        updateState(INITIAL_STATE)
                        changeNameModal(false)
                    }} 
                    style={styles.cancelText}>
                    Cancel
                </Text>
                <View style={styles.form}>
                    {
                        Object.keys(INITIAL_STATE.nameEdit).map( (key) => {
                            const inputObj =  state.nameEdit[key]
                            return(
                                <View key={key}>
                                    <View style={styles.inputView}>
                                        <TextInput 
                                            style={styles.inputBox}
                                            placeholder = {inputObj.placeholder}
                                            placeholderTextColor = "gray"
                                            onChangeText = {(text) => handleChange('nameEdit',key,text)}
                                            value= {inputObj.value}
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
                <TouchableOpacity style={styles.button} onPress={() => editName()}>
                    <Text style={styles.buttonText}>
                        Edit
                    </Text>
                </TouchableOpacity>
            </Modal>
            <Modal visible = {passwordModalVisible} style = {styles.modalView} animationType='slide'>
                <Text 
                    onPress={()=>{
                        updateState(INITIAL_STATE)
                        changePasswordModal(false)
                    }} 
                    style={styles.cancelText}
                >
                    Cancel
                </Text>
                <View style={styles.form}>
                    {
                        Object.keys(INITIAL_STATE.passwordEdit).map( (key) => {
                            const inputObj =  state.passwordEdit[key]
                            return(
                                <View key={key}>
                                    <View style={styles.inputView}>
                                        <TextInput 
                                            style={styles.inputBox}
                                            placeholder = {inputObj.placeholder}
                                            placeholderTextColor = "gray"
                                            onChangeText = {(text) => handleChange('passwordEdit',key,text)}
                                            value= {inputObj.value}
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
                <TouchableOpacity style={styles.button} onPress={() => resetPassword()}>
                    <Text style={styles.buttonText}>
                        Reset
                    </Text>
                </TouchableOpacity>
            </Modal>
        </View>
    )
}


export default profile
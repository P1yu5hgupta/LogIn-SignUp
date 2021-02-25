import React , { useState, useEffect } from 'react'
import { View , Text, Image ,Modal, TextInput,TouchableOpacity} from 'react-native'
import { Feather } from '@expo/vector-icons'; 
import styles from './styles'
import {
    INITIAL_STATE,
    getFromStorage,
    resetPassword,
    editName,
    handleChange
} from './utilFunctions'

const profile = ({navigation}) =>{

    const [nameModalVisible,changeNameModal] = useState(false)
    const [passwordModalVisible,changePasswordModal] = useState(false)
    const [state, updateState] = useState(INITIAL_STATE)
    
    let userName,userEmail,userId;
    useEffect(()=>{
        userName,userEmail,userId = getFromStorage()
    },[])

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
                                            onChangeText = {(text) => handleChange('nameEdit',key,text,updateState)}
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
                <TouchableOpacity style={styles.button} onPress={() => editName(state, updateState)}>
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
                                            onChangeText = {(text) => handleChange('passwordEdit',key,text,updateState)}
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
                <TouchableOpacity style={styles.button} onPress={() => resetPassword(state, updateState)}>
                    <Text style={styles.buttonText}>
                        Reset
                    </Text>
                </TouchableOpacity>
            </Modal>
        </View>
    )
}


export default profile
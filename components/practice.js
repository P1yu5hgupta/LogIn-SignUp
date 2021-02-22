import React , { useState ,useEffect } from 'react'
import { View , Text, StyleSheet,BackHandler,Alert } from 'react-native'

export default practice = () =>{

    const backAction = () => {
        Alert.alert("Hold on!", "Are you sure you want to go back?", [
          {
            text: "Cancel",
            onPress: () => null,
            style: "cancel"
          },
          { text: "YES", onPress: () => BackHandler.exitApp() }
        ]);
        return true;
      };
    
      useEffect(() => {
        BackHandler.addEventListener("hardwareBackPress", backAction);
    
        return () =>
          BackHandler.removeEventListener("hardwareBackPress", backAction);
      }, []);

    return (
        <View style={styles.container}>

        </View>
    )
}

const styles = StyleSheet.create({
    container : {
        flex: 1,
        display : 'flex',
        flexDirection : 'row',
        justifyContent : 'center',
        marginTop : 29,
        backgroundColor : 'gray'
    }
})
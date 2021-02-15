import React,{ Component } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';

export default class profile extends Component{    
    render(){
        return(
            <View style={styles.container}>
                <Image
                    source={require('../assets/home/hello.gif')}
                />
                <TouchableOpacity style={ styles.button } onPress={() => { this.props.navigation.navigate("Home") }} >
                    <Text style={ styles.text }>Go to Home</Text>
                </TouchableOpacity>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        alignContent: 'center',
        justifyContent: 'center',
    },
    button: {
        borderWidth: 1,
        backgroundColor: 'blue',
        marginTop: 30
    },
    text: {
        textAlign: 'center',
        color: 'white'
    }
});

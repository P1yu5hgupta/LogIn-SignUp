import React, { useEffect,useState } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import styles from './styles'
import getDeviceInfo from '../../utils/getDeviceInfo'

const extraUtils = ({ navigation }) => {
    const [deviceInfo, storeDeviceInfo] = useState()

    useEffect(() => {
        getDeviceInfo(storeDeviceInfo)
    },[])
    return (
        <View style = {styles.container}>
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Iframe')}>
                <Text>Press to get iframe</Text>
            </TouchableOpacity>
        </View>
    );
}
export default extraUtils
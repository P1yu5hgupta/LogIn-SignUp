import Constants from 'expo-constants'

const getDeviceInfo = async () => {
    const deviceInfo = {}
    deviceInfo.androidId = Constants.deviceName
    deviceInfo.appOwnership = Constants.appOwnership
    deviceInfo.deviceYearClass = Constants.deviceYearClass
    deviceInfo.systemVersion = Constants.systemVersion
    deviceInfo.nativeBuildVersion = Constants.nativeBuildVersion
    deviceInfo.platform = Constants.platform

    console.log(deviceInfo)
}

export default getDeviceInfo
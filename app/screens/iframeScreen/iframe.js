import React, { useState } from 'react'
import { WebView } from 'react-native-webview'

const iframe = () => {
    const [web_url,changeWebUrl] = useState('https://giphy.com/gifs/duzpaTbCUy9Vu/html5')
    return (
        <WebView
            originWhitelist={['*']} 
            source={{ html: "<div margin-top = '100'><iFrame src='"+web_url+"' width= '800' height = '800' /><div>" }} />
    )
}

export default iframe
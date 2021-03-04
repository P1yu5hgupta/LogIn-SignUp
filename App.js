import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import getStore from './app/store/index'
import { Provider } from 'react-redux'
import Home from './app/screens/homeScreen/index'
import SignUp from './app/screens/signUpScreen/index'
import Email from './app/screens/getEmailScreen/index'
import Password from './app/screens/getPasswordScreen/index'
import ShowTweets from './app/screens/newsfeedsScreen/index'
import CreateTweet from './app/screens/createTweetScreen/index'
import Profile from './app/screens/profileScreen/index'
import SingleTweet from './app/screens/showSingleFeedScreen/index'
import SearchFriend from './app/screens/friendsScreen/index'
import Iframe from './app/screens/iframeScreen/iframe'
import ExtraUtils from './app/screens/iframeScreen/index'
import FriendRequest from './app/screens/friendRequestScreen/index'

const Stack = createStackNavigator();
const store = getStore()

const App = () => {
    return (
        <Provider store = { store }>
            <NavigationContainer>
                <Stack.Navigator initialRouteName="ShowTweets">
                    <Stack.Screen name="Home" component={Home} options={{headerShown:false}}/>
                    <Stack.Screen name="SignUp" component={SignUp} options={{headerShown:false}}/>
                    <Stack.Screen name="ShowTweets" component={ShowTweets} options={{headerShown:false}}/>
                    <Stack.Screen name="Email" component={Email} options={{headerShown:false}}/>
                    <Stack.Screen name="Password" component={Password} options={{headerShown:false}}/>
                    <Stack.Screen name="CreateTweet" component={CreateTweet} options={{headerShown:false}}/>
                    <Stack.Screen name="Profile" component={Profile} options={{headerShown:false}}/>
                    <Stack.Screen name="SingleTweet" component={SingleTweet} options={{headerShown:false}}/>
                    <Stack.Screen name="SearchFriends" component={SearchFriend} options={{headerShown:false}}/>
                    <Stack.Screen name="FriendRequest" component={FriendRequest} options={{headerShown:false}}/>
                    <Stack.Screen name="Iframe" component={Iframe} options={{headerShown:false}}/>
                    <Stack.Screen name="ExtraUtils" component={ExtraUtils} options={{headerShown:false}}/>
                </Stack.Navigator>
            </NavigationContainer>
          </Provider>
    );
}
 
export default App;
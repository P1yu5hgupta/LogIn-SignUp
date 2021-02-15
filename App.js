import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';

import Home from './components/home'
import SignIn from './components/signIn'
import SignUp from './components/signUp'
import Profile from './components/profile'

const Drawer = createDrawerNavigator();

export default class App extends Component {
    render(){
        return (
          <NavigationContainer>
              <Drawer.Navigator initialRouteName="Home">
                  <Drawer.Screen name="Home" component={Home} />
                  <Drawer.Screen name="SignIn" component={SignIn} />
                  <Drawer.Screen name="SignUp" component={SignUp} />
                  <Drawer.Screen name="Profile" component={Profile} />
              </Drawer.Navigator>
          </NavigationContainer>
        );
    }
}

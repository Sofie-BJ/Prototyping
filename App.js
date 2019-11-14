import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import Home from './screens/Home';
import CreateRoute from './screens/CreateRoute';
import CreatePopUp from './components/CreatePopUp';
import Menu from './components/Menu';
import UpdatePopUp from './components/UpdatePopUp';

import {createStackNavigator} from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';


//StackNavigator. Define screens and initialRouteName specifies start screen.
const StackNavigator = createStackNavigator({
    Home: Home,
    CreateRoute: CreateRoute
},
 {
    initialRouteName: 'Home'
});


const AppContainer = createAppContainer(StackNavigator);

export default class App extends Component {
    render() {
        return <AppContainer/>
    };
}


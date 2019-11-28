import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import Home from './src/screens/Home';
import CameraScreen from './src/screens/CameraScreen';
import CreatePopUp from './src/components/CreatePopUp';
import Menu from './src/components/Menu';
import UpdatePopUp from './src/components/UpdatePopUp';

import {createStackNavigator} from 'react-navigation-stack';
import {createAppContainer} from 'react-navigation';
import HomeRoutes from "./src/screens/HomeRoutes";
import DisplayRoute from "./src/screens/DisplayRoute";

//StackNavigator. Define screens and initialRouteName specifies start screen.
const StackNavigator = createStackNavigator(
    {
        Home: Home,
        HomeRoutes: HomeRoutes,
        DisplayRoute: DisplayRoute,
        Camera: CameraScreen,
    },
    {
        initialRouteName: 'HomeRoutes'
    });

const AppContainer = createAppContainer(StackNavigator);

export default class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
        }
    }
    render() {
        return <AppContainer/>
    };
}


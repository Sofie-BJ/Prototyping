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
import RouteCreator from "./src/screens/RouteCreator";
import GoRoute from "./src/screens/GoRoute";

//StackNavigator. Define screens and initialRouteName specifies start screen.
const StackNavigator = createStackNavigator(
    {
        HomeRoutes: HomeRoutes,
        DisplayRoute: DisplayRoute,
        CameraScreen: CameraScreen,
        RouteCreator: RouteCreator,
        GoRoute: GoRoute

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


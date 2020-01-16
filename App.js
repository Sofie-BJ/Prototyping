import React, {Component} from 'react';
import CameraScreen from './src/screens/CameraScreen';

import {createStackNavigator} from 'react-navigation-stack';
import {createAppContainer} from 'react-navigation';
import Home from "./src/screens/Home";
import RouteModifier from "./src/screens/RouteModifier";
import DisplayRoute from "./src/screens/DisplayRoute";

//StackNavigator. Define screens and initialRouteName specifies start screen.
const StackNavigator = createStackNavigator(
    {
        Home: Home,
        CameraScreen: CameraScreen,
        RouteModifier: RouteModifier,
        DisplayRoute: DisplayRoute,
    },
    {
        initialRouteName: 'Home'
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


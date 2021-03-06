import React, {Component} from 'react';
import CameraScreen from './src/screens/CameraScreen';

import {createStackNavigator} from 'react-navigation-stack';
import {createAppContainer} from 'react-navigation';
import HomeRoutes from "./src/screens/HomeRoutes";
import RouteCreator from "./src/screens/RouteCreator";
import GoRoute from "./src/screens/GoRoute";

//StackNavigator. Define screens and initialRouteName specifies start screen.
const StackNavigator = createStackNavigator(
    {
        HomeRoutes: HomeRoutes,
        CameraScreen: CameraScreen,
        RouteCreator: RouteCreator,
        GoRoute: GoRoute,
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


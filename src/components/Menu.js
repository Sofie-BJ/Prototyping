import React from 'react';
import {StyleSheet, Text, View, Button, TouchableOpacity} from 'react-native';

import CreatePopUp from "./CreatePopUp";
import Route from "../Route";

export default class Menu extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            popUpVisible: null
        };

        this.routes = [];
    }

    showDialog = () => {
        this.setState({
            popUpVisible: new CreatePopUp()
        });
    };

    getRoutes = () => {
        return this.routes;
    };

    getRouteTitle = (routeTitle) => {
        let newRoute = new Route(routeTitle);
        this.routes.push(newRoute);
    };

    render() {

        let popup = this.state.popUpVisible;

        return (
            <View style={styles.container}>
                <Button onPress={this.showDialog} title="Create Route"/>
                { popup ?
                    (<CreatePopUp visible={popup.getVisible()} callback={this.getRouteTitle}/>): null
                }
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        alignSelf: 'flex-end',
        top: 24,
        backgroundColor: 'black'

    }
});

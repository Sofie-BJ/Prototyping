// Vi har oprettet klassen Route for at kunne oprette Route-objekter i appen.
// Klassen består af 2 variabler og 2 metoder.
import React from 'react';
import {StyleSheet, Text, View, Button, TouchableOpacity} from 'react-native';

export default class Route extends React.Component {
    constructor(props) {
        super(props);
        this.routePoints = [];
    }

    addRoutePoint(routePoint) {
        this.routePoints.push(routePoint);
    }

    getRoutePoints() {
        return this.routePoints.length;
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.text}>{this.props.title}</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'blue',
        top: 24
    },
    text: {
        fontSize: 24,
        color: 'white'
    }
});
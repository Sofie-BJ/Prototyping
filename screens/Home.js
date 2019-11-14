import React, { Component,Fragment } from 'react';
import { View, Text, StyleSheet,Constants,Button } from 'react-native';


export default class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
        };
    }
    render() {
        const { params } = this.props.navigation.state;
        return (
            <View>
                <Text> {'Velkommen til zonen ved '} </Text>
            </View>
        )
    }

}
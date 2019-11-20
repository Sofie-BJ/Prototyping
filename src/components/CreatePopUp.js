import React from 'react';
import {StyleSheet, Text, View, Button, TouchableOpacity} from 'react-native';

import Dialog from "react-native-dialog";

export default class CreatePopUp extends React.Component {

    constructor(props) {
        super(props);
        this.newRouteTitle = null;
    }

    render() {
        return (
            <View>
                <Dialog.Container visible={true}>
                    <Dialog.Title>What to Remember</Dialog.Title>
                    <Dialog.Input placeholder="Write the title of what you wish to remember"
                                  onChangeText={routeTitle => this.newRouteTitle = routeTitle}/>
                    <Dialog.Button label="Cancel" onPress={() => this.props.cancelPopUp}/>
                    <Dialog.Button label="Save" onPress={() => this.props.callback(this.newRouteTitle)}/>
                </Dialog.Container>
            </View>
        );
    }
}




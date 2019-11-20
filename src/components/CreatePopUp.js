import React from 'react';
import {StyleSheet, Text, View, Button, TouchableOpacity} from 'react-native';

import Dialog from "react-native-dialog";

export default class CreatePopUp extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            dialogVisible: true,
        }

        this.newRouteTitle = null;
    }

    getVisible = () => {
        return this.state.dialogVisible;
    }

    handleCancel = () => {
        this.setState({dialogVisible: false});
    };

    handleSave = () => {
        this.props.callback(this.newRouteTitle)
        this.setState({dialogVisible: false});
    };

    render() {
        return (
            <View>
                <Dialog.Container visible={this.state.dialogVisible}>
                    <Dialog.Title>What to Remember</Dialog.Title>
                    <Dialog.Input placeholder="Write the title of what you wish to remember"
                                  onChangeText={routeTitle => this.newRouteTitle = routeTitle}/>
                    <Dialog.Button label="Cancel" onPress={this.handleCancel}/>
                    <Dialog.Button label="Save" onPress={this.handleSave}/>
                </Dialog.Container>
            </View>
        );
    }
}




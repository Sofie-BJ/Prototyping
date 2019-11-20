import React from 'react';
import {StyleSheet, Text, View, Button, TouchableOpacity} from 'react-native';

import Dialog from "react-native-dialog";

export default class CreatePopUp extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            dialogVisible: this.props.visible
        }
    }

    handleCancel = () => {
        this.setState({dialogVisible: false});
    };

    handleSave = () => {
        this.setState({dialogVisible: false});
    };

    render() {
        return (
            <View>
                <Dialog.Container visible={this.state.dialogVisible}>
                    <Dialog.Title>What to Remember</Dialog.Title>
                    <Dialog.Input placeholder="Write the title of what you wish to remember"></Dialog.Input>
                    <Dialog.Button label="Cancel" onPress={this.handleCancel}/>
                    <Dialog.Button label="Save" onPress={this.handleSave}/>
                </Dialog.Container>
            </View>
        );
    }
}




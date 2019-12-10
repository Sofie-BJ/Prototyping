import React from 'react';
import {StyleSheet, Text, View, Button, TouchableOpacity} from 'react-native';

import Dialog from "react-native-dialog";

export default class CreatePopUp extends React.Component {

    constructor(props) {
        super(props);
        this.title = null;
    }

    render() {
        return (
            <View>
                <Dialog.Container visible={true}>
                    <Dialog.Title>{this.props.title}</Dialog.Title>
                    <Dialog.Input placeholder="Skriv titlen her"
                                  onChangeText={title => this.title = title}/>
                    <Dialog.Button label="Cancel" onPress={() => this.props.cancel()}/>
                    <Dialog.Button label="Save" onPress={() => {
                        if (this.title !== null) {
                            this.props.callback(this.title)
                        }
                    }}/>
                </Dialog.Container>
            </View>
        );
    }
}





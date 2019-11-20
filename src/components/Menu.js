import React from 'react';
import {StyleSheet, Text, View, Button, TouchableOpacity} from 'react-native';

import CreatePopUp from "./CreatePopUp";

export default class Menu extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            popUpVisible: false
        }
    }

    showDialog = () => {
        this.setState({
            popUpVisible: true
        });
    }

    render() {
        return (
            <View style={styles.container}>
                <Button onPress={this.showDialog} title="Create Route"/>
                {this.state.popUpVisible ?
                    (<CreatePopUp visible={true}/>): null
                }
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        alignSelf: 'flex-end',
        top: 0,
    }
});

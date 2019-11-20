import React from 'react';
import {StyleSheet, Text, View, Button, TouchableOpacity} from 'react-native';

import CreatePopUp from "./CreatePopUp";
import Route from "../Route";
import StyleSheetPropType from "react-native-web/dist/modules/StyleSheetPropType";

export default class Menu extends React.Component {

    id = 0;

    constructor(props) {
        super(props);
        this.state = {
            routes: this.props.routes
        };

    }

    render() {
        return (
            <View style={styles.container}>
                {this.state.routes.map(route =>
                    (<Route key={0} title={route.title}/>)
                )}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'black',
        top: 24,
    },
});


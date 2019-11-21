import React from 'react';
import {StyleSheet, Text, View, Button, TouchableOpacity} from 'react-native';

import Route from "../Route";

export default class Menu extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            routes: this.props.routes
        };
    }

    render() {
        console.log(this.state.routes)
        return (
            <View>
                {this.state.routes ? (
                    <View style={styles.container}>
                        {this.state.routes.map(route => (
                            <Route key={route.props.toString()} title={route.props}/>
                        ))}
                    </View>
                ) : null}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
});


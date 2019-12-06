import React from 'react';
import {StyleSheet, Text, View, Button, AsyncStorage, TouchableOpacity} from 'react-native';
import Route from "../Route";
import CreatePopUp from "../components/CreatePopUp";
import {IconButton, Colors} from 'react-native-paper';

export default class HomeRoutes extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            routes: null,
            popUp: null
        };

        AsyncStorage.getAllKeys().then(response => {
            if (response !== null) {
                this.setState({
                    routes: response
                })
            }
        })
    }

    addRoute = (routeTitle) => {
        this.setState({
            routes: [...this.state.routes, routeTitle],
            popUp: null
        });
        this.props.navigation.navigate("RouteCreator", {route: routeTitle});
    };

    cancelPopUp = () => {
        this.setState(
            {popUp: null})
    };

    createPopUp = () => {
        this.setState(
            {popUp: new CreatePopUp()});
    };

    render() {
        let popUp = this.state.popUp;
        let routes = this.state.routes;

        return (
            <View style={styles.container}>
                <View style={styles.iconButton}>
                    <IconButton
                        onPress={this.createPopUp}
                        icon='plus'
                        size={40}/>
                </View>

                {popUp ?
                    (<CreatePopUp title="Ny rute" callback={this.addRoute} cancel={this.cancelPopUp}/>) : null
                }
                {routes !== null ?
                    routes.map(routeTitle => (
                        (<View style={styles.routeDiv}>
                                <Text style={styles.text}>{routeTitle}</Text>
                                <IconButton
                                    onPress={() => this.props.navigation.navigate("GoRoute", {routeTitle: routeTitle})}
                                    icon="walk"
                                    style={styles.walkingMan}
                                />

                            </View>
                        ))) : <Text>Henter ruter</Text>
                }

            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#d3e0e3',
    },
    iconButton: {
        borderRadius: 40,
        backgroundColor: '#FFFFFF80',
        alignSelf: "flex-end",
        justifyContent: 'flex-end',
        margin: 10,
    },
    routeDiv: {
        flexDirection: 'row',
        alignItems: 'stretch',
        backgroundColor: 'white',
        justifyContent: 'space-between',
        padding: 6,
        margin: 5,
        borderRadius: 10
    },
    text: {
        fontSize: 24,
        top: 5,
    }
});

import React from 'react';
import {StyleSheet, Text, View, Button, AsyncStorage, TouchableOpacity, Alert} from 'react-native';
import Route from "../Route";
import CreatePopUp from "../components/CreatePopUp";
import {IconButton, Colors} from 'react-native-paper';

export default class HomeRoutes extends React.Component {

    static navigationOptions = {
        title: 'Dine ruter'
    };

    constructor(props) {
        super(props);
        this.state = {
            routes: null,
        };
    }

    componentDidMount() {
        const {navigation} = this.props;
        this.focusListener = navigation.addListener('didFocus', () => {
            this.getAllRoutes();
        });
    }

    componentWillUnmount() {
        this.focusListener.remove();
    }

    getAllRoutes = () => {
        AsyncStorage.getAllKeys().then(response => {
            if (response !== null) {
                this.setState({
                    routes: response
                })
            }
        })
    };

    deleteRoute = (routeTitle) => {
        Alert.alert(
            'Slet rute',
            'Er du sikker på at du vil slette ruten?',
            [
                {
                    text: 'OK', onPress: () => {
                        AsyncStorage.removeItem(routeTitle).then(console.log("Item removed"));
                        this.getAllRoutes();
                    }
                },
                {text: 'Cancel', onPress: () => console.log("Cancel")},
            ],
            {cancelable: false},
        );
    };

    handleScreenChange = (routeTitle) => {
        this.props.navigation.navigate("GoRoute", {routeTitle: routeTitle});
    };

    render() {
        let routes = this.state.routes;

        return (
            
            <View style={styles.container}>
                <View style={styles.iconButton}>
                    <IconButton
                        onPress={() => this.props.navigation.navigate("RouteCreator", {popUp: true})}
                        icon='plus'
                        color='white'
                        size={40}/>
                </View>

                {routes !== null ?
                    routes.map(routeTitle => (
                        <Route
                            id={routeTitle}
                            routeTitle={routeTitle}
                            handleRouteDelete={this.deleteRoute}
                            handleScreenChange={this.handleScreenChange}/>
                        )) : <Text>Henter ruter</Text>
                }

            </View>
         
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#E5E5E5',
        alignItems: 'center',
        padding: 10
    },
    
    iconButton: {
        justifyContent: 'center',
        backgroundColor: '#6EFAC2',
        borderRadius: 80,
        position: 'absolute',
        bottom: 10,
        shadowColor: "#000",
        shadowOffset: {
	        width: 0,
	        height: 4,
        },
        shadowOpacity: 0.30,
        shadowRadius: 4.65,

        elevation: 8,
    },


});

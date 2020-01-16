import React from 'react';
import {StyleSheet, Text, View, Button, AsyncStorage, TouchableOpacity, Alert} from 'react-native';
import {IconButton, Colors} from 'react-native-paper';
import RouteOverview from "../components/RouteOverview";
import PopUp from "../components/PopUp";
import * as StorageUtil from "../util/storageUtil"
import * as PermissionsUtil from "../util/PermissionsUtil";
import Route from "../datamodels/Route";

export default class Home extends React.Component {

    static navigationOptions = {
        title: 'Dine ruter'
    };

    constructor(props) {
        super(props);
        this.state = {
            routes: null,
            popUp: false
        };
        StorageUtil.getAllRoutes(this.updateRoutes);
        PermissionsUtil.askPermissions();
    };

    updateRoutes = (routes) => {
        this.setState({
            routes: routes
        })
    };

    componentDidMount() {
        const {navigation} = this.props;
        this.focusListener = navigation.addListener('didFocus', () => {
            StorageUtil.getAllRoutes(this.updateRoutes);
        });
    }

    componentWillUnmount() {
        this.focusListener.remove();
    }

    deleteRoute = (route) => {
        Alert.alert(
            'Slet rute',
            'Er du sikker på at du vil slette ruten?',
            [
                {
                    text: 'OK', onPress: () => {
                        AsyncStorage.removeItem(route.title).then(console.log("Item removed"));
                        StorageUtil.getAllRoutes(this.updateRoutes);
                    }
                },
                {text: 'Cancel', onPress: () => console.log("Cancel")},
            ],
            {cancelable: false},
        );
    };

    handleScreenChange = (route) => {
        this.props.navigation.navigate("DisplayRoute", {route: route});
    };

    createRoute = (routeTitle) => {
        let route = new Route(routeTitle);
        this.setState({
            popUp: false
        });
        this.props.navigation.navigate("RouteModifier", {route: route})
    };


    render() {
        let {routes} = this.state;
        return (
            <View style={styles.container}>
                <View style={styles.iconButton}>
                    <IconButton
                        onPress={() => this.setState({popUp: true})}
                        icon='plus'
                        color='white'
                        size={40}/>
                </View>

                  {routes ?
                      routes.map(route => (
                          <RouteOverview
                              key={route.title}
                              route={route}
                              deleteFunc={this.deleteRoute}
                              displayFunc={this.handleScreenChange}/>
                      )) : <Text>Henter ruter</Text>
                  }

                {this.state.popUp ?
                    (<PopUp dialogTitle="Ny rute" saveFunc={this.createRoute}
                            cancelFunc={this.cancelPopUp}/>) : null
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

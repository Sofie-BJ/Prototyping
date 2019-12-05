import React, {Component} from 'react';
import {StyleSheet, Text, View, Dimensions, Image, TextInput} from 'react-native';
import * as Permissions from 'expo-permissions';
import * as Location from "expo-location";
import {IconButton, Colors} from 'react-native-paper';
import RoutePoint from '../RoutePoint';

import Route from "../Route";
import MapView, {Marker, Callout} from "react-native-maps";

import {AsyncStorage} from "react-native-web";

export default class RouteCreator extends React.Component {
    constructor(props) {
        super(props);
        this.route = this.props.navigation.getParam('route');

        this.state = {
            location: null,
            errorMessage: null,
            region: null,
            marker: null,
            popUp: null,
            route: this.route
        };
    }

    static navigationOptions = {header: null};

    async componentDidMount() {
        await this.AskPermission();

        let option = {
            accuracy: Location.Accuracy.BestForNavigation,
            timeInterval: 1000,
            distanceInterval: 1,
            mayShowUserSettingsDialog: true
        };

        let locationCallback = (currentPosition) => {
            this.setState({
                location: currentPosition,
                region: {
                    latitude: currentPosition.coords.latitude,
                    longitude: currentPosition.coords.longitude,
                    latitudeDelta: 0.075,
                    longitudeDelta: 0.075
                },
                marker: {
                    latlng: currentPosition.coords
                },
                error: null
            });
        }

        this.watchid = Location.watchPositionAsync(option, locationCallback);
    }

    componentWillUnmount() {
        this.watchid.remove();
    }

    async AskPermission() {
        let {status} = await Permissions.askAsync(Permissions.LOCATION);
        console.log('Asking for geo permission: ' + status);
        if (status !== 'granted') {
            this.setState({
                errorMessage: 'Permission to access location was denied',
            });
        }
    }

    setRoutePointInfo = (routeTitle, image) => {
        let coordinate = {
            latitude: this.state.location.coords.latitude,
            longitude: this.state.location.coords.longitude
        };
        let routePoint = new RoutePoint(routeTitle, coordinate, image);
        let newRoutePointArray = [...this.state.route.routePoints];
        newRoutePointArray.push(routePoint);
        this.setState({
            route: {
                ...this.state.route,
                routePoints: newRoutePointArray
            }
        });
    };

    render() {
        let popUp = this.state.popUp;

        return (
            <View style={styles.container}>
                {this.state.region ?
                    (<MapView
                        style={styles.mapStyle}
                        initialRegion={this.state.region}>

                        {this.state.route.routePoints.map((routepoint, index) =>
                            (
                                <Marker
                                    key={index}
                                    coordinate={routepoint._coordinate}
                                    pinColor={'blue'}/>
                            ))}

                    </MapView>) : <Text>Venter på mine koordinater...</Text>
                }

                <View style={styles.bottom}>
                    <IconButton
                        size={50}
                        style={styles.button}
                        icon="camera"
                        mode='contained'
                        onPress={() => this.props.navigation.navigate("CameraScreen", {callback: this.setRoutePointInfo})}/>

                </View>

            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    mapStyle: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
        zIndex: -1
    },
    button: {
        alignItems: 'center',
        borderRadius: 100 / 2,
        width: 70,
        height: 70
    },
    bottom: {
        bottom: 10,
        position: 'absolute'
    },
    plainView: {
        width: 300,
    },


});

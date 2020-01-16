import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import * as Permissions from 'expo-permissions';
import * as Location from "expo-location";
import {IconButton, Colors} from 'react-native-paper';
import RoutePoint from '../datamodels/RoutePoint';
import Map from "../components/Map";

import * as StorageUtil from "../util/storageUtil"

export default class RouteModifier extends React.Component {
    constructor(props) {
        super(props);
        this.route = this.props.navigation.getParam("route");

        this.state = {
            location: null,
            errorMessage: null,
            region: null,
            marker: null,
            route: this.route,
        };
    }

    static navigationOptions = {
        title: 'Lav en ny rute',
    };

    componentDidMount() {
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
                    latitudeDelta: 0.005,
                    longitudeDelta: 0.005
                },
                marker: {
                    latlng: currentPosition.coords
                },
                error: null
            });
        };

        this.watchid = Location.watchPositionAsync(option, locationCallback);
    }

    componentWillUnmount() {
        this.watchid.then(e => {
            e.remove()
        })
    }


    addRoutePoint = (routeTitle, image) => {
        let coordinate = {
            latitude: this.state.location.coords.latitude,
            longitude: this.state.location.coords.longitude
        };
        let newRoutePointArray = [...this.state.route.routePoints];
        newRoutePointArray.push(new RoutePoint(routeTitle, coordinate, image));
        this.setState({
            route: {
                ...this.state.route,
                routePoints: newRoutePointArray
            }
        });
    };

    saveRoute = async () => {
        StorageUtil.writeRoute(this.state.route);
        this.props.navigation.navigate("Home");
    };

    render() {
        let route = this.state.route;

        return (
            <View style={styles.container}>
                {this.state.region ?
                 <Map routePoints={route.routePoints} coords={this.state.location.coords} region={this.state.region}/>
                    : <Text>Venter på mine koordinater...</Text>
                }

                <View style={styles.bottom}>
                    <IconButton
                        size={40}
                        icon="camera"
                        color="white"
                        onPress={() => this.props.navigation.navigate("CameraScreen", {callback: this.addRoutePoint})}/>
                    {route !== null ?
                        (route.routePoints.length !== 0 ?
                                (<IconButton
                                    size={40}
                                    icon="check-circle"
                                    color="white"
                                    onPress={this.saveRoute}/>) : null
                        ) : null
                    }
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

    button: {
        alignItems: 'center',
        borderRadius: 100 / 2,
        width: 70,
        height: 70
    },
    bottom: {
        bottom: 10,
        position: 'absolute',
        alignItems: 'center',
        borderRadius: 80,
        backgroundColor: '#6EFAC298',
        flexDirection: 'row',
        
    },

    plainView: {
        width: 300,
    },


});

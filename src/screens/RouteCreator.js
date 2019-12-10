import React, {Component} from 'react';
import {StyleSheet, Text, View, Dimensions, Image, TextInput, AsyncStorage, ActivityIndicator} from 'react-native';
import * as Permissions from 'expo-permissions';
import * as Location from "expo-location";
import {IconButton, Colors} from 'react-native-paper';
import RoutePoint from '../RoutePoint';

import Route from "../Route";
import MapView, {Marker} from "react-native-maps";
import CreatePopUp from "../components/CreatePopUp";
import Loader from "../components/Loader";

export default class RouteCreator extends React.Component {
    constructor(props) {
        super(props);
        this.route = null;

        this.state = {
            location: null,
            errorMessage: null,
            region: null,
            marker: null,
            popUp: this.props.navigation.getParam("popUp"),
            route: this.route,
            visible: false
        };
    }

    static navigationOptions = {
        title: 'Lav en ny rute',
    };

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
                    latitudeDelta: 0.005,
                    longitudeDelta: 0.005
                },
                marker: {
                    latlng: currentPosition.coords
                },
                error: null
            });
        };

        this.watchid = await Location.watchPositionAsync(option, locationCallback);
    }

    componentWillUnmount() {
        this.watchid.then(e => {
            e.remove()
        })
    }

    async AskPermission() {
        let {status} = await Permissions.askAsync(Permissions.LOCATION);
        console.log('Asking for geo permission: ' + status);
        if (status !== 'granted') {
            this.setState({
                errorMessage: 'Permission to access location was denied',
            });
        }
    };

    createRoute = (routeTitle) => {
        let newRoute = new Route(routeTitle);
        this.setState({
            route: newRoute,
            popUp: null
        });
    };

    cancelPopUp = () => {
        this.setState(
            {popUp: null})
        this.props.navigation.navigate("HomeRoutes")
    };

    createPopUp = () => {
        this.setState(
            {popUp: new CreatePopUp()});
    };

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

    saveRoute = async () => {
        try {
            let routeTitle = this.state.route.title;
            await AsyncStorage.setItem(routeTitle, JSON.stringify(this.state.route));
            this.setState({
                visible: true
            })
        } catch (e) {
            console.log("RouteCreator failed to save route: " + e.message)
        }
        this.props.navigation.navigate("HomeRoutes");
    };

    render() {
        let popUp = this.state.popUp;
        let route = this.state.route;

        return (
            <View style={styles.container}>
                {this.state.region ?
                    (<MapView
                        style={styles.mapStyle}
                        initialRegion={this.state.region}>

                        <Marker coordinate={this.state.location.coords}/>

                        {route !== null ?
                            route.routePoints.map((routepoint, index) => (
                                <Marker
                                    key={index}
                                    coordinate={routepoint._coordinate}
                                    pinColor={'blue'}/>
                            )) : null
                        }

                    </MapView>) : <Text>Venter på mine koordinater...</Text>
                }
                {popUp ?
                    (<CreatePopUp title="Ny rute" callback={this.createRoute} cancel={this.cancelPopUp}/>) : null
                }
                <Loader visible={this.state.visible}/>


                <View style={styles.bottom}>
                    <IconButton
                        size={40}
                        icon="camera"
                        onPress={() => this.props.navigation.navigate("CameraScreen", {callback: this.setRoutePointInfo})}/>
                    {route !== null ?
                        (route.routePoints.length !== 0 ?
                                (<IconButton
                                    size={40}
                                    icon="check-circle"
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
        position: 'absolute',
        alignItems: 'center',
        borderRadius: 80,
        backgroundColor: '#FFFFFF80',
        borderColor: 'black',
        borderWidth: 1,
        flexDirection: 'row',

    },
    plainView: {
        width: 300,
    },


});

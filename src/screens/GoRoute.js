import React, {Component} from 'react';
import {StyleSheet, Text, View, Dimensions, Image, AsyncStorage} from 'react-native';
import * as Permissions from 'expo-permissions';
import * as Location from "expo-location";
import {IconButton, Colors} from 'react-native-paper';

import MapView, {Marker, Callout} from "react-native-maps";

export default class GoRoute extends React.Component {
    constructor(props) {
        super(props);
        let routeTitle = this.props.navigation.getParam("routeTitle");
        this.watchid = null;
        this.state = {
            location: null,
            errorMessage: null,
            region: null,
            marker: null,
        };

        AsyncStorage.getItem(routeTitle).then(response => {
            this.route = JSON.parse(response);
            console.log(this.route)
        });

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
        };
        this.watchid = Location.watchPositionAsync(option, locationCallback);
    }

    async componentWillUnmount() {
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

    render() {

        console.log(this.route)
        return (
            <View style={styles.container}>
                {this.route ?
                    (this.state.region ?
                        (<MapView
                            style={styles.mapStyle}
                            initialRegion={this.state.region}>

                            {this.route.routePoints.map((routePoint, index) => (
                                <Marker
                                    key={index}
                                    coordinate={routePoint._coordinate}>

                                    <Callout style={styles.plainView}>
                                        <View>
                                            <Text>{routePoint._title}</Text>
                                            <Image style={{width:100, height: 100}} source={{uri:routePoint._image}}/>
                                        </View>
                                    </Callout>
                                </Marker>

                            ))}
                        </MapView>) : null)
                    : <Text>Venter på rute</Text>}

                <View style={styles.bottom}>
                    <IconButton
                        size={40}
                        icon="keyboard-backspace"
                        onPress={() => this.props.navigation.goBack()}/>
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

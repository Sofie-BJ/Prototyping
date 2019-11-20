import React from 'react';
import MapView, {Marker} from 'react-native-maps';
import {StyleSheet, Text, View, Dimensions} from 'react-native';

import * as Permissions from 'expo-permissions';
import * as Location from 'expo-location';
import Menu from "../components/Menu";

export default class Home extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            location: null,
            errorMessage: null,
            region: null,
            marker: null
        }
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

    render() {
        return (
            <View style={styles.container}>

                <Menu/>

                {this.state.region ?
                    (<MapView
                        style={styles.mapStyle}
                        initialRegion={this.state.region}>

                        <Marker coordinate={this.state.marker.latlng} title="Home"/>

                    </MapView>) : <Text>Venter på mine koordinater...</Text>
                }
            </View>
        );
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
    paragraph: {
        margin: 24,
        fontSize: 18,
        textAlign: 'center'
    },

});
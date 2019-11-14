import React, {Component, Fragment} from 'react';
import {View, Text, StyleSheet, Button} from 'react-native';
import MapView, {Marker, Polyline, Circle} from 'react-native-maps';
import * as Location from 'expo-location';

import * as Permissions from 'expo-permissions';
import {Dimensions} from "react-native-web";

export default class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            location: null,
            region: {
                latitude: null,
                longitude: null,
                latitudeDelta: 0.075,
                longitudeDelta: 0.075
            },
            errorMessage: '',
        };
    }

    async componentDidMount() {
        await this.AskPermission();

        let options = {
            accuracy: Location.Accuracy.BestForNavigation,
            timeInterval: 1000,
            distanceInterval: 1,
            mayShowUserSettingsDialog: true
        };

        let locationCallback = (currentPosition) => {
            console.log(currentPosition)
            this.setState({
                location: currentPosition,
                region: {
                    latitude: currentPosition.coords.latitude,
                    longitude: currentPosition.coords.longitude,
                    ...this.state.region
                },
                error: null,
            });
        };

        this.watchId = Location.watchPositionAsync(options, locationCallback);
    }

    componentWillUnmount() {
        this.watchId.remove();
    }

    AskPermission = async () => {
        let {status} = await Permissions.askAsync(Permissions.LOCATION);
        console.log('Asking for geo permission' + status);
        if (status !== 'granted') {
            this.setState({
                errorMessage: 'Permission to access location was denied',
            });
        }
    };

    render() {
        return (
          <View style={styles.container}>
              <MapView initialRegion={this.state.region}/>

          </View>
      )
    }
}

const styles = StyleSheet.create({
    mapStyle: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height / 2
    },
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#ecf0f1',
    },
})
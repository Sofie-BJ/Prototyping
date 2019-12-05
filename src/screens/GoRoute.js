import React, {Component} from 'react';
import {StyleSheet, Text, View, Dimensions, Image, TextInput} from 'react-native';
import * as Permissions from 'expo-permissions';
import * as Location from "expo-location";
import {IconButton, Colors} from 'react-native-paper';

import MapView, {Marker, Callout} from "react-native-maps";

export default class GoRoute extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            location: null,
            errorMessage: null,
            region: null,
            marker: null,
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

        const {route} = this.props.navigation.state.params;

        return (
            <View style={styles.container}>
                {this.state.region ?
                    (<MapView
                        style={styles.mapStyle}
                        initialRegion={this.state.region}>

                        {route.routePoints.map((routePoint, index) => (
                            <Marker
                                key={index}
                                coordinate={routePoint.coordinate}>

                                <Callout style={styles.plainView}>
                                    <View>
                                        <Text> 
                                            {
                                              routePoint.title   
                                            }
                                        </Text>
                                        <Image
                                            source={require()}
                                            style={{width: 100, height: 100}}
                                        />
                                       
                                    </View>
                                </Callout>
                            </Marker>

                        ))}

                    </MapView>) : <Text>Venter på mine koordinater...</Text>
                }
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

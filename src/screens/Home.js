import React from 'react';
import MapView, {Marker} from 'react-native-maps';
import {StyleSheet, Text, View, Dimensions, Button} from 'react-native';

import * as Permissions from 'expo-permissions';
import * as Location from 'expo-location';
import Menu from "../components/Menu";
import CreatePopUp from "../components/CreatePopUp";
import Route from "../Route";

export default class Home extends React.Component {



    constructor(props) {
        super(props);
        this.routes = [];
        this.state = {
            location: null,
            errorMessage: null,
            region: null,
            marker: null,
            popUp: null,
            routes: this.routes
        }
        this.id = 0;
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

    addRoute = (routeTitle) => {
        this.routes.push(new Route(routeTitle, this.id));
        this.id++;
        this.setState({popUp: null});

    };

    cancelPopUp = () => {
        this.setState(
            {popUp: null})
    }

    createPopUp = () => {
        this.setState(
            {popUp: new CreatePopUp()});
    };

    render() {
        let popup = this.state.popUp;

        return (
            <View style={styles.container}>
                <View style={styles.menu}>
                    <Menu routes={this.routes}/>
                    <View style={styles.button}>
                        <Button  onPress={this.createPopUp} title="Create Route"/>
                        {popup ?
                            (<CreatePopUp callback={this.addRoute} cancel={this.cancelPopUp}/>) : null
                        }
                    </View>
                </View>
                <View>
                    {this.state.region ?
                        (<MapView
                            style={styles.mapStyle}
                            initialRegion={this.state.region}>

                            <Marker coordinate={this.state.marker.latlng} title="Home"/>

                        </MapView>) : <Text>Venter på mine koordinater...</Text>
                    }
                </View>
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
    menu: {
        top: 40,
        backgroundColor: 'transparent',
        width: '100%',
        flexDirection: 'row',
    },
    button: {
        width: '25%',
        alignItems: 'flex-end',
    }

});


import React, {Component} from 'react';
import {StyleSheet, Text, View, Dimensions, Image, Modal, Button} from 'react-native';
import * as Location from "expo-location";
import Animation from "../components/Animation";
import Map from "../components/Map";

export default class DisplayRoute extends React.Component {
    constructor(props) {
        super(props);
        this.route = this.props.navigation.getParam("route");

        this.state = {
            location: null,
            region: null,
            modalVisible: false,
            activeMarker: null
        };
    }

    static navigationOptions = {
        title: 'Gå din rute'
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
                }
            });
        };
        this.watchid = Location.watchPositionAsync(option, locationCallback);
    }

    componentWillUnmount() {
        this.watchid.then(e => {
            e.remove()
        })
    }

    setModalVisible = (routePoint) => {
        this.setState({
            activeMarker: routePoint,
            modalVisible: true
        });
    };

    render() {
        return (
            <View style={styles.container}>
                {this.route ?
                    (this.state.region ?
                        <Map
                            region={this.state.region}
                            coords={this.state.location.coords}
                            routePoints={this.route.routePoints}
                            pressedMarker={this.setModalVisible}/>: null)
                    : <Animation/>}

                {this.state.modalVisible ?
                    (<Modal
                        animationType="slide"
                        transparent={true}
                        visible={this.state.modalVisible}>

                            <View style={styles.modal}>
                                <Text style={styles.text}>{this.state.activeMarker._title}</Text>
                                <Image style={styles.IMG} source={{uri: this.state.activeMarker._image}}/>

                                <Button
                                    onPress={() => {
                                        this.setState({modalVisible: false});
                                    }}
                                    title="Close">
                                </Button>
                            </View>
                    </Modal>) : null}

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
        width: 200,
        height: 200,

    },
    text: {
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 24
    },
    IMG: {
        width: 150,
        height: 150,
        borderWidth: 1,
        borderColor: 'black',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modal: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor : "#FFF",
        height: 250 ,
        width: 250,
        borderRadius:10,
        borderWidth: 1,
        borderColor: '#fff',
        marginTop: 80,
        marginLeft: 40,

    },



});

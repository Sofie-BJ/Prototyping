import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, Button, CameraRoll } from 'react-native';
import Constants from 'expo-constants';
import { Camera } from 'expo-camera';
import * as Permissions from 'expo-permissions';

import {IconButton, Colors} from 'react-native-paper';
import CreatePopUp from "../components/CreatePopUp";
import {AsyncStorage} from "react-native-web";

export default class CameraScreen extends React.Component {

    static navigationOptions = {header: null};

    constructor(props) {
        super(props);
        this.state = {
            hasCameraPermissions: false,
            ratio: '16:9',
            bottomBar: false,
            popUp: null
        };
    }

    async componentDidMount() {
        let { status } = await Permissions.askAsync(Permissions.CAMERA);
        await Permissions.askAsync(Permissions.CAMERA_ROLL);
        this.setState({
            hasCameraPermissions: status === 'granted',
            showPicture: false,
            pictureUri: '',
        });
    }

/*
    collectPictureSizes = async () => {
        ratios = await this.getRatios();

    }

    getRatios = async () => {
        const ratios = await this.camera.getSupportedRatiosAsync();
        return ratios;
    }
*/

    takePicture = () => {
        if (this.camera) {
            this.camera.takePictureAsync(
                { onPictureSaved: this.onPictureSaved })
                .catch(() => {console.log("Couldn't save picture")})
            // setState er en asynkron funktion -- await betyder at den venter med at gå videre til den viser true
            this.setState({
                bottomBar: true
            })
        }
    };

    onPictureSaved = async photo => {
        await this.setState({
            showPicture: true,
            pictureUri: photo.uri,
        });
    };

    saveRoutePoint = (routePointTitle) => {
        this.setState({popUp: null});
        this.props.navigation.getParam('callback')(routePointTitle, this.state.pictureUri);
        this.props.navigation.goBack();
    };

    cancelPopUp = () => {
        this.setState(
            {popUp: null})
    };

    createPopUp = () => {
        this.setState(
            {popUp: new CreatePopUp()});
    };

    render() {
        return (
            <View style={styles.container}>
                {this.state.hasCameraPermissions ? (
                    <View style={styles.cameraContainer}>
                        {this.state.showPicture ? (
                            <Image
                                source={{ uri: this.state.pictureUri }}
                                style={styles.camera}/>
                        ) : (
                            <Camera
                                ref={ref => {
                                    this.camera = ref;
                                }}
                                style={styles.camera}
                                type={Camera.Constants.Type.back}
                                ratio={this.state.ratio}
                                onCameraReady={this.collectPictureSizes}
                            />
                        )}
                    </View>
                ) : <Text>Kameraet må ikke bruges i appen</Text>
                }

                <View style={styles.bottomBar}>
                    {this.state.bottomBar? (
                        <View style={styles.toolbar}>
                            <Button
                                title="Retake"
                                onPress={() => this.setState({showPicture: false, isShown: false})}
                            />

                            <IconButton
                                size={50}
                                style={styles.button}
                                icon="check-circle"
                                mode='contained'
                                onPress={this.createPopUp}
                            />
                        </View>
                    ) : (
                        <TouchableOpacity
                            style={styles.snapButton}
                            onPress={this.takePicture}/>
                    )
                    }

                    {this.state.popUp ?
                        (<CreatePopUp title="Nyt punkt på din rute" callback={this.saveRoutePoint} cancel={this.cancelPopUp}/>) : null
                    }
                </View>

            </View >
        );
    }
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    cameraContainer: {
        flex: 1,
        flexDirection: 'row',
    },
    camera: {
        flex: 1,
        alignSelf: 'stretch',
        justifyContent: "space-between",
        aspectRatio: 9 / 16,
    },
    topBar: {
        flex: 0.1,
        backgroundColor: 'white',
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingTop: Constants.statusBarHeight,
    },
    bottomBar: {
        flex: 0.2,
        flexDirection: 'row',
        paddingBottom: 5,
        backgroundColor: 'white',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    snapButton: {
        borderColor: 'rgba(0, 0, 0, 0.6)',
        height: 50,
        width: 50,
        borderWidth: 1,
        borderRadius: 100,
    },
    toolbar: {
        flexDirection: 'row'
    }
})

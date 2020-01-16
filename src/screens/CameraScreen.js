import React, {Component} from 'react';
import {StyleSheet, View, TouchableOpacity, Image} from 'react-native';
import Constants from 'expo-constants';
import {Camera} from 'expo-camera';

import {IconButton} from 'react-native-paper';
import PopUp from "../components/PopUp";

export default class CameraScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            ratio: '16:9',
            retakePicture: false,
            popUp: false
        };
    }

    componentDidMount() {
        this.setState({
            showPicture: false,
            pictureUri: '',
        });
    }

    static navigationOptions = {
        title: 'Tag et billede til din rute',
    };


    takePicture = () => {
        if (this.camera) {
            this.camera.takePictureAsync(
                {onPictureSaved: this.onPictureSaved})
                .catch(() => {
                    console.log("Couldn't save picture")
                })

            this.setState({
                retakePicture: true
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
        let func = this.props.navigation.getParam('callback');
        func(routePointTitle, this.state.pictureUri);
        this.props.navigation.goBack();
    };

    cancelPopUp = () => {
        this.setState(
            {popUp: false})
    };

    createPopUp = () => {
        this.setState(
            {popUp: true});
    };

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.cameraContainer}>
                    {this.state.showPicture ? (
                        <Image
                            source={{uri: this.state.pictureUri}}
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

                <View style={styles.bottomBar}>
                    {this.state.retakePicture ? (
                        <View style={styles.toolbar}>
                            <IconButton
                                size={40}
                                icon="check-circle"
                                onPress={this.createPopUp}
                            />
                        </View>
                    ) : (
                        <TouchableOpacity
                            style={styles.snapButton}
                            onPress={this.takePicture}/>
                    )}

                </View>

                {this.state.popUp ?
                    (<PopUp dialogTitle="Nyt punkt på din rute" saveFunc={this.saveRoutePoint}
                            cancelFunc={this.cancelPopUp}/>) : null
                }

            </View>
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
        backgroundColor: '#d3e0e3',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    snapButton: {
        borderColor: 'black',
        height: 65,
        width: 65,
        borderRadius: 100,
        backgroundColor: 'white',
        borderWidth: 2,
    },
    toolbar: {
        flexDirection: 'row',
        backgroundColor: "white",
        borderRadius: 40,
        borderColor: 'black',
        borderWidth: 2
    }
})

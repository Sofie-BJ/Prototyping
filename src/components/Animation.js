import React from "react";
import {StyleSheet, View} from 'react-native';
import LottieView from "lottie-react-native";

export default function Animation() {
    return (
        <View style={styles.container}>
            <LottieView
                source={require("../../assets/lottie-walking.json")}
                autoPlay
                loop
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        top: 0,
        left: 0,
    },
});
import MapView, {Marker} from "react-native-maps";
import React from "react";
import {Dimensions, StyleSheet} from "react-native";

export default function Map({coords, region, routePoints, pressedMarker = null}) {
    return (
        <MapView
            style={styles.mapStyle}
            initialRegion={region}>

            <Marker coordinate={coords}/>

            {routePoints.map((routePoint, index) => (
                <Marker
                    key={index}
                    coordinate={routePoint._coordinate}
                    pinColor={'blue'}
                    onPress={() => {
                        if (pressedMarker) {
                            pressedMarker(routePoint)
                        }
                    }}/>
            ))}

            <MapView.Polyline
                coordinates={routePoints.map((routePoint) => routePoint._coordinate)}
                strokeWidth={5}
            />

        </MapView>
    )
}

const styles = StyleSheet.create({
    mapStyle: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
        zIndex: -1
    },
});
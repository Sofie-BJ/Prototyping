import React, {Component} from 'react';
import {Alert, AsyncStorage, Text, View, StyleSheet} from "react-native";
import {IconButton} from "react-native-paper";

export default class Route extends React.Component {

    constructor(props) {
        super(props);
        title
    }

    handleScreenChange = () => {
        console.log("Route - handleScreenChange")
        const {handleScreenChange, routeTitle} = this.props;
        handleScreenChange(routeTitle);
    };

    handleRouteDelete = () => {
        const {handleRouteDelete, routeTitle} = this.props;
        handleRouteDelete(routeTitle);
    };

    render() {
        return (
            <View key={this.props.id}
                  style={styles.routeDiv}>
                <Text style={styles.text}>{this.props.routeTitle}</Text>

                <View style={styles.goButton}>
                    <IconButton
                        onPress={this.handleScreenChange}
                        icon="walk"
                        color="#54E883"
                        size={35}
                    />
                </View>
                <View style={styles.deleteButton}>
                    <IconButton
                        onPress={() => this.handleRouteDelete}
                        color='black'
                        icon='delete'
                        size={30}
                    />
                </View>


                {/* Hard-coded */}

                <IconButton icon="map-marker" size={20} color='green'/>
                <Text style={{marginLeft: -35, color: 'green', fontSize: 14}}>7</Text>
                <IconButton icon="calendar-range" size={20} color='grey'/>
                <Text style={{marginLeft: -35, fontSize: 12}}>17/12-19</Text>
                <IconButton icon="account" size={20} color='darkblue'/>
                <Text style={{marginLeft: -37, color: 'darkblue', fontSize: 12}}>Oemann</Text>
                <IconButton icon="crosshairs-gps" size={20} color='black'/>
                <Text style={{marginLeft: -35, color: 'black', fontSize: 12}}>KBH</Text>

            </View>
        )
    }

}

const styles = StyleSheet.create({
    goButton: {
        position: 'absolute',
        right: 70,
        top: 0
    },
    //Posistion absolute kan ændres hvis det ikke ser godt ud på andre telefoner
    deleteButton: {
        position: 'absolute',
        right: 10,
        top: 0
    },


    routeDiv: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignContent: 'flex-start',
        backgroundColor: 'white',
        justifyContent: 'space-between',
        borderRadius: 10,
        width: '100%',
        alignItems: 'center',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.30,
        shadowRadius: 4.65,

        elevation: 8,

        margin: 5,
        padding: 6,
    },

    //Hard-coded width og height.
    text: {
        fontSize: 20,
        textAlignVertical: 'center',
        marginLeft: 10,
        fontWeight: '500',
        textTransform: 'uppercase',
        color: 'black',
        width: '100%',
        height: '60%'

    }
})


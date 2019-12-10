import React from 'react';
import {StyleSheet, Text, View, Button, AsyncStorage, TouchableOpacity, Alert} from 'react-native';
import Route from "../Route";
import CreatePopUp from "../components/CreatePopUp";
import {IconButton, Colors} from 'react-native-paper';


export default class HomeRoutes extends React.Component {

    static navigationOptions = {
        title: 'Dine ruter'
    };

    constructor(props) {
        super(props);
        this.state = {
            routes: null,
        };
    }

    componentDidMount() {
        const {navigation} = this.props;
        this.focusListener = navigation.addListener('didFocus', () => {
            this.getAllRoutes();
        });
    }

    componentWillUnmount() {
        this.focusListener.remove();
    }

    getAllRoutes = () => {
        AsyncStorage.getAllKeys().then(response => {
            if (response !== null) {
                this.setState({
                    routes: response
                })
            }
        })
    };

    deleteRoute = (routeTitle) => {
        Alert.alert(
            'Slet rute',
            'Er du sikker på at du vil slette ruten?',
            [
                {
                    text: 'OK', onPress: () => {
                        AsyncStorage.removeItem(routeTitle).then(console.log("Item removed"));
                        this.getAllRoutes();
                    }
                },
                {text: 'Cancel', onPress: () => console.log("Cancel")},
            ],
            {cancelable: false},
        );
    };

    render() {
        let routes = this.state.routes;

        return (
            <View style={styles.container}>
                <View style={styles.iconButton}>
                    <IconButton
                        onPress={() => this.props.navigation.navigate("RouteCreator", {popUp: new CreatePopUp()})}
                        icon='plus'
                        size={40}/>
                </View>

                {routes !== null ?
                    routes.map(routeTitle => (
                        (<View  key={routeTitle + 1}
                                style={styles.routeDiv}>
                                <Text style={styles.text}>{routeTitle}</Text>
                                <IconButton
                                    onPress={() => this.props.navigation.navigate("GoRoute", {routeTitle: routeTitle})}
                                    icon="walk"
                                    size={30}
                                />
                                <IconButton
                                    onPress={() => this.deleteRoute(routeTitle)}
                                    icon='delete'
                                    size={30}
                                />

                            </View>
                        ))) : <Text>Henter ruter</Text>
                }

            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#d3e0e3',
        alignItems: 'center',
        padding: 10
    },
    iconButton: {
        justifyContent: 'center',
        borderColor: 'black',
        borderWidth: 1,
        backgroundColor: '#FFFFFF',
        borderRadius: 80,
        position: 'absolute',
        bottom: 10,
    },
    routeDiv: {
        flexDirection: 'row',
        alignItems: 'stretch',
        backgroundColor: 'white',
        justifyContent: 'space-between',
        padding: 6,
        margin: 5,
        borderRadius: 10,
        width: '100%',
    },
    text: {
        fontSize: 24,
        textAlignVertical: 'center',
    }
});

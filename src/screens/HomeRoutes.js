import React from 'react';
import {StyleSheet, Text, View, Button, AsyncStorage, TouchableOpacity} from 'react-native';
import Route from "../Route";
import CreatePopUp from "../components/CreatePopUp";
import {IconButton, Colors} from 'react-native-paper';

export default class HomeRoutes extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            routes: null,
            popUp: null
        };

        AsyncStorage.getAllKeys().then(response => {
            if (response !== null) {
                this.setState({
                    routes: response
                })
            }
        })
    }

    addRoute = (routeTitle) => {
        let newRoute = new Route(routeTitle, this.id);
        this.setState({
            routes: [...this.state.routes, newRoute]
        });
        this.id++;
        this.setState({popUp: null});

        this.props.navigation.navigate("RouteCreator", {route: newRoute});

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
        let popUp = this.state.popUp;
        let routes = this.state.routes;

        return (
            <View style={styles.container}>
                <View style={styles.iconButton}>
                    <IconButton
                        onPress={this.createPopUp}
                        icon='plus'
                        size={40}/>
                </View>

                {popUp ?
                    (<CreatePopUp title="Ny rute" callback={this.addRoute} cancel={this.cancelPopUp}/>) : null
                }
                {routes !== null ?
                    routes.map(routeTitle => (
                        (<View style={styles.routeDiv}>
                                <Route key={routeTitle} title={routeTitle}/>
                                <IconButton
                                    key={"walk"}
                                    onPress={() => {
                                        this.props.navigation.navigate("GoRoute", {routeTitle: routeTitle});
                                    }}
                                    icon="walk"/>
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
        backgroundColor: '#fff',
    },
    iconButton: {
        borderRadius: 40,
        backgroundColor: 'red'
    },
    item: {
        padding: 10,
        fontSize: 18,
        height: 44,
    },
    routeDiv: {
        flexDirection: 'row',
        alignSelf: 'stretch',
        alignItems: 'center',
        borderRadius: 40,
        backgroundColor: 'grey',
        margin: 20
    },
    routeElement: {
        width: "35%",
        backgroundColor: 'white'
    },


});
/*


*/
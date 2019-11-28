import React from 'react';
import {StyleSheet, Text, View, Button, TouchableOpacity} from 'react-native';
import Route from "../Route";
import CreatePopUp from "../components/CreatePopUp";

export default class HomeRoutes extends React.Component {

    testRoute = {
        title: "Test Route",
        routePoints: [{
            title: "35",
            coordinate: {
                latitude: 55.407170,
                longitude: 10.381090
            },
            image: ""
        },{
            title: "Thea",
            coordinate: {
                latitude: 55.406479,
                longitude: 10.383643
            },
            image: ""
        }]
    };

    constructor(props) {
        super(props);
        this.routes = [];
        this.state = {
            routes: this.routes,
            popUp: null
        }
    }

    addRoute = (routeTitle) => {
        let newRoute = new Route(routeTitle, this.id)
        this.routes.push(newRoute);
        this.id++;
        this.setState({popUp: null});

        this.props.navigation.navigate("DisplayRoute", {route: this.testRoute});

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

        let popUp = this.state.popUp;
        console.log(this.routes)

        return (
            <View styles={styles.container}>
                <Button onPress={this.createPopUp} title="+"/>
                {popUp ?
                    (<CreatePopUp callback={this.addRoute} cancel={this.cancelPopUp}/>) : null
                }

                {this.routes ?
                    this.state.routes.map(route => (
                        <Route key={route.props.toString()} title={route.props}/>
                    )) : null
                }


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
    item: {
        padding: 10,
        fontSize: 18,
        height: 44,
    },
});
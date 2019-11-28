import React from 'react';
import {StyleSheet, Text, View, Button, TouchableOpacity, FlatList} from 'react-native';
import Route from "../Route";
import CreatePopUp from "../components/CreatePopUp";
import TextStylePropTypes from "react-native-web/dist/exports/Text/TextStylePropTypes";

export default class HomeRoutes extends React.Component {

    constructor(props) {
        super(props);
        this.routes = [];
        this.state = {
            routes: this.routes,
            popUp: null
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
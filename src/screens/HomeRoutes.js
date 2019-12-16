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
                        color='white'
                        size={40}/>
                </View>

                {routes !== null ?
                    routes.map(routeTitle => (
                        (<View  key={routeTitle + 1}
                                style={styles.routeDiv}>
                                <Text style={styles.text}>{routeTitle}</Text>
                               
                                <View style={styles.goButton}>
                                <IconButton
                                    onPress={() => this.props.navigation.navigate("GoRoute", {routeTitle: routeTitle})}
                                    icon="walk"
                                    color="#54E883"
                                    size={35}
                                />
                                 </View>
                               <View style={styles.deleteButton}>
                                <IconButton
                                    onPress={() => this.deleteRoute(routeTitle)}
                                    color='black'
                                    icon='delete'
                                    size={30}
                                />
                                </View>
                             
                                {/* Hard-coded */}
                             
                                <IconButton icon="map-marker" size={20} color='green'/>
                                <Text style={{marginLeft: -35, color: 'green', fontSize:14}}>7</Text>
                                <IconButton icon="calendar-range" size={20} color='grey'/>  
                                <Text style={{marginLeft: -35 , fontSize:12}}>17/12-19</Text>
                                <IconButton icon="account" size={20} color='darkblue'/> 
                                <Text style={{marginLeft: -37, color:'darkblue', fontSize:12}}>Oemann</Text>
                                <IconButton icon="crosshairs-gps" size={20} color='black'/>    
                                <Text style={{marginLeft: -35, color:'black', fontSize:12}}>KBH</Text>
                              
                                

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
        backgroundColor: '#E5E5E5',
        alignItems: 'center',
        padding: 10
    },
    
    iconButton: {
        justifyContent: 'center',
        backgroundColor: '#6EFAC2',
        borderRadius: 80,
        position: 'absolute',
        bottom: 10,
        shadowColor: "#000",
        shadowOffset: {
	        width: 0,
	        height: 4,
        },
        shadowOpacity: 0.30,
        shadowRadius: 4.65,

        elevation: 8,
    },

    goButton: {
        position: 'absolute',
        right: 70,
        top: 0
    },
    //Posistion absolute kan ændres hvis det ikke ser godt ud på andre telefoner
    deleteButton:{
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
        fontFamily: 'monospace',
        fontWeight: '500',
        textTransform: 'uppercase',
        color: 'black',
        width:'100%',
        height:'60%'
        
    }
});

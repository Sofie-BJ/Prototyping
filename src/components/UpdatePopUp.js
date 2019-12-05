import React from 'react';
import {StyleSheet, Text, View, Button, TouchableOpacity} from 'react-native';
import Route from "../Route"
import RoutePoint from "../RoutePoint"


import Dialog from "react-native-dialog";

export default class CreatePopUp extends React.Component {

    constructor(props) {
        super(props);
        this.updatedRouteTitle = null;
    }

render () {
    return (
      <View>
        <Dialog.Container visible={true}>
          <Dialog.Title>Change RoutePoint</Dialog.Title>
          <Dialog.Input placeholder="Write the title of what you wish to remember"/>
          <Dialog.Button label="Cancel" onPress={() => this.props.cancel()}/>
          <Dialog.Button label="Save" onPress={() => this.props.callback(this.updatedRouteTitle)}/>
        </Dialog.Container>
      </View>
    )
  };

}

  /*Route.map(RoutePoint.index)*/ 
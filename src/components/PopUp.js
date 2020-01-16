import React from 'react';
import {View} from 'react-native';

import Dialog from "react-native-dialog";

export default function PopUp({dialogTitle, cancelFunc, saveFunc}) {
    if (dialogTitle) {
        let input = '';
        return (
            <View>
                <Dialog.Container visible={true}>
                    <Dialog.Title>{dialogTitle}</Dialog.Title>
                    <Dialog.Input placeholder="Skriv titlen her"
                                  onChangeText={title => input = title}/>
                    <Dialog.Button label="Cancel" onPress={() => cancelFunc()}/>
                    <Dialog.Button label="Save" onPress={() => {
                        if (input !== null) {
                            saveFunc(input)
                        }
                    }}/>
                </Dialog.Container>
            </View>
        );
    } else {
        throw new Error("Dialog title missing")
    }
}





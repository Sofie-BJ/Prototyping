import React from 'react';
import {View} from 'react-native';

import Dialog from "react-native-dialog";

export default function CreatePopUp({dialogTitle, cancel, callback}) {
    if (dialogTitle) {
        let input = '';
        return (
            <View>
                <Dialog.Container visible={true}>
                    <Dialog.Title>{dialogTitle}</Dialog.Title>
                    <Dialog.Input placeholder="Skriv titlen her"
                                  onChangeText={title => input = title}/>
                    <Dialog.Button label="Cancel" onPress={() => cancel()}/>
                    <Dialog.Button label="Save" onPress={() => {
                        if (input !== null) {
                            callback(input)
                        }
                    }}/>
                </Dialog.Container>
            </View>
        );
    } else {
        throw new Error("Dialog title missing")
    }
}





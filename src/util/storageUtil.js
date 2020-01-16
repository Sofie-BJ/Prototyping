import {AsyncStorage} from "react-native";

export function getAllRoutes(callback) {
    try {
        AsyncStorage.getAllKeys((err, keys) => {
            AsyncStorage.multiGet(keys, (err, stores) => {
                let routes = stores.map(e => {
                    return JSON.parse(e[1]);
                });
                callback(routes)
            });
        });
    } catch (e) {
        new Error(e)
    }
}

export function writeRoute(route) {
    try {
        AsyncStorage.setItem(route.title, JSON.stringify(route));
    } catch (e) {
        console.log("RouteModifier failed to save route: " + e.message)
    }
}

export function updateRoute(route) {
    try {
        AsyncStorage.mergeItem(route.title, JSON.stringify(route));
    } catch (e) {
        console.log("Storage failed to update route: " + e.message)
    }
}
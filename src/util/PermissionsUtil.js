import * as Permissions from "expo-permissions";

export async function askPermissions () {
    let {status} = await Permissions.askAsync(Permissions.LOCATION, Permissions.CAMERA, Permissions.CAMERA_ROLL);
    console.log('Asking for permissions: ' + status);
}


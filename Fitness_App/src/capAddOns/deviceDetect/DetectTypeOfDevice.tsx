import { Plugins } from '@capacitor/core';

const { Device } = Plugins;

const TypeOfDevice = {
    windowsDevice :"windows",
    macDevice :"mac",
    androidSimulation: "androidSim",
    androidDevice : "android",
    iosSimulation :  "iosSim",
    iosDevice : "ios",
    NotMatched:  "NoDevice"
}

export function getDeviceTypeString(){
    var type = ""
    
    Device.getInfo().then((info) => {
        // console.log("Device info",info);

        // Laptops 
        if(info.operatingSystem === "windows"){ return type = TypeOfDevice.windowsDevice}

        else if(info.operatingSystem === "mac"){ return type = TypeOfDevice.macDevice}

        //Cell devices not simulations  
        else if(info.operatingSystem === "android" && info.platform !== "web"){ return type = TypeOfDevice.androidSimulation}

        else if(info.operatingSystem === "ios" && info.platform !== "web"){ return type = TypeOfDevice.iosSimulation}

        //Cell devices simulations  
        else if(info.operatingSystem === "android" && info.platform === "web"){ return type = TypeOfDevice.androidDevice}

        else if(info.operatingSystem === "ios" && info.platform === "web"){ return type = TypeOfDevice.iosDevice}

        //I have no idea 
        else if(info.operatingSystem === "unknown"){ return type = TypeOfDevice.NotMatched}
        else{console.log("no know type matched to this user ?????"); return type = TypeOfDevice.NotMatched}

    })

    return type   
}

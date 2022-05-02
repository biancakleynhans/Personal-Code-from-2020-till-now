import { LocalNotifications, ELocalNotificationTriggerUnit } from "@ionic-native/local-notifications";
import moment from 'moment'
import { getDeviceTypeString } from "../deviceDetect/DetectTypeOfDevice";


function LocalNotify_Mobile_ScheduleNotify(title: string, text:string, visibleWhenAppOpen: boolean, selectedTime:Date,vibrate: boolean, icon?: any){
    LocalNotifications.schedule({
        id : 1,
        title: title,
        text: text,
        trigger: {at: selectedTime},
        foreground: visibleWhenAppOpen,
        icon: `res://${icon}`,
        vibrate: vibrate,
        launch: true,
        lockscreen: true
    })

    // LocalNotifications.schedule({
    //     id : 1,
    //     title: "Try me ???",
    //     text: "Fist local notify",
    //     data: {myDtata: "hiddenMsg"},
    //     trigger: {at: new Date(new Date().getTime +5 *1000)}
    // })
}

function LocalNotify_Mobile_ReOccuringNotify(title: string, text:string, visibleWhenAppOpen: boolean,timeHour:number, timeMinute:number){
    
    var timeToNotify = moment().add(1, 'days').hours(timeHour).minutes(timeMinute).seconds(0);
    
    LocalNotifications.schedule({
        id : 2,
        title: title,
        text: text,
        // data: {myData: "hiddenMsg"},
        trigger: {
            every: ELocalNotificationTriggerUnit.HOUR, 
            count: 12, 
            firstAt: timeToNotify.toDate(), 
        },
        foreground: visibleWhenAppOpen
    })
}

function LocalNotify_Mobile_RepeatDailyNotify(title: string, text:string, timeHour:number, timeMinute:number, visibleWhenAppOpen: boolean){
    
    var timeToNotify = moment().add(1, 'days').hours(timeHour).minutes(timeMinute).seconds(0);
    LocalNotifications.schedule({
        id : 3,
        title:title,
        text: text,
        trigger: {
            every: ELocalNotificationTriggerUnit.DAY,
            firstAt: timeToNotify.toDate()
        },
        foreground: visibleWhenAppOpen
    })
}

function LocalNotify_Mobile_GetAllNotify(){
    var scheduled:any[] = []
    LocalNotifications.getAll().then(res=>{
        scheduled = res
        console.log("this.scheduled", scheduled)
        return scheduled
    })
    return scheduled
}

export function LocalNotify_Mobile_GetPermission(){
    LocalNotifications.hasPermission()
    .then(ans =>{
        console.log("ans", ans)
        if(ans !== true){LocalNotifications.requestPermission()}
        else return
    })

    LocalNotifications.on('click').subscribe(res=>{
        console.log("res: onlick", res)
        // let msg = res.data ? res.data.myData : ""
        
    })

    LocalNotifications.on('trigger').subscribe(res=>{
        console.log("res: onlick", res)
        // let msg = res.data ? res.data.myData : ""
        
    })
}


export const LocalNotify_Mobile_TypeList ={
    ScheduleNotify:"ScheduleNotify",
    ReOccuringNotify: "ReOccuringNotify",
    RepeatDailyNotify:"RepeatDailyNotify",
    GetAllNotify:"GetAllNotify"

}


export function isLocalNotify_Mobile(type: string, title: string, text:string, visibleWhenAppOpen?: boolean,vibrate?: boolean,  timeHour?:number, timeMinute?:number, selectedTime?:Date,){
    var dev = getDeviceTypeString()
    var checked_visibleWhenAppOpen = visibleWhenAppOpen ? visibleWhenAppOpen : false
    var checked_selectedTime = selectedTime ? selectedTime : new Date()
    var checked_vibrate = vibrate? vibrate: false
    var checked_timeHour = timeHour? timeHour: 7
    var checked_timeMinute = timeMinute? timeMinute: 0

    if(dev === "android" || dev === "ios"){
        console.log("andriod or ios device")
        if(type === LocalNotify_Mobile_TypeList.ScheduleNotify){
            return LocalNotify_Mobile_ScheduleNotify(title, text, checked_visibleWhenAppOpen,checked_selectedTime, checked_vibrate)
        }
        if(type === LocalNotify_Mobile_TypeList.ReOccuringNotify){
            return LocalNotify_Mobile_ReOccuringNotify(title, text, checked_visibleWhenAppOpen,checked_timeHour,checked_timeMinute)
        }
        if(type === LocalNotify_Mobile_TypeList.RepeatDailyNotify){
            return LocalNotify_Mobile_RepeatDailyNotify(title, text,checked_timeHour, checked_timeMinute, checked_visibleWhenAppOpen)
        }
        if(type === LocalNotify_Mobile_TypeList.GetAllNotify){
            return LocalNotify_Mobile_GetAllNotify()
        }
        else{
            console.log("isLocalNotify_Mobile did some thing wrong")
        }

        
    }
    else {
        console.log("Not andriod or ios device")
        return
    }
		
}


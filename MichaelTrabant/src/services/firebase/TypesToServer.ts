import { GetAppSettings } from "../ownServices/AppSettings";
import { ExportAllStaticImages } from "../../components/images/ExportAllStaticImages";

export const TypesToFirebaseGlobals = {
  placeholderImg: "https://firebasestorage.googleapis.com/v0/b/trabant-e9129.appspot.com/o/no-img.png?alt=media&token=b53f6bd7-8528-4e65-ad3e-62b67ea433fb",

  Main: ExportAllStaticImages.main,

  //Types root
  User_Root: "USERS",

  //Types in a user
  MsgInUser: "msgHistory",
  WorkData: "workData",
  WorkDays: "daysOfwork",
  WorkHours: "hoursOfwork",
  NonWorkHours: "hoursOfNonWork",

  Sessions: "sessionsBooked",

  // Image storage
  FBStorage_profileImgs: "ProfileImgs",
  FBStorage_Chats: "ChatImgs"
};

import { FIREBASE_FUNCTIONS } from "./FirebaseConfig";
import { httpsCallable } from "firebase/functions";

export interface iNewPush {
  users: { token: string; name: string }[];
  task: { name: string; desc: string };
}

export function PushNotifyNewTask(data: iNewPush) {
  console.log("DATA SENDING :", data);
  const sendEmail = httpsCallable(FIREBASE_FUNCTIONS, "sendPushOnNewTask");
  return sendEmail(data);
}

export function PushNotifyUserTaskUpdate(data: iNewPush) {
  console.log("DATA SENDING :", data);
  const sendEmail = httpsCallable(FIREBASE_FUNCTIONS, "sendPushOnUpdatedTask");
  return sendEmail(data);
}

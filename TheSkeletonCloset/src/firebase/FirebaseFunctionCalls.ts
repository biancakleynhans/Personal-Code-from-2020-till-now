import { FIREBASE_FUNCTIONS } from "./FirebaseConfig";
import { httpsCallable } from "firebase/functions";
import { ContactEmail } from "../models/User_models";

export function SendContactEmail(data: ContactEmail) {
  //sendContactEmail
  const sendEmail = httpsCallable(FIREBASE_FUNCTIONS, "sendContactEmail");
  return sendEmail(data);
}

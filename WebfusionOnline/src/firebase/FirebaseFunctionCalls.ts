import { FIREBASE_FUNCTIONS } from "./FirebaseConfig";
import { httpsCallable, HttpsCallableResult } from "firebase/functions";
import { ContactEmail, ProductEmail } from "../models/User_models";

export function SendProductEmail(data: ProductEmail): Promise<HttpsCallableResult<unknown>> {
  //add this to assign the sendEmail cloud function to a constant
  const sendEmail = httpsCallable(FIREBASE_FUNCTIONS, "sendEmail");
  return sendEmail(data);
}

export function SendContactEmail(data: ContactEmail) {
  //sendContactEmail
  const sendEmail = httpsCallable(FIREBASE_FUNCTIONS, "sendContactEmail");
  return sendEmail(data);
}

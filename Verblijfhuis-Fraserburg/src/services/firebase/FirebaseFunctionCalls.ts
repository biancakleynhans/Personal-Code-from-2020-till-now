import { FIREBASE_FUNCTIONS } from "./FirebaseConfig";
import { httpsCallable } from "firebase/functions";
import { ContactEmail, iBooking, ReviewEmail } from "../../models/User_models";

export function SendContactEmail(data: ContactEmail) {
  const sendEmail = httpsCallable(FIREBASE_FUNCTIONS, "sendContactEmail");
  return sendEmail(data);
}

export function SendReviewEmail(data: ReviewEmail) {
  const sendEmail = httpsCallable(FIREBASE_FUNCTIONS, "sendReviewEmail");
  return sendEmail(data);
}

export function SendBookingsEmail(data: iBooking) {
  const sendEmail = httpsCallable(FIREBASE_FUNCTIONS, "sendBookingEmail");
  return sendEmail(data);
}

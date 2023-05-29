import { createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail, signInWithPopup, GoogleAuthProvider, signOut, confirmPasswordReset } from "firebase/auth";
import { FIREBASE_AUTH } from "./FirebaseConfig";
import { iInfoBase } from "../models/Basic";
import { RoutesObj } from "../routes/Routes";
import { CreateNewUser } from "./FirebaseFirestore";

export function SignUpEmailPassAction(email: string, password: string, role: "admin" | "user" | "super" = "user") {
  createUserWithEmailAndPassword(FIREBASE_AUTH, email, password)
    .then((response) => {
      let payload: iInfoBase = {} as iInfoBase;
      payload = {
        name: response.user.displayName !== null ? response.user.displayName : "",
        role: role,
        uid: response.user.uid,
        email: response.user.email ? response.user.email : ""
      } as iInfoBase;

      // Save user to db here
      CreateNewUser(response.user.uid, payload)
        .then(() => {
          window.location.replace(RoutesObj.basic.home.path);
        })
        .catch((error) => {});
    })
    .catch((error) => {});
}

export function LoginWithGoogleAction(role: "admin" | "user" | "super" = "user") {
  const provider = new GoogleAuthProvider();
  signInWithPopup(FIREBASE_AUTH, provider)
    .then((response) => {
      let payload: iInfoBase = {} as iInfoBase;
      payload = {
        name: response.user.displayName !== null ? response.user.displayName : "",
        role: role,
        uid: response.user.uid,
        email: response.user.email ? response.user.email : ""
      } as iInfoBase;
      // Save user to db here
      CreateNewUser(response.user.uid, payload)
        .then(() => {
          window.location.replace(RoutesObj.basic.home.path);
        })
        .catch((error) => {});
    })
    .catch((error) => {});
}

export function LoginEmailPassAction(email: string, password: string, role: "admin" | "user" | "super" = "user") {
  signInWithEmailAndPassword(FIREBASE_AUTH, email, password)
    .then((res) => {
      window.location.replace(RoutesObj.basic.home.path);
    })
    .catch((error) => {});
}

export function LogoutAction() {
  signOut(FIREBASE_AUTH)
    .then(() => {
      window.location.replace(RoutesObj.basic.home.path);
    })
    .catch((error) => {});
}

export function ForgotPassword(email: string): Promise<void> {
  return sendPasswordResetEmail(FIREBASE_AUTH, email, {
    url: "http://localhost:8100/login" //LOCAL
    // url: "https://site.web.app/login" // DEPLOYED
  });
}

export function ResetPasswordF(oobCode: string, newPassword: string) {
  return confirmPasswordReset(FIREBASE_AUTH, oobCode, newPassword);
}

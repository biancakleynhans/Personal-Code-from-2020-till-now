import React, { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { FIREBASE_AUTH, FIREBASE_FIRESTORE } from "./FirebaseConfig";
import {
  User,
  UserCredential,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  onAuthStateChanged,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  confirmPasswordReset
} from "firebase/auth";
import { collection, query, where } from "firebase/firestore";
import { doc, getDocs, setDoc } from "@firebase/firestore";
import { Base_User } from "../models/User_models";

interface iProps {
  children: ReactNode;
  // any other props that come into the component
}

interface iAuthContext {
  currentUser: null | Base_User; // | Firebase_User | UserCredential | UserInfo
  login: (email: string, password: string) => Promise<UserCredential>;
  register: (email: string, password: string) => Promise<UserCredential>;
  logout: () => Promise<void>;
  forgotPassword: (email: string) => Promise<void>;
  resetPassword: (oobCode: string, newPassword: string) => Promise<void>;
  signInWithGoogle: () => Promise<UserCredential>;

  createNewUser: (uid: string, user: User, newData: { fn: string; ln: string; phone: string; email: string }) => Promise<void>;
}

const PathString = "Users";
const Ref = collection(FIREBASE_FIRESTORE, PathString);

const AuthContext = createContext<iAuthContext>({} as iAuthContext);

export const useAuth = () => useContext(AuthContext);

export default function AuthContextProvider({ children, ...props }: iProps) {
  const [currentUser, setCurrentUser] = useState<null | Base_User>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(FIREBASE_AUTH, async function (user) {
      // console.log("The user is", currentUser);
      let UserToUse: Base_User = {} as Base_User;

      if (user !== null) {
        const q = query(Ref, where("uid", "==", `${user.uid}`));
        const querySnapshot = await getDocs(q);
        // console.log("Q", q, "QS", querySnapshot.docs.length, querySnapshot.docs[0].data());
        const data = querySnapshot.docs[0].data();

        UserToUse = {
          cell: data.cell,
          displayName: data.displayName,
          email: data.email,
          fn: data.fn,
          ln: data.ln,
          profileUrl: data.profileUrl,
          uid: data.uid,
          role: data.role,
          adress: "",
          orders: {},
          requests: {}
        };
      }

      // console.log("The user is", UserToUse);
      setCurrentUser(user ? UserToUse : null);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    // console.log("The user is", currentUser,  currentUser?.uid);
  }, [currentUser]);

  function login(email: string, password: string): Promise<UserCredential> {
    return signInWithEmailAndPassword(FIREBASE_AUTH, email, password);
  }

  function register(email: string, password: string): Promise<UserCredential> {
    return createUserWithEmailAndPassword(FIREBASE_AUTH, email, password);
  }

  function forgotPassword(email: string): Promise<void> {
    return sendPasswordResetEmail(FIREBASE_AUTH, email, {
      // url: "http://localhost:8100/login" //LOCAL
      url: "https://webfusiononline-368cb.web.app/login" // DEPLOYED
    });
  }

  function resetPassword(oobCode: string, newPassword: string) {
    return confirmPasswordReset(FIREBASE_AUTH, oobCode, newPassword);
  }

  function logout(): Promise<void> {
    return signOut(FIREBASE_AUTH);
  }

  function signInWithGoogle() {
    const provider = new GoogleAuthProvider();
    return signInWithPopup(FIREBASE_AUTH, provider);
  }

  // Adding user to db

  async function createNewUser(uid: string, user: User, newData: { fn: string; ln: string; phone: string; email: string }): Promise<void> {
    const docRef = doc(FIREBASE_FIRESTORE, PathString, uid);

    const ph: string = user !== undefined && user !== null && user.phoneNumber !== null ? user.phoneNumber : "";
    const dn: string = user !== undefined && user !== null && user.displayName !== null ? user.displayName : "";
    const pu: string = user !== undefined && user !== null && user.photoURL !== null ? user.photoURL : "";

    const payload: Base_User = {
      cell: newData.phone.length > 0 ? newData.phone : ph?.length > 0 ? ph : "",
      displayName: dn,
      email: newData.email,
      fn: newData.fn,
      ln: newData.ln,
      profileUrl: pu,
      uid: uid,
      role: "user",
      adress: "",
      orders: {},
      requests: {}
    };

    // console.log("data recieved", user.uid, user.displayName, user.email, user.phoneNumber, user.photoURL, user.toJSON(), ">>>", newData);

    // Create a reference to the cities collection

    // Create a query against the collection.
    const q = query(Ref, where("uid", "==", `${uid}`));
    const querySnapshot = await getDocs(q);
    console.log("Q", q, "QS", querySnapshot.docs.length);

    if (querySnapshot.docs.length == 0) {
      await setDoc(docRef, payload)
        .then((res) => {
          // console.log("RES", res);
        })
        .catch((err) => {
          console.log("err", err);
        });
    }
  }

  const value = {
    currentUser,
    login,
    register,
    logout,
    forgotPassword,
    resetPassword,
    signInWithGoogle,
    createNewUser
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

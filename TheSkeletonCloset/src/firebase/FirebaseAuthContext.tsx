import { createContext, ReactNode, useContext, useEffect, useState } from "react";
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
import { collection, query, where, updateDoc } from "firebase/firestore";
import { doc, getDocs, setDoc } from "@firebase/firestore";
import { Base_User, UserUpdate } from "../models/User_models";

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
  updateUserProfile: (uid: string, user: Base_User, newData: UserUpdate) => Promise<void>;
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
      displayName: dn.length > 0 ? dn : `${newData.fn} ${newData.ln}`,
      email: newData.email,
      fn: newData.fn,
      ln: newData.ln,
      profileUrl: pu.length > 0 ? pu : "",
      uid: uid,
      role: "user",
      adress: "",
      orders: [],
      requests: []
    };

    // console.log("data recieved", user.uid, user.displayName, user.email, user.phoneNumber, user.photoURL, user.toJSON(), ">>>", newData);

    // Create a reference to the cities collection

    // Create a query against the collection.
    const q = query(Ref, where("uid", "==", `${uid}`));
    const querySnapshot = await getDocs(q);
    // console.log("Q", q, "QS", querySnapshot.docs.length);

    if (querySnapshot.docs.length === 0) {
      await setDoc(docRef, payload)
        .then((res) => {
          console.log("RES", res);
        })
        .catch((err) => {
          console.log("err", err);
        });
    }
  }

  // Editing user details
  async function updateUserProfile(uid: string, user: Base_User, newData: UserUpdate): Promise<void> {
    const DocRef = doc(FIREBASE_FIRESTORE, PathString, uid);
    const ph: string = user !== undefined && user !== null && user.cell !== null ? user.cell : "";
    const dn: string = user !== undefined && user !== null && user.displayName !== null ? user.displayName : "";
    const pu: string = user !== undefined && user !== null && user.profileUrl !== null ? user.profileUrl : "";

    const payload: Base_User = {
      cell: newData.cell.length > 0 ? newData.cell : ph?.length > 0 ? ph : "",
      displayName: dn,
      email: newData.email.length > 0 ? newData.email : user.email.length > 0 ? user.email : "",
      fn: newData.fn.length > 0 ? newData.fn : user.fn.length > 0 ? user.fn : "",
      ln: newData.ln.length > 0 ? newData.ln : user.ln.length > 0 ? user.ln : "",
      profileUrl: newData.profileImg.length > 0 ? newData.profileImg : pu.length > 0 ? pu : "",
      uid: uid,
      role: "user",
      adress: newData.addr.length > 0 ? newData.addr : user.adress.length > 0 ? user.adress : "",
      orders: [],
      requests: []
    };

    console.log("user update", user, newData, payload);

    await updateDoc(DocRef, {
      cell: payload.cell,
      displayName: `${payload.fn} ${payload.ln}`.toUpperCase(),
      fn: payload.fn,
      ln: payload.ln,
      profileUrl: payload.profileUrl,
      adress: payload.adress
    })
      .then((res) => {
        console.log("RES UPDATE", res);
      })
      .catch((err) => {
        console.log("err UPDATE", err);
      });
  }

  const value = {
    currentUser,
    login,
    register,
    logout,
    forgotPassword,
    resetPassword,
    signInWithGoogle,
    createNewUser,
    updateUserProfile
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

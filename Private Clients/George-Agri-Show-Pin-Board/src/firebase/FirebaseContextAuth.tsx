import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { FIREBASE_AUTH, FIREBASE_FIRESTORE } from './FirebaseConfig';
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
  confirmPasswordReset,
} from 'firebase/auth';
import { collection, query, where, doc, getDocs, setDoc, updateDoc, onSnapshot } from 'firebase/firestore';
import { Base_User, UserUpdate } from '../models/UserModels';

interface iProps {
  children: ReactNode;
  // any other props that come into the component
}

interface iAuthContext {
  currentUser: null | Base_User;
  RetrieveAllUsersFromDB: Base_User[];
  login: (email: string, password: string) => Promise<UserCredential>;
  register: (email: string, password: string) => Promise<UserCredential>;
  logout: () => void;
  forgotPassword: (email: string) => Promise<void>;
  resetPassword: (oobCode: string, newPassword: string) => Promise<void>;
  signInWithGoogle: () => Promise<UserCredential>;
  createNewUser: (uid: string, user: User, newData: UserUpdate) => Promise<void>;
  updateUserProfile: (uid: string, user: Base_User, newData: UserUpdate) => Promise<void>;
  updateUserFMC: (uid: string, token: string) => Promise<void>;
}

const PathString = 'Users';
const Ref = collection(FIREBASE_FIRESTORE, PathString);
const AuthContext = createContext<iAuthContext>({} as iAuthContext);

export const useAuth = () => useContext(AuthContext);

// Fix this function its not good
function generateUser(uid: string, nUser: UserUpdate, oUser: any) {
  // console.log("Check what i got", nUser, oUser);
  let payload: Base_User = {} as Base_User;

  payload = {
    role: 'user',
    fn: nUser.fn,
    ln: nUser.ln,
    cell: nUser.cell,
    email: nUser.email,
    profileUrl: nUser.profileImg,
    displayName: `${nUser.fn} ${nUser.ln}`,
    adress: nUser.addr,
    uid: uid,
    company: nUser.company,
    fmcToken: nUser.fmcToken,
  };

  payload.fn = payload.fn.length === 0 ? (oUser.fn && oUser.fn.length > 0 ? oUser.fn : '') : payload.fn;
  payload.ln = payload.ln.length === 0 ? (oUser.ln && oUser.ln.length > 0 ? oUser.ln : '') : payload.ln;
  payload.cell = payload.cell.length === 0 ? (oUser.cell && oUser.cell.length > 0 ? oUser.cell : '') : payload.cell;
  payload.email = payload.email.length === 0 ? (oUser.email && oUser.email.length > 0 ? oUser.email : '') : payload.email;
  payload.profileUrl = payload.profileUrl.length === 0 ? (oUser.profileUrl && oUser.profileUrl.length > 0 ? oUser.profileUrl : '') : payload.profileUrl;
  payload.displayName = payload.displayName.length === 0 ? (oUser.displayName && oUser.displayName.length > 0 ? oUser.displayName : '') : payload.displayName;
  payload.adress = payload.adress.length === 0 ? (oUser.adress && oUser.adress.length > 0 ? oUser.adress : '') : payload.adress;
  payload.company = payload.company.length === 0 ? (oUser.company && oUser.company.length > 0 ? oUser.company : 'GAS') : payload.company;
  payload.fmcToken = payload.fmcToken.length === 0 ? (oUser.fmcToken && oUser.fmcToken.length > 0 ? oUser.fmcToken : '') : payload.fmcToken;

  // console.log(uid, "OLD", oUser, "NEW", nUser, "PAYLOAD", payload);
  return payload;
}

export default function AuthContextProvider({ children, ...props }: iProps) {
  const [currentUser, setCurrentUser] = useState<null | Base_User>(null);
  const [RetrieveAllUsersFromDB, setRetrieveAllUsersFromDB] = useState<Base_User[]>([]);

  useEffect(() => {
    let arr: Base_User[] = [];
    const q = query(Ref);
    onAuthStateChanged(FIREBASE_AUTH, async function (user) {
      let UserToUse: Base_User = {} as Base_User;

      if (user !== null) {
        const q = query(Ref, where('uid', '==', `${user.uid}`));
        const querySnapshot = await getDocs(q);
        // console.log("Q", q, "QS", querySnapshot.docs.length, querySnapshot.docs[0].data());

        if (querySnapshot.docs[0] !== undefined) {
          const data = querySnapshot.docs[0].data();
          // console.log("The data is: ", data);

          UserToUse = {
            cell: data.cell,
            displayName: data.displayName,
            email: data.email,
            fn: data.fn,
            ln: data.ln,
            profileUrl: data.profileUrl,
            uid: data.uid,
            role: data.role,
            adress: data.adress,
            company: data.company,
            fmcToken: data.fmcToken,
          };

          if (UserToUse.uid !== currentUser?.uid) {
            // console.log('The user is', UserToUse);
            setCurrentUser(user ? UserToUse : null);
          }
        }
      }
    });

    onSnapshot(q, { includeMetadataChanges: true }, (snapshot) => {
      snapshot.docChanges().map((change) => {
        // console.log("DOC???", change.doc.data().uid, currentUser?.uid);
        arr.push(change.doc.data() as Base_User);
        // const source = snapshot.metadata.fromCache ? "local cache" : "server";
        // console.log("All users came from " + source);
        // console.log("? All users ?", arr);
        setRetrieveAllUsersFromDB(arr);
      });
    });
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
      url: 'https://verblijfhuis-fraserburg.web.app/sign_in', // DEPLOYED
    });
  }

  function resetPassword(oobCode: string, newPassword: string) {
    return confirmPasswordReset(FIREBASE_AUTH, oobCode, newPassword);
  }

  function logout() {
    signOut(FIREBASE_AUTH);
    window.location.replace('/');
  }

  function signInWithGoogle() {
    const provider = new GoogleAuthProvider();
    return signInWithPopup(FIREBASE_AUTH, provider);
  }

  // Adding user to db
  async function createNewUser(uid: string, user: User, newData: UserUpdate): Promise<void> {
    const docRef = doc(FIREBASE_FIRESTORE, PathString, uid);

    let payload = generateUser(uid, newData, user);
    const q = query(Ref, where('uid', '==', `${uid}`));
    const querySnapshot = await getDocs(q);
    // console.log("Q", q, "QS", querySnapshot.docs.length);

    if (querySnapshot.docs.length == 0) {
      return await setDoc(docRef, payload);
    }
  }

  // Editing user details
  async function updateUserProfile(uid: string, user: Base_User, newData: UserUpdate): Promise<void> {
    const DocRef = doc(FIREBASE_FIRESTORE, PathString, uid);

    let payload: Base_User = generateUser(uid, newData, user);
    payload.role = user.role;
    console.log('user update', payload);

    return await updateDoc(DocRef, {
      cell: payload.cell,
      displayName: `${payload.fn} ${payload.ln}`.toUpperCase(),
      fn: payload.fn,
      ln: payload.ln,
      adress: payload.adress,
      company: payload.company,
      email: payload.email,
    });
  }

  // Editing user details
  async function updateUserFMC(uid: string, token: string): Promise<void> {
    const DocRef = doc(FIREBASE_FIRESTORE, PathString, uid);

    console.log('user update FMC ', uid, token);

    await updateDoc(DocRef, {
      fmcToken: token,
    })
      .then((res) => {
        console.log('RES UPDATE', res);
      })
      .catch((err) => {
        console.log('err UPDATE', err);
      });
  }

  const value = {
    currentUser,
    RetrieveAllUsersFromDB,
    login,
    register,
    logout,
    forgotPassword,
    resetPassword,
    signInWithGoogle,
    createNewUser,
    updateUserProfile,
    updateUserFMC,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

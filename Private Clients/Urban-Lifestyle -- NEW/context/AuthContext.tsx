import React, { useEffect, useState, createContext, useContext, ReactNode } from 'react';
import { getDocs, collection, onSnapshot, query, where } from 'firebase/firestore';
import { FIREBASE_AUTH, FIREBASE_FIRESTORE } from '../firebase/ConfigSetup';
import { onAuthStateChanged, UserCredential } from 'firebase/auth';
import { iUser, iUserUpdate } from '../models/User';
import { forgotPassword, logInWithGoogle, login, logout, register, resetPassword } from '../firebase/functions/Auth';
import { createUser, updateUserFMC, updateUserProfile } from '../firebase/functions/User';
import { iCart, iWishList } from '../models/Products';
import { addToUserCart, addToUserWishlist } from '../firebase/functions/UserShop';

interface iAuthContext {
  // VALUES
  users: iUser[];
  currUser: null | iUser;

  // AUTH FUNCS
  login: (email: string, password: string) => Promise<UserCredential>;
  register: (email: string, password: string) => Promise<UserCredential>;
  logout: () => void;
  forgotPassword: (email: string) => Promise<void>;
  resetPassword: (oobCode: string, newPassword: string) => Promise<void>;
  logInWithGoogle: () => Promise<UserCredential>;

  // DB FUNCS
  createUser: (uid: string, user: iUser, newData: iUserUpdate) => Promise<void>;
  updateUserProfile: (uid: string, user: iUser, newData: iUserUpdate) => Promise<void>;
  updateUserFMC: (uid: string, token: string) => Promise<void>;

  // Adding to the users cart, wishlist, orders, payments, sales history
  addToUserCart: (uid: string, updatedCart: iCart[]) => Promise<void>;
  addToUserWishlist: (uid: string, updatedWishList: iWishList[]) => Promise<void>;
}

interface iProps {
  children: ReactNode;
  // any other props that come into the component
}

// CONTEXT
const AuthContext = createContext<iAuthContext>({} as iAuthContext);
export const useAuth = () => useContext(AuthContext);

// PROVIDER
export default function AuthProvider({ children, ...props }: iProps) {
  // STATES
  const [users, setUsers] = useState<iUser[]>([]);
  const [currUser, setCurrUser] = useState<iUser | null>(null);

  //   CONSTANTS
  const PATH_STRING = 'USERS';
  const COLLECTION_REF = collection(FIREBASE_FIRESTORE, PATH_STRING);

  //   setup and init db call to open up connection stream
  useEffect(() => {
    getUsers();
    getCurrentUser();
  }, []);

  //   check for chnages to users and curr user
  useEffect(() => {}, [currUser, users]);

  //   Gets users from db if online and local cache if offline, triggered when ever changes occur
  async function getUsers() {
    const q = query(COLLECTION_REF);
    let all: iUser[] = [];

    onSnapshot(q, { includeMetadataChanges: true }, (snapshot) => {
      // let source = snapshot.metadata.fromCache ? 'local cache' : 'server';
      // console.log('SOURCE IS: ', source);

      snapshot.docChanges().map((change) => {
        // console.log('DOC???',change.doc.data() , change.doc.data().uid);
        let user: iUser = change.doc.data() as iUser;
        all.push(user);
      });

      // console.log('ALLL', all);
      setUsers(all);
    });
  }

  //   get the user once they signed in
  async function getCurrentUser() {
    onAuthStateChanged(FIREBASE_AUTH, async function (user) {
      let use: iUser = {} as iUser;

      if (user !== null) {
        const q = query(COLLECTION_REF, where('uid', '==', `${user.uid}`));
        const querySnapshot = await getDocs(q);
        // // console.log("Q", q, "QS", querySnapshot.docs.length, querySnapshot.docs[0].data());

        if (querySnapshot.docs[0] !== undefined) {
          const data = querySnapshot.docs[0].data();
          // // console.log("The data is: ", data);

          use = {
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
            cart: data.cart,
            orders: data.orders,
            wishlist: data.wishlist,
            birthday: '',
            gender: '',
          };

          if (use.uid !== currUser?.uid) {
            // console.log('The user is', use);
            setCurrUser(user ? use : null);
          }
        }
      }
    });
  }

  //   Acessing and setting the values to the required entities
  const value = {
    users,
    currUser,
    login,
    register,
    logout,
    forgotPassword,
    resetPassword,
    logInWithGoogle,
    createUser,
    updateUserProfile,
    updateUserFMC,
    addToUserCart,
    addToUserWishlist,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

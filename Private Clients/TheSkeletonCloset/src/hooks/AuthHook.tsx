import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { query, onSnapshot, collection } from "@firebase/firestore";
import { FIREBASE_AUTH, FIREBASE_FIRESTORE } from "../firebase/FirebaseConfig";
import { PATH_STRING_USERS } from "../constants/Firebase";
import { iAdress, iInfoBase } from "../models/Basic";

interface iProps {
  children: ReactNode;
}

interface iAuthContext {
  currentUser: null | iInfoBase;
  AllUsers: null | iInfoBase[];
}

const AuthContext = createContext<iAuthContext>({} as iAuthContext);
export const useAuth = () => useContext(AuthContext);

export default function AuthContextProvider({ children, ...props }: iProps) {
  const [currentUser, setCurrentUser] = useState<null | iInfoBase>(null);
  const [AllUsers, setAllUsers] = useState<null | iInfoBase[]>(null);

  useEffect(() => {
    onAuthStateChanged(FIREBASE_AUTH, async function (user) {
      // console.log("The user is", user?.uid);

      const q = query(collection(FIREBASE_FIRESTORE, PATH_STRING_USERS));
      onSnapshot(q, (querySnapshot) => {
        querySnapshot.forEach((doc) => {
          let data = doc.data();

          // The currently signed in user:
          if (user?.uid === data.uid) {
            // console.log("Currently signed in user: ", curr);
            let curr: iInfoBase = {} as iInfoBase;
            curr = {
              email: data.email,
              uid: data.uid,
              role: data.role,
              name: data.name,
              // new:
              birthday: data.birthday !== undefined ? data.birthday : "",
              cell: data.cell !== undefined ? data.cell : "",
              gender: data.gender !== undefined ? data.gender : "",
              id: data.id !== undefined ? data.id : "",
              orders: data.orders !== undefined ? data.orders : [],
              adressBook: data.adressBook !== undefined ? data.adressBook : ({} as iAdress),
              wishlist: data.wishlist !== undefined ? data.wishlist : [],
              cart: data.cart !== undefined ? data.cart : []
            };
            setCurrentUser(user ? curr : null);
          }
          // All the users
          else {
            // console.log("Non Signed in user: ", curr);
            let all: iInfoBase[] = [];
            let curr: iInfoBase = {} as iInfoBase;
            curr = {
              email: data.email,
              uid: data.uid,
              role: data.role,
              name: data.name,
              // new:
              birthday: data.birthday !== undefined ? data.birthday : "",
              cell: data.cell !== undefined ? data.cell : "",
              gender: data.gender !== undefined ? data.gender : "",
              id: data.id !== undefined ? data.id : "",
              orders: data.orders !== undefined ? data.orders : [],
              adressBook: data.adressBook !== undefined ? data.adressBook : ({} as iAdress),
              wishlist: data.wishlist !== undefined ? data.wishlist : [],
              cart: data.cart !== undefined ? data.cart : []
            };
            all.push(curr);
            setAllUsers(all);
          }
        });
      });
    });
  }, []);

  useEffect(() => {
    // console.log("The user is", currentUser?.uid, currentUser);
  }, [currentUser]);

  useEffect(() => {
    // console.log("All users: ", AllUsers);
  }, [AllUsers]);

  const value = {
    currentUser,
    AllUsers
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

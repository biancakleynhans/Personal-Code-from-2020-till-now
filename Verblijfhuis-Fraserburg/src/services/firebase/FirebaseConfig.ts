import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getFunctions } from "firebase/functions";
import { getStorage } from "firebase/storage";

const FIREBASE_CONFIG = {
  apiKey: "AIzaSyA1wgT7QiLLp9FTE5pgjW4bjL09CFTWRHI",
  authDomain: "verblijfhuis-fraserburg.firebaseapp.com",
  projectId: "verblijfhuis-fraserburg",
  storageBucket: "verblijfhuis-fraserburg.appspot.com",
  messagingSenderId: "593622212274",
  appId: "1:593622212274:web:4a6c116e9042e7dc70b3ab",
  measurementId: "G-ZLZWTS90EF"
};

// Initialize Firebase
const FIREBASE_APP = initializeApp(FIREBASE_CONFIG);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
export const FIREBASE_FIRESTORE = getFirestore(FIREBASE_APP);
export const FIREBASE_FUNCTIONS = getFunctions(FIREBASE_APP);
export const FIREBASE_STORAGE = getStorage(FIREBASE_APP);

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getFunctions } from "firebase/functions";
import { getStorage } from "firebase/storage";

const FIREBASE_CONFIG = {
  apiKey: "AIzaSyDHVswpACT0f0i_1M234cNXzxK64YTHMIE",
  authDomain: "webfusiononline-368cb.firebaseapp.com",
  projectId: "webfusiononline-368cb",
  storageBucket: "webfusiononline-368cb.appspot.com",
  messagingSenderId: "35897267306",
  appId: "1:35897267306:web:6696e549614e68122ee613",
  measurementId: "G-CXRVECB93N"
};

// Initialize Firebase
const FIREBASE_APP = initializeApp(FIREBASE_CONFIG);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
export const FIREBASE_FIRESTORE = getFirestore(FIREBASE_APP);
export const FIREBASE_FUNCTIONS = getFunctions(FIREBASE_APP);
export const FIREBASE_STORAGE = getStorage(FIREBASE_APP);

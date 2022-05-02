import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { CACHE_SIZE_UNLIMITED, initializeFirestore } from "firebase/firestore";
import { getFunctions } from "firebase/functions";
import { getMessaging } from "firebase/messaging";
import { getStorage } from "firebase/storage";

export const FIREBASE_CONFIG = {
  apiKey: "AIzaSyDjeUTIxYWbcO14mHzO7uQGDSmNbZm9b8M",
  authDomain: "george-agri-show.firebaseapp.com",
  projectId: "george-agri-show",
  storageBucket: "george-agri-show.appspot.com",
  messagingSenderId: "37371536535",
  appId: "1:37371536535:web:28d8b8537c2e8dabfc75d2",
  measurementId: "G-G6L1CT9NYX"
};

// Initialize Firebase
export const FIREBASE_APP = initializeApp(FIREBASE_CONFIG);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
export const FIREBASE_FIRESTORE = initializeFirestore(FIREBASE_APP, {
  cacheSizeBytes: CACHE_SIZE_UNLIMITED
});
export const FIREBASE_FUNCTIONS = getFunctions(FIREBASE_APP);
export const FIREBASE_STORAGE = getStorage(FIREBASE_APP);
export const FIREBASE_MESSAGING = getMessaging(FIREBASE_APP);

// FIREBASE VAPIDKEY
export const FIREBASE_VAPID_KEY = "BOs1kyB6hu3wbxItNEjTY16JzHcEKIdPHphXNDY_c8I84yADr_rdIO_9IRMj66J8H67dOQ_VFWLHiheUQ0pkCCE";

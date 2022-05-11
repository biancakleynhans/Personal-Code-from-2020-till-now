import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getFunctions } from "firebase/functions";
import { getStorage } from "firebase/storage";
import { getDatabase } from "firebase/database";

const FIREBASE_CONFIG = {
  apiKey: "AIzaSyD3dlM4RtF8TRTSwmSjHwUeOUxWEBsqYV0",
  authDomain: "skeleton-closet.firebaseapp.com",
  projectId: "skeleton-closet",
  storageBucket: "skeleton-closet.appspot.com",
  messagingSenderId: "997323050265",
  appId: "1:997323050265:web:c3da6fdbd78ff4227e0988",
  measurementId: "G-P2Q09MCN4Z"
};

// Initialize Firebase
const FIREBASE_APP = initializeApp(FIREBASE_CONFIG);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
export const FIREBASE_REAL_TIME_DB = getDatabase(FIREBASE_APP);
export const FIREBASE_FIRESTORE = getFirestore(FIREBASE_APP);
export const FIREBASE_FUNCTIONS = getFunctions(FIREBASE_APP);
export const FIREBASE_STORAGE = getStorage(FIREBASE_APP);

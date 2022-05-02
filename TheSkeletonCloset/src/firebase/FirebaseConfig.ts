import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getFunctions } from "firebase/functions";
import { getStorage } from "firebase/storage";
import { getDatabase } from "firebase/database";

const FIREBASE_CONFIG = {
  apiKey: "AIzaSyC4Nzpugm8JspgqZiVXvu3gwLZKS_vaTmQ",
  authDomain: "skeleton-in-the-closet.firebaseapp.com",
  databaseURL: "https://skeleton-in-the-closet-default-rtdb.firebaseio.com",
  projectId: "skeleton-in-the-closet",
  storageBucket: "skeleton-in-the-closet.appspot.com",
  messagingSenderId: "275207192810",
  appId: "1:275207192810:web:9ea73cefdcdc21a7419793",
  measurementId: "G-7NRLD83HV0"
};

// Initialize Firebase
const FIREBASE_APP = initializeApp(FIREBASE_CONFIG);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
export const FIREBASE_REAL_TIME_DB = getDatabase(FIREBASE_APP);
export const FIREBASE_FIRESTORE = getFirestore(FIREBASE_APP);
export const FIREBASE_FUNCTIONS = getFunctions(FIREBASE_APP);
export const FIREBASE_STORAGE = getStorage(FIREBASE_APP);

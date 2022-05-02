import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getFunctions } from "firebase/functions";
import { getStorage } from "firebase/storage";
import { getDatabase } from "firebase/database";

const FIREBASE_CONFIG = {
  apiKey: "AIzaSyBbwgLwC3AS0U341McFTWpSMhhlmLadLkc",
  authDomain: "black-wolfs-moon.firebaseapp.com",
  databaseURL: "https://black-wolfs-moon-default-rtdb.firebaseio.com",
  projectId: "black-wolfs-moon",
  storageBucket: "black-wolfs-moon.appspot.com",
  messagingSenderId: "550302656088",
  appId: "1:550302656088:web:145e9311939980b4d2cc2d"
};

// Initialize Firebase
const FIREBASE_APP = initializeApp(FIREBASE_CONFIG);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
export const FIREBASE_REAL_TIME_DB = getDatabase(FIREBASE_APP);
export const FIREBASE_FIRESTORE = getFirestore(FIREBASE_APP);
export const FIREBASE_FUNCTIONS = getFunctions(FIREBASE_APP);
export const FIREBASE_STORAGE = getStorage(FIREBASE_APP);

import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFunctions } from 'firebase/functions';
// import { getMessaging } from 'firebase/messaging';
import { getStorage } from 'firebase/storage';
import { EnableOffline } from './FirestoreOfline';

// Your web app's Firebase configuration
const FIREBASE_CONFIG = {
  apiKey: 'AIzaSyBbwgLwC3AS0U341McFTWpSMhhlmLadLkc',
  authDomain: 'black-wolfs-moon.firebaseapp.com',
  databaseURL: 'https://black-wolfs-moon-default-rtdb.firebaseio.com',
  projectId: 'black-wolfs-moon',
  storageBucket: 'black-wolfs-moon.appspot.com',
  messagingSenderId: '550302656088',
  appId: '1:550302656088:web:145e9311939980b4d2cc2d',
};

// Initialize Firebase
export const FIREBASE_APP = initializeApp(FIREBASE_CONFIG);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
export const FIREBASE_FIRESTORE = EnableOffline(FIREBASE_APP);
export const FIREBASE_FUNCTIONS = getFunctions(FIREBASE_APP);
export const FIREBASE_STORAGE = getStorage(FIREBASE_APP);
// export const FIREBASE_MESSAGING = getMessaging(FIREBASE_APP);

// providers via firebase
export const GOOGLE_PROVIDER = new GoogleAuthProvider();

// FIREBASE VAPIDKEY
// export const FIREBASE_VAPID_KEY = 'BOs1kyB6hu3wbxItNEjTY16JzHcEKIdPHphXNDY_c8I84yADr_rdIO_9IRMj66J8H67dOQ_VFWLHiheUQ0pkCCE';

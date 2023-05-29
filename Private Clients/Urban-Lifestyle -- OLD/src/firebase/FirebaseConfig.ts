import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getFunctions } from 'firebase/functions';
import { getStorage } from 'firebase/storage';
import { getDatabase } from 'firebase/database';

const FIREBASE_CONFIG = {
  databaseURL: 'https://urban-lifestyle-default-rtdb.firebaseio.com',
  apiKey: 'AIzaSyA8VAGbdeJfSucCzlSOLpisPLgZaxvbOT4',
  authDomain: 'urban-lifestyle.firebaseapp.com',
  projectId: 'urban-lifestyle',
  storageBucket: 'urban-lifestyle.appspot.com',
  messagingSenderId: '40052643253',
  appId: '1:40052643253:web:0cacbdbb03c0c96fd4f5fc',
};

// Initialize Firebase
const FIREBASE_APP = initializeApp(FIREBASE_CONFIG);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
export const FIREBASE_REAL_TIME_DB = getDatabase(FIREBASE_APP);
export const FIREBASE_FIRESTORE = getFirestore(FIREBASE_APP);
export const FIREBASE_FUNCTIONS = getFunctions(FIREBASE_APP);
export const FIREBASE_STORAGE = getStorage(FIREBASE_APP);

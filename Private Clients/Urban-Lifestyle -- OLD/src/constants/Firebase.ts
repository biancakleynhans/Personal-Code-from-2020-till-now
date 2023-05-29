import { collection } from '@firebase/firestore';
import { ref } from 'firebase/database';
import { FIREBASE_FIRESTORE, FIREBASE_REAL_TIME_DB } from '../firebase/FirebaseConfig';

export const PATH_STRING_USERS = 'USERS';
export const USER_DB = collection(FIREBASE_FIRESTORE, PATH_STRING_USERS);

export const PATH_STRING_INVENTORY = 'INVENTORY';
export const PATH_STRING_CATEGORIES = 'CATEGORIES';
export const PATH_STRING_SUBCATEGORIES = 'SUBCATEGORIES';
export const PATH_STRING_BRANDS = 'BRANDS';

export const INVENTORY_DB = ref(FIREBASE_REAL_TIME_DB, '/');

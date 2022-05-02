/** @format */

import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/database';
import 'firebase/storage';

const firebaseApp = firebase.initializeApp({
	apiKey: 'AIzaSyDajWoDelVS-8ht8nTiHk6MYOh7tic885Q',
	authDomain: 'koebaaivetnoiserver.firebaseapp.com',
	databaseURL: 'https://koebaaivetnoiserver.firebaseio.com',
	projectId: 'koebaaivetnoiserver',
	storageBucket: 'koebaaivetnoiserver.appspot.com',
	messagingSenderId: '641991001283',
	appId: '1:641991001283:web:f65136f0112d313680ce76',
	measurementId: 'G-CCRZM5G4HB'
});

export default firebaseApp;

export const firebaseDatabase = firebase.firestore();
export const firebaseRealTimeDatabase = firebase.database();
export const firebaseStorageBucket = firebase.storage();


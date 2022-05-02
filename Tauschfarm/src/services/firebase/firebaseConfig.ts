import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/database';
import 'firebase/storage';

import { GetAppSettings } from '../ownServices/AppSettings';

var FIREBASE = firebase.initializeApp(GetAppSettings().firebase);

firebase.firestore();
firebase.database();
firebase.storage();
firebase.auth();
firebase.auth();

export default FIREBASE;

export const reduxFirebase = {
	userProfile: 'USERS',
	useFirestoreForProfile: false,
	enableLogging: false,
	presence: 'presence'
};

/** @format */

import React from 'react';
import thunk from 'redux-thunk';
import firebase from 'firebase/app';
import { createStore, applyMiddleware, compose } from 'redux';
import { createFirestoreInstance } from 'redux-firestore';
import { useSelector } from 'react-redux';
import { isLoaded } from 'react-redux-firebase';

import rootReducer from './reducers/CombineReducers';
import FIREBASE from '../firebase/FirebaseConfig';
import { TypesToFirebaseGlobals } from '../firebase/TypesToServer';

import { LoadingScreen } from '../../layout/Loading_Redirecting/LoadingScreen';

export const ReactReduxFirebaseStore = createStore(
	rootReducer,
	compose(applyMiddleware(thunk))
);

export const ReactReduxFirebaseProps = {
	firebase,
	config: {
		FIREBASE,
		useFirestoreForProfile: false,
		userProfile: TypesToFirebaseGlobals.User_Root // where profiles are stored in database
		// presence: 'presence', // where list of online users is stored in database
		// sessions: 'sessions'
	},
	dispatch: ReactReduxFirebaseStore.dispatch,
	createFirestoreInstance
};

export function AuthIsLoaded({ children }) {
	const auth = useSelector((state) => state.firebase.auth);
	if (!isLoaded(auth)) return <LoadingScreen />;
	return children;
}

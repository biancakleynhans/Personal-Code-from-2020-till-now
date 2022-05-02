import { combineReducers } from 'redux';
import { firebaseReducer } from 'react-redux-firebase';
import { firestoreReducer } from 'redux-firestore';
import AuthReducer from './000AuthReducer';
import UserReducer from './001UserReducer';
import OwnerReducer from './001OwnerReducer';

const rootReducer = combineReducers({
	firebase: firebaseReducer,
	firestore: firestoreReducer,
	owner: OwnerReducer,
	auth: AuthReducer,
	user: UserReducer
});

export default rootReducer;

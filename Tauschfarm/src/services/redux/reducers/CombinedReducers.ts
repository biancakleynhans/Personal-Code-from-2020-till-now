import { combineReducers } from 'redux';
import { firebaseReducer } from 'react-redux-firebase';
import { firestoreReducer } from 'redux-firestore';
import AuthReducer from './000AuthReducer';
import UserReducer from './001UserReducer';
import ItemReducer from './003ItemReducer';
import DonationReducer from './004DonationReducers';
import EventsReducer from './005EventsReducer';
import GroupsReducer from './006GroupsReducers';
import GlobalUserReducer from './001GlobalUsersReducer';
import SupportReducer from './007SupportReducer';
import TimelineReducer from './008TimelineReducer';

const rootReducer = combineReducers({
	firebase: firebaseReducer,
	firestore: firestoreReducer,
	auth: AuthReducer,
	user: UserReducer,
	item: ItemReducer,
	donations: DonationReducer,
	events: EventsReducer,
	groups: GroupsReducer,
	globalUsers: GlobalUserReducer,
	support: SupportReducer,
	timeline: TimelineReducer
});

export default rootReducer;

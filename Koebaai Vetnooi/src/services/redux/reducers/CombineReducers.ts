import { combineReducers } from 'redux';
import { firebaseReducer } from 'react-redux-firebase';
import { firestoreReducer } from 'redux-firestore';
import AuthReducer from './000AuthReducer';
import UserReducer from './001UserReducer';
import FastReducer from './002FastRecuder';
import WeightReducer from './003WeightReducer';
import WaterDiaryReducer from './004WaterDiaryReducer';
import FoodDiaryReducer from './005FoodDiaryReducer';
import GroupsReducer from './006GroupsReducers';
import AdminReducer from './000AdminReducer';

const rootReducer = combineReducers({
	firebase: firebaseReducer,
	firestore: firestoreReducer,
	auth: AuthReducer,
	user: UserReducer,
	fast: FastReducer,
	weight: WeightReducer,
	waterDiary: WaterDiaryReducer,
	foodDiary: FoodDiaryReducer,
	chatsPage: GroupsReducer,
	adminUser: AdminReducer
});

export default rootReducer;

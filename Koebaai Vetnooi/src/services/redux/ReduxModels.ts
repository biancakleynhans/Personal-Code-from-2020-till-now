import { i_BaseInterface_Location_Full, i_Redux_ActionFunc_Interface_User, i_BaseInterface_User } from '../../models/001UserModels';
import { NamedDict } from '../helpers/Tools';
import { iTimePeriod } from '../../models/FastModels';
import { iWeightMesureEntry } from '../../models/WeightModels';
import { iWaterDiaryEntry } from './reducers/004WaterDiaryReducer';
import { iFoodDiaryEntry } from './reducers/005FoodDiaryReducer';

interface iProvider {
	displayName: string | null;
	email: string;
	phoneNumber: string | null;
	photoURL: null;
	providerId: string;
	uid: string;
}

export interface IAppState {
	firebase: {
		auth: {
			apiKey: string;
			appName: string;
			authDomain: string;
			createdAt: string;
			displayName: string | null;
			email: string;
			emailVerified: boolean;
			isAnonymous: boolean;
			isEmpty: boolean;
			isLoaded: boolean;
			lastLoginAt: string;
			multiFactor: { enrolledFactors: any[] };
			phoneNumber: string | null;
			photoURL: string | null;
			providerData: iProvider[];
		};
		authError: {} | null;
		data: {};
		errors: [];
		isInitializing: boolean;
		listeners: {};
		ordered: {};
		profile: {};
		requested: {};
		requesting: {};
		timestamps: {};
	};
	firestore: any;
	auth: {
		id: any;
		authError: any | null;
		email: string;
		passw: string;
	};
	user: {
		id: string;
		role: 'user' | 'admin' | 'dev';
		email: string;
		name: string;
		avatar: string;
		imgArray: string[];
		bio: string;
		location: i_BaseInterface_Location_Full;
		lang: string;
		errorMsg: string | null;
		isEmpty: boolean;
		notifyToken: string;
		progress: {
			progress: number;
			fileName: string;
			imgArr: [];
		};
	};
	fast: {
		errorMsg: string;
		Fasts: NamedDict<iTimePeriod>;
		editfast: iTimePeriod;
		currentRunningFast: {
			startTime: number;
			id: string;
		};
	};
	weight: {
		errorMsg: string;
		Weights: NamedDict<iWeightMesureEntry>;
		editWeight: iWeightMesureEntry;
	};
	waterDiary: {
		errorMsg: string;
		WaterDiary: NamedDict<iWaterDiaryEntry>;
		editWater: iWaterDiaryEntry;
	};
	foodDiary: {
		errorMsg: string;
		FoodDiary: NamedDict<iFoodDiaryEntry>;
		editWater: iFoodDiaryEntry;
	};
	chatsPage: {
		GroupPosts: {};
		errorMsg: string;
		isEmpty: boolean;
		count: number;
	};
	adminUser: {
		errorMsg: string;
		AllUsers: NamedDict<i_BaseInterface_User>;
	};
}

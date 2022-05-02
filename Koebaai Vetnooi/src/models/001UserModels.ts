import { NamedDict } from '../services/helpers/Tools';
import { iTimePeriod } from './FastModels';
import { iWeightMesureEntry } from './WeightModels';
import { iWaterDiaryEntry } from '../services/redux/reducers/004WaterDiaryReducer';
import { iFoodDiaryEntry } from '../services/redux/reducers/005FoodDiaryReducer';

export interface i_BaseInterface_Location_Full {
	address: {
		district: string;
		houseNumber: string;
		street: string;
		city: string;
		state: string;
		postalCode: string;
		country: string;
		county: string;
		label: string;
	};

	locationId: string;
	locationType: string;

	coords: {
		lat: string | number;
		long: string | number;
	};
}

export interface i_BaseInterface_User {
	id: string;
	email: string;
	role: 'user' | 'admin' | 'dev';
	name: string;
	avatar: string;
	imgArray: string[];
	bio: string;
	location: i_BaseInterface_Location_Full;
	lang: string;
	fasts: NamedDict<iTimePeriod>;
	weights: NamedDict<iWeightMesureEntry>;
	waterDiary: NamedDict<iWaterDiaryEntry>;
	foodDiary: NamedDict<iFoodDiaryEntry>;
}

export interface i_Redux_ActionFunc_Interface_User {
	id: string;
	notifyToken: string;
	email: string;
	role: 'user' | 'admin' | 'dev';
	name: string;
	avatar: string;
	imgArray: string[];
	bio: string;
	location: i_BaseInterface_Location_Full;
	lang: string;
	errorMsg: string | null;
	isEmpty: boolean;
	weights: NamedDict<iWeightMesureEntry>;
	progress: {
		progress: number;
		fileName: string;
		imgArr: any[];
	};
	notifications: any[];
}

export interface i_BaseInterface_Member {
	id: string;
	name: string;
	avatar: string;
}

export const ActiveLevelsOptions = ['None', 'Little', 'Light', 'Moderate', 'Very', 'Extra'];

export interface i_AdminNeedsThisInfo_Interface_User {
	id: string;
	email: string;
	name: string;
	avatar: string;
	fasts: NamedDict<iTimePeriod>;
	weights: NamedDict<iWeightMesureEntry>;
	waterDiary: NamedDict<iWaterDiaryEntry>;
	foodDiary: NamedDict<iFoodDiaryEntry>;
}

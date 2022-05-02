import { NamedDict } from '../services/helpers/Tools';
import { i_BaseInterface_Group } from './004GroupModels';
import { i_BaseInterface_Category } from './002CatagoryModels';
import { i_BaseInterface_Event, i_BaseInterface_Location_Full } from './005EventModels';
import { i_BaseInterface_Donation } from './0003DonationModels';
import { i_BaseInterface_Chat } from './008ChatModels';

export interface i_BaseInterface_User {
	id: string;
	name: string;
	avatar: string;
	imgArray: string[];
	bio: string;
	location: i_BaseInterface_Location_Full;
	lang: string;
	groups: NamedDict<i_BaseInterface_Group>;
	categories: NamedDict<i_BaseInterface_Category>;
	events: NamedDict<i_BaseInterface_Event>;
	donations: NamedDict<i_BaseInterface_Donation>;
	msgHistory: NamedDict<i_BaseInterface_Chat>;
	newMsgs: number;
	userBioUpdate?: string;
	subscriptionType: {
		type: 'free' | 'paid';
		startDate: string | Date | number;
		payedWith: 'stripe' | 'payPal' | 'free';
	};
	UsersIfollow: NamedDict<i_BaseInterface_Member>;
	UsersFollowingMe: NamedDict<i_BaseInterface_User>;
	notifications: [];
	notifyToken: '';
	typesOfsubjectsTonotifyOn: {
		NewItemsinGroups: boolean;
		NewMessages: boolean;
		NewEventsNearYou: boolean;
		NewFollowAddedSomething: boolean;
	};
}

export interface i_Redux_ActionFunc_Interface_User {
	loader: 'start' | 'stop' | 'notSet';
	id: string;
	name: string;
	avatar: string;
	imgArray: string[];
	bio: string;
	location: i_BaseInterface_Location_Full;
	lang: string;
	groups: NamedDict<i_BaseInterface_Group>;
	categories: NamedDict<i_BaseInterface_Category>;
	events: NamedDict<i_BaseInterface_Event>;
	donations: NamedDict<i_BaseInterface_Donation>;
	errorMsg: string | null;
	isEmpty: boolean;
	msgHistory: NamedDict<i_BaseInterface_Chat>;
	newMsgs: number;
	progress: {
		progress: number;
		fileName: string;
		imgArr: any[];
	};
	subscriptionType: {
		type: 'free' | 'paid';
		startDate: string | Date | number;
		payedWith: 'stripe' | 'payPal' | 'free';
	};
	// count: number;
	UsersIfollow: NamedDict<i_BaseInterface_Member>;
	UsersFollowingMe: NamedDict<i_BaseInterface_User>;
	notifications: [];
	notifyToken: '';
	typesOfsubjectsTonotifyOn: {
		NewItemsinGroups: boolean;
		NewMessages: boolean;
		NewEventsNearYou: boolean;
		NewFollowAddedSomething: boolean;
	};
}

export interface i_BaseInterface_Member {
	id: string;
	name: string;
	avatar: string;
}

export interface i_BaseInterface_Location {
	lat: string;
	long: string;
	locString: string;
}

export interface followingData {
	currentUser: i_BaseInterface_Member;
	follow: i_BaseInterface_Member;
}

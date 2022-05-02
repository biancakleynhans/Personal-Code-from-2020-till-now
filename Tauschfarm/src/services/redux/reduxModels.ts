import { NamedDict } from '../helpers/Tools';
import { i_BaseInterface_Category } from '../../models/002CatagoryModels';
import { i_BaseInterface_Donation } from '../../models/0003DonationModels';
import { i_BaseInterface_Event } from '../../models/005EventModels';
import { i_BaseInterface_Location, i_Redux_ActionFunc_Interface_User } from '../../models/001UserModels';
import { i_BaseInterface_Group } from '../../models/004GroupModels';
import { iItem } from './reducers/003ItemReducer';
import { iDonations } from './reducers/004DonationReducers';
import { iEvent } from './reducers/005EventsReducer';
import { iGroup } from './reducers/006GroupsReducers';
import { iTimeline } from './reducers/008TimelineReducer';
import { iSupport } from './reducers/007SupportReducer';

interface iProvider {
	displayName: null;
	email: string;
	phoneNumber: null;
	photoURL: null;
	providerId: string;
	uid: string;
}

interface iAuth {
	apiKey: string;
	appName: string;
	authDomain: string;
	createdAt: number;
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
	uid: string;
}

interface iProfile {
	avatar: string;
	bio: string;
	categories: NamedDict<i_BaseInterface_Category>;
	donations: NamedDict<i_BaseInterface_Donation>;
	events: NamedDict<i_BaseInterface_Event>;
	geoLocation: i_BaseInterface_Location | {};
	groups: NamedDict<i_BaseInterface_Group>;
	id: string;
	imgArray: string[];
	isEmpty: boolean;
	isLoaded: boolean;
	lang: 'en' | 'de';
	location: i_BaseInterface_Location;
	name: string;
}

interface iFirebase {
	auth: iAuth;
	authError: {} | null;
	data: {};
	errors: [];
	isInitializing: boolean;
	listeners: {};
	ordered: {};
	profile: iProfile;
	requested: {};
	requesting: {};
	timestamps: {};
}

interface auth2 {
	id: any;
	authError: any | null;
	email: string;
	passw: string;
}

export interface IAppState {
	firebase: iFirebase;
	firestore: any;
	auth: auth2;
	user: i_Redux_ActionFunc_Interface_User;
	item: iItem;
	donations: iDonations;
	events: iEvent;
	groups: iGroup;
	globalUsers: {
		GlobalUsers: NamedDict<i_Redux_ActionFunc_Interface_User>;
	};
	support: iSupport;
	timeline: iTimeline;
}

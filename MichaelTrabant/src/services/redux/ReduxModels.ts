import { i_BaseInterface_Location_Full, i_Redux_ActionFunc_Interface_User, i_BaseInterface_User } from '../../models/001UserModels';
import { NamedDict } from '../helpers/Tools';
import { i_BaseInterface_Chat } from '../../models/008ChatModels';
import { i_Redux_ActionFunc_Interface_Owner } from '../../models/002OwnerModels';

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
		profile: {
			id: string;
			name: string;
			email: string;
			connectp: string;
			location: i_BaseInterface_Location_Full;
			lang: string;
			errorMsg: string | null;
			isEmpty: boolean;
			msgHistory: NamedDict<i_BaseInterface_Chat>;
			progress: {
				progress: number;
				fileName: string;
			};
		};
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
	user: i_Redux_ActionFunc_Interface_User;
	owner: {
		owner: i_Redux_ActionFunc_Interface_Owner;
		globalUsers: NamedDict<i_BaseInterface_User>;
	};
}

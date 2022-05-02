import { NamedDict } from '../services/helpers/Tools';
import { i_BaseInterface_Chat } from './008ChatModels';

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
	name: string;
	email: string;
	connectp: string;
	location: i_BaseInterface_Location_Full;
	lang: string;
	msgHistory: NamedDict<i_BaseInterface_Chat>;
	sessions: NamedDict<any>
}

export interface i_Redux_ActionFunc_Interface_User {
	id: string;
	email: string;
	name: string;
	connectp: string;
	location: i_BaseInterface_Location_Full;
	lang: string;
	errorMsg: string | null;
	isEmpty: boolean;
	progress: {
		progress: number;
		fileName: string;
	};
	msgHistory: NamedDict<i_BaseInterface_Chat>;
	sessions: NamedDict<any>
	pendingImgUrl: string[];
}

export interface i_BaseInterface_Member {
	id: string;
	name: string;
	avatar: string;
}

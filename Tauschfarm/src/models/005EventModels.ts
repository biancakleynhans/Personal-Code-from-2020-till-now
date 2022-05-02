import { NamedDict } from '../services/helpers/Tools';
import { i_BaseInterface_Member } from './001UserModels';

interface i_BaseInterface_ECounts {
	liked: number;
	intrested: number;
	going: number;
	goingAdded: NamedDict<i_goingAdded>;
	intrestedAdded: NamedDict<i_goingAdded>;
}

export const AppStartGloabalBase_Events: NamedDict<i_BaseInterface_Event> = {};

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

export interface i_BaseInterface_Event {
	id: string;
	name: string;
	imgArray: string[];
	avatar: string;
	time: string;
	date: string;
	location: i_BaseInterface_Location_Full;
	description: string;
	userWhoAddedEvent: i_BaseInterface_Member;
	dateCreated: any;
	counts: i_BaseInterface_ECounts;
}

export interface i_BaseInterface_EventIndexer {
	id: string;
}

export interface i_Redux_ActionFunc_Interface_Event_SetOnNav {
	id: string;
	name: string;
	location: i_BaseInterface_Location_Full;
	date: string;
	time: string;
	counts: i_BaseInterface_ECounts;
	imgArray: string[];
	avatar: string;
	description: string;
	userWhoAddedEvent: i_BaseInterface_Member;
	timelineId: string;
}

export interface i_goingAdded {
	id: string;
}

export interface i_Redux_ActionFunc_Interface_Event_Going {
	event: i_BaseInterface_Event;
	going: number;
	userOrGlobal: 'user' | 'global';
	goingAdded: NamedDict<i_goingAdded>;
}

import { i_BaseInterface_Location_Full } from './001UserModels';
import { i_BaseInterface_Chat } from './008ChatModels';
import { NamedDict } from '../services/helpers/Tools';

export interface i_Redux_ActionFunc_Interface_Owner {
	id: string;
	avatar: string;
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
	workData: OwnerworkData;
	sessionsBooked: NamedDict<any>;
}

interface OwnerworkData {
	daysOfwork: string[];
	hoursOfwork: string[];
	hoursOfNonWork: string[];
}

export interface Daycontent {
	en: string;
	de: string;
	value: string;
	selected: boolean;
}

export const weekDays = [
	{ en: 'Monday', de: 'Montag', value: 'Monday', selected: false },
	{ en: 'Tuesday', de: 'Dienstag', value: 'Tuesday', selected: false },
	{ en: 'Wednesday', de: 'Mittwoch', value: 'Wednesday', selected: false },
	{ en: 'Thursday', de: 'Donnerstag', value: 'Thursday', selected: false },
	{ en: 'Friday', de: 'Freitag', value: 'Friday', selected: false },
	{ en: 'Saturday', de: 'Samstag', value: 'Saturday', selected: false },
	{ en: 'Sunday', de: 'Sonntag', value: 'Sunday', selected: false },
];

export const Times = ['05:00', '06:00', '07:00', '08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00'];

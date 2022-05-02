import { i_BaseInterface_Member } from './001UserModels';
import { i_DonsNeedToGetAllCatsForAgroup } from './0003DonationModels';
import { i_BaseInterface_Location_Full } from './005EventModels';

export interface iWhereEntry {
	where: 'user' | 'group';
	cat: string;
	uid: string;
}
export interface iSendUpdate {
	item: {
		id: string;
		name: string;
		brand: { en: string; de: string };
		categories: string[];
		size: { en: string; de: string };
		color: string;
		length: string;
		worth: number | string;
		shipping: number | string;
		location: i_BaseInterface_Location_Full;
		description: string;
		imgArray: string[];
		avatar: string;
		dateEdited: string | number;
	};
	everywhere: iWhereEntry[];
	timelineId: string;
}

export interface i_BaseInterface_Item {
	id: string;
	name: string;
	brand: { en: string; de: string };
	size: { en: string; de: string };
	color: string;
	length: string;
	description: string;
	imgArray: string[];
	avatar: string;
	worth: number | string;
	shipping: number | string;
	categories: string[];
	groups: any[];
	userWhoAddedItem: i_BaseInterface_Member;
	dateCreated: Date | number;
	dateEdited: Date | string;
	dateMovedToDons: Date | string;
	dateDeleted: Date | string;
	url?: string;
	location: i_BaseInterface_Location_Full;
}

export interface i_BaseInterface_ItemIndexer {
	id: string;
	categories: string[];
	groups?: any;
	dateEdited?: Date;
}

export interface i_Redux_ActionFunc_Interface_Item_SetOnNav {
	id: string;
	name: string;
	categories: string[];
	groups?: string[];
	brand: { en: string; de: string };
	size: { en: string; de: string };
	color: string;
	length: string;
	description: string;
	userWhoAddedItem: i_BaseInterface_Member;
	worth: number | string;
	shipping: number | string;
	location: i_BaseInterface_Location_Full;
	imgArray: string[];
}

export interface i_Redux_ActionFunc_Interface_Item_MoveTo_Donations {
	userId: string;
	itemToMove: i_BaseInterface_Item;
	itemId: string;
	catToremoveFrom: string[];
	dateMoved: Date;
	moveObj: i_BaseInterface_ItemIndexer;
	allCatsForThisUser: i_DonsNeedToGetAllCatsForAgroup[];
}

export interface i_GloballyDelteItem {
	groupId: string;
	catName: string;
	itemId: string;
	userId: string;
	userOrGroup: 'user' | 'group';
	tlID?: string;
}

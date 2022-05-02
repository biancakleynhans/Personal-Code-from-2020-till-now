import { NamedDict } from '../services/helpers/Tools';
import { i_BaseInterface_Member } from './001UserModels';
import { i_BaseInterface_Item } from './006ItemModels';
import { i_BaseInterface_Category } from './002CatagoryModels';
import { i_BaseInterface_Location_Full } from './005EventModels';

export const AppStartGloabalBase_Donations: NamedDict<i_BaseInterface_Donation> = {};

export interface i_BaseInterface_Donation {
	id: string;
	name: string;
	brand: { en: string; de: string };
	size: { en: string; de: string };
	color: string;
	length: string;
	description: string;
	imgArray: string[];
	avatar: string;
	categories: string[];
	groups: any;
	userWhoAddedItem: i_BaseInterface_Member;
	dateCreated: Date | number;
	dateEdited: Date | string;
	dateMovedToDons: Date | string;
	dateDeleted: Date | string;
	worth: number | string;
	shipping: number | string;
	location: i_BaseInterface_Location_Full;
}

export interface i_Redux_ActionFunc_Interface_Item_DeleteFrom_Donations {
	userId: string;
	itemToMove: i_BaseInterface_Item;
}

export interface i_DonsNeedToGetAllCatsForAgroup {
	cats: NamedDict<i_BaseInterface_Category>;
	userAddedId: string;
	userId: string;
	groupId: string;
	userOrGroup: string;
}

export interface ItemsFoundObj {
	itemId: string;
	groupId: string;
	category: string;
	userId: string;
	userOrGroup: string; //'user' | 'group';
}

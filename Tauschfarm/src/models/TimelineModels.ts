import { NamedDict } from '../services/helpers/Tools';
import { catItemIndexer } from './002CatagoryModels';
import { i_BaseInterface_Member } from './001UserModels';
import { i_BaseInterface_Item } from './006ItemModels';
import { i_BaseInterface_Event } from './005EventModels';
import { i_BaseInterface_Group } from './004GroupModels';

export interface iTimeLineEntry {
	type:
		| 'New User'
		| 'User Udated Profile'
		| 'User has new follower'
		| 'User added new item'
		| 'User added new donation'
		| 'User added new event'
		| 'New Group'
		| 'Group added new categories'
		| 'Group added new item';
	date: number;
	name: string;
	id: string;
	content?: {
		avatar: string;
		bio?: string;
		categories?: NamedDict<catItemIndexer>;
		newFollower?: i_BaseInterface_Member;
		item?: i_BaseInterface_Item;
		event?: i_BaseInterface_Event;
		group?: i_BaseInterface_Group;
	};
}

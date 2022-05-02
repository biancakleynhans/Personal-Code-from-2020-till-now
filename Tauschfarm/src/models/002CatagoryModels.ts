import { NamedDict } from '../services/helpers/Tools';
import { i_BaseInterface_Item } from './006ItemModels';

export interface GL_CATS {
	name: string;
	avatar: string;
	items: NamedDict<i_BaseInterface_Item>;
	checkMatch: string;
	groupName: string;
	userName: string;
	// urlStringStatic: string;
}

export interface ASGB_Cat {
	name: string;
	avatar: string;
	items: NamedDict<i_BaseInterface_Item>;
	checkMatch: string;
}

interface indexer {
	id: string;
	categories: string[];
}

export interface catItemIndexer {
	name: string;
	avatar: string;
	checkMatch: string;
	items: NamedDict<indexer>;
}

export interface i_BaseInterface_Category {
	name: string;
	avatar: string;
	items: NamedDict<i_BaseInterface_Item>;
	checkMatch: string;
}

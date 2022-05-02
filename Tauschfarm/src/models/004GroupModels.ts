import { NamedDict } from '../services/helpers/Tools';
import { i_BaseInterface_Member, i_BaseInterface_Location } from './001UserModels';
import { i_BaseInterface_Category } from './002CatagoryModels';
import { i_BaseInterface_Post } from './009PostToGroupModels';

export const AppStartGloabalBase_Groups: NamedDict<i_BaseInterface_Group> = {};

export const AppStartGloabalBase_Group: i_BaseInterface_Group = {
	id: '',
	name: '',
	imgArray: [],
	avatar: '',
	memberCount: 1,
	membersList: {},
	membersRequests: {},
	categories: {},
	description: '',
	location: {
		lat: '',
		long: '',
		locString: ''
	},
	lang: '',
	joinReqs: {},
	posts: {}
};

export interface i_BaseInterface_Group {
	id: string;
	name: string;
	imgArray: string[];
	avatar: string;
	memberCount: number;
	membersList: NamedDict<i_BaseInterface_Member>;
	membersRequests: NamedDict<i_MembersRequests>;
	categories: NamedDict<i_BaseInterface_Category>;
	description: string;
	location: i_BaseInterface_Location;
	lang: string;
	joinReqs: NamedDict<i_Join_req>;
	posts: NamedDict<i_BaseInterface_Post>;
}

export interface i_MembersRequests {
	user: i_BaseInterface_Member;
	stats: {
		status: 'pending' | 'aproved' | 'declined';
		reqDate: Date;
	};
}

export interface i_Join_req {
	userWhoWantsToJoin: {
		id: string;
		name: string;
		avatar: string;
	};

	groupUserWantsToJoin: {
		id: string;
	};
	reqStats: {
		status: 'pending' | 'aproved' | 'declined';
		reqDate: Date;
	};
}

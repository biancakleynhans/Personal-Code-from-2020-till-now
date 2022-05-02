import { i_BaseInterface_Member } from './001UserModels';
import { NamedDict } from '../services/helpers/Tools';

export interface Post_A_FAQ {
	ts: number;
	id: string;
	userWhoFAQ: i_BaseInterface_Member;
	content: string;
	type: 'text' | 'img' | 'video';
	answers: NamedDict<Post_A_FAQ_Answer>;
}

export interface Post_A_FAQ_DISP {
	ts: number;
	id: string;
	userWhoFAQ: i_BaseInterface_Member;
	content: any;
	type: 'text' | 'img' | 'video';
	answers: NamedDict<Post_A_FAQ_Answer>;
}

export interface Post_A_FAQ_IMG {
	ts: number;
	id: string;
	userWhoFAQ: i_BaseInterface_Member;
	content: any[];
	type: 'text' | 'img' | 'video';
	answers: NamedDict<Post_A_FAQ_Answer>;
}

export interface Post_A_FAQ_VIDEO {
	ts: number;
	id: string;
	userWhoFAQ: i_BaseInterface_Member;
	content: any[];
	type: 'text' | 'img' | 'video';
	answers: NamedDict<Post_A_FAQ_Answer>;
}

export interface Post_A_FAQ_Answer {
	id: string;
	ts: number;
	Post_Id_I_BelongTo: string;
	content: string;
	userWhoAnswered: i_BaseInterface_Member;
}

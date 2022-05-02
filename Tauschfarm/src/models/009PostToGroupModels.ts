import { i_BaseInterface_Member } from './001UserModels';
import { NamedDict } from '../services/helpers/Tools';

interface iComment {
	whoCommented: i_BaseInterface_Member;
	contentComment: NamedDict<i_BaseInterface_Member>;
	ts: number;
}

export interface i_BaseInterface_Post {
	typeOfPost: 'text' | 'video' | 'images' | 'notSet' | 'videoAndImagesAndTextAndEmoji';
	currentGroupId: string;
	userWhoPosted: i_BaseInterface_Member;
	inputTextValue: string;
	imagesUrlArray: any[];
	videoUrl: any[];
	postId: string;
	commentsOnPost: NamedDict<iComment>;
	counts: {
		liked: number;
		whoLiked: NamedDict<i_BaseInterface_Member>;
		love: number;
		whoLoved: NamedDict<i_BaseInterface_Member>;
		disappointed: number;
		whoDisappointed: NamedDict<i_BaseInterface_Member>;
		funny: number;
		whoFunny: NamedDict<i_BaseInterface_Member>;
	};
	ts: number;
}

export interface i_SendPostData {
	typeOfPost: 'text' | 'sticker' | 'video' | 'images' | 'notSet' | 'videoAndImagesAndTextAndEmoji';
	currentGroupId: string;
	userWhoPosted: i_BaseInterface_Member;
	inputTextValue: string;
	imagesUrlArray: any[];
	videoUrl: any;
	postId: string;
}

export interface i_VideoUploadDataPost {
	groupId: string;
	file: any;
}

export interface i_imgUploadDataPost {
	groupId: string;
	files: any[];
}

export interface i_BaseInterface_MetaData {
	fileUploadProgress: number;
	fileUploadingName: string;
	imgArray: string[];
	videoArray: string[];
}

export interface AddComment {
	commentId: number;
	postId: string;
	groupId: string;
	whoCommented: i_BaseInterface_Member;
	contentComment: string;
	ts: number;
}

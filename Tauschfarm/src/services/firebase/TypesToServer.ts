import { CatImages } from '../../components/catImages/CatImagesToUse';
import PlaceHolder from '../../components/img/no-img.png';

export const TypesToFirebaseGlobals = {
	placeholderImg: PlaceHolder,
	Main: CatImages.Main.internal,

	//Types root
	User_Root: 'USERS',
	Items_Root: 'ITEMS',
	Donations_Root: 'DONATIONS',
	Events_Root: 'EVENTS',
	Groups_Root: 'GROUPS',
	PostsOnGroups_Root: 'POSTS',
	FAQ_Root: 'FAQ',
	TOKENS: 'TOKENS',
	TIMELINE: 'TIMELINE',

	//Types in a user
	Category_Container: 'categories',
	Events_Container: 'events',
	Donations_Container: 'donations',
	Groups_Container: 'groups',
	Items_Container: 'items',
	Messages_Container: 'msgHistory',
	PostsOnGroups_Container: 'posts',
	FAQ_Container: 'FAQ',
	followers: 'UsersIfollow',
	followersMe: 'UsersFollowingMe',
	notifyToken: 'notifyToken',
	notifySubs: 'typesOfsubjectsTonotifyOn',

	// Image storage
	FBStorage_profileImgs: 'profileImgs',
	FBStorage_catagorieImgs: 'CatImgs',
	FBStorage_ItemImgs: 'ItemImgs',
	FBStorage_EventImgs: 'EventImgs',
	FBStorage_GroupImgs: 'groupsImgs',
	FBStorage_DonImgs: 'donatimgs',
	FBStorage_PostData: 'postData',
	FBStorage_Chats: 'chats',
	FBStorage_FAQ: 'faqsGlobal'
};

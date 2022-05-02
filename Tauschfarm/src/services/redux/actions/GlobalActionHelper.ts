import { i_BaseInterface_User } from '../../../models/001UserModels';
import { FakeUser } from '../../../pages/chatSide/FakeUser';
import { i_BaseInterface_Group, AppStartGloabalBase_Group } from '../../../models/004GroupModels';
import { i_BaseInterface_Category } from '../../../models/002CatagoryModels';
import { i_BaseInterface_Item } from '../../../models/006ItemModels';
import { NamedDict } from '../../helpers/Tools';
import { convertObjectToArray } from '../../ownServices/ConverterFuncs';
import CategoriesToChosefrom from '../../translate/OptionsDict/CatagoriesToChoseFrom';
import { i_BaseInterface_Post } from '../../../models/009PostToGroupModels';
import { i_BaseInterface_Event } from '../../../models/005EventModels';
import { CatType } from '../../../models/AppStartGlobal_CatSetUp';

export const HelperCreateUser = (userData: i_BaseInterface_User) => {
	var returnUser: i_BaseInterface_User = FakeUser;

	returnUser = {
		id: userData.id,
		name: userData.name,
		avatar: userData.avatar,
		imgArray: userData.imgArray ? userData.imgArray : [],
		bio: userData.bio,
		location: userData.location,
		lang: userData.lang,
		groups: userData.groups ? userData.groups : {},
		events: userData.events ? userData.events : {},
		donations: userData.donations ? userData.donations : {},
		categories: userData.categories ? userData.categories : {},
		subscriptionType: userData.subscriptionType,
		newMsgs: userData.newMsgs,
		UsersIfollow: userData.UsersIfollow !== undefined ? userData.UsersIfollow : {},
		UsersFollowingMe: userData.UsersFollowingMe !== undefined ? userData.UsersFollowingMe : {},
		notifications: [],
		notifyToken: userData.notifyToken !== undefined ? userData.notifyToken : '',
		typesOfsubjectsTonotifyOn:
			userData.typesOfsubjectsTonotifyOn !== undefined
				? userData.typesOfsubjectsTonotifyOn
				: {
						NewItemsinGroups: false,
						NewMessages: false,
						NewEventsNearYou: false,
						NewFollowAddedSomething: false
				  },
		msgHistory: userData.msgHistory !== undefined ? userData.msgHistory : {}
	};

	return returnUser;
};

export const HelperCreateUserKeepOld = (
	userData: i_BaseInterface_User,
	oldDons: NamedDict<i_BaseInterface_Item>,
	oldCats: NamedDict<i_BaseInterface_Category>,
	oldEvents: NamedDict<i_BaseInterface_Event>
) => {
	var returnUser: i_BaseInterface_User = FakeUser;
	var update: boolean = false;

	convertObjectToArray(oldCats).forEach((cat: i_BaseInterface_Category) => {
		convertObjectToArray(userData.categories).forEach((cat1: i_BaseInterface_Category) => {
			var i1 = convertObjectToArray(cat.items).length;
			var i2 = convertObjectToArray(cat1.items).length;

			if (i1 !== i2) {
				// console.log('here it is suppose to return true, ', i1, i2);
				update = true;
				return update;
			}
			// else {
			// 	console.log('here it is suppose to return false, ', i1, i2);
			// 	update = false;
			// 	return update;
			// }
		});
		// return update;
	});

	returnUser = {
		id: userData.id,
		name: userData.name,
		avatar: userData.avatar,
		imgArray: userData.imgArray ? userData.imgArray : [],
		bio: userData.bio,
		location: userData.location,
		lang: userData.lang,
		groups: userData.groups ? userData.groups : {},
		events: convertObjectToArray(oldEvents).length === convertObjectToArray(userData.events).length ? oldEvents : userData.events ? userData.events : {},
		donations: convertObjectToArray(oldDons).length === convertObjectToArray(userData.donations).length ? oldDons : userData.donations ? userData.donations : {},
		categories: convertObjectToArray(oldCats).length !== convertObjectToArray(userData.categories).length || update ? userData.categories : oldCats,
		subscriptionType: userData.subscriptionType
			? userData.subscriptionType
			: {
					type: 'free',
					startDate: new Date().getTime(),
					payedWith: 'free'
			  },
		UsersIfollow: userData.UsersIfollow !== undefined ? userData.UsersIfollow : {},
		UsersFollowingMe: userData.UsersFollowingMe !== undefined ? userData.UsersFollowingMe : {},
		notifications: [],
		notifyToken: userData.notifyToken !== undefined ? userData.notifyToken : '',
		typesOfsubjectsTonotifyOn:
			userData.typesOfsubjectsTonotifyOn !== undefined
				? userData.typesOfsubjectsTonotifyOn
				: {
						NewItemsinGroups: false,
						NewMessages: false,
						NewEventsNearYou: false,
						NewFollowAddedSomething: false
				  },
		msgHistory: userData.msgHistory !== undefined ? userData.msgHistory : {},
		newMsgs: userData.newMsgs
	};

	return returnUser;
};

export const HelperCreateGroup = (groupdata: i_BaseInterface_Group) => {
	var returnGroup: i_BaseInterface_Group = AppStartGloabalBase_Group;

	returnGroup = {
		id: groupdata.id ? groupdata.id : '',
		name: groupdata.name ? groupdata.name : '',
		imgArray: groupdata.imgArray ? groupdata.imgArray : [],
		avatar: groupdata.avatar ? groupdata.avatar : '',
		memberCount: groupdata.memberCount ? groupdata.memberCount : 1,
		membersList: groupdata.membersList ? groupdata.membersList : {},
		membersRequests: groupdata.membersRequests ? groupdata.membersRequests : {},
		categories: groupdata.categories ? groupdata.categories : {},
		description: groupdata.description ? groupdata.description : '',
		location: groupdata.location
			? groupdata.location
			: {
					lat: '',
					long: '',
					locString: ''
			  },
		lang: groupdata.lang ? groupdata.lang : '',
		joinReqs: groupdata.joinReqs ? groupdata.joinReqs : {},
		posts: groupdata.posts ? groupdata.posts : {}
	};
	return returnGroup;
};

export const HelperCreateGroupKeepOld = (groupdata: i_BaseInterface_Group, oldPosts: NamedDict<i_BaseInterface_Post>, oldCats: NamedDict<i_BaseInterface_Category>) => {
	var returnGroup: i_BaseInterface_Group = AppStartGloabalBase_Group;
	var checkcatsContentOLD: number = 0;
	var checkcatsContentNew: number = 0;

	convertObjectToArray(oldCats).map((cat: i_BaseInterface_Category) => {
		checkcatsContentOLD = convertObjectToArray(cat.items).length;

		return checkcatsContentOLD;
	});

	convertObjectToArray(groupdata.categories).map((cat: i_BaseInterface_Category) => {
		checkcatsContentNew = convertObjectToArray(cat.items).length;
		return checkcatsContentNew;
	});

	// console.log('????', checkcatsContentNew, checkcatsContentOLD, checkcatsContentOLD === checkcatsContentNew);

	returnGroup = {
		id: groupdata.id ? groupdata.id : '',
		name: groupdata.name ? groupdata.name : '',
		imgArray: groupdata.imgArray ? groupdata.imgArray : [],
		avatar: groupdata.avatar ? groupdata.avatar : '',
		memberCount: groupdata.memberCount ? groupdata.memberCount : 1,
		membersList: groupdata.membersList ? groupdata.membersList : {},
		membersRequests: groupdata.membersRequests ? groupdata.membersRequests : {},
		categories: checkcatsContentOLD === checkcatsContentNew ? oldCats : groupdata.categories,
		description: groupdata.description ? groupdata.description : '',
		location: groupdata.location
			? groupdata.location
			: {
					lat: '',
					long: '',
					locString: ''
			  },
		lang: groupdata.lang ? groupdata.lang : '',
		joinReqs: groupdata.joinReqs ? groupdata.joinReqs : {},
		posts: groupdata.posts !== undefined && convertObjectToArray(oldPosts).length === convertObjectToArray(groupdata.posts).length ? oldPosts : groupdata.posts
	};
	// console.log('returnGroup', returnGroup);
	return returnGroup;
};

export const HelperCreateCat = (cat: i_BaseInterface_Category, itemsFromDb: NamedDict<i_BaseInterface_Item>, urlstring: string, lang: string) => {
	// console.log('hit this function ');

	var returnCat: i_BaseInterface_Category = {
		name: '',
		avatar: '',
		items: {},
		checkMatch: ''
	};

	var c = CategoriesToChosefrom.transDict[cat.checkMatch] ? CategoriesToChosefrom.transDict[cat.checkMatch].en : cat.checkMatch;
	var n = lang === 'en' ? c : CategoriesToChosefrom.transDict[cat.name] ? CategoriesToChosefrom.transDict[cat.name].de : cat.name;

	// returnCat = CatType[CategoriesToChosefrom.transDict[cat.checkMatch].en];
	// returnCat.name = n ? n : cat.name
	// returnCat.checkMatch = c ? c : cat.checkMatch
	// returnCat.items = cat.items ? HelperCreateItem( itemsFromDb, cat.items, urlstring ) : {}
	returnCat = {
		name: n ? n : cat.name,
		avatar: CatType[CategoriesToChosefrom.transDict[cat.checkMatch].en].avatar, //cat.avatar,
		items: cat.items ? HelperCreateItem(itemsFromDb, cat.items, urlstring) : {},
		checkMatch: c ? c : cat.checkMatch
	};

	// console.log('???', returnCat);
	return returnCat;
};

export const HelperCreateItem = (itemsFromDB: NamedDict<i_BaseInterface_Item>, itemsFromCat: NamedDict<any>, urlString: string) => {
	var returnItems: NamedDict<i_BaseInterface_Item> = {};
	const GlobalItemKeys = Object.keys(itemsFromDB ? itemsFromDB : {});
	GlobalItemKeys.forEach((key: string) => {
		convertObjectToArray(itemsFromCat).forEach((i: i_BaseInterface_Item) => {
			if (key === i.id) {
				returnItems = {
					...returnItems,
					[i.id]: {
						id: itemsFromDB[key].id ? itemsFromDB[key].id : '',
						name: itemsFromDB[key].name ? itemsFromDB[key].name : '',
						brand: itemsFromDB[key].brand ? itemsFromDB[key].brand : { en: '', de: '' },
						size: itemsFromDB[key].size ? itemsFromDB[key].size : { en: '', de: '' },
						color: itemsFromDB[key].color ? itemsFromDB[key].color : '',
						length: itemsFromDB[key].length ? itemsFromDB[key].length : '',
						description: itemsFromDB[key].description ? itemsFromDB[key].description : '',
						imgArray: itemsFromDB[key].imgArray ? itemsFromDB[key].imgArray : [],
						avatar: itemsFromDB[key].avatar ? itemsFromDB[key].avatar : '',
						categories: itemsFromDB[key].categories ? itemsFromDB[key].categories : [],
						groups: itemsFromDB[key].groups ? itemsFromDB[key].groups : [],
						userWhoAddedItem: itemsFromDB[key].userWhoAddedItem
							? itemsFromDB[key].userWhoAddedItem
							: {
									id: '',
									avatar: '',
									name: ''
							  },
						dateCreated: itemsFromDB[key].dateCreated ? itemsFromDB[key].dateCreated : new Date().getTime(),
						dateEdited: '',
						dateMovedToDons: '',
						dateDeleted: '',
						url: `${urlString}/${i.id}`,
						worth: itemsFromDB[key].worth ? itemsFromDB[key].worth : 0,
						shipping: itemsFromDB[key].shipping ? itemsFromDB[key].shipping : 0,
						location: itemsFromDB[key].location
							? itemsFromDB[key].location
							: {
									address: {
										district: '',
										houseNumber: '',
										street: '',
										city: '',
										state: '',
										postalCode: '',
										country: '',
										county: '',
										label: ''
									},

									locationId: '',
									locationType: '',

									coords: {
										lat: 0,
										long: 0
									}
							  }
					}
				};
				return returnItems;
			}
			return returnItems;
		});
	});

	return returnItems;
};

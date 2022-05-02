import FIREBASE from '../../firebase/firebaseConfig';
import { TypesToFirebaseGlobals } from '../../firebase/TypesToServer';
import { TypesOfActions } from '../TypesOfActions';
import { getReverseGeoCodeRegion } from '../../../components/HERE maps/adressGetAndValidate/ReverseGeoCoding';
import { i_Redux_ActionFunc_Interface_User, i_BaseInterface_User } from '../../../models/001UserModels';
import { NamedDict } from '../../helpers/Tools';
import { i_BaseInterface_Category } from '../../../models/002CatagoryModels';
import { i_BaseInterface_Group } from '../../../models/004GroupModels';
import { i_BaseInterface_Event } from '../../../models/005EventModels';
import { convertObjectToArray, GlobalCatReducer } from '../../ownServices/ConverterFuncs';
import { i_BaseInterface_Item } from '../../../models/006ItemModels';
import CategoriesToChosefrom from '../../translate/OptionsDict/CatagoriesToChoseFrom';
import { Post_A_FAQ } from '../../../models/010SupportModels';
import { Dispatch } from 'redux';
import { FakeUser } from '../../../pages/chatSide/FakeUser';
import { HelperCreateUser, HelperCreateGroup, HelperCreateCat, HelperCreateUserKeepOld, HelperCreateGroupKeepOld } from './GlobalActionHelper';
import { i_BaseInterface_Post } from '../../../models/009PostToGroupModels';
import { i_BaseInterface_Donation } from '../../../models/0003DonationModels';
import { iTimeLineEntry } from '../../../models/TimelineModels';

interface iFB_DB {
	USERS: NamedDict<i_BaseInterface_User>;
	GROUPS: NamedDict<i_BaseInterface_Group>;
	ITEMS: NamedDict<i_BaseInterface_Item>;
	DONATIONS: NamedDict<i_BaseInterface_Item>;
	EVENTS: NamedDict<i_BaseInterface_Event>;
	FAQ: NamedDict<Post_A_FAQ>;
	AUDIT_TRAIL: NamedDict<any>;
	POSTS: NamedDict<any>;
	TIMELINE: NamedDict<iTimeLineEntry>;
	presence: any;
}

var Latitude: string = '';
var Longitude: string = '';

const fbDatabase = FIREBASE.database();
const rootDBref = fbDatabase.ref();

var globalDb = {
	db: {} as iFB_DB
};

export const Global_GetAllData_AtStartUp = (userId: string, isEmpty: boolean) => {
	return (dispatch: Dispatch, getState: any) => {
		const Uid = userId;
		// console.log('uid', userId);
		var globalUsers: NamedDict<i_BaseInterface_User> = {};
		var userValues: i_BaseInterface_User = FakeUser;
		var userGroups: NamedDict<i_BaseInterface_Group> = {};
		var globalUsersGroups: NamedDict<i_BaseInterface_Group> = {};
		var FAQ_LIST: NamedDict<Post_A_FAQ> = {};
		var Timeline: NamedDict<iTimeLineEntry> = {};

		if (isEmpty) {
			// console.log('STARTNG ');
			rootDBref
				.once('value')
				.then((c) => {
					globalDb.db = c.val();
					console.log('once value', globalDb.db);

					//users
					const GlobalUsersKeys = Object.keys(globalDb.db.USERS);
					GlobalUsersKeys.forEach((key: string) => {
						if (key !== Uid) {
							globalUsers[key] = HelperCreateUser(globalDb.db.USERS[key]);
						} else {
							userValues = HelperCreateUser(globalDb.db.USERS[Uid]);
						}
					});

					//groups
					const GlobalGroupsKeys = Object.keys(globalDb.db.GROUPS ? globalDb.db.GROUPS : {});
					GlobalGroupsKeys.forEach((groupKey: string) => {
						// console.log('???', groupKey, groupKey.split('-')[0], Uid);
						if (globalDb.db.GROUPS[groupKey].id !== undefined) {
							if (groupKey.split('-')[0] !== Uid) {
								globalUsersGroups[groupKey] = HelperCreateGroup(globalDb.db.GROUPS[groupKey]);
							} else {
								userGroups[groupKey] = HelperCreateGroup(globalDb.db.GROUPS[groupKey]);
							}
						}
					});

					//items
					convertObjectToArray(userValues.categories).forEach((userCat: i_BaseInterface_Category) => {
						var c = CategoriesToChosefrom.transDict[userCat.checkMatch] ? CategoriesToChosefrom.transDict[userCat.checkMatch].en : userCat.checkMatch;

						userValues.categories[c] = HelperCreateCat(userCat, globalDb.db.ITEMS, `/dashboard/categories/selectedCategory/${c}/selectedItem`, userValues.lang);
					});

					convertObjectToArray(userGroups).forEach((userGroup: i_BaseInterface_Group) => {
						convertObjectToArray(userGroup.categories).forEach((userGroupCat: i_BaseInterface_Category) => {
							var c = CategoriesToChosefrom.transDict[userGroupCat.checkMatch] ? CategoriesToChosefrom.transDict[userGroupCat.checkMatch].en : userGroupCat.checkMatch;
							userGroups[userGroup.id].categories[c] = HelperCreateCat(
								userGroupCat,
								globalDb.db.ITEMS,
								`/groups/selectedGroup/${userGroup.id}/selectedCatagory/${c}/selectedItem`,
								userValues.lang
							);
						});
					});

					convertObjectToArray(globalUsersGroups).forEach((globalUserGroup: i_BaseInterface_Group) => {
						convertObjectToArray(globalUserGroup.categories).forEach((globaluserGroupCat: i_BaseInterface_Category) => {
							var c = CategoriesToChosefrom.transDict[globaluserGroupCat.checkMatch]
								? CategoriesToChosefrom.transDict[globaluserGroupCat.checkMatch].en
								: globaluserGroupCat.checkMatch;

							globalUsersGroups[globalUserGroup.id].categories[c] = HelperCreateCat(
								globaluserGroupCat,
								globalDb.db.ITEMS,
								`/groups/selectedGroup/${globalUserGroup.id}/selectedCatagory/${c}/selectedItem`,
								userValues.lang
							);
						});
					});

					convertObjectToArray(globalUsers).forEach((globalUser: i_BaseInterface_User) => {
						convertObjectToArray(globalUser.categories).forEach((globalUserCat: i_BaseInterface_Category) => {
							var c = CategoriesToChosefrom.transDict[globalUserCat.checkMatch] ? CategoriesToChosefrom.transDict[globalUserCat.checkMatch].en : globalUserCat.checkMatch;

							globalUsers[globalUser.id].categories[c] = HelperCreateCat(
								globalUserCat,
								globalDb.db.ITEMS,
								`/dashboard/categories/selectedCategory/${c}/selectedItem`,
								userValues.lang
							);
						});
					});

					//posts on groups
					const GlobalGroupPostsKeys = Object.keys(globalDb.db.POSTS ? globalDb.db.POSTS : {});
					GlobalGroupPostsKeys.forEach((key: string) => {
						convertObjectToArray(userGroups).forEach((uGroup: i_BaseInterface_Group) => {
							if (uGroup.posts !== undefined) {
								if (globalDb.db.POSTS[key].currentGroupId === uGroup.id) {
									userGroups[uGroup.id].posts[key] = globalDb.db.POSTS[key];
								}
							}
						});

						convertObjectToArray(globalUsersGroups).forEach((gGroup: i_BaseInterface_Group) => {
							convertObjectToArray(gGroup.posts).forEach((gugPost: i_BaseInterface_Post) => {
								// console.log('ugPost', gugPost, key);

								if (gGroup.posts !== undefined) {
									if (globalDb.db.POSTS[key].currentGroupId === gGroup.id) {
										globalUsersGroups[gGroup.id].posts[key] = globalDb.db.POSTS[key];
									}
								}
							});
						});
					});

					//donations
					const GlobalDonationsKeys = Object.keys(globalDb.db.DONATIONS ? globalDb.db.DONATIONS : {});
					GlobalDonationsKeys.forEach((key: string) => {
						convertObjectToArray(userValues.donations).forEach((uDon: i_BaseInterface_Donation) => {
							if (uDon.id === key) {
								userValues.donations[key] = globalDb.db.DONATIONS[key];
							}
						});

						convertObjectToArray(globalUsers).forEach((gu: i_BaseInterface_User) => {
							convertObjectToArray(gu.donations).forEach((guDon: i_BaseInterface_Donation) => {
								if (guDon.id === key) {
									globalUsers[gu.id].donations[key] = globalDb.db.DONATIONS[key];
								}
							});
						});
					});

					const EventKeys = Object.keys(globalDb.db.EVENTS ? globalDb.db.EVENTS : {});
					EventKeys.forEach((key: string) => {
						if (globalDb.db.EVENTS[key].id !== undefined) {
							console.log('event ', key, globalDb.db.EVENTS[key], globalDb.db.EVENTS[key].id);
							convertObjectToArray(userValues.events).forEach((e: i_BaseInterface_Event) => {
								if (e.id === key) {
									userValues.events[key] = globalDb.db.EVENTS[key];
								}
							});

							convertObjectToArray(globalUsers).forEach((u: i_BaseInterface_User) => {
								convertObjectToArray(u.events).forEach((e: i_BaseInterface_Event) => {
									if (e.id === key) {
										globalUsers[u.id].events[key] = globalDb.db.EVENTS[key];
									}
								});
							});
						}
					});

					const FAQKeys = Object.keys(globalDb.db.FAQ ? globalDb.db.FAQ : {});
					FAQKeys.forEach((key: string) => {
						FAQ_LIST[key] = globalDb.db.FAQ[key];
					});

					Timeline = globalDb.db.TIMELINE;

					return { userValues, globalUsers, userGroups, globalUsersGroups, FAQ_LIST, Timeline };
				})
				.then((done) => {
					// console.log('done', done);

					var dispObj = {
						user: done.userValues,
						global: done.globalUsers,
						userG: done.userGroups,
						globalGroups: done.globalUsersGroups,
						sup: done.FAQ_LIST,
						tl: done.Timeline,
						tlCount: convertObjectToArray(done.Timeline).length,
						isEmpty: false
					};
					// console.log('dispObj', dispObj);

					dispatch({
						type: TypesOfActions.APP_DATA_LOADED_USERS,
						payload: dispObj
					});
				})
				.then(() => {
					// console.log('ENDTNG ');
				})
				.catch((error) => {
					dispatch({
						type: TypesOfActions.CURRENT_USER_GLOBAL_ERRORS,
						payload: error
					});
				});
		}

		rootDBref.on('child_changed', (c, b) => {
			const NodeNewValue = c.val();
			const NodeKeyChanged = c.key;
			// 	// const SecNodeChaged = b;

			var state_globalUsers: NamedDict<i_BaseInterface_User> = getState().globalUsers.GlobalUsers;
			var state_userValues: i_BaseInterface_User = getState().user;
			var state_userGroups: NamedDict<i_BaseInterface_Group> = getState().groups.UserGroups;
			var state_globalUsersGroups: NamedDict<i_BaseInterface_Group> = getState().groups.GlobalGroups;
			var state_FAQ: NamedDict<Post_A_FAQ> = {};
			var state_Timeline: NamedDict<iTimeLineEntry> = getState().timeline.tl;
			var state_count: number = getState().timeline.count;
			// var count: number = 0;

			console.log('on child_changed', { v: NodeNewValue, k: NodeKeyChanged });
			//user chnaged
			if (NodeKeyChanged === TypesToFirebaseGlobals.User_Root) {
				//start with the users
				const GlobalUsersKeys = Object.keys(NodeNewValue);
				GlobalUsersKeys.forEach((key: string) => {
					if (key !== Uid) {
						if (state_globalUsers[key]) {
							// console.log('this user exists', key, state_globalUsers[key]);
							state_globalUsers = {
								...state_globalUsers,
								[key]: HelperCreateUserKeepOld(
									NodeNewValue[key],
									state_globalUsers[key] !== undefined ? state_globalUsers[key]?.donations : {},
									state_globalUsers[key] !== undefined ? state_globalUsers[key]?.categories : {},
									state_globalUsers[key] !== undefined ? state_globalUsers[key]?.events : {}
								)
							};
						} else {
							console.log('this user does not exist', key);
						}
					} else {
						state_userValues = HelperCreateUserKeepOld(NodeNewValue[Uid], state_userValues.donations, state_userValues.categories, state_userValues.events);
					}
				});

				var dispObjUsers = {
					user: state_userValues,
					global: state_globalUsers,
					userG: state_userGroups,
					globalGroups: state_globalUsersGroups,
					sup: state_FAQ,
					tl: state_Timeline,
					tlCount: state_count,
					isEmpty: false
				};
				// console.log('dispObj child_changed', dispObj);
				dispatch({
					type: TypesOfActions.APP_DATA_LOADED_USERS,
					payload: dispObjUsers
				});
			}
			//Groups chnaged
			else if (NodeKeyChanged === TypesToFirebaseGlobals.Groups_Root) {
				const GlobalGroupsKeys = Object.keys(NodeNewValue);
				GlobalGroupsKeys.forEach((groupKey: string) => {
					if (groupKey.split('-')[0] !== Uid) {
						globalUsersGroups[groupKey] = HelperCreateGroupKeepOld(NodeNewValue[groupKey], state_globalUsersGroups[groupKey]?.posts, state_globalUsersGroups[groupKey]?.categories);
					} else {
						userGroups[groupKey] = HelperCreateGroupKeepOld(NodeNewValue[groupKey], state_userGroups[groupKey]?.posts, state_userGroups[groupKey]?.categories);
					}
				});

				var dispObjGroups = {
					user: state_userValues,
					global: state_globalUsers,
					userG: state_userGroups,
					globalGroups: state_globalUsersGroups,
					sup: state_FAQ,
					tl: state_Timeline,
					tlCount: state_count,
					isEmpty: false
				};
				// console.log('dispObj child_changed', dispObj);
				dispatch({
					type: TypesOfActions.APP_DATA_LOADED_USERS,
					payload: dispObjGroups
				});
			}
			//Items changed
			else if (NodeKeyChanged === TypesToFirebaseGlobals.Items_Root) {
				convertObjectToArray(state_userValues.categories).forEach((userCat: i_BaseInterface_Category) => {
					var c = CategoriesToChosefrom.transDict[userCat.checkMatch] ? CategoriesToChosefrom.transDict[userCat.checkMatch].en : userCat.checkMatch;

					state_userValues.categories = {
						...state_userValues.categories,
						[c]: HelperCreateCat(userCat, NodeNewValue, `/dashboard/categories/selectedCategory/${c}/selectedItem`, state_userValues.lang)
					};
				});

				convertObjectToArray(state_userGroups).forEach((userGroup: i_BaseInterface_Group) => {
					convertObjectToArray(userGroup.categories).forEach((userGroupCat: i_BaseInterface_Category) => {
						var c = CategoriesToChosefrom.transDict[userGroupCat.checkMatch] ? CategoriesToChosefrom.transDict[userGroupCat.checkMatch].en : userGroupCat.checkMatch;
						state_userGroups = {
							...state_userGroups,
							[userGroup.id]: {
								...state_userGroups[userGroup.id],
								categories: {
									...state_userGroups[userGroup.id].categories,
									[c]: HelperCreateCat(userGroupCat, NodeNewValue, `/groups/selectedGroup/${userGroup.id}/selectedCatagory/${c}/selectedItem`, state_userValues.lang)
								}
							}
						};
					});
				});

				convertObjectToArray(state_globalUsersGroups).forEach((globalUserGroup: i_BaseInterface_Group) => {
					convertObjectToArray(globalUserGroup.categories).forEach((globaluserGroupCat: i_BaseInterface_Category) => {
						var c = CategoriesToChosefrom.transDict[globaluserGroupCat.checkMatch]
							? CategoriesToChosefrom.transDict[globaluserGroupCat.checkMatch].en
							: globaluserGroupCat.checkMatch;

						state_globalUsersGroups = {
							...state_globalUsersGroups,
							[globalUserGroup.id]: {
								...state_globalUsersGroups[globalUserGroup.id],
								categories: {
									...state_globalUsersGroups[globalUserGroup.id].categories,
									[c]: HelperCreateCat(globaluserGroupCat, NodeNewValue, `/groups/selectedGroup/${globalUserGroup.id}/selectedCatagory/${c}/selectedItem`, state_userValues.lang)
								}
							}
						};
					});
				});

				convertObjectToArray(state_globalUsers).forEach((globalUser: i_BaseInterface_User) => {
					convertObjectToArray(globalUser.categories).forEach((globalUserCat: i_BaseInterface_Category) => {
						var c = CategoriesToChosefrom.transDict[globalUserCat.checkMatch] ? CategoriesToChosefrom.transDict[globalUserCat.checkMatch].en : globalUserCat.checkMatch;

						state_globalUsers = {
							...state_globalUsers,
							[globalUser.id]: {
								...state_globalUsers[globalUser.id],
								categories: {
									...state_globalUsers[globalUser.id].categories,
									[c]: HelperCreateCat(globalUserCat, NodeNewValue, `/dashboard/categories/selectedCategory/${c}/selectedItem`, state_userValues.lang)
								}
							}
						};
					});
				});

				var dispObjItems = {
					user: state_userValues,
					global: state_globalUsers,
					userG: state_userGroups,
					globalGroups: state_globalUsersGroups,
					sup: state_FAQ,
					tl: state_Timeline,
					tlCount: state_count,
					isEmpty: false
				};
				// console.log('dispObj child_changed', dispObj);
				dispatch({
					type: TypesOfActions.APP_DATA_LOADED_USERS,
					payload: dispObjItems
				});
			}
			// Group Posts
			else if (NodeKeyChanged === TypesToFirebaseGlobals.PostsOnGroups_Root) {
				const GlobalGroupPostsKeys = Object.keys(NodeNewValue);
				GlobalGroupPostsKeys.forEach((key: string) => {
					convertObjectToArray(state_userGroups).forEach((uGroup: i_BaseInterface_Group) => {
						if (uGroup.posts !== undefined) {
							if (NodeNewValue[key].currentGroupId === uGroup.id) {
								state_userGroups = {
									...state_userGroups,
									[uGroup.id]: {
										...state_userGroups[uGroup.id],
										posts: {
											...state_userGroups[uGroup.id]?.posts,
											[key]: NodeNewValue[key]
										}
									}
								};
							}
						}
					});

					convertObjectToArray(state_globalUsersGroups).forEach((gGroup: i_BaseInterface_Group) => {
						if (gGroup.posts !== undefined) {
							if (NodeNewValue[key].currentGroupId === gGroup.id) {
								state_globalUsersGroups = {
									...state_globalUsersGroups,
									[gGroup.id]: {
										...state_globalUsersGroups[gGroup.id],
										posts: {
											...state_globalUsersGroups[gGroup.id]?.posts,
											[key]: NodeNewValue[key]
										}
									}
								};
							}
						}
					});
				});

				var dispObjGroupPosts = {
					user: state_userValues,
					global: state_globalUsers,
					userG: state_userGroups,
					globalGroups: state_globalUsersGroups,
					sup: state_FAQ,
					tl: state_Timeline,
					tlCount: state_count,
					isEmpty: false
				};
				// console.log('dispObj child_changed', dispObj);
				dispatch({
					type: TypesOfActions.APP_DATA_LOADED_USERS,
					payload: dispObjGroupPosts
				});
			}
			// donations
			else if (NodeKeyChanged === TypesToFirebaseGlobals.Donations_Root) {
				const GlobalDonationsKeys = Object.keys(NodeNewValue);
				GlobalDonationsKeys.forEach((key: string) => {
					convertObjectToArray(state_userValues.donations).forEach((uDon: i_BaseInterface_Donation) => {
						if (uDon.id === key) {
							state_userValues.donations = {
								...state_userValues.donations,
								[key]: NodeNewValue[key]
							};
						}
					});

					convertObjectToArray(state_globalUsers).forEach((gu: i_BaseInterface_User) => {
						convertObjectToArray(gu.donations).forEach((guDon: i_BaseInterface_Donation) => {
							if (guDon.id === key) {
								state_globalUsers = {
									...state_globalUsers,
									[gu.id]: {
										...state_globalUsers[gu.id],
										donations: {
											...state_globalUsers[gu.id].donations,
											[key]: NodeNewValue[key]
										}
									}
								};
							}
						});
					});
				});

				var dispObjDons = {
					user: state_userValues,
					global: state_globalUsers,
					userG: state_userGroups,
					globalGroups: state_globalUsersGroups,
					sup: state_FAQ,
					tl: state_Timeline,
					tlCount: state_count,
					isEmpty: false
				};
				// console.log('dispObj child_changed', dispObj);
				dispatch({
					type: TypesOfActions.APP_DATA_LOADED_USERS,
					payload: dispObjDons
				});
			}

			//events
			else if (NodeKeyChanged === TypesToFirebaseGlobals.Events_Root) {
				const EventKeys = Object.keys(NodeNewValue);
				EventKeys.forEach((key: string) => {
					convertObjectToArray(state_userValues.events).forEach((e: i_BaseInterface_Event) => {
						if (e.id === key) {
							state_userValues.events[key] = NodeNewValue[key];
						}
					});

					convertObjectToArray(state_globalUsers).forEach((u: i_BaseInterface_User) => {
						convertObjectToArray(u.events).forEach((e: i_BaseInterface_Event) => {
							if (e.id === key) {
								state_globalUsers[u.id].events[key] = NodeNewValue[key];
							}
						});
					});
				});

				var dispObjEvents = {
					user: state_userValues,
					global: state_globalUsers,
					userG: state_userGroups,
					globalGroups: state_globalUsersGroups,
					sup: state_FAQ,
					tl: state_Timeline,
					tlCount: state_count,
					isEmpty: false
				};
				// console.log('dispObj child_changed', dispObj);
				dispatch({
					type: TypesOfActions.APP_DATA_LOADED_USERS,
					payload: dispObjEvents
				});
			}
			// //FAQ
			else if (NodeKeyChanged === TypesToFirebaseGlobals.FAQ_Root) {
				const FAQKeys = Object.keys(NodeNewValue);
				FAQKeys.forEach((key: string) => {
					state_FAQ[key] = NodeNewValue[key];
				});

				var dispObjFaq = {
					user: state_userValues,
					global: state_globalUsers,
					userG: state_userGroups,
					globalGroups: state_globalUsersGroups,
					sup: state_FAQ,
					tl: state_Timeline,
					tlCount: state_count,
					isEmpty: false
				};
				// console.log('dispObj child_changed', dispObj);
				dispatch({
					type: TypesOfActions.APP_DATA_LOADED_USERS,
					payload: dispObjFaq
				});
			}
			// Timeline
			else if (NodeKeyChanged === TypesToFirebaseGlobals.TIMELINE) {
				// console.log(NodeNewValue, convertObjectToArray(NodeNewValue).length, convertObjectToArray(state_Timeline).length - 1);
				// count = convertObjectToArray(NodeNewValue).length - (convertObjectToArray(state_Timeline).length - 1) + state_count;

				state_Timeline = NodeNewValue;
				var dispObjTimeline = {
					user: state_userValues,
					global: state_globalUsers,
					userG: state_userGroups,
					globalGroups: state_globalUsersGroups,
					sup: state_FAQ,
					tl: state_Timeline,
					tlCount: convertObjectToArray(NodeNewValue).length,
					isEmpty: false
				};
				// console.log('dispObj child_changed', dispObj);
				dispatch({
					type: TypesOfActions.APP_DATA_LOADED_USERS,
					payload: dispObjTimeline
				});
			}
		});
	};
};

export const Global_User_Loc = (user: i_BaseInterface_User) => {
	return (dispatch: any) => {
		// console.log('user loc', user.id);

		var newLoc = {
			location: {
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
		};

		if (user.location?.address === undefined) {
			// console.log('user location ', user.location);

			navigator.geolocation.getCurrentPosition(
				(position: any) => {
					Latitude = position.coords.latitude;
					Longitude = position.coords.longitude;
					// console.log('lat, long', Latitude, Longitude);
					//43.42387,15.490238

					var locCode = `${Latitude},${Longitude}`;
					getReverseGeoCodeRegion(locCode).then((res: any) => {
						// console.log('res', res);

						if (res.address) {
							// console.log('res', res);
							newLoc = {
								location: {
									address: res.address,
									locationId: res.locationId,
									locationType: res.locationType,
									coords: res.coords
								}
							};

							//server call
							fbDatabase.ref(`${TypesToFirebaseGlobals.User_Root}/${user.id}`).update(newLoc, function (error) {
								if (error) {
									// The write failed...
									// console.log('error adding', error);
									dispatch({
										type: TypesOfActions.CURRENT_USER_GLOBAL_ERRORS,
										payload: error
									});
								} else {
									// Data saved successfully!
									// console.log('DATA SAVED SUCSESFULLY');
									dispatch({
										type: TypesOfActions.CURRENT_USER_CHANGE_LOCATION,
										payload: newLoc.location
									});
								}
							});
						} else {
							// console.log('!!!!!res', res);
						}
					});
				},
				(error: any) => {
					// eslint-disable-next-line
					// console.log('code: ' + error.code + '\n' + 'message: ' + error.message + '\n');
				},
				{ enableHighAccuracy: true }
			);
		}
		// else {
		// 	// console.log('user location ', user.location.address);

		// 	newLoc = {
		// 		location: {
		// 			address: user.location.address,
		// 			locationId: user.location.locationId,
		// 			locationType: user.location.locationType,
		// 			coords: {
		// 				lat: +user.location.coords.lat,
		// 				long: +user.location.coords.long
		// 			}
		// 		}
		// 	};

		// 	dispatch({
		// 		type: TypesOfActions.CURRENT_USER_CHANGE_LOCATION,
		// 		payload: newLoc.location
		// 	});
		// }
	};
};

export const GLOBALCATS = (
	user: i_Redux_ActionFunc_Interface_User,
	userGroups: NamedDict<i_BaseInterface_Group>,
	globalGroups: NamedDict<i_BaseInterface_Group>,
	globalUsers: NamedDict<i_Redux_ActionFunc_Interface_User>
) => {
	// return (dispatch: any, getState: any) => {
	var globalCateGoriesInApp: any[] = [];

	convertObjectToArray(user.categories).map((cat: i_BaseInterface_Category) => {
		globalCateGoriesInApp.push({
			name: cat.name,
			avatar: cat.avatar,
			checkMatch: cat.checkMatch,
			items: cat.items,
			userName: user.id,
			groupName: ''
		});

		return globalCateGoriesInApp;
	});

	convertObjectToArray(globalUsers).map((user: i_BaseInterface_User) => {
		convertObjectToArray(user.categories).map((cat: i_BaseInterface_Category) => {
			globalCateGoriesInApp.push({
				name: cat.name,
				avatar: cat.avatar,
				checkMatch: cat.checkMatch,
				items: cat.items,
				userName: user.id,
				groupName: ''
			});
			return globalCateGoriesInApp;
		});
		return globalCateGoriesInApp;
	});

	convertObjectToArray(userGroups).map((group: i_BaseInterface_Group) => {
		convertObjectToArray(group.categories).map((cat: i_BaseInterface_Category) => {
			globalCateGoriesInApp.push({
				name: cat.name,
				avatar: cat.avatar,
				checkMatch: cat.checkMatch,
				items: cat.items,
				userName: user.id,
				groupName: group.id
			});
			return globalCateGoriesInApp;
		});
		return globalCateGoriesInApp;
	});

	convertObjectToArray(globalGroups).map((group: i_BaseInterface_Group) => {
		convertObjectToArray(group.categories).map((cat: i_BaseInterface_Category) => {
			globalCateGoriesInApp.push({
				name: cat.name,
				avatar: cat.avatar,
				checkMatch: cat.checkMatch,
				items: cat.items,
				userName: user.id,
				groupName: group.id
			});
			return globalCateGoriesInApp;
		});
		return globalCateGoriesInApp;
	});

	// console.log('globalCateGoriesInApp', globalCateGoriesInApp);
	var cleaner = GlobalCatReducer(globalCateGoriesInApp);
	return cleaner;
};

import FIREBASE from '../../../firebase/firebaseConfig';
import { TypesToFirebaseGlobals } from '../../../firebase/TypesToServer';
import { TypesOfActions } from '../../TypesOfActions';
import { i_BaseInterface_Group, i_Join_req } from '../../../../models/004GroupModels';
import { i_Redux_ActionFunc_Interface_ImgDelete, i_Redux_ActionFunc_Interface_ImgEdit, i_Redux_ActionFunc_Interface_ImgUpload } from '../../../../models/007ImageModels';
import { convertObjectToArray } from '../../../ownServices/ConverterFuncs';
import { CheckNameMakeNew } from '../../../ownServices/HelperFuncs';
import { i_BaseInterface_Category } from '../../../../models/002CatagoryModels';
import { iTimeLineEntry } from '../../../../models/TimelineModels';
import { GroupProfileUpdate } from '../../../../layout/AppComponents/ProfileSettings';

const fbDatabase = FIREBASE.database();
const fbStorage = FIREBASE.storage();

export const User_ReqToJoin_Group = (reqData: i_Join_req) => {
	return (dispatch: any) => {
		// console.log('reqData', reqData);
		// console.log('groups to edit', reqData.groupUserWantsToJoin.id);
		// console.log('data to add', reqData.userWhoWantsToJoin, reqData.reqStats);
		// console.log('add', addReq);

		fbDatabase
			.ref(`${TypesToFirebaseGlobals.Groups_Root}/${reqData.groupUserWantsToJoin.id}/membersRequests`)
			.update({
				[reqData.userWhoWantsToJoin.id]: {
					user: reqData.userWhoWantsToJoin,
					stats: reqData.reqStats
				}
			})
			.catch((error) => {
				dispatch({
					type: TypesOfActions.CURRENT_USER_GLOBAL_ERRORS,
					payload: error
				});
			});
	};
};

export const Group_Set_onNav = (eventData: i_BaseInterface_Group) => {
	return (dispatch: any) => {
		// console.log('INFO GOT: ', eventData);
		var GroupdObj: i_BaseInterface_Group = {
			id: eventData.id,
			name: eventData.name,
			imgArray: eventData.imgArray,
			avatar: eventData.avatar,
			description: eventData.description,
			memberCount: eventData.memberCount,
			membersList: eventData.membersList,
			categories: eventData.categories,
			location: eventData.location,
			lang: eventData.lang,
			joinReqs: {},
			membersRequests: {},
			posts: {}
		};
		dispatch({
			type: TypesOfActions.CURRENT_USER_GROUP_SET,
			payload: GroupdObj
		});
	};
};

export const Group_create = (group: i_BaseInterface_Group) => {
	return (dispatch: any, getState: any) => {
		// console.log('INFO GOT: ', group);
		const profile = getState().firebase.profile;
		//make async call to firebase server

		var tlData: iTimeLineEntry = {
			type: 'New Group',
			date: new Date().getTime(),
			name: group.name,
			id: group.id,
			content: {
				avatar: group.avatar,
				group: group
			}
		};

		fbDatabase
			.ref(`${TypesToFirebaseGlobals.User_Root}/${profile.id}/groups/${group.id}`)
			.set({ id: group.id })
			.catch((error) => {
				dispatch({
					type: TypesOfActions.CURRENT_USER_GLOBAL_ERRORS,
					payload: error
				});
			});

		fbDatabase
			.ref(`${TypesToFirebaseGlobals.Groups_Root}/${group.id}`)
			.set(group)
			.catch((error) => {
				dispatch({
					type: TypesOfActions.CURRENT_USER_GLOBAL_ERRORS,
					payload: error
				});
			});

		fbDatabase
			.ref(`${TypesToFirebaseGlobals.TIMELINE}`)
			.push(tlData)
			.catch((error) => {
				dispatch({
					type: TypesOfActions.CURRENT_USER_GLOBAL_ERRORS,
					payload: error
				});
			});
	};
};

export const Group_AddCats = (data: GroupProfileUpdate) => {
	return (dispatch: any, getState: any) => {
		console.log('data', data);

		var oldCats = getState().groups.UserGroups[data.groupId].categories;

		var updateNewInfo = {
			name: data.name,
			imgArray: data.imgArray,
			avatar: data.imgArray[0],
			categories: convertObjectToArray(data.categories).length > 0 ? data.categories : oldCats
		};

		fbDatabase
			.ref(`${TypesToFirebaseGlobals.Groups_Root}/${data.groupId}`)
			.update(updateNewInfo)
			.catch((error) => {
				dispatch({
					type: TypesOfActions.CURRENT_USER_GLOBAL_ERRORS,
					payload: error
				});
			});
	};
};

export const Group_EditCats = (catData: any) => {
	return (dispatch: any) => {
		// console.log('data', catData);
		const arrNewItems = convertObjectToArray(catData.newItemsToSave);
		convertObjectToArray(catData.newCats).map((cat: i_BaseInterface_Category) => {
			if (cat.items === undefined) {
				cat.items = {};
				return cat;
			}
			return catData.newCats;
		});

		// console.log(	'Need to change the main item',arrNewItems,	catData.userCatsIndexed );
		if (arrNewItems.length > 0) {
			// console.log('larger than 0', arrNewItems.length);
			for (let i = 0; i < arrNewItems.length; i++) {
				// console.log(i, 'for loop', arrNewItems[i].id);
				fbDatabase
					.ref(`${TypesToFirebaseGlobals.Items_Root}/${arrNewItems[i].id}`)
					.set(arrNewItems[i])
					.catch((error) => {
						dispatch({
							type: TypesOfActions.CURRENT_USER_GLOBAL_ERRORS,
							payload: error
						});
					});
			}
			fbDatabase
				.ref(`${TypesToFirebaseGlobals.Groups_Root}/${catData.userId}/categories`)
				.set(catData.userCatsIndexed)
				.catch((error) => {
					dispatch({
						type: TypesOfActions.CURRENT_USER_GLOBAL_ERRORS,
						payload: error
					});
				});
		} else {
			// console.log('is total is  0', arrNewItems.length);
			fbDatabase
				.ref(`${TypesToFirebaseGlobals.Groups_Root}/${catData.userId}/categories`)
				.set(catData.newCats)
				.catch((error) => {
					dispatch({
						type: TypesOfActions.CURRENT_USER_GLOBAL_ERRORS,
						payload: error
					});
				});
		}
	};
};

export const Group_DeleteCats = (catData: any) => {
	return (dispatch: any) => {
		// console.log('data', catData);
		const arrNewItems = convertObjectToArray(catData.newItemsToSave);
		// console.log('Need to change the main item',	arrNewItems,	catData.userCatsIndexed );
		if (arrNewItems.length > 0) {
			// console.log('larger than 0', arrNewItems.length);
			for (let i = 0; i < arrNewItems.length; i++) {
				// console.log(i, 'for loop', arrNewItems[i].id);
				fbDatabase
					.ref(`${TypesToFirebaseGlobals.Items_Root}/${arrNewItems[i].id}`)
					.set(arrNewItems[i])
					.catch((error) => {
						dispatch({
							type: TypesOfActions.CURRENT_USER_GLOBAL_ERRORS,
							payload: error
						});
					});
			}
			fbDatabase
				.ref(`${TypesToFirebaseGlobals.Groups_Root}/${catData.userId}/categories`)
				.set(catData.userCatsIndexed)
				.catch((error) => {
					dispatch({
						type: TypesOfActions.CURRENT_USER_GLOBAL_ERRORS,
						payload: error
					});
				});
		} else {
			// console.log('is total is  0', arrNewItems.length);
			fbDatabase
				.ref(`${TypesToFirebaseGlobals.Groups_Root}/${catData.userId}/categories`)
				.set(catData.newCats)
				.catch((error) => {
					dispatch({
						type: TypesOfActions.CURRENT_USER_GLOBAL_ERRORS,
						payload: error
					});
				});
		}
	};
};

export const Group_AddImg = (imgData: i_Redux_ActionFunc_Interface_ImgUpload) => {
	return (dispatch: any, getState: any) => {
		console.log('INFO GOT ??? Group_AddImg: ', imgData);

		var newMetadata = {
			cacheControl: 'public,max-age=31536000',
			contentType: 'image/webp'
		};

		var change = CheckNameMakeNew(imgData.fileName);

		// console.log('change', change);
		const getResized = fbStorage.ref(`${imgData.uID}/${TypesToFirebaseGlobals.FBStorage_GroupImgs}/${change}`);
		const uploadTask = fbStorage.ref(`${imgData.uID}/${TypesToFirebaseGlobals.FBStorage_GroupImgs}/${imgData.fileName}`).put(imgData.file, newMetadata);
		uploadTask.on(
			'state_changed',
			(snapshot) => {
				// Observe state change events such as progress, pause, and resume
				// Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
				var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
				// console.log('Upload is ' + progress + '% done');
				dispatch({
					type: TypesOfActions.FILE_UPLOAD_PROGRESS,
					payload: {
						progress: progress.toFixed(0),
						fileName: imgData.fileName
					}
				});

				dispatch({
					type: TypesOfActions.SHOW_LOADER,
					payload: 'start'
				});
			},
			(error) => {
				// Handle unsuccessful uploads
				dispatch({
					type: TypesOfActions.CURRENT_USER_GLOBAL_ERRORS,
					payload: error
				});
			},
			() => {
				// Handle successful uploads on complete
				// For instance, get the download URL: https://firebasestorage.googleapis.com/...
				setTimeout(() => {
					getResized
						.getDownloadURL()
						.then((downloadURL) => {
							var arr: string[] = [];
							var secArr: string[] = [];
							var combArr: string[] = [];

							arr = getState().groups.pendingImgUrl;
							secArr = getState().groups.UserGroups[imgData.uID] !== undefined ? getState().groups.UserGroups[imgData.uID].imgArray : [];
							combArr = [...arr, ...secArr];

							// console.log('arr', arr);
							// console.log('secarr', secArr);

							// eslint-disable-next-line
							secArr.length > 0 ? (arr = combArr) : (arr = arr);

							// console.log('b4', arr);

							arr.push(downloadURL);
							// console.log('ARRR ', arr);

							fbDatabase.ref(`${TypesToFirebaseGlobals.Groups_Root}/${imgData.uID}`).update({
								avatar: arr[0],
								imgArray: arr
							});

							return arr;
						})
						.then((arr) => {
							// console.log('after then', arr);
							dispatch({
								type: TypesOfActions.CURRENT_USER_GROUP_IMG_ADD,
								payload: arr
							});

							dispatch({
								type: TypesOfActions.SHOW_LOADER,
								payload: 'end'
							});
						});
				}, 5000);
			}
		);
	};
};

export const Group_EditImg = (imgData: i_Redux_ActionFunc_Interface_ImgEdit) => {
	return (dispatch: any, getState: any) => {
		// console.log('INFO GOT: ', imgData);
		const profile = getState().user;
		var newMetadata = {
			cacheControl: 'public,max-age=31536000',
			contentType: 'image/webp'
		};
		var change = CheckNameMakeNew(imgData.newFileName);
		// console.log('change', change);
		const getResized = fbStorage.ref(`${profile.id}/${TypesToFirebaseGlobals.FBStorage_GroupImgs}/${change}`);
		const uploadTask = fbStorage.ref(`${profile.id}/${TypesToFirebaseGlobals.FBStorage_GroupImgs}/${imgData.newFileName}`).put(imgData.newFile, newMetadata);
		uploadTask.on(
			'state_changed',
			(snapshot) => {
				// Observe state change events such as progress, pause, and resume
				// Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
				var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
				// console.log('Upload is ' + progress + '% done');
				dispatch({
					type: TypesOfActions.FILE_UPLOAD_PROGRESS,
					payload: {
						progress: progress.toFixed(0),
						fileName: imgData.newFileName
					}
				});
			},
			(error) => {
				// Handle unsuccessful uploads
				dispatch({
					type: TypesOfActions.CURRENT_USER_GLOBAL_ERRORS,
					payload: error
				});
			},
			() => {
				// Handle successful uploads on complete
				// For instance, get the download URL: https://firebasestorage.googleapis.com/...
				setTimeout(() => {
					getResized.getDownloadURL().then((downloadURL) => {
						// console.log('File available at', downloadURL);
						// imgData.newArray.push(downloadURL);
						imgData.newArray.splice(imgData.indexOfImg, 0, downloadURL);

						fbDatabase
							.ref(`${TypesToFirebaseGlobals.Groups_Root}/${imgData.itemId}`)
							.update({
								avatar: imgData.newArray[0],
								imgArray: imgData.newArray
							})
							.then(() => {
								dispatch({
									type: TypesOfActions.CURRENT_USER_GROUP_IMG_EDIT,
									payload: imgData.newArray
								});
							})
							.catch((error) => {
								dispatch({
									type: TypesOfActions.CURRENT_USER_GLOBAL_ERRORS,
									payload: error
								});
							});
					});
				}, 5000);
			}
		);
	};
};

export const Group_DeleteImg = (imgData: i_Redux_ActionFunc_Interface_ImgDelete) => {
	return (dispatch: any, getState: any) => {
		console.log('INFO GOT: ', imgData);
		fbDatabase
			.ref(`${TypesToFirebaseGlobals.Groups_Root}/${imgData.itemId}`)
			.update({
				imgArray: imgData.newArray,
				avatar: imgData.newArray[0],
				dateEdited: new Date()
			})
			.then(() => {
				console.log('DELETE arry', imgData.newArray);
				dispatch({
					type: TypesOfActions.CURRENT_USER_GROUP_IMG_DELETE,
					payload: imgData.newArray
				});
			})
			.catch((error) => {
				// console.log('Huston we have a problem', error);
				dispatch({
					type: TypesOfActions.CURRENT_USER_GLOBAL_ERRORS,
					payload: error
				});
			});
	};
};

import { TypesOfActions } from '../../TypesOfActions';
import FIREBASE from '../../../firebase/firebaseConfig';
import { TypesToFirebaseGlobals } from '../../../firebase/TypesToServer';
import { i_Redux_ActionFunc_Interface_ImgUpload, i_Redux_ActionFunc_Interface_ImgEdit, i_Redux_ActionFunc_Interface_ImgDelete } from '../../../../models/007ImageModels';
import { i_Redux_ActionFunc_Interface_Item_SetOnNav, i_BaseInterface_Item, i_BaseInterface_ItemIndexer, i_GloballyDelteItem, iSendUpdate } from '../../../../models/006ItemModels';
import { CheckNameMakeNew } from '../../../ownServices/HelperFuncs';
import { iTimeLineEntry } from '../../../../models/TimelineModels';
import { AppStartGloabalBase_Categories } from '../../../../models/AppStartGlobal_CatSetUp';

const fbDatabase = FIREBASE.database();
const fbStorage = FIREBASE.storage();

export const User_Item_AddImg = (imgData: i_Redux_ActionFunc_Interface_ImgUpload) => {
	return (dispatch: any, getState: any) => {
		// console.log('INFO GOT: ', imgData);

		var newMetadata = {
			cacheControl: 'public,max-age=31536000',
			contentType: 'image/webp'
		};

		var change = CheckNameMakeNew(imgData.fileName);

		// console.log('change', change);
		const getResized = fbStorage.ref(`${imgData.uID}/${TypesToFirebaseGlobals.FBStorage_ItemImgs}/${change}`);
		const uploadTask = fbStorage.ref(`${imgData.uID}/${TypesToFirebaseGlobals.FBStorage_ItemImgs}/${imgData.fileName}`).put(imgData.file, newMetadata);

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
							// console.log('File available at', downloadURL);
							// make full array from from profile arra plus this one
							var arr: string[] = [];
							var secArr: string[] = [];
							var combArr: string[] = [];
							var itemId: string = '';
							itemId = getState().item.id;
							arr = getState().item.pendingImgUrl;
							secArr = getState().item.imgArray;
							combArr = [...arr, ...secArr];

							console.log('can i get the correct id???', itemId);

							console.log('arr', arr);
							console.log('secarr', secArr);

							// eslint-disable-next-line
							secArr.length > 0 ? (arr = combArr) : (arr = arr);

							console.log('b4', arr);
							//.filter(function (a: string) {
							// return a !== '/static/media/no-img.6732bd42.png' || a.length !== 0;
							// } )

							arr.push(downloadURL);
							console.log('ARRR ', arr);

							fbDatabase.ref(`${TypesToFirebaseGlobals.Items_Root}/${itemId}/imgArray`).update(arr);

							return arr;
						})
						.then((arr) => {
							console.log('after then', arr);
							dispatch({
								type: TypesOfActions.CURRENT_USER_ITEM_IMG_ADD,
								payload: arr
							});
							dispatch({
								type: TypesOfActions.SHOW_LOADER,
								payload: 'stop'
							});
						})
						.catch((error: any) => {
							dispatch({
								type: TypesOfActions.CURRENT_USER_GLOBAL_ERRORS,
								payload: error
							});
						});
				}, 5000);
			}
		);
	};
};

export const User_Item_EditImg = (imgData: i_Redux_ActionFunc_Interface_ImgEdit) => {
	return (dispatch: any, getState: any) => {
		// console.log('INFO GOT: ', imgData);
		const profile = getState().user;
		var newMetadata = {
			cacheControl: 'public,max-age=31536000',
			contentType: 'image/webp'
		};
		var change = CheckNameMakeNew(imgData.newFileName);
		// console.log('change', change);
		const getResized = fbStorage.ref(`${profile.id}/${TypesToFirebaseGlobals.FBStorage_ItemImgs}/${change}`);
		const uploadTask = fbStorage.ref(`${profile.id}/${TypesToFirebaseGlobals.FBStorage_ItemImgs}/${imgData.newFileName}`).put(imgData.newFile, newMetadata);
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
							console.log('File available at', downloadURL);
							// imgData.newArray = [...getState().item.pendingImgUrl];
							// imgData.newArray.push(downloadURL);
							imgData.newArray.splice(imgData.indexOfImg, 0, downloadURL);
							dispatch({
								type: TypesOfActions.CURRENT_USER_ITEM_IMG_EDIT,
								payload: imgData.newArray
							});
							dispatch({
								type: TypesOfActions.SHOW_LOADER,
								payload: 'stop'
							});
						})

						.catch((error) => {
							// console.log('Huston we have a problem', error);
							dispatch({
								type: TypesOfActions.CURRENT_USER_GLOBAL_ERRORS,
								payload: error
							});
						});
				}, 5000);
			}
		);
	};
};

export const User_Item_DeleteImg = (imgData: i_Redux_ActionFunc_Interface_ImgDelete) => {
	return (dispatch: any, getState: any) => {
		console.log('INFO GOT: ', imgData);
		fbDatabase
			.ref(`${TypesToFirebaseGlobals.Items_Root}/${imgData.itemId}`)
			.update({
				imgArray: imgData.newArray,
				avatar: imgData.newArray[0],
				dateEdited: new Date()
			})
			.then(() => {
				console.log('DELETE arry', imgData.newArray);
				dispatch({
					type: TypesOfActions.CURRENT_USER_ITEM_IMG_DELETE,
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

export const User_Item_Set_onNav = (imgData: i_Redux_ActionFunc_Interface_Item_SetOnNav) => {
	return (dispatch: any) => {
		// console.log('INFO GOT: ', imgData);
		var obj = {
			id: imgData.id,
			name: imgData.name,
			categories: imgData.categories,
			brand: imgData.brand,
			size: imgData.size,
			color: imgData.color,
			length: imgData.length,
			description: imgData.description,
			userWhoAddedItem: imgData.userWhoAddedItem,
			groups: imgData.groups,
			worth: imgData.worth,
			shipping: imgData.shipping,
			imgArray: imgData.imgArray
		};
		dispatch({
			type: TypesOfActions.CURRENT_USER_ITEM_SET,
			payload: obj
		});
	};
};

export const User_Item_Save = (data: i_BaseInterface_Item) => {
	return (dispatch: any, getState: any) => {
		console.log('INFO GOT: ', data);
		const profile = getState().user;
		// 1. cats can now not exsits on db so make sure to
		//update complete cat but do not set as you will loose current info
		// 2 same apllies for the groups
		// 3 add the item to its self

		// // ADD ITEM ITSELF
		var catDataFormat: i_BaseInterface_Item = {
			id: data.id,
			name: data.name,
			brand: data.brand,
			categories: data.categories,
			size: data.size,
			color: data.color,
			length: data.length,
			description: data.description,
			userWhoAddedItem: data.userWhoAddedItem,
			imgArray: data.imgArray,
			avatar: data.avatar,
			dateCreated: data.dateCreated,
			groups: data.groups,
			dateDeleted: data.dateDeleted,
			dateEdited: data.dateEdited,
			dateMovedToDons: data.dateMovedToDons,
			worth: data.worth,
			shipping: data.shipping,
			location: data.location
		};

		var tlData: iTimeLineEntry = {
			type: 'User added new item',
			date: new Date().getTime(),
			name: data.userWhoAddedItem.name,
			id: data.userWhoAddedItem.id,
			content: {
				avatar: data.userWhoAddedItem.avatar,
				item: data
			}
		};

		console.log('catDataFormat', catDataFormat);

		for (let i = 0; i < data.categories.length; i++) {
			const cat = data.categories[i];
			console.log('cat', cat);

			const updateObjNew = {
				name: AppStartGloabalBase_Categories('de')[cat].name,
				avatar: AppStartGloabalBase_Categories('de')[cat].avatar,
				checkMatch: AppStartGloabalBase_Categories('de')[cat].checkMatch
			};

			const updateAddItem = {
				id: data.id,
				categories: data.categories
			};

			fbDatabase
				.ref(`${TypesToFirebaseGlobals.User_Root}/${profile.id}/${TypesToFirebaseGlobals.Category_Container}/${cat}`)
				.update(updateObjNew)
				.then(() => {
					// console.log('Added new cat to user ', updateObjNew);
					fbDatabase
						.ref(`${TypesToFirebaseGlobals.User_Root}/${profile.id}/${TypesToFirebaseGlobals.Category_Container}/${cat}/${TypesToFirebaseGlobals.Items_Container}/${data.id}`)
						.set(updateAddItem)
						.catch((error) => {
							dispatch({
								type: TypesOfActions.CURRENT_USER_GLOBAL_ERRORS,
								payload: error
							});
						});
				})
				.catch((error) => {
					dispatch({
						type: TypesOfActions.CURRENT_USER_GLOBAL_ERRORS,
						payload: error
					});
				});
		}

		// ADD ITEM TO GROUPS
		if (data.groups.length > 0) {
			data.groups.forEach((entry: any) => {
				for (let i = 0; i < entry.cats.length; i++) {
					const entryCat = entry.cats[i];
					console.log('entryCat', entryCat);

					const updateObjGroupNew = {
						name: AppStartGloabalBase_Categories('de')[entryCat].name,
						avatar: AppStartGloabalBase_Categories('de')[entryCat].avatar,
						checkMatch: AppStartGloabalBase_Categories('de')[entryCat].checkMatch
					};

					const updateAddItem = {
						id: data.id,
						categories: data.categories
					};

					fbDatabase
						.ref(`${TypesToFirebaseGlobals.Groups_Root}/${entry.groudId}/${TypesToFirebaseGlobals.Category_Container}/${entryCat}`)
						.update(updateObjGroupNew)
						.then(() => {
							// console.log('Added new catItem to Group ', entry.groudId, updateObjGroupNew);

							fbDatabase
								.ref(
									`${TypesToFirebaseGlobals.Groups_Root}/${entry.groudId}/${TypesToFirebaseGlobals.Category_Container}/${entryCat}/${TypesToFirebaseGlobals.Items_Container}/${data.id}`
								)
								.set(updateAddItem)
								.catch((error) => {
									dispatch({
										type: TypesOfActions.CURRENT_USER_GLOBAL_ERRORS,
										payload: error
									});
								});
						})
						.catch((error) => {
							dispatch({
								type: TypesOfActions.CURRENT_USER_GLOBAL_ERRORS,
								payload: error
							});
						});
				}
			});
		}

		fbDatabase
			.ref(`${TypesToFirebaseGlobals.Items_Root}/${data.id}`)
			.set(catDataFormat)
			.then(() => {
				fbDatabase
					.ref(`${TypesToFirebaseGlobals.TIMELINE}`)
					.push(tlData)
					.then(() => {
						window.location.replace('/dashboard');
					})
					.catch((error) => {
						dispatch({
							type: TypesOfActions.CURRENT_USER_GLOBAL_ERRORS,
							payload: error
						});
					});
				dispatch({
					type: TypesOfActions.CURRENT_USER_ITEM_DONE,
					payload: null
				});
			})
			.catch((error) => {
				dispatch({
					type: TypesOfActions.CURRENT_USER_GLOBAL_ERRORS,
					payload: error
				});
			});
	};
};

export const User_Item_Change = (data: iSendUpdate) => {
	return (dispatch: any, getState: any) => {
		console.log('INFO GOT: ', data);
		const profile = getState().user;
		var obj: i_BaseInterface_ItemIndexer = {
			id: data.item.id,
			categories: data.item.categories
			// groups: data.groups,
		};

		if (data.timelineId !== undefined && data.timelineId.length > 0) {
			console.log('enter tl update');
			fbDatabase.ref(`${TypesToFirebaseGlobals.TIMELINE}/${data.timelineId}/content/item`).update(data.item);
		} else {
			console.log('cannot enter tl update', data.timelineId);
		}
		for (let i = 0; i < data.item.categories.length; i++) {
			// console.log('data.categories[i]', data.categories[i]);
			// allCatsArr.push( data.categories[i] );
			fbDatabase
				.ref(
					`${TypesToFirebaseGlobals.User_Root}/${profile.id}/${TypesToFirebaseGlobals.Category_Container}/${data.item.categories[i]}/${TypesToFirebaseGlobals.Items_Container}/${data.item.id}`
				)
				.set(obj)
				.catch((error) => {
					dispatch({
						type: TypesOfActions.CURRENT_USER_GLOBAL_ERRORS,
						payload: error
					});
				});
		}

		fbDatabase
			.ref(`${TypesToFirebaseGlobals.Items_Root}/${data.item.id}`)
			.update(data.item)
			.then(() => {
				dispatch({
					type: TypesOfActions.CURRENT_USER_ITEM_DONE,
					payload: null
				});
				window.location.replace('/dashbord');
			})
			.catch((error) => {
				dispatch({
					type: TypesOfActions.CURRENT_USER_GLOBAL_ERRORS,
					payload: error
				});
			});
	};
};

export const User_Item_Delete_Globally = (itemData: i_GloballyDelteItem[]) => {
	return (dispatch: any, getState: any) => {
		// console.log('INFO GOT: ', itemData);
		const time = new Date().getTime();
		for (let index = 0; index < itemData.length; index++) {
			const element = itemData[index];
			// console.log(index, element);
			if (element.groupId === 'NotGroup') {
				// console.log('this is a users item that needs to be deleted', element);
				fbDatabase
					.ref(`${TypesToFirebaseGlobals.User_Root}/${element.userId}/${TypesToFirebaseGlobals.Category_Container}/${element.catName}/items/${element.itemId}`)
					.remove()
					.then(() => {
						fbDatabase
							.ref(`${TypesToFirebaseGlobals.Items_Root}/${element.itemId}`)
							.update({ dateRemoved: time })
							.catch((error: any) => {
								// console.log('error => element', error, '=>', element);
								dispatch({
									type: TypesOfActions.CURRENT_USER_GLOBAL_ERRORS,
									payload: error
								});
							});
					})
					.catch((error: any) => {
						// console.log('error => element', error, '=>', element);
						dispatch({
							type: TypesOfActions.CURRENT_USER_GLOBAL_ERRORS,
							payload: error
						});
					});
			}
			if (element.userOrGroup === 'user') {
				// console.log('this is a users item that needs to be deleted', element);
				fbDatabase
					.ref(`${TypesToFirebaseGlobals.User_Root}/${element.userId}/${TypesToFirebaseGlobals.Category_Container}/${element.catName}/items/${element.itemId}`)
					.remove()
					.then(() => {
						fbDatabase
							.ref(`${TypesToFirebaseGlobals.Items_Root}/${element.itemId}`)
							.update({ dateRemoved: time })
							.catch((error: any) => {
								// console.log('error => element', error, '=>', element);
								dispatch({
									type: TypesOfActions.CURRENT_USER_GLOBAL_ERRORS,
									payload: error
								});
							});
					})
					.catch((error: any) => {
						// console.log('error => element', error, '=>', element);
						dispatch({
							type: TypesOfActions.CURRENT_USER_GLOBAL_ERRORS,
							payload: error
						});
					});
			}
			if (element.groupId !== 'NotGroup') {
				// console.log('this is a group item that needs to be deleted', element);
				fbDatabase
					.ref(`${TypesToFirebaseGlobals.Groups_Root}/${element.groupId}/${TypesToFirebaseGlobals.Category_Container}/${element.catName}/items/${element.itemId}`)
					.remove()
					.then(() => {
						fbDatabase
							.ref(`${TypesToFirebaseGlobals.Items_Root}/${element.itemId}`)
							.update({ dateRemoved: time })
							.catch((error: any) => {
								// console.log('error => element', error, '=>', element);
								dispatch({
									type: TypesOfActions.CURRENT_USER_GLOBAL_ERRORS,
									payload: error
								});
							});
					})
					.catch((error: any) => {
						// console.log('error => element', error, '=>', element);
						dispatch({
							type: TypesOfActions.CURRENT_USER_GLOBAL_ERRORS,
							payload: error
						});
					});
			} else {
				// console.log('this is a group item that needs to be deleted', element);
				fbDatabase
					.ref(`${TypesToFirebaseGlobals.Groups_Root}/${element.groupId}/${TypesToFirebaseGlobals.Category_Container}/${element.catName}/items/${element.itemId}`)
					.remove()
					.then(() => {
						fbDatabase
							.ref(`${TypesToFirebaseGlobals.Items_Root}/${element.itemId}`)
							.update({ dateRemoved: time })
							.catch((error: any) => {
								// console.log('error => element', error, '=>', element);
								dispatch({
									type: TypesOfActions.CURRENT_USER_GLOBAL_ERRORS,
									payload: error
								});
							});
					})
					.catch((error: any) => {
						// console.log('error => element', error, '=>', element);
						dispatch({
							type: TypesOfActions.CURRENT_USER_GLOBAL_ERRORS,
							payload: error
						});
					});
			}

			if (element.tlID !== undefined && element.tlID.length > 0) {
				fbDatabase
					.ref(`${TypesToFirebaseGlobals.TIMELINE}`)
					.once('value')
					.then((c) => {
						var data = c.val();
						console.log('Data');
						var keys = Object.keys(data);
						keys.forEach((key) => {
							if (key !== undefined && key === element.tlID) {
								fbDatabase.ref(`${TypesToFirebaseGlobals.TIMELINE}/${element.tlID}`).remove();
							}
						});
					});
			}
		}
	};
};

import FIREBASE from '../../../firebase/firebaseConfig';
import { TypesOfActions } from '../../TypesOfActions';
import { TypesToFirebaseGlobals } from '../../../firebase/TypesToServer';
import { i_Redux_ActionFunc_Interface_Item_MoveTo_Donations, i_BaseInterface_Item, i_Redux_ActionFunc_Interface_Item_SetOnNav } from '../../../../models/006ItemModels';
import { i_Redux_ActionFunc_Interface_ImgDelete, i_Redux_ActionFunc_Interface_ImgEdit, i_Redux_ActionFunc_Interface_ImgUpload } from '../../../../models/007ImageModels';
import { ItemsFoundArrayGeneratorForDons } from '../../../helpers/DonsFunctionBeforeMoveitemtoDons';
import { CheckNameMakeNew } from '../../../ownServices/HelperFuncs';
import { iTimeLineEntry } from '../../../../models/TimelineModels';

const fbDatabase = FIREBASE.database();
const fbStorage = FIREBASE.storage();

export const User_Move_Item_To_Donations = (itemData: i_Redux_ActionFunc_Interface_Item_MoveTo_Donations) => {
	return (dispatch: any) => {
		const U_R = TypesToFirebaseGlobals.User_Root;
		const C_C = TypesToFirebaseGlobals.Category_Container;
		const I_R = TypesToFirebaseGlobals.Items_Root;
		const I_C = TypesToFirebaseGlobals.Items_Container;
		const G_R = TypesToFirebaseGlobals.Groups_Root;
		const D_R = TypesToFirebaseGlobals.Donations_Root;
		const D_C = TypesToFirebaseGlobals.Donations_Container;
		const step1 = ItemsFoundArrayGeneratorForDons(itemData.allCatsForThisUser, itemData.itemId);

		var tlData: iTimeLineEntry = {
			type: 'User added new donation',
			date: new Date().getTime(),
			name: itemData.itemToMove.userWhoAddedItem.name,
			id: itemData.itemToMove.userWhoAddedItem.id,
			content: {
				avatar: itemData.itemToMove.userWhoAddedItem.avatar,
				item: itemData.itemToMove
			}
		};

		for (let i = 0; i < step1.length; i++) {
			const element = step1[i];
			// console.log('element', element);
			if (element.userOrGroup === 'user') {
				// console.log('step3', `${U_R}/${element.userId}/${C_C}/${element.category}/${I_C}/${element.itemId}`);
				fbDatabase
					.ref(`${U_R}/${element.userId}/${C_C}/${element.category}/${I_C}/${element.itemId}`)
					.remove()
					.catch((error) => {
						// console.log('error');
						dispatch({
							type: TypesOfActions.CURRENT_USER_GLOBAL_ERRORS,
							payload: error
						});
					});
			} else {
				// console.log('step3', `${G_R}/${element.groupId}/${C_C}/${element.category}/${I_C}/${element.itemId}`);
				fbDatabase
					.ref(`${G_R}/${element.groupId}/${C_C}/${element.category}/${I_C}/${element.itemId}`)
					.remove()
					.catch((error) => {
						// console.log('error');
						dispatch({
							type: TypesOfActions.CURRENT_USER_GLOBAL_ERRORS,
							payload: error
						});
					});
			}
		}

		//step 2
		fbDatabase
			.ref(`${U_R}/${itemData.userId}/${D_C}/${itemData.itemId}`)
			.set(itemData.moveObj)

			.catch((error) => {
				// console.log('error');
				dispatch({
					type: TypesOfActions.CURRENT_USER_GLOBAL_ERRORS,
					payload: error
				});
			});

		// step 3
		fbDatabase
			.ref(`${I_R}/${itemData.itemId}`)
			.remove()
			.catch((error) => {
				// console.log('error');
				dispatch({
					type: TypesOfActions.CURRENT_USER_GLOBAL_ERRORS,
					payload: error
				});
			});

		// step 4
		fbDatabase
			.ref(`${D_R}/${itemData.itemId}`)
			.set(itemData.itemToMove)
			.then(() => {
				// step 5
				fbDatabase
					.ref(`${TypesToFirebaseGlobals.TIMELINE}`)
					.push(tlData)
					.catch((error) => {
						// console.log('error');
						dispatch({
							type: TypesOfActions.CURRENT_USER_GLOBAL_ERRORS,
							payload: error
						});
					});
			})
			.catch((error) => {
				// console.log('error');
				dispatch({
					type: TypesOfActions.CURRENT_USER_GLOBAL_ERRORS,
					payload: error
				});
			});
	};
};

export const User_Donations_Delete = (itemData: any) => {
	return (dispatch: any, getState: any) => {
		const profile = getState().user;

		fbDatabase
			.ref(`${TypesToFirebaseGlobals.User_Root}/${profile.id}/${TypesToFirebaseGlobals.Donations_Container}/${itemData.itemToMove.id}`)
			.remove()
			.catch((error) => {
				// console.log('error deleting', error);
				dispatch({
					type: TypesOfActions.CURRENT_USER_GLOBAL_ERRORS,
					payload: error
				});
			});
		fbDatabase
			.ref(`${TypesToFirebaseGlobals.Donations_Root}/${itemData.itemToMove.id}`)
			.remove()
			.catch((error) => {
				// console.log('error deleting', error);
				dispatch({
					type: TypesOfActions.CURRENT_USER_GLOBAL_ERRORS,
					payload: error
				});
			});
	};
};

export const User_Donations_SetOnNavAway = (itemData: i_Redux_ActionFunc_Interface_Item_SetOnNav) => {
	return (dispatch: any) => {
		// console.log('INFO GOT: ', itemData);
		dispatch({
			type: TypesOfActions.CURRENT_USER_DONATIONS_SET_ON_NAV_AWAY,
			payload: itemData
		});
	};
};

export const User_Donations_Edit = (itemData: i_BaseInterface_Item) => {
	return (dispatch: any) => {
		// console.log('INFO GOT: ', itemData);
		fbDatabase
			.ref(`${TypesToFirebaseGlobals.Donations_Root}/${itemData.id}`)
			.update(itemData)
			.catch((error: any) => {
				// console.log('fuck this ', error);
				dispatch({
					type: TypesOfActions.CURRENT_USER_GLOBAL_ERRORS,
					payload: error
				});
			});
	};
};

export const User_Donations_EditImg = (imgData: i_Redux_ActionFunc_Interface_ImgEdit) => {
	return (dispatch: any, getState: any) => {
		// console.log('INFO GOT: ', imgData);
		const profile = getState().user;
		var newMetadata = {
			cacheControl: 'public,max-age=31536000',
			contentType: 'image/webp'
		};
		var change = CheckNameMakeNew(imgData.newFileName);
		// console.log('change', change);
		const getResized = fbStorage.ref(`${profile.id}/${TypesToFirebaseGlobals.FBStorage_DonImgs}/${change}`);
		const uploadTask = fbStorage.ref(`${profile.id}/${TypesToFirebaseGlobals.FBStorage_DonImgs}/${imgData.newFileName}`).put(imgData.newFile, newMetadata);
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
					getResized.getDownloadURL().then((downloadURL) => {
						// console.log('File available at', downloadURL);
						// imgData.newArray.push(downloadURL);
						imgData.newArray.splice(imgData.indexOfImg, 0, downloadURL);
						dispatch({
							type: TypesOfActions.CURRENT_USER_DONATIONS_IMG_EDIT,
							payload: imgData.newArray
						});
						dispatch({
							type: TypesOfActions.SHOW_LOADER,
							payload: 'stop'
						});
					});
				}, 5000);
			}
		);
	};
};

export const User_Donations_AddImg = (imgData: i_Redux_ActionFunc_Interface_ImgUpload) => {
	return (dispatch: any, getState: any) => {
		console.log('INFO GOT: ', imgData);

		var newMetadata = {
			cacheControl: 'public,max-age=31536000',
			contentType: 'image/webp'
		};

		var change = CheckNameMakeNew(imgData.fileName);

		// console.log('change', change);
		const getResized = fbStorage.ref(`${imgData.uID}/${TypesToFirebaseGlobals.FBStorage_DonImgs}/${change}`);
		const uploadTask = fbStorage.ref(`${imgData.uID}/${TypesToFirebaseGlobals.FBStorage_DonImgs}/${imgData.fileName}`).put(imgData.file, newMetadata);

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
				console.log('error', error);
				dispatch({
					type: TypesOfActions.CURRENT_USER_GLOBAL_ERRORS,
					payload: error
				});
			},
			() => {
				setTimeout(() => {
					getResized
						.getDownloadURL()
						.then((downloadURL) => {
							console.log('File available at', downloadURL);
							// make full array from from profile arra plus this one
							var arr: string[] = [];
							var secArr: string[] = [];
							var combArr: string[] = [];
							var itemId: string = '';

							itemId = getState().donations.EditDonation.id;
							console.log('can i get the correct id???', itemId);

							arr = getState().donations.pendingImgUrl;
							console.log('arr', arr);

							secArr = getState().donations.EditDonation.imgArray;
							console.log('secarr', secArr);

							combArr = [...arr, ...secArr];
							console.log('combArr', combArr);

							// eslint-disable-next-line
							secArr.length > 0 ? (arr = combArr) : (arr = arr);

							console.log('b4', arr);

							arr.push(downloadURL);
							console.log('ARRR ', arr);

							fbDatabase.ref(`${TypesToFirebaseGlobals.Donations_Root}/${itemId}/imgArray`).update(arr);

							return arr;
						})
						.then((arr) => {
							console.log('after then', arr);
							dispatch({
								type: TypesOfActions.CURRENT_USER_DON_IMG_ADD,
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

export const User_Donations_DeleteImg = (imgData: i_Redux_ActionFunc_Interface_ImgDelete) => {
	return (dispatch: any, getState: any) => {
		console.log('INFO GOT: ', imgData);
		fbDatabase
			.ref(`${TypesToFirebaseGlobals.Donations_Root}/${imgData.itemId}`)
			.update({
				imgArray: imgData.newArray,
				avatar: imgData.newArray[0],
				dateEdited: new Date()
			})
			.then(() => {
				console.log('DELETE arry', imgData.newArray);
				dispatch({
					type: TypesOfActions.CURRENT_USER_DON_IMG_DELETE,
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

import { i_Redux_ActionFunc_Interface_ImgUpload, i_Redux_ActionFunc_Interface_ImgEdit, i_Redux_ActionFunc_Interface_ImgDelete } from '../../../models/007ImageModels';
import FIREBASE from '../../firebase/FirebaseConfig';
import { i_BaseInterface_User } from '../../../models/001UserModels';
import { TypesToFirebaseGlobals } from '../../firebase/TypesToServer';
import { TypesOfActions } from '../TypesOfActions';

const fbDatabase = FIREBASE.database();
const fbStorage = FIREBASE.storage();

export const User_ChangeLang = (user: i_BaseInterface_User) => {
	return (dispatch: any, getState: any) => {
		// console.log('INFO GOT: ', user);

		//make async call to firebase server
		fbDatabase.ref(`${TypesToFirebaseGlobals.User_Root}/${user.id}`).update({ lang: user.lang }, function (error) {
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
					type: TypesOfActions.CURRENT_USER_CHANGE_LANG,
					payload: user.lang
				});
			}
		});
	};
};

export const User_Update_NotifyToken = (token: string) => {
	return (dispatch: any, getState: any) => {
		const profile = getState().user;
		console.log('INFO GOT: ', token);

		fbDatabase
			.ref(`${TypesToFirebaseGlobals.User_Root}/${profile.id}`)
			.child('notifyToken')
			.set(token, function (error) {
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
						type: TypesOfActions.CURRENT_USER_PROFILE_EDIT_ADD_NOTIFY_TOKEN,
						payload: token
					});
				}
			});
	};
};

export const User_Update = (user: i_BaseInterface_User) => {
	return (dispatch: any, getState: any) => {
		// console.log('INFO GOT: ', user.categories);
		const ls = window.localStorage.getItem('profile');
		const x = ls !== null ? ls : TypesToFirebaseGlobals.placeholderImg;
		const profile = getState().user;
		// console.log('profile: ', profile);
		// console.log('catlength:', Object.keys(user.categories).length);

		var UserUpdatedObj = {
			name: user.name.length === 0 ? profile.name : user.name,
			avatar: x,
			imgArray: [x],
			bio: user.bio.length > 0 ? user.bio : profile.bio
		};

		console.log('UpdatedUser', UserUpdatedObj);

		//make async call to firebase server
		fbDatabase.ref(`${TypesToFirebaseGlobals.User_Root}/${profile.id}`).update(UserUpdatedObj, function (error) {
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
					type: TypesOfActions.CURRENT_USER_PROFILE_EDIT,
					payload: UserUpdatedObj
				});
			}
		});
	};
};

export const User_Profile_AddImg = (imgData: i_Redux_ActionFunc_Interface_ImgUpload) => {
	return (dispatch: any, getState: any) => {
		// console.log('INFO GOT: ', imgData);
		const profile = getState().user;

		const uploadTask = fbStorage.ref(`${profile.id}/${TypesToFirebaseGlobals.FBStorage_profileImgs}/${imgData.fileName}`).put(imgData.file);
		uploadTask.on(
			'state_changed',
			(snapshot) => {
				// Observe state change events such as progress, pause, and resume
				// Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
				var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
				console.log('Upload is ' + progress + '% done');

				dispatch({
					type: TypesOfActions.FILE_UPLOAD_PROGRESS,
					payload: {
						progress: progress,
						fileName: imgData.fileName
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
				uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
					// console.log('File available at', downloadURL);
					// make full array from from profile arra plus this one
					var sendArray = [...profile.imgArray];
					sendArray.push(downloadURL);
					console.log(`${TypesToFirebaseGlobals.User_Root}/${profile.id}`);
					fbDatabase.ref(`${TypesToFirebaseGlobals.User_Root}/${profile.id}`).update(
						{
							imgArray: sendArray,
							avatar: sendArray[0]
						},
						function (error) {
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
									type: TypesOfActions.CURRENT_USER_PROFILE_IMG_ADD,
									payload: sendArray
								});
							}
						}
					);
				});
			}
		);
	};
};

export const User_Profile_EditImg = (imgData: i_Redux_ActionFunc_Interface_ImgEdit) => {
	return (dispatch: any, getState: any) => {
		// console.log('INFO GOT: ', imgData);

		const profile = getState().user;

		const uploadTask = fbStorage.ref(`${profile.id}/${TypesToFirebaseGlobals.FBStorage_profileImgs}/${imgData.newFileName}`).put(imgData.newFile);
		uploadTask.on(
			'state_changed',
			(snapshot) => {
				// Observe state change events such as progress, pause, and resume
				// Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
				var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
				console.log('Upload is ' + progress + '% done');
				dispatch({
					type: TypesOfActions.FILE_UPLOAD_PROGRESS,
					payload: {
						progress: progress,
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
				uploadTask.snapshot.ref
					.getDownloadURL()
					.then((downloadURL) => {
						// console.log('File available at', downloadURL);
						var newArraywithNewImg = [...imgData.newArray]; // make a separate copy of the array
						newArraywithNewImg.push(downloadURL);
						// console.log('arry', newArraywithNewImg);
						return newArraywithNewImg;
					})
					.then((newArraywithNewImg) => {
						fbDatabase
							.ref(`${TypesToFirebaseGlobals.User_Root}/${profile.id}`)
							.update({
								imgArray: newArraywithNewImg,
								avatar: newArraywithNewImg[0]
							})
							.then(() => {
								dispatch({
									type: TypesOfActions.CURRENT_USER_PROFILE_IMG_EDIT,
									payload: newArraywithNewImg
								});
							})
							.catch((error) => {
								// console.log('Huston we have a problem', error);
								dispatch({
									type: TypesOfActions.CURRENT_USER_GLOBAL_ERRORS,
									payload: error
								});
							});
					});
			}
		);
	};
};

export const User_Profile_DeleteImg = (imgData: i_Redux_ActionFunc_Interface_ImgDelete) => {
	return (dispatch: any, getState: any) => {
		const profile = getState().user;
		// console.log('INFO GOT: ', imgData);
		// console.log('profile: ', profile.id);

		if (imgData.newArray.length === 0) {
			imgData.newArray.push(TypesToFirebaseGlobals.placeholderImg);
		}
		fbDatabase
			.ref(`${TypesToFirebaseGlobals.User_Root}/${profile.id}`)
			.update({
				imgArray: imgData.newArray,
				avatar: imgData.newArray[0]
			})
			.then(() => {
				// console.log('deleted storage of img now dispatching updata ???');
				dispatch({
					type: TypesOfActions.CURRENT_USER_PROFILE_IMG_DELETE,
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

export const User_Update_Location = (locationData: any) => {
	return (dispatch: any, getState: any) => {
		console.log('INFO GOT: ', locationData);

		const profile = getState().firebase.profile;
		// console.log('profile: ', profile);

		var newLoc = {
			location: {
				address: locationData.address,
				locationId: locationData.locationId,
				locationType: locationData.locationType,
				coords: locationData.coords
			}
		};

		// //server call
		fbDatabase.ref(`${TypesToFirebaseGlobals.User_Root}/${profile.id}`).update(newLoc, function (error) {
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
	};
};

export const AddNotifToRedux = (notifs: any[]) => {
	return (dispatch: any) => {
		dispatch({
			type: TypesOfActions.CURRENT_USER_NOTIFS,
			payload: notifs
		});
	};
};

import FIREBASE from '../../firebase/FirebaseConfig';
import { i_BaseInterface_User } from '../../../models/001UserModels';
import { TypesToFirebaseGlobals } from '../../firebase/TypesToServer';
import { TypesOfActions } from '../TypesOfActions';
import { i_Redux_ActionFunc_Interface_ImgUpload } from '../../../models/007ImageModels';

const fbDatabase = FIREBASE.database();
const fbStorage = FIREBASE.storage();

export const OwnerUpdateProfile_Update = (user: i_BaseInterface_User) => {
	return (dispatch: any, getState: any) => {
		const profile = getState().user;

		var UserUpdatedObj = {
			name: user.name.length > 0 ? user.name : profile.name
		};

		// console.log('UpdatedUser', UserUpdatedObj);
		fbDatabase
			.ref(`${TypesToFirebaseGlobals.User_Root}/${profile.id}`)
			.update(UserUpdatedObj)
			.catch((error) => {
				dispatch({
					type: TypesOfActions.CURRENT_USER_GLOBAL_ERRORS,
					payload: error
				});
			});
	};
};

export const Owner_ChangeLang = (user: i_BaseInterface_User) => {
	return (dispatch: any) => {
		// console.log('INFO GOT: ', user);

		//make async call to firebase server
		fbDatabase
			.ref(`${TypesToFirebaseGlobals.User_Root}/${user.id}`)
			.update({ lang: user.lang })
			.catch((error) => {
				dispatch({
					type: TypesOfActions.CURRENT_USER_GLOBAL_ERRORS,
					payload: error
				});
			});
	};
};

export const Owner_Profile_AddImg = (imgData: i_Redux_ActionFunc_Interface_ImgUpload) => {
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

					fbDatabase
						.ref(`${TypesToFirebaseGlobals.User_Root}/${profile.id}`)
						.update({
							avatar: downloadURL
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

export const Owner_UpdateWorkDays = (updateData: any) => {
	return (dispatch: any) => {
		console.log('updateData', updateData);

		fbDatabase
			.ref(`${TypesToFirebaseGlobals.User_Root}/${updateData.id}`)
			.child(TypesToFirebaseGlobals.WorkData)
			.child(TypesToFirebaseGlobals.WorkDays)
			.set(updateData.workArr)
			.catch((error) => {
				dispatch({
					type: TypesOfActions.CURRENT_USER_GLOBAL_ERRORS,
					payload: error
				});
			});
	};
};

export const Owner_UpdateWorkHoursDaily = (updateData: any) => {
	return (dispatch: any) => {
		console.log('updateData', updateData);

		fbDatabase
			.ref(`${TypesToFirebaseGlobals.User_Root}/${updateData.id}`)
			.child(TypesToFirebaseGlobals.WorkData)
			.child(TypesToFirebaseGlobals.WorkHours)
			.set(updateData.timesAvailable)
			.catch((error) => {
				dispatch({
					type: TypesOfActions.CURRENT_USER_GLOBAL_ERRORS,
					payload: error
				});
			});
	};
};

export const Owner_UpdateNonWorkHoursDaily = (updateData: any) => {
	return (dispatch: any) => {
		console.log('updateData', updateData);

		fbDatabase
			.ref(`${TypesToFirebaseGlobals.User_Root}/${updateData.id}`)
			.child(TypesToFirebaseGlobals.WorkData)
			.child(TypesToFirebaseGlobals.NonWorkHours)
			.set(updateData.timesNotAvailable)
			.catch((error) => {
				dispatch({
					type: TypesOfActions.CURRENT_USER_GLOBAL_ERRORS,
					payload: error
				});
			});
	};
};

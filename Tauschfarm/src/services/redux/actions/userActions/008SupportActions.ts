import FIREBASE from '../../../firebase/firebaseConfig';
import { Post_A_FAQ, Post_A_FAQ_Answer, Post_A_FAQ_IMG, Post_A_FAQ_VIDEO } from '../../../../models/010SupportModels';
import { TypesToFirebaseGlobals } from '../../../firebase/TypesToServer';
import { TypesOfActions } from '../../TypesOfActions';
import { CheckNameMakeNew } from '../../../ownServices/HelperFuncs';

const fbDatabase = FIREBASE.database();
const fbStorage = FIREBASE.storage();

export const AddFAQ = (FAQ_DATA: Post_A_FAQ) => {
	return (dispatch: any) => {
		// console.log('FAQ_DATA', FAQ_DATA);
		fbDatabase
			.ref(`${TypesToFirebaseGlobals.FAQ_Root}/${FAQ_DATA.id}`)
			.set(FAQ_DATA)
			.catch((error) => {
				dispatch({
					type: TypesOfActions.CURRENT_USER_GLOBAL_ERRORS,
					payload: error
				});
			});
	};
};

export const AddFAQ_IMG = (FAQ_DATA: Post_A_FAQ_IMG) => {
	return (dispatch: any, getState: any) => {
		for (let i = 0; i < FAQ_DATA.content.length; i++) {
			const element = FAQ_DATA.content[i];

			// console.log('element', element);

			var newMetadata = {
				cacheControl: 'public,max-age=31536000',
				contentType: 'image/webp'
			};
			var change = CheckNameMakeNew(element.name);

			const getResized = fbStorage.ref(`${TypesToFirebaseGlobals.FBStorage_FAQ}/${change}`);
			const uploadTask = fbStorage.ref(`${TypesToFirebaseGlobals.FBStorage_FAQ}/${element.name}`).put(element, newMetadata);

			uploadTask.on(
				'state_changed',
				(snapshot) => {
					// Observe state change events such as progress, pause, and resume
					// Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
					var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
					// console.log('Upload is ' + progress + '% done');
					dispatch({
						type: TypesOfActions.FILE_UPLOAD_PROGRESS_FAQ,
						payload: {
							progress: progress.toFixed(0),
							fileName: element.name
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
						getResized
							.getDownloadURL()
							.then((downloadURL) => {
								// console.log('File available at', downloadURL);

								var stateArr = getState().support.progress.imgArr !== undefined ? getState().support.progress.imgArr : [];
								var sendArray: any[] = [];
								sendArray = [...stateArr];
								sendArray.push(downloadURL);
								// console.log('sendArray', sendArray);
								return sendArray;
							})
							.then((sendArray) => {
								var saver: Post_A_FAQ_IMG = {
									id: FAQ_DATA.id,
									ts: FAQ_DATA.ts,
									userWhoFAQ: FAQ_DATA.userWhoFAQ,
									content: sendArray,
									type: FAQ_DATA.type,
									answers: {}
								};

								// console.log('FAQ_DATA', saver);
								fbDatabase
									.ref(`${TypesToFirebaseGlobals.FAQ_Root}/${FAQ_DATA.id}`)
									.update(saver)
									.then(() => {
										dispatch({
											type: TypesOfActions.FAQ_IMG_ARR,
											payload: sendArray
										});
									})
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
					}, 5000);
				}
			);
		}
	};
};

export const AddFAQ_VIDEO = (FAQ_DATA: Post_A_FAQ_VIDEO) => {
	return (dispatch: any, getState: any) => {
		for (let i = 0; i < FAQ_DATA.content.length; i++) {
			const element = FAQ_DATA.content[i];

			// console.log('element', element);

			var newMetadata = {
				cacheControl: 'public,max-age=31536000',
				contentType: 'video/mp4'
			};

			const getResized = fbStorage.ref(`${TypesToFirebaseGlobals.FBStorage_FAQ}/${element.name}`);
			const uploadTask = fbStorage.ref(`${TypesToFirebaseGlobals.FBStorage_FAQ}/${element.name}`).put(element, newMetadata);

			uploadTask.on(
				'state_changed',
				(snapshot) => {
					// Observe state change events such as progress, pause, and resume
					// Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
					var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
					// console.log('Upload is ' + progress + '% done');
					dispatch({
						type: TypesOfActions.FILE_UPLOAD_PROGRESS_FAQ,
						payload: {
							progress: progress.toFixed(0),
							fileName: element.name
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
						getResized
							.getDownloadURL()
							.then((downloadURL) => {
								// console.log('File available at', downloadURL);

								var stateArr = getState().support.progress.imgArr !== undefined ? getState().support.progress.imgArr : [];
								var sendArray: any[] = [];
								sendArray = [...stateArr];
								sendArray.push(downloadURL);
								// console.log('sendArray', sendArray);
								return sendArray;
							})
							.then((sendArray) => {
								var saver: Post_A_FAQ_IMG = {
									id: FAQ_DATA.id,
									ts: FAQ_DATA.ts,
									userWhoFAQ: FAQ_DATA.userWhoFAQ,
									content: sendArray,
									type: FAQ_DATA.type,
									answers: {}
								};

								// console.log('FAQ_DATA', saver);
								fbDatabase
									.ref(`${TypesToFirebaseGlobals.FAQ_Root}/${FAQ_DATA.id}`)
									.update(saver)
									.then(() => {
										dispatch({
											type: TypesOfActions.FAQ_IMG_ARR,
											payload: sendArray
										});
									})
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
					}, 1000);
				}
			);
		}
	};
};

export const AddFAQ_Answer = (FAQ_DATA_ANSWER: Post_A_FAQ_Answer) => {
	return (dispatch: any) => {
		// console.log('FAQ_DATA', FAQ_DATA_ANSWER);
		fbDatabase
			.ref(`${TypesToFirebaseGlobals.FAQ_Root}/${FAQ_DATA_ANSWER.Post_Id_I_BelongTo}/answers`)
			.update({ [FAQ_DATA_ANSWER.id]: FAQ_DATA_ANSWER })
			.catch((error) => {
				dispatch({
					type: TypesOfActions.AUTH_ERROR_SIGNIN,
					payload: error
				});
			});
	};
};

export const RemoveFAQ = (id: string) => {
	return (dispatch: any) => {
		// console.log('FAQ_DATA', FAQ_DATA);
		fbDatabase
			.ref(`${TypesToFirebaseGlobals.FAQ_Root}/${id}`)
			.remove()
			.catch((error) => {
				dispatch({
					type: TypesOfActions.CURRENT_USER_GLOBAL_ERRORS,
					payload: error
				});
			});
	};
};

export const RemoveFAQ_Ans = (delData: { idOfPost: string; idOfAns: string }) => {
	return (dispatch: any) => {
		// console.log('FAQ_DATA', FAQ_DATA);
		fbDatabase
			.ref(`${TypesToFirebaseGlobals.FAQ_Root}/${delData.idOfPost}/answers/${delData.idOfAns}`)
			.remove()
			.catch((error) => {
				dispatch({
					type: TypesOfActions.CURRENT_USER_GLOBAL_ERRORS,
					payload: error
				});
			});
	};
};

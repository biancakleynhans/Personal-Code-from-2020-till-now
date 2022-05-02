import { TypesOfActions } from '../../TypesOfActions';
import FIREBASE from '../../../firebase/firebaseConfig';
import { TypesToFirebaseGlobals } from '../../../firebase/TypesToServer';
import { iSendMsgModel } from '../../../../models/008ChatModels';
import { CheckNameMakeNew } from '../../../ownServices/HelperFuncs';
import { iDeleteChatMsg } from '../../../../pages/chatSide/ChatBox';

const fbDatabase = FIREBASE.database();
const fbStorage = FIREBASE.storage();

export const User_SendMessageFromChatApp = (msgContent: iSendMsgModel) => {
	return (dispatch: any, getState: any) => {
		console.log('INFO GOT: ', msgContent);
		// ITEM MESSAGE
		if (msgContent.itemPost) {
			console.log('this is an item post');
			//current user
			fbDatabase.ref(`${TypesToFirebaseGlobals.User_Root}/${msgContent.idFrom}/newMsgs`).set(0);
			fbDatabase
				.ref(`${TypesToFirebaseGlobals.User_Root}/${msgContent.idFrom}/${TypesToFirebaseGlobals.Messages_Container}/${msgContent.idTo}`)
				.push(msgContent)
				.catch((error) => {
					// console.log('error', error);
					dispatch({
						type: TypesOfActions.CURRENT_USER_GLOBAL_ERRORS,
						payload: error
					});
				});
			//peer user
			fbDatabase
				.ref(`${TypesToFirebaseGlobals.User_Root}/${msgContent.idTo}/${TypesToFirebaseGlobals.Messages_Container}/${msgContent.idFrom}`)
				.push(msgContent)
				.then(() => {
					window.location.replace('/chats');
				})
				.catch((error) => {
					// console.log('error', error);
					dispatch({
						type: TypesOfActions.CURRENT_USER_GLOBAL_ERRORS,
						payload: error
					});
				});
		}
		// IMAGE MESSAGE
		else if (msgContent.content.images !== undefined && msgContent.content.images.length > 0) {
			console.log('this is chat post with images');
			// for (let i = 0; i < msgContent.content.images.length; i++) {
			const element = msgContent.content.images[0]; //msgContent.content.images[i];

			var change = CheckNameMakeNew(element.name);

			var newMetadata = {
				cacheControl: 'public,max-age=31536000',
				contentType: 'image/webp'
			};
			// console.log('images url', element, change);

			const getResized = fbStorage.ref(`${msgContent.idFrom}/${TypesToFirebaseGlobals.FBStorage_Chats}/images/${change}`);
			const uploadTask = fbStorage.ref(`${msgContent.idFrom}/${TypesToFirebaseGlobals.FBStorage_Chats}/images/${element.name}`).put(element, newMetadata);
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
							name: element.name,
							images: [],
							videos: []
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
					// 		// Handle successful uploads on complete
					// 		// For instance, get the download URL: https://firebasestorage.googleapis.com/...
					setTimeout(() => {
						getResized
							.getDownloadURL()
							.then((downloadURL) => {
								// console.log('File available at', downloadURL);
								// make full array from from profile arra plus this one
								// var arr = [getState().user.progress.fileName];
								// arr.push(downloadURL);

								var addMsg2 = {
									ts: msgContent.ts,
									idFrom: msgContent.idFrom,
									idTo: msgContent.idTo,
									content: {
										msgString: msgContent.content.msgString,
										image: downloadURL
									},
									noticationSetttings: msgContent.noticationSetttings,
									id: msgContent.id,
									itemPost: false
								};

								// console.log('addMsg2', addMsg2);
								//current user
								fbDatabase.ref(`${TypesToFirebaseGlobals.User_Root}/${msgContent.idFrom}/newMsgs`).set(0);
								fbDatabase
									.ref(`${TypesToFirebaseGlobals.User_Root}/${msgContent.idFrom}/${TypesToFirebaseGlobals.Messages_Container}/${msgContent.idTo}`)
									.push(addMsg2)
									.then(() => {
										fbDatabase.ref(`${TypesToFirebaseGlobals.User_Root}/${msgContent.idFrom}/newMsgs`).update(0);
									})
									.catch((error) => {
										// console.log('error', error);
										dispatch({
											type: TypesOfActions.CURRENT_USER_GLOBAL_ERRORS,
											payload: error
										});
									});
								//peer user
								fbDatabase
									.ref(`${TypesToFirebaseGlobals.User_Root}/${msgContent.idTo}/${TypesToFirebaseGlobals.Messages_Container}/${msgContent.idFrom}`)
									.push(addMsg2)
									.catch((error) => {
										// console.log('error', error);
										dispatch({
											type: TypesOfActions.CURRENT_USER_GLOBAL_ERRORS,
											payload: error
										});
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
		}
		// PLAIN TEXT MESSAGE
		else {
			console.log('this is chat post no images ');
			var addMsg3 = {
				ts: msgContent.ts,
				idFrom: msgContent.idFrom,
				idTo: msgContent.idTo,
				content: {
					msgString: msgContent.content.msgString
				},
				noticationSetttings: msgContent.noticationSetttings,
				id: msgContent.id,
				itemPost: false
			};
			//current user
			fbDatabase.ref(`${TypesToFirebaseGlobals.User_Root}/${msgContent.idFrom}/newMsgs`).set(0);
			fbDatabase
				.ref(`${TypesToFirebaseGlobals.User_Root}/${msgContent.idFrom}/${TypesToFirebaseGlobals.Messages_Container}/${msgContent.idTo}`)
				.push(addMsg3)
				.catch((error) => {
					// console.log('error', error);
					dispatch({
						type: TypesOfActions.CURRENT_USER_GLOBAL_ERRORS,
						payload: error
					});
				});
			//peer user
			fbDatabase
				.ref(`${TypesToFirebaseGlobals.User_Root}/${msgContent.idTo}/${TypesToFirebaseGlobals.Messages_Container}/${msgContent.idFrom}`)
				.push(addMsg3)
				.catch((error) => {
					// console.log('error', error);
					dispatch({
						type: TypesOfActions.CURRENT_USER_GLOBAL_ERRORS,
						payload: error
					});
				});
		}
	};
};

export const User_DeleteMessageFromChatApp = (msgDel: iDeleteChatMsg) => {
	return (dispatch: any, getState: any) => {
		console.log('INFO GOT: ', msgDel);

		fbDatabase
			.ref(`${TypesToFirebaseGlobals.User_Root}/${msgDel.path1.userId}/${TypesToFirebaseGlobals.Messages_Container}/${msgDel.path1.chatwith}/${msgDel.path1.chat}`)
			.remove()
			.catch((error) => {
				dispatch({
					type: TypesOfActions.CURRENT_USER_GLOBAL_ERRORS,
					payload: error
				});
			});

		fbDatabase
			.ref(`${TypesToFirebaseGlobals.User_Root}/${msgDel.path2.userId}/${TypesToFirebaseGlobals.Messages_Container}/${msgDel.path2.chatwith}/${msgDel.path2.chat}`)
			.remove()
			.catch((error) => {
				dispatch({
					type: TypesOfActions.CURRENT_USER_GLOBAL_ERRORS,
					payload: error
				});
			});
	};
};

export const User_DeleteChatFromChatApp = (msgDel: iDeleteChatMsg) => {
	return (dispatch: any, getState: any) => {
		console.log('INFO GOT: ', msgDel);

		fbDatabase
			.ref(`${TypesToFirebaseGlobals.User_Root}/${msgDel.path1.userId}/${TypesToFirebaseGlobals.Messages_Container}/${msgDel.path1.chatwith}`)
			.remove()
			.catch((error) => {
				dispatch({
					type: TypesOfActions.CURRENT_USER_GLOBAL_ERRORS,
					payload: error
				});
			});

		fbDatabase
			.ref(`${TypesToFirebaseGlobals.User_Root}/${msgDel.path2.userId}/${TypesToFirebaseGlobals.Messages_Container}/${msgDel.path2.chatwith}`)
			.remove()
			.catch((error) => {
				dispatch({
					type: TypesOfActions.CURRENT_USER_GLOBAL_ERRORS,
					payload: error
				});
			});
	};
};

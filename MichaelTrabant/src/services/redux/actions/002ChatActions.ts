import FIREBASE from '../../firebase/FirebaseConfig';
import { TypesToFirebaseGlobals } from '../../firebase/TypesToServer';
import { TypesOfActions } from '../TypesOfActions';
import { iSendMsgModel } from '../../../models/008ChatModels';

const fbDatabase = FIREBASE.database();
const fbStorage = FIREBASE.storage();

export const SendMsgToOwner = (msg: iSendMsgModel) => {
	return (dispatch: any, getState: any) => {
		console.log('recieved ?', msg);

		if (msg.content.image !== undefined && msg.content.image.length > 0) {
			const imgName = msg.content.image[0].name.replace(/\s+/g, '');
			const uploadTask = fbStorage.ref(`${TypesToFirebaseGlobals.FBStorage_Chats}/${imgName}`).put(msg.content.image[0]);
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
							name: msg.content.image[0].name,
							images: [],
							videos: [],
						},
					});
				},
				(error) => {
					// Handle unsuccessful uploads
					dispatch({
						type: TypesOfActions.CURRENT_USER_GLOBAL_ERRORS,
						payload: error,
					});
				},
				() => {
					// Handle successful uploads on complete
					// For instance, get the download URL: https://firebasestorage.googleapis.com/...
					uploadTask.snapshot.ref
						.getDownloadURL()
						.then((downloadURL) => {
							// console.log('File available at', downloadURL);

							var addMsg = {
								ts: msg.ts,
								idFrom: msg.idFrom,
								idTo: msg.idTo,
								content: {
									msgString: msg.content.msgString,
									image: [downloadURL],
								},
								id: msg.id,
							};

							console.log('addMsg', addMsg);

							//current user
							fbDatabase
								.ref(`${TypesToFirebaseGlobals.User_Root}/${msg.idFrom}/${TypesToFirebaseGlobals.MsgInUser}/${msg.idTo}`)
								.push(addMsg)
								.catch((error) => {
									// console.log('error', error);
									dispatch({
										type: TypesOfActions.CURRENT_USER_GLOBAL_ERRORS,
										payload: error,
									});
								});
							//peer user
							fbDatabase
								.ref(`${TypesToFirebaseGlobals.User_Root}/${msg.idTo}/${TypesToFirebaseGlobals.MsgInUser}/${msg.idFrom}`)
								.push(addMsg)
								.catch((error) => {
									// console.log('error', error);
									dispatch({
										type: TypesOfActions.CURRENT_USER_GLOBAL_ERRORS,
										payload: error,
									});
								});
						})
						.catch((error) => {
							// console.log('error', error);
							dispatch({
								type: TypesOfActions.CURRENT_USER_GLOBAL_ERRORS,
								payload: error,
							});
						});
				},
			);
		} else {
			//current user
			fbDatabase
				.ref(`${TypesToFirebaseGlobals.User_Root}/${msg.idFrom}/${TypesToFirebaseGlobals.MsgInUser}/${msg.idTo}`)
				.push(msg)
				.catch((error) => {
					// console.log('error', error);
					dispatch({
						type: TypesOfActions.CURRENT_USER_GLOBAL_ERRORS,
						payload: error,
					});
				});
			//peer user
			fbDatabase
				.ref(`${TypesToFirebaseGlobals.User_Root}/${msg.idTo}/${TypesToFirebaseGlobals.MsgInUser}/${msg.idFrom}`)
				.push(msg)
				.catch((error) => {
					// console.log('error', error);
					dispatch({
						type: TypesOfActions.CURRENT_USER_GLOBAL_ERRORS,
						payload: error,
					});
				});
		}
	};
};

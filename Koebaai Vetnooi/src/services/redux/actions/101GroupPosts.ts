/** @format */

import FIREBASE from '../../firebase/FirebaseConfig';
import { TypesToFirebaseGlobals } from '../../firebase/TypesToServer';
import { TypesOfActions } from '../TypesOfActions';
import { NamedDict } from '../../helpers/Tools';

const fbDatabase = FIREBASE.database();
const fbStorage = FIREBASE.storage();

export const Group_Add_Post = (reqData: any) => {
	return (dispatch: any, getState: any) => {
		var arr: any[] = [];
		if (reqData.typeOfPost === 'images') {
			if (reqData.imagesUrlArray.length > 0) {
				for (let index = 0; index < reqData.imagesUrlArray.length; index++) {
					const uploadTask = fbStorage
						.ref(`${TypesToFirebaseGlobals.FBStorage_PostData}/images`)
						.child(`${reqData.imagesUrlArray[index].name}`)
						.put(reqData.imagesUrlArray[index]);
					uploadTask.on(
						'state_changed',
						(snapshot) => {
							// Observe state change events such as progress, pause, and resume
							// Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
							var progress =
								(snapshot.bytesTransferred / snapshot.totalBytes) * 100;
							// console.log('Upload is ' + progress + '% done');
							dispatch({
								type: TypesOfActions.FILE_UPLOAD_PROGRESS,
								payload: {
									progress: progress,
									name: reqData.imagesUrlArray[index].name,
									images: []
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
								arr.push(downloadURL);
								//fbCall comes here

								var SaveMe1 = {
									typeOfPost: reqData.typeOfPost,
									userWhoPosted: reqData.userWhoPosted,
									inputTextValue:
										reqData.inputTextValue.length > 0
											? reqData.inputTextValue
											: '',
									videoUrl: '',
									imagesUrlArray: arr,
									postId: reqData.postId,
									ts: new Date().getTime()
								};

								fbDatabase
									.ref(
										`${TypesToFirebaseGlobals.PostsOnGroups_Root}/${reqData.postId}`
									)
									.set(SaveMe1)
									.then(() => {
										// console.log('saved Yays');
										dispatch({
											type: TypesOfActions.CURRENT_GROUP_POSTS_ADD,
											payload: SaveMe1
										});
									})
									.catch((error: any) => {
										// console.log('error', error);
										dispatch({
											type: TypesOfActions.CURRENT_USER_GLOBAL_ERRORS,
											payload: error
										});
									});
							});
						}
					);
				}
			} else {
				// console.log('type is images but not images data found');
			}
		} else {
			var SaveMe3 = {
				typeOfPost: reqData.typeOfPost,
				userWhoPosted: reqData.userWhoPosted,
				inputTextValue:
					reqData.inputTextValue.length > 0 ? reqData.inputTextValue : '',
				videoUrl: '',
				imagesUrlArray: [],
				postId: reqData.postId,
				ts: new Date().getTime()
			};

			fbDatabase
				.ref(`${TypesToFirebaseGlobals.PostsOnGroups_Root}/${reqData.postId}`)
				.set(SaveMe3)
				.then(() => {
					// console.log('saved Yays');
					dispatch({
						type: TypesOfActions.CURRENT_GROUP_POSTS_ADD,
						payload: SaveMe3
					});
				})
				.catch((error: any) => {
					// console.log('error', error);
					dispatch({
						type: TypesOfActions.CURRENT_USER_GLOBAL_ERRORS,
						payload: error
					});
				});
		}
	};
};

export const Group_Add_Like = (countsData: any) => {
	return (dispatch: any, getState: any) => {
		console.log('reqData', countsData);

		fbDatabase
			.ref(
				`${TypesToFirebaseGlobals.PostsOnGroups_Root}/${countsData.postId}/counts`
			)
			.update(countsData.change)
			.then(() => {
				// console.log('saved ');
				dispatch({
					type: TypesOfActions.CURRENT_GROUP_POSTS_ADD_LIKE,
					payload: countsData
				});
			})
			.catch((error: any) => {
				// console.log('error', error);
				dispatch({
					type: TypesOfActions.CURRENT_USER_GLOBAL_ERRORS,
					payload: error
				});
			});
	};
};

export const Group_Add_Comment = (commentData: any) => {
	return (dispatch: any, getState: any) => {
		console.log('commentData ', commentData);
		var add = {
			whoCommented: commentData.whoCommented,
			contentComment: commentData.contentComment,
			ts: commentData.ts
		};

		fbDatabase
			.ref(
				`${TypesToFirebaseGlobals.PostsOnGroups_Root}/${commentData.postId}/commentsOnPost/${commentData.commentId}`
			)
			.set(add)
			.then(() => {
				// console.log('comment added');
				dispatch({
					type: TypesOfActions.CURRENT_GROUP_POSTS_ADD_COMMENT,
					payload: commentData
				});
			})
			.catch((error) => {});
	};
};

export const Group_Delete_Post = (data: {
	postId: string;
	groupId: string;
	changedPosts: NamedDict<any>;
}) => {
	return (dispatch: any, getState: any) => {
		// console.log('data', data);

		fbDatabase
			.ref(`${TypesToFirebaseGlobals.PostsOnGroups_Root}/${data.postId}`)
			.remove()
			.then(() => {
				// console.log('saved Yays');
				dispatch({
					type: TypesOfActions.CURRENT_GROUP_POSTS_DELETE,
					payload: data
				});
			})
			.catch((error: any) => {
				// console.log('error', error);
				dispatch({
					type: TypesOfActions.CURRENT_USER_GLOBAL_ERRORS,
					payload: error
				});
			});
	};
};

// typeOfPost: this.state.typeOfPost,
// userWhoPosted: this.state.userWhoPosted,
// inputTextValue: this.state.inputTextValue,
// imagesUrlArray: this.state.imgArray,

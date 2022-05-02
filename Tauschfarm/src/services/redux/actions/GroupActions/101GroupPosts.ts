import { TypesOfActions } from '../../TypesOfActions';
import FIREBASE from '../../../firebase/firebaseConfig';
import { TypesToFirebaseGlobals } from '../../../firebase/TypesToServer';
import { i_BaseInterface_Post, AddComment } from '../../../../models/009PostToGroupModels';
import { NamedDict } from '../../../helpers/Tools';
import { CheckNameMakeNew } from '../../../ownServices/HelperFuncs';

const fbDatabase = FIREBASE.database();
const fbStorage = FIREBASE.storage();

interface disp {
	videoUrl: string[];
	imgs: string[];
}

export const Group_Add_Post = (reqData: i_BaseInterface_Post) => {
	return (dispatch: any) => {
		// console.log('reqData', reqData);
		//base to save
		var SaveMe: i_BaseInterface_Post = {
			typeOfPost: reqData.typeOfPost,
			currentGroupId: reqData.currentGroupId,
			userWhoPosted: reqData.userWhoPosted,
			inputTextValue: reqData.inputTextValue.length > 0 ? reqData.inputTextValue : '',
			videoUrl: [],
			imagesUrlArray: [],
			postId: reqData.postId,
			ts: new Date().getTime(),
			commentsOnPost: {},
			counts: {
				liked: 0,
				whoLiked: {},
				love: 0,
				whoLoved: {},
				disappointed: 0,
				whoDisappointed: {},
				funny: 0,
				whoFunny: {}
			}
		};
		const newMetadata = {
			cacheControl: 'public,max-age=31536000',
			contentType: 'image/webp'
		};
		var dispatchObj: disp = {
			videoUrl: [],
			imgs: []
		};

		for (let i = 0; i < reqData.imagesUrlArray.length; i++) {
			const element = reqData.imagesUrlArray[i];
			// console.log('images ', element);
			var change = CheckNameMakeNew(element.name);
			// console.log('change', change);
			const getResized = fbStorage.ref(`${reqData.currentGroupId}/${TypesToFirebaseGlobals.FBStorage_PostData}/images/${change}`);
			const uploadTask = fbStorage.ref(`${reqData.currentGroupId}/${TypesToFirebaseGlobals.FBStorage_PostData}/images/${element.name}`).put(element, newMetadata);
			uploadTask.on(
				'state_changed',
				(snapshot) => {
					// Observe state change events such as progress, pause, and resume
					// Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
					var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
					// console.log('Upload is ' + progress + '% done');
					dispatch({
						type: TypesOfActions.FILE_UPLOAD_PROGRESS_POSTS,
						payload: {
							progress: progress.toFixed(0),
							name: element.name,
							images: [],
							videos: []
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
							dispatchObj.imgs.push(downloadURL);
							SaveMe.imagesUrlArray = dispatchObj.imgs;
							fbDatabase
								.ref(`${TypesToFirebaseGlobals.PostsOnGroups_Root}/${reqData.postId}/imagesUrlArray`)
								.update(dispatchObj.imgs)
								.catch((error: any) => {
									// console.log('error', error);
									dispatch({
										type: TypesOfActions.CURRENT_USER_GLOBAL_ERRORS,
										payload: error
									});
								});
						});
					}, 5000);
				}
			);
		}

		fbDatabase
			.ref(`${TypesToFirebaseGlobals.Groups_Root}/${reqData.currentGroupId}/${TypesToFirebaseGlobals.PostsOnGroups_Container}/${reqData.postId}`)
			.set({ id: reqData.postId })
			.catch((error: any) => {
				dispatch({
					type: TypesOfActions.CURRENT_USER_GLOBAL_ERRORS,
					payload: error
				});
			});

		fbDatabase
			.ref(`${TypesToFirebaseGlobals.PostsOnGroups_Root}/${reqData.postId}`)
			.set(SaveMe)
			.catch((error: any) => {
				// console.log('error', error);
				dispatch({
					type: TypesOfActions.CURRENT_USER_GLOBAL_ERRORS,
					payload: error
				});
			});
	};
};

export const Group_Add_Like = (countsData: any) => {
	return (dispatch: any) => {
		// console.log('reqData', countsData);
		// console.log(`${TypesToFirebaseGlobals.PostsOnGroups_Root}/${countsData.postId}`);
		fbDatabase
			.ref(`${TypesToFirebaseGlobals.PostsOnGroups_Root}/${countsData.postId}/counts`)
			.update(countsData.change)
			.catch((error: any) => {
				// console.log('error', error);
				dispatch({
					type: TypesOfActions.CURRENT_USER_GLOBAL_ERRORS,
					payload: error
				});
			});
	};
};

export const Group_Add_Comment = (commentData: AddComment) => {
	return (dispatch: any, getState: any) => {
		// console.log('commentData ', commentData);
		var add = {
			whoCommented: commentData.whoCommented,
			contentComment: commentData.contentComment,
			ts: commentData.ts
		};
		// console.log(`${TypesToFirebaseGlobals.PostsOnGroups_Root}/${commentData.postId}/commentsOnPost/${commentData.commentId}`);
		fbDatabase
			.ref(`${TypesToFirebaseGlobals.PostsOnGroups_Root}/${commentData.postId}/commentsOnPost/${commentData.commentId}`)
			.update(add)
			.catch((error) => {
				dispatch({
					type: TypesOfActions.CURRENT_USER_GLOBAL_ERRORS,
					payload: error
				});
			});
	};
};

export const Group_Delete_Post = (data: { postId: string; groupId: string; changedPosts: NamedDict<i_BaseInterface_Post> }) => {
	return (dispatch: any) => {
		// console.log('data', data);
		fbDatabase
			.ref(`${TypesToFirebaseGlobals.Groups_Root}/${data.groupId}/${TypesToFirebaseGlobals.PostsOnGroups_Container}/${data.postId}`)
			.remove()
			.catch((error: any) => {
				dispatch({
					type: TypesOfActions.CURRENT_USER_GLOBAL_ERRORS,
					payload: error
				});
			});
		fbDatabase
			.ref(`${TypesToFirebaseGlobals.PostsOnGroups_Root}/${data.postId}`)
			.remove()
			.catch((error: any) => {
				// console.log('error', error);
				dispatch({
					type: TypesOfActions.CURRENT_USER_GLOBAL_ERRORS,
					payload: error
				});
			});
	};
};

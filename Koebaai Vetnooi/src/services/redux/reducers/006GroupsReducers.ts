/** @format */

import { iAction } from '../../../models/BaseInterfaceModels';
import { TypesOfActions } from '../TypesOfActions';

interface iGroup {
	GroupPosts: {};
	errorMsg: string;
	isEmpty: boolean;
	count: number;
}

const InitState: iGroup = {
	errorMsg: '',
	isEmpty: true,
	GroupPosts: {},
	count: 0
};

const GroupsReducer = (state: any = InitState, action: iAction) => {
	switch (action.type) {
		case TypesOfActions.APP_DATA_LOADED:
			return {
				...state,
				GroupPosts: action.payload.global.chats
			};
		case TypesOfActions.CURRENT_USER_GLOBAL_ERRORS:
			return { ...state, errorMsg: action.payload.message };
		case TypesOfActions.FILE_UPLOAD_PROGRESS:
			return {
				...state
			};
		case TypesOfActions.CURRENT_GROUP_POSTS_ADD:
			console.log('???', action.payload);
			return {
				...state,
				GroupPosts: {
					...state.GroupPosts,
					[action.payload.postId]: action.payload
				}
			};
		case TypesOfActions.CURRENT_GROUP_POSTS_ADD_LIKE:
			console.log('?????', action.payload);
			return {
				...state,
				GroupPosts: {
					...state.GroupPosts,
					[action.payload.postId]: {
						...state.GroupPosts[action.payload.postId],
						counts: action.payload.change
					}
				}
			};
		case TypesOfActions.CURRENT_GROUP_POSTS_ADD_COMMENT:
			return {
				...state,
				GroupPosts: {
					...state.GroupPosts,

					[action.payload.postId]: {
						...state.GroupPosts[action.payload.postId],
						commentsOnPost: {
							...state.GroupPosts[action.payload.postId].commentsOnPost,
							[action.payload.commentId]: {
								whoCommented: action.payload.whoCommented,
								contentComment: action.payload.contentComment,
								ts: action.payload.ts
							}
						}
					}
				}
			};

		case TypesOfActions.CURRENT_GROUP_POSTS_DELETE:
			return {
				...state,
				GroupPosts: action.payload.changedPosts
			};

		default:
			return state;
	}
};

export default GroupsReducer;

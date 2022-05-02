import { iAction } from '../../../models/BaseInterfaceModels';
import { NamedDict } from '../../helpers/Tools';
import { TypesOfActions } from '../TypesOfActions';
import { i_BaseInterface_Group } from '../../../models/004GroupModels';
import { i_BaseInterface_MetaData } from '../../../models/009PostToGroupModels';

export interface iGroup {
	creatingGroup: i_BaseInterface_Group;
	UserGroups: NamedDict<i_BaseInterface_Group>;
	GlobalGroups: NamedDict<i_BaseInterface_Group>;
	pendingImgUrl: string[];
	errorMsg: string;
	isEmpty: boolean;
	progress: {
		progress: number;
		fileName: string;
	};
	// userGroupsTimeLines: NamedDict<iAudit[]>;
	// GroupPosts: NamedDict<i_BaseInterface_Post>;
	//new
	// dateEdited: string;
	//media
	mediaForPosts: i_BaseInterface_MetaData;
	loader: 'start' | 'stop' | 'notSet';
	// count: number;
}

const InitState: iGroup = {
	loader: 'notSet',
	creatingGroup: {
		id: 'Empty',
		name: '',
		imgArray: [],
		avatar: '',
		memberCount: 0,
		membersList: {},
		categories: {},
		description: '',
		location: {
			lat: '',
			long: '',
			locString: ''
		},
		lang: '',
		joinReqs: {},
		posts: {},
		membersRequests: {}
	},

	UserGroups: {},
	GlobalGroups: {},

	pendingImgUrl: [],
	errorMsg: '',
	isEmpty: true,
	progress: {
		progress: 0,
		fileName: ''
	},
	mediaForPosts: {
		fileUploadProgress: 0,
		fileUploadingName: '',
		imgArray: [],
		videoArray: []
	}
};

const GroupsReducer = (state: iGroup = InitState, action: iAction) => {
	switch (action.type) {
		case TypesOfActions.APP_DATA_LOADED_USERS:
			return {
				...state,
				UserGroups: action.payload.userG,
				GlobalGroups: action.payload.globalGroups,
				isEmpty: false,
				userGroupsTimeLines: {} //action.payload.global.userGroupTimeLine
			};
		case TypesOfActions.CURRENT_USER_GLOBAL_ERRORS:
			return { ...state, errorMsg: action.payload.message };
		case TypesOfActions.CURRENT_USER_GROUP_IMG_ADD:
			return {
				...state,
				pendingImgUrl: action.payload
			};
		case TypesOfActions.FILE_UPLOAD_PROGRESS:
			return {
				...state,
				progress: {
					progress: action.payload.progress,
					fileName: action.payload.fileName
				}
			};

		case TypesOfActions.FILE_UPLOAD_PROGRESS_POSTS:
			return {
				...state,
				progress: action.payload,
				mediaForPosts: {
					fileUploadProgress: action.payload.progress,
					fileUploadingName: action.payload.fileName,
					imgArray: [...state.mediaForPosts.imgArray, ...action.payload.images],
					videoArray: [...state.mediaForPosts.videoArray, ...action.payload.videos]
				}
			};
		case TypesOfActions.CURRENT_USER_GROUP_SET:
			console.log('group set', action.payload);
			return {
				...state,
				creatingGroup: action.payload
			};
		case TypesOfActions.SHOW_LOADER:
			return {
				...state,
				loader: action.payload
			};

		default:
			return state;
	}
};

export default GroupsReducer;

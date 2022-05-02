/** @format */

import { TypesOfActions } from '../TypesOfActions';
import { i_Redux_ActionFunc_Interface_User } from '../../../models/001UserModels';
import { iAction } from '../../../models/BaseInterfaceModels';

const InitState: i_Redux_ActionFunc_Interface_User = {
	id: 'NotSet',
	email: '',
	name: '',
	avatar: '',
	imgArray: [],
	notifyToken: '',
	notifications: [],
	bio: '',
	weights: {},
	location: {
		address: {
			district: '',
			houseNumber: '',
			street: '',
			city: '',
			state: '',
			postalCode: '',
			country: '',
			county: '',
			label: ''
		},

		locationId: '',
		locationType: '',

		coords: {
			lat: 0,
			long: 0
		}
	},
	lang: '',
	role: 'user',
	errorMsg: '',
	isEmpty: true,
	progress: {
		progress: 0,
		fileName: '',
		imgArr: []
	}
};

const UserReducer = (state: i_Redux_ActionFunc_Interface_User = InitState, action: iAction) => {
	switch (action.type) {
		case TypesOfActions.APP_DATA_LOADED:
			return {
				...state,
				id: action.payload.user.id,
				email: action.payload.user.email,
				role: action.payload.user.role,
				name: action.payload.user.name,
				avatar: action.payload.user.imgArray[0],
				imgArray: action.payload.user.imgArray,
				bio: action.payload.user.bio,
				location: action.payload.user.location,
				lang: action.payload.user.lang,
				userRequirements: action.payload.user.userRequirements,
				errorMsg: '',
				isEmpty: action.payload.loading
			};

		case TypesOfActions.CURRENT_USER_CHANGE_LOCATION:
			// console.log('reducer', action.payload);
			return {
				...state,
				location: action.payload
			};
		case TypesOfActions.FILE_UPLOAD_PROGRESS:
			return {
				...state,
				progress: action.payload
			};

		case TypesOfActions.CURRENT_USER_CHANGE_LANG:
			return {
				...state,
				lang: action.payload
			};
		case TypesOfActions.CURRENT_USER_PROFILE_EDIT:
			return {
				...state,
				name: action.payload.name,
				categories: action.payload.categories,
				avatar: action.payload.avatar,
				bio: action.payload.bio,
				imgArray: action.payload.imgArray,
				errorMsg: ''
			};
		case TypesOfActions.CURRENT_USER_PROFILE_IMG_ADD:
			return {
				...state,
				avatar: action.payload[0],
				imgArray: action.payload,
				errorMsg: ''
			};
		case TypesOfActions.CURRENT_USER_PROFILE_IMG_EDIT:
			return {
				...state,
				avatar: action.payload[0],
				imgArray: action.payload,
				errorMsg: ''
			};
		case TypesOfActions.CURRENT_USER_PROFILE_IMG_DELETE:
			return {
				...state,
				avatar: action.payload[0],
				imgArray: action.payload,
				errorMsg: ''
			};
		case TypesOfActions.CURRENT_USER_ADDED_DIET_REQ_AND_PROG:
			return {
				...state,
				userRequirements: action.payload.userData
			};
		case TypesOfActions.CURRENT_USER_PROFILE_EDIT_ADD_NOTIFY_TOKEN:
			return {
				...state,
				notifyToken: action.payload
			};
		case TypesOfActions.CURRENT_USER_NOTIFS:
			return {
				...state,
				notifications: [...action.payload, ...state.notifications]
			};

		default:
			return state;
	}
};

export default UserReducer;

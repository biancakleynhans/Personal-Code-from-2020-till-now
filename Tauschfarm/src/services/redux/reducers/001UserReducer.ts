import { TypesOfActions } from '../TypesOfActions';
import { i_Redux_ActionFunc_Interface_User } from '../../../models/001UserModels';
import { iAction } from '../../../models/BaseInterfaceModels';

const InitState: i_Redux_ActionFunc_Interface_User = {
	id: 'NotSet',
	loader: 'notSet',
	name: '',
	avatar: '',
	imgArray: [],
	bio: '',
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
	groups: {},
	categories: {},
	events: {},
	donations: {},
	errorMsg: '',
	isEmpty: true,
	msgHistory: {},
	newMsgs: 0,
	progress: {
		progress: 0,
		fileName: '',
		imgArr: []
	},
	subscriptionType: {
		type: 'free',
		startDate: new Date().getTime(),
		payedWith: 'free'
	},
	// count: 0,
	UsersIfollow: {},
	UsersFollowingMe: {},
	notifyToken: '',
	notifications: [],
	typesOfsubjectsTonotifyOn: {
		NewItemsinGroups: false,
		NewMessages: false,
		NewEventsNearYou: false,
		NewFollowAddedSomething: false
	}
};

const UserReducer = (state: i_Redux_ActionFunc_Interface_User = InitState, action: iAction) => {
	switch (action.type) {
		case TypesOfActions.FILE_UPLOAD_PROGRESS:
			return {
				...state,
				progress: {
					fileName: action.payload.name,
					progress: action.payload.progress
				}
			};
		case TypesOfActions.CURRENT_USER_GLOBAL_ERRORS:
			return { ...state, errorMsg: action.payload.message };
		case TypesOfActions.APP_DATA_LOADED_USERS:
			return {
				...state,
				id: action.payload.user.id,
				name: action.payload.user.name,
				avatar: action.payload.user.avatar,
				imgArray: action.payload.user.imgArray,
				bio: action.payload.user.bio,
				location: action.payload.user.location,
				lang: action.payload.user.lang,
				groups: action.payload.user.groups,
				categories: action.payload.user.categories,
				events: action.payload.user.events,
				donations: action.payload.user.donations,
				UsersIfollow: action.payload.user.UsersIfollow,
				UsersFollowingMe: action.payload.user.UsersFollowingMe,
				notifyToken: action.payload.user.notifyToken,
				typesOfsubjectsTonotifyOn: action.payload.user.typesOfsubjectsTonotifyOn,
				subscriptionType: action.payload.user.subscriptionType,
				msgHistory: action.payload.user.msgHistory,
				errorMsg: '',
				newMsgs: action.payload.user.newMsgs,
				isEmpty: action.payload.isEmpty
			};

		case TypesOfActions.CURRENT_USER_ADD_IMG:
			// console.log('???', action.payload);
			return {
				...state,
				bio: action.payload.bio,
				name: action.payload.name
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

export default UserReducer;

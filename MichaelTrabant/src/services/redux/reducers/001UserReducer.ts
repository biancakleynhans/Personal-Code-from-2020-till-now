import { TypesOfActions } from '../TypesOfActions';
import { i_Redux_ActionFunc_Interface_User } from '../../../models/001UserModels';
import { iAction } from '../../../models/BaseInterfaceModels';

const InitState: i_Redux_ActionFunc_Interface_User = {
	id: 'NotSet',
	name: '',
	email: '',
	connectp: '',
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
	errorMsg: '',
	isEmpty: true,
	msgHistory: {},
	progress: {
		progress: 0,
		fileName: ''
	},
	pendingImgUrl: [],
	sessions: {}
	
};

const UserReducer = (state: i_Redux_ActionFunc_Interface_User = InitState, action: iAction) => {
	switch (action.type) {
		case TypesOfActions.APP_DATA_LOADED:
			return {
				...state,
				id: action.payload.currentUser.id,
				name: action.payload.currentUser.name,
				email: action.payload.currentUser.email,
				location: action.payload.currentUser.location,
				lang: action.payload.currentUser.lang,
				errorMsg: '',
				isEmpty: action.payload.loading,
				msgHistory: action.payload.currentUser.msgHistory,
				connectp: action.payload.currentUser.connectp,
				sessions: action.payload.currentUser.sessions
			};
		case TypesOfActions.FILE_UPLOAD_PROGRESS:
			return {
				...state,
				progress: {
					progress: action.payload.progress,
					fileName: action.payload.fileName
				}
			};
		case TypesOfActions.CURRENT_USER_GLOBAL_ERRORS:
			return {
				...state,
				errorMsg: action.payload
			};
		default:
			return state;
	}
};

export default UserReducer;

import { TypesOfActions } from '../TypesOfActions';
import { i_BaseInterface_User } from '../../../models/001UserModels';
import { iAction } from '../../../models/BaseInterfaceModels';
import { NamedDict } from '../../helpers/Tools';
import { i_Redux_ActionFunc_Interface_Owner } from '../../../models/002OwnerModels';

interface InitStateOfOwner {
	owner: i_Redux_ActionFunc_Interface_Owner;
	globalUsers: NamedDict<i_BaseInterface_User>;
}

const InitState: InitStateOfOwner = {
	owner: {
		id: 'NotSet',
		name: '',
		avatar: '',
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
				label: '',
			},
			locationId: '',
			locationType: '',
			coords: {
				lat: 0,
				long: 0,
			},
		},
		lang: '',
		errorMsg: '',
		isEmpty: true,
		msgHistory: {},
		progress: {
			progress: 0,
			fileName: '',
		},
		workData: {
			daysOfwork: [],
			hoursOfwork: [],
			hoursOfNonWork: [],
		},
		sessionsBooked: {},
	},
	globalUsers: {},
};

const OwnerReducer = (state: InitStateOfOwner = InitState, action: iAction) => {
	switch (action.type) {
		case TypesOfActions.APP_DATA_LOADED:
			return {
				...state,
				owner: {
					id: action.payload.owner.id,
					name: action.payload.owner.name,
					email: action.payload.owner.email,
					location: action.payload.owner.location,
					lang: action.payload.owner.lang,
					errorMsg: '',
					isEmpty: action.payload.loading,
					msgHistory: action.payload.owner.msgHistory,
					avatar: action.payload.owner.avatar,
					workData: {
						daysOfwork: action.payload.owner.workData.daysOfwork,
						hoursOfwork: action.payload.owner.workData.hoursOfwork,
						hoursOfNonWork: action.payload.owner.workData.hoursOfNonWork,
					},
					sessionsBooked: action.payload.owner.sessionsBooked,
				},
				globalUsers: action.payload.global,
			};
		case TypesOfActions.FILE_UPLOAD_PROGRESS:
			return {
				...state,
				progress: {
					progress: action.payload.progress,
					fileName: action.payload.fileName,
				},
			};
		case TypesOfActions.CURRENT_USER_GLOBAL_ERRORS:
			return {
				...state,
				errorMsg: action.payload,
			};
		default:
			return state;
	}
};

export default OwnerReducer;

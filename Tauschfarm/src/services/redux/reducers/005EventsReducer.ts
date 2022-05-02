import { iAction } from '../../../models/BaseInterfaceModels';
import { TypesOfActions } from '../TypesOfActions';
import { NamedDict } from '../../helpers/Tools';
import { i_goingAdded } from '../../../models/005EventModels';
import { i_BaseInterface_Member } from '../../../models/001UserModels';
import { i_BaseInterface_Location_Full } from '../../../models/005EventModels';

export interface iEvent {
	loader: 'start' | 'stop' | 'notSet';
	creatingEvent: {
		id: string;
		name: string;
		time: string;
		date: string;
		location: i_BaseInterface_Location_Full;
		description: string;
		imgArray: string[];
		avatar: string;
		userWhoAddedEvent: i_BaseInterface_Member;
		counts: {
			liked: number;
			intrested: number;
			going: number;
			goingAdded: NamedDict<i_goingAdded>;
			intrestedAdded: NamedDict<i_goingAdded>;
		};
		dateCreated: Date;
	};

	//new
	pendingImgUrl: string[];
	errorMsg: string;
	dateEdited: string;
	isEmpty: boolean;
	progress: {
		progress: number;
		fileName: string;
	};
}

const InitState: iEvent = {
	loader: 'notSet',
	creatingEvent: {
		id: '',
		name: '',
		time: '',
		date: '',

		location: {
			address: {
				street: '',
				city: '',
				state: '',
				postalCode: '',
				country: '',
				county: '',
				label: '',
				district: '',
				houseNumber: ''
			},

			locationId: '',
			locationType: '',

			coords: {
				lat: '',
				long: ''
			}
		},
		description: '',
		imgArray: [],
		avatar: '',
		userWhoAddedEvent: {
			id: '',
			name: '',
			avatar: ''
		},
		counts: {
			liked: 0,
			intrested: 0,
			going: 0,
			goingAdded: {},
			intrestedAdded: {}
		},
		dateCreated: new Date()
	},
	pendingImgUrl: [],
	errorMsg: '',
	dateEdited: '',
	isEmpty: true,
	progress: {
		progress: 0,
		fileName: ''
	}
};

const EventsReducer = (state: iEvent = InitState, action: iAction) => {
	switch (action.type) {
		case TypesOfActions.CURRENT_USER_EVENT_SET:
			// console.log('????? WRTD', action.payload);
			return {
				...state,
				creatingEvent: action.payload
			};
		case TypesOfActions.CURRENT_USER_EVENT_SET_LOC:
			return {
				...state,
				creatingEvent: {
					...state.creatingEvent,
					location: action.payload
				}
			};
		case TypesOfActions.CURRENT_USER_EVENT_IMG_ADD:
			return {
				...state,
				pendingImgUrl: action.payload
			};
		case TypesOfActions.CURRENT_USER_EVENT_IMG_EDIT:
			return {
				...state,
				pendingImgUrl: action.payload
			};
		case TypesOfActions.FILE_UPLOAD_PROGRESS:
			return {
				...state,
				progress: action.payload
			};
		case TypesOfActions.CURRENT_USER_GLOBAL_ERRORS:
			return {
				...state,
				errorMsg: action.payload.message
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

export default EventsReducer;

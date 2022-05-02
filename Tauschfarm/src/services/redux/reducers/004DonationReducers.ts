import { iAction } from '../../../models/BaseInterfaceModels';
import { TypesOfActions } from '../TypesOfActions';
import { i_BaseInterface_Item } from '../../../models/006ItemModels';

export interface iDonations {
	EditDonation: i_BaseInterface_Item;
	isEmpty: boolean;
	pendingImgUrl: string[];
	progress: {
		progress: number;
		fileName: string;
	};
	loader: 'start' | 'stop' | 'notSet';
}

const InitState: iDonations = {
	loader: 'notSet',
	EditDonation: {
		id: '',
		name: '',
		brand: { en: '', de: '' },
		size: { en: '', de: '' },
		color: '',
		length: '',
		description: '',
		imgArray: [],
		avatar: '',
		categories: [],
		groups: [],
		userWhoAddedItem: {
			id: '',
			name: '',
			avatar: ''
		},
		worth: 0,
		shipping: 0,
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
		dateCreated: new Date(),
		dateEdited: new Date(),
		dateMovedToDons: new Date(),
		dateDeleted: new Date()
	},
	isEmpty: true,
	pendingImgUrl: [],
	progress: {
		progress: 0,
		fileName: ''
	}
};

const DonationReducer = (state: iDonations = InitState, action: iAction) => {
	switch (action.type) {
		case TypesOfActions.FILE_UPLOAD_PROGRESS:
			return {
				...state,
				progress: action.payload
			};
		case TypesOfActions.CURRENT_USER_GLOBAL_ERRORS:
			return { ...state, errorMsg: action.payload.message };
		case TypesOfActions.CURRENT_USER_DONATIONS_SET_ON_NAV_AWAY:
			return {
				...state,
				EditDonation: action.payload
			};
		case TypesOfActions.CURRENT_USER_DON_IMG_ADD:
			console.log('res??', action.payload);
			return {
				...state,
				pendingImgUrl: action.payload,
				errorMsg: ''
			};
		case TypesOfActions.CURRENT_USER_DONATIONS_IMG_EDIT:
			return {
				...state,
				pendingImgUrl: action.payload,
				imgArray: action.payload,
				avatar: action.payload[0]
			};
		case TypesOfActions.CURRENT_USER_DON_IMG_DELETE:
			return {
				...state,
				pendingImgUrl: action.payload,
				imgArray: action.payload,
				avatar: action.payload[0]
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

export default DonationReducer;

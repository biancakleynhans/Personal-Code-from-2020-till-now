import { TypesOfActions } from '../TypesOfActions';
import { iAction } from '../../../models/BaseInterfaceModels';
import { i_BaseInterface_Item } from '../../../models/006ItemModels';
import { i_BaseInterface_Member } from '../../../models/001UserModels';

export interface iItem extends i_BaseInterface_Item {
	loader: 'start' | 'stop' | 'notset';
	id: string;
	name: string;
	categories: string[];
	brand: { en: string; de: string };
	size: { en: string; de: string };
	color: string;
	length: string;
	description: string;
	imgArray: any[];
	avatar: '';
	userWhoAddedItem: i_BaseInterface_Member;

	//new
	pendingImgUrl: string[];
	errorMsg: '';
	dateCreated: Date;
	dateEdited: string;
	progress: {
		progress: number;
		fileName: string;
	};
}

const InitState: iItem = {
	loader: 'notset',
	id: '',
	name: '',
	brand: { en: '', de: '' },
	size: { en: '', de: '' },
	color: '',
	length: '',
	description: '',
	categories: [],
	imgArray: [],
	avatar: '',
	worth: 0,
	shipping: 0,
	userWhoAddedItem: {
		id: '',
		name: '',
		avatar: ''
	},
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
	groups: [],
	pendingImgUrl: [],
	errorMsg: '',
	dateCreated: new Date(),
	dateEdited: '',
	dateDeleted: '',
	dateMovedToDons: '',
	progress: {
		progress: 0,
		fileName: ''
	}
};

const ItemReducer = (state: iItem = InitState, action: iAction) => {
	switch (action.type) {
		case TypesOfActions.CURRENT_USER_GLOBAL_ERRORS:
			return {
				...state,
				errorMsg: action.payload
			};
		case TypesOfActions.FILE_UPLOAD_PROGRESS:
			return {
				...state,
				progress: action.payload
			};
		case TypesOfActions.CURRENT_USER_ITEM_IMG_ADD:
			console.log('res??', action.payload);
			return {
				...state,
				pendingImgUrl: action.payload, //[...state.pendingImgUrl, ...action.payload], //
				// imgArray: [...state.pendingImgUrl, ...action.payload],
				// avatar: [...state.pendingImgUrl, ...action.payload][0],
				errorMsg: ''
			};
		case TypesOfActions.CURRENT_USER_ITEM_IMG_EDIT:
			// console.log('reducer', action.payload);
			return {
				...state,
				pendingImgUrl: action.payload,
				imgArray: action.payload,
				avatar: action.payload[0]
			};
		case TypesOfActions.CURRENT_USER_ITEM_IMG_DELETE:
			return {
				...state,
				imgArray: action.payload,
				pendingImgUrl: action.payload,
				avatar: action.payload[0],
				dateEdited: new Date().getTime()
			};

		case TypesOfActions.CURRENT_GROUP_ITEM_IMG_ADD:
			// console.log('res??', action.payload);
			return {
				...state,
				pendingImgUrl: action.payload, // [...state.pendingImgUrl, ...action.payload],
				errorMsg: ''
			};
		case TypesOfActions.CURRENT_GROUP_ITEM_IMG_EDIT:
			console.log('reducer', action.payload);
			return {
				...state,
				pendingImgUrl: action.payload,
				imgArray: action.payload,
				avatar: action.payload[0]
			};
		case TypesOfActions.CURRENT_GROUP_ITEM_IMG_DELETE:
			return {
				...state,
				imgArray: action.payload,
				pendingImgUrl: action.payload,
				avatar: action.payload[0],
				dateEdited: new Date().getTime()
			};

		case TypesOfActions.CURRENT_USER_ITEM_SET:
			return {
				...state,
				id: action.payload.id,
				name: action.payload.name,
				categories: action.payload.categories,
				brand: action.payload.brand,
				size: action.payload.size,
				color: action.payload.color,
				length: action.payload.length,
				description: action.payload.description,
				userWhoAddedItem: action.payload.userWhoAddedItem,
				worth: action.payload.worth,
				shipping: action.payload.shipping,
				imgArray: action.payload.imgArray,
				pendingImgUrl: []
			};

		case TypesOfActions.CURRENT_USER_ITEM_DONE:
			return {
				...state,
				id: '',
				name: '',
				brand: { en: '', de: '' },
				size: { en: '', de: '' },
				color: '',
				length: '',
				description: '',
				categories: [],
				imgArray: [],
				avatar: '',
				userWhoAddedItem: {
					id: '',
					name: '',
					avatar: ''
				},
				worth: 0,
				shipping: 0,
				groups: [],
				pendingImgUrl: [],
				errorMsg: '',
				dateCreated: new Date(),
				dateEdited: '',
				dateDeleted: '',
				dateMovedToDons: '',
				progress: {
					progress: 0,
					fileName: ''
				}
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

export default ItemReducer;

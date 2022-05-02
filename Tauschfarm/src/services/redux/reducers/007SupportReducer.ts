import { iAction } from '../../../models/BaseInterfaceModels';
import { NamedDict } from '../../helpers/Tools';
import { TypesOfActions } from '../TypesOfActions';

export interface iSupport {
	Q_A: NamedDict<any>;
	supportDocs: NamedDict<any>;
	progress: {
		progress: number;
		fileName: string;
		imgArr: any[];
	};
}
const InitState: iSupport = {
	Q_A: {},
	supportDocs: {},
	progress: {
		progress: 0,
		fileName: '',
		imgArr: []
	}
};

const SupportReducer = (state: any = InitState, action: iAction) => {
	switch (action.type) {
		case TypesOfActions.APP_DATA_LOADED_USERS:
			return {
				...state,
				Q_A: action.payload.sup
			};

		case TypesOfActions.FILE_UPLOAD_PROGRESS_FAQ:
			return {
				...state,
				progress: action.payload
			};
		case TypesOfActions.FAQ_IMG_ARR:
			return {
				...state,
				progress: {
					...state.progress,
					imgArr: action.payload
				}
			};

		default:
			return state;
	}
};

export default SupportReducer;

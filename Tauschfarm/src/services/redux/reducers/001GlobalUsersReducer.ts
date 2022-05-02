import { TypesOfActions } from '../TypesOfActions';
import { i_Redux_ActionFunc_Interface_User } from '../../../models/001UserModels';
import { iAction } from '../../../models/BaseInterfaceModels';
import { NamedDict } from '../../helpers/Tools';

interface i_GlobalUswers {
	GlobalUsers: NamedDict<i_Redux_ActionFunc_Interface_User>;
	isEmpty: boolean;
}

const InitState: i_GlobalUswers = {
	GlobalUsers: {},
	isEmpty: true
};

const GlobalUserReducer = (state: i_GlobalUswers = InitState, action: iAction) => {
	switch (action.type) {
		case TypesOfActions.APP_DATA_LOADED_USERS:
			return {
				...state,
				GlobalUsers: action.payload.global,
				isEmpty: action.payload.isEmpty
			};

		default:
			return state;
	}
};

export default GlobalUserReducer;

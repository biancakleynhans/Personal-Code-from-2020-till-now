import { iAction } from '../../../models/BaseInterfaceModels';
import { NamedDict } from '../../helpers/Tools';
import { TypesOfActions } from '../TypesOfActions';
import { i_Redux_ActionFunc_Interface_User } from '../../../models/001UserModels';

interface iInitAdminUser {
	errorMsg: string;
	AllUsers: NamedDict<i_Redux_ActionFunc_Interface_User>;
}

const InitState: iInitAdminUser = {
	errorMsg: '',
	AllUsers: {}
};

const AdminReducer = (state: iInitAdminUser = InitState, action: iAction) => {
	switch (action.type) {
		case TypesOfActions.APP_DATA_LOADED:
			return {
				...state,
				AllUsers: action.payload.global.allUsers
			};

		default:
			return state;
	}
};

export default AdminReducer;

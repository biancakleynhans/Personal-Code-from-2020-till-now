/** @format */

import { TypesOfActions } from '../TypesOfActions';
import { iAction } from '../../../models/BaseInterfaceModels';

interface iInitStateAuth {
	authError: string | null;
	id: string;
	email: string;
	passw: string;
}

const InitState: iInitStateAuth = {
	authError: null,
	id: '',
	email: '',
	passw: ''
};

const AuthReducer = (state: iInitStateAuth = InitState, action: iAction) => {
	switch (action.type) {
		case TypesOfActions.AUTH_ERROR_SIGNIN:
			// console.log('sign in error');
			return {
				...state,
				authError: action.payload.message
			};
		case TypesOfActions.AUTH_SIGNIN:
			// console.log('sign in sucsess');
			return {
				...state,
				id: action.payload,
				authError: null
			};

		case TypesOfActions.AUTH_ERROR_SIGNUP:
			// console.log('sign up error');
			return {
				...state,
				authError: action.payload.message
			};
		case TypesOfActions.AUTH_SIGNUP:
			// console.log('sign up sucsess');
			return {
				...state,
				authError: null
			};

		case TypesOfActions.AUTH_SIGNOUT:
			// console.log('sign out done');
			return state;

		case TypesOfActions.AUTH_CHANGE_CHOICE:
			// console.log('AUTH_CHANGE_CHOICE');
			return {
				...state,
				email: action.payload.email,
				passw: action.payload.password
			};

		default:
			return state;
	}
};

export default AuthReducer;

import { TypesOfActions } from '../../TypesOfActions';
import FIREBASE from '../../../firebase/firebaseConfig';
import { TypesToFirebaseGlobals } from '../../../firebase/TypesToServer';

const fbDatabase = FIREBASE.database();

export const Group_CorfirmJoinReq = (reqData: any) => {
	return (dispatch: any) => {
		fbDatabase
			.ref(`${TypesToFirebaseGlobals.Groups_Root}/${reqData.groupId}`)
			.update(reqData.group)
			.catch((error) => {
				dispatch({
					type: TypesOfActions.CURRENT_USER_GLOBAL_ERRORS,
					payload: error
				});
			});
	};
};

export const Group_DenyJoinReq = (reqData: any) => {
	return (dispatch: any) => {
		fbDatabase
			.ref(`${TypesToFirebaseGlobals.Groups_Root}/${reqData.groupId}`)
			.update(reqData.group)
			.catch((error) => {
				dispatch({
					type: TypesOfActions.CURRENT_USER_GLOBAL_ERRORS,
					payload: error
				});
			});
	};
};

export const GroupDelete = (reqData: { userId: string; groupId: string }) => {
	return (dispatch: any) => {
		console.log('data', reqData);
		fbDatabase
			.ref(`${TypesToFirebaseGlobals.Groups_Root}/${reqData.groupId}`)
			.remove()
			.catch((error) => {
				dispatch({
					type: TypesOfActions.CURRENT_USER_GLOBAL_ERRORS,
					payload: error
				});
			});

		fbDatabase
			.ref(`${TypesToFirebaseGlobals.User_Root}/${reqData.userId}/groups/${reqData.groupId}`)
			.remove()
			.catch((error) => {
				dispatch({
					type: TypesOfActions.CURRENT_USER_GLOBAL_ERRORS,
					payload: error
				});
			});
	};
};

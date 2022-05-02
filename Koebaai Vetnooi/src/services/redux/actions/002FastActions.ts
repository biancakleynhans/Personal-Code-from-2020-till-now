import FIREBASE from '../../firebase/FirebaseConfig';
import { TypesToFirebaseGlobals } from '../../firebase/TypesToServer';
import { TypesOfActions } from '../TypesOfActions';

const fbDatabase = FIREBASE.database();

export const SaveFast = (fast: any) => {
	return (dispatch: any) => {
		console.log('recieved data ', fast);

		fbDatabase
			.ref(
				`${TypesToFirebaseGlobals.User_Root}/${fast.userId}/${TypesToFirebaseGlobals.Fast_Container}/${fast.fast.id}`
			)
			.set(fast.fast)
			.then(() => {
				// Data saved successfully!
				// console.log('DATA SAVED SUCSESFULLY');
				dispatch({
					type: TypesOfActions.CURRENT_USER_ADDED_FAST,
					payload: fast
				});
			})
			.catch((error) => {
				dispatch({
					// The write failed...
					// console.log('error adding', error);
					type: TypesOfActions.CURRENT_USER_GLOBAL_ERRORS,
					payload: error
				});
			});
	};
};

export const UpdateFast = (fast: any) => {
	return (dispatch: any) => {
		console.log('recieved data ', fast);

		fbDatabase
			.ref(
				`${TypesToFirebaseGlobals.User_Root}/${fast.userId}/${TypesToFirebaseGlobals.Fast_Container}/${fast.fast.id}`
			)
			.update(fast.fast)
			.then(() => {
				// Data saved successfully!
				// console.log('DATA SAVED SUCSESFULLY');
				dispatch({
					type: TypesOfActions.CURRENT_USER_UPDATED_FAST,
					payload: fast
				});
			})
			.catch((error) => {
				dispatch({
					// The write failed...
					// console.log('error adding', error);
					type: TypesOfActions.CURRENT_USER_GLOBAL_ERRORS,
					payload: error
				});
			});
	};
};

export const DeleteFast = () => {
	return (dispatch: any) => {};
};

export const SaveStarttimeOfCurrentFast = (data: any) => {
	return (dispatch: any) => {
		console.log('data', data);
		fbDatabase
			.ref(`${TypesToFirebaseGlobals.RunningFast}/${data.userId}`)
			.set(data.fast)
			.then(() => {
				// Data saved successfully!
				// console.log('DATA SAVED SUCSESFULLY');
				dispatch({
					type: TypesOfActions.CURRENT_USER_STARTED_FAST,
					payload: data
				});
			})
			.catch((error) => {
				dispatch({
					// The write failed...
					// console.log('error adding', error);
					type: TypesOfActions.CURRENT_USER_GLOBAL_ERRORS,
					payload: error
				});
			});
	};
};

export const DeleteStarttimeOfCurrentFast = (data: any) => {
	return (dispatch: any) => {
		console.log('data', data);

		fbDatabase
			.ref(`${TypesToFirebaseGlobals.RunningFast}/${data.userId}`)
			.remove()
			.then(() => {
				// Data saved successfully!
				// console.log('DATA SAVED SUCSESFULLY');
				dispatch({
					type: TypesOfActions.CURRENT_USER_ENDED_FAST,
					payload: data
				});
			})
			.catch((error) => {
				dispatch({
					// The write failed...
					// console.log('error adding', error);
					type: TypesOfActions.CURRENT_USER_GLOBAL_ERRORS,
					payload: error
				});
			});
	};
};

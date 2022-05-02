import FIREBASE from '../../firebase/FirebaseConfig';
import { TypesToFirebaseGlobals } from '../../firebase/TypesToServer';
import { TypesOfActions } from '../TypesOfActions';

const fbDatabase = FIREBASE.database();

export const SaveWeight = (weight: any) => {
	return (dispatch: any) => {
		console.log('recieved data ', weight);

		fbDatabase
			.ref(`${TypesToFirebaseGlobals.User_Root}/${weight.userId}/${TypesToFirebaseGlobals.Weight_Container}/${weight.weight.id}`)
			.set(weight.weight)
			.then(() => {
				// Data saved successfully!
				// console.log('DATA SAVED SUCSESFULLY');
				dispatch({
					type: TypesOfActions.CURRENT_USER_ADDED_WEIGHT,
					payload: weight
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

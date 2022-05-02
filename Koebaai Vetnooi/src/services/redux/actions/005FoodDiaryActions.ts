import FIREBASE from '../../firebase/FirebaseConfig';
import { TypesToFirebaseGlobals } from '../../firebase/TypesToServer';
import { TypesOfActions } from '../TypesOfActions';

const fbDatabase = FIREBASE.database();

export const SaveFoodEntry = (foodData: any) => {
	return (dispatch: any) => {
		console.log('recieved data ', foodData);

		fbDatabase
			.ref(
				`${TypesToFirebaseGlobals.User_Root}/${foodData.userId}/${TypesToFirebaseGlobals.FoodDiary_Container}/${foodData.meal.id}`
			)
			.set(foodData.meal)
			.then(() => {
				// Data saved successfully!
				// console.log('DATA SAVED SUCSESFULLY');
				dispatch({
					type: TypesOfActions.CURRENT_USER_ADDED_MEAL,
					payload: foodData
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

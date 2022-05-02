import FIREBASE from '../../firebase/FirebaseConfig';
import { TypesToFirebaseGlobals } from '../../firebase/TypesToServer';
import { TypesOfActions } from '../TypesOfActions';

const fbDatabase = FIREBASE.database();

export const SaveWaterEntry = (waterDiaryData: any) => {
	return (dispatch: any) => {
		console.log('recieved data ', waterDiaryData);

		fbDatabase
			.ref(
				`${TypesToFirebaseGlobals.User_Root}/${waterDiaryData.userId}/${TypesToFirebaseGlobals.WaterDiary_Container}/`
			)
			.update({ [waterDiaryData.water.id]: waterDiaryData.water })
			.then(() => {
				// Data saved successfully!
				// console.log('DATA SAVED SUCSESFULLY');
				dispatch({
					type: TypesOfActions.CURRENT_USER_ADDED_WATER,
					payload: waterDiaryData
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

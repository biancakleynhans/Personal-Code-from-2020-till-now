import { TypesOfActions } from '../../TypesOfActions';
import FIREBASE from '../../../firebase/firebaseConfig';
import { TypesToFirebaseGlobals } from '../../../firebase/TypesToServer';
import { convertObjectToArray } from '../../../ownServices/ConverterFuncs';
import { i_BaseInterface_Category } from '../../../../models/002CatagoryModels';

const fbDatabase = FIREBASE.database();

export const User_Category_Edit = (catData: any) => {
	return (dispatch: any) => {
		const arrNewItems = convertObjectToArray(catData.newItemsToSave);

		convertObjectToArray(catData.newCats).map((cat: i_BaseInterface_Category) => {
			if (cat.items === undefined) {
				cat.items = {};
				return cat;
			}
			return catData.newCats;
		});

		// console.log('catDtata: ', catData);
		if (arrNewItems.length > 0) {
			// console.log('larger than 0', arrNewItems.length);
			for (let i = 0; i < arrNewItems.length; i++) {
				// console.log(i, 'for loop', arrNewItems[i].id);
				fbDatabase
					.ref(`${TypesToFirebaseGlobals.Items_Root}/${arrNewItems[i].id}`)
					.set(arrNewItems[i])
					.catch((error) => {
						dispatch({
							type: TypesOfActions.CURRENT_USER_GLOBAL_ERRORS,
							payload: error
						});
					});
			}
			fbDatabase
				.ref(`${TypesToFirebaseGlobals.User_Root}/${catData.userId}/categories`)
				.set(catData.userCatsIndexed)
				.catch((error) => {
					dispatch({
						type: TypesOfActions.CURRENT_USER_GLOBAL_ERRORS,
						payload: error
					});
				});
		} else {
			// console.log('is total is  0', arrNewItems.length);
			fbDatabase
				.ref(`${TypesToFirebaseGlobals.User_Root}/${catData.userId}/categories`)
				.set(catData.newCats)
				.catch((error) => {
					dispatch({
						type: TypesOfActions.CURRENT_USER_GLOBAL_ERRORS,
						payload: error
					});
				});
		}
	};
};

export const User_Category_Delete = (catData: any) => {
	return (dispatch: any) => {
		// console.log('catDtata: ', catData);
		const arrNewItems = convertObjectToArray(catData.newItemsToSave);

		convertObjectToArray(catData.newCats).map((cat: i_BaseInterface_Category) => {
			if (cat.items === undefined) {
				cat.items = {};
				return cat;
			}
			return catData.newCats;
		});

		if (arrNewItems.length > 0) {
			// console.log('larger than 0', arrNewItems.length);
			for (let i = 0; i < arrNewItems.length; i++) {
				// console.log(i, 'for loop', arrNewItems[i].id);
				fbDatabase
					.ref(`${TypesToFirebaseGlobals.Items_Root}/${arrNewItems[i].id}`)
					.set(arrNewItems[i])
					.catch((error) => {
						dispatch({
							type: TypesOfActions.CURRENT_USER_GLOBAL_ERRORS,
							payload: error
						});
					});
			}
			fbDatabase
				.ref(`${TypesToFirebaseGlobals.User_Root}/${catData.userId}/categories`)
				.set(catData.userCatsIndexed)
				.catch((error) => {
					dispatch({
						type: TypesOfActions.CURRENT_USER_GLOBAL_ERRORS,
						payload: error
					});
				});
		} else {
			// console.log('is total is  0', arrNewItems.length);
			fbDatabase
				.ref(`${TypesToFirebaseGlobals.User_Root}/${catData.userId}/categories`)
				.set(catData.newCats)
				.catch((error) => {
					dispatch({
						type: TypesOfActions.CURRENT_USER_GLOBAL_ERRORS,
						payload: error
					});
				});
		}
	};
};

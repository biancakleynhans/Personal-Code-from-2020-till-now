import FIREBASE from '../../firebase/FirebaseConfig';
import { i_BaseInterface_User } from '../../../models/001UserModels';
import { TypesToFirebaseGlobals } from '../../firebase/TypesToServer';
import { TypesOfActions } from '../TypesOfActions';
import { BookingCompleted } from '../../../pages/userPersonalPages/useAsUser/UserCalendarLandingPage';

const fbDatabase = FIREBASE.database();

export const User_ChangeLang = (user: i_BaseInterface_User) => {
	return (dispatch: any) => {
		// console.log('INFO GOT: ', user);
		fbDatabase
			.ref(`${TypesToFirebaseGlobals.User_Root}/${user.id}`)
			.update({ lang: user.lang })
			.catch((error) => {
				dispatch({
					type: TypesOfActions.CURRENT_USER_GLOBAL_ERRORS,
					payload: error
				});
			});
	};
};

export const User_Update = (user: any) => {
	return (dispatch: any, getState: any) => {
		const profile = getState().user;

		var UserUpdatedObj = {
			name: user.name.length > 0 ? user.name : profile.name,
			connectp: user.connectp !== 'diss' ? user.connectp : ''
		};

		// console.log('UpdatedUser', UserUpdatedObj);
		fbDatabase
			.ref(`${TypesToFirebaseGlobals.User_Root}/${profile.id}`)
			.update(UserUpdatedObj)
			.catch((error) => {
				dispatch({
					type: TypesOfActions.CURRENT_USER_GLOBAL_ERRORS,
					payload: error
				});
			});
	};
};

export const User_Update_Location = (locationData: any) => {
	return (dispatch: any, getState: any) => {
		console.log('INFO GOT: ', locationData);

		const profile = getState().firebase.profile;
		// console.log('profile: ', profile);

		var newLoc = {
			location: {
				address: locationData.address,
				locationId: locationData.locationId,
				locationType: locationData.locationType,
				coords: locationData.coords
			}
		};

		fbDatabase
			.ref(`${TypesToFirebaseGlobals.User_Root}/${profile.id}`)
			.update(newLoc)
			.catch((error) => {
				dispatch({
					type: TypesOfActions.CURRENT_USER_GLOBAL_ERRORS,
					payload: error
				});
			});
	};
};


export const CompletedBookingAdd = (booking : BookingCompleted)=>{
	return ( dispatch: any, getState: any ) => {

		var o = getState().owner.owner.id
		console.log('o', o)

		fbDatabase
			.ref( `${TypesToFirebaseGlobals.User_Root}/${o}` )
			.child( TypesToFirebaseGlobals.Sessions )
			.child( booking.client.id )
			.push(booking)
			.catch((error)=>{
				dispatch( {
					type: TypesOfActions.CURRENT_USER_GLOBAL_ERRORS,
					payload: error
				} );
			})


	}
}

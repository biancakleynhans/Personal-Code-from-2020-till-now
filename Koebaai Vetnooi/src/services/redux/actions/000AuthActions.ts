import FIREBASE from '../../firebase/FirebaseConfig';

import { TypesOfActions } from '../TypesOfActions';
import { RedirectTo } from '../../../layout/Loading_Redirecting/CommonUIServices';
import { TypesToFirebaseGlobals } from '../../firebase/TypesToServer';
import { iCred } from '../../../models/000AuthModels';

const fbAuth = FIREBASE.auth();
const fbFirestore = FIREBASE.firestore();
const fbDatabase = FIREBASE.database();

export const signInUser = (credentials: iCred) => {
	return (dispatch: any) => {
		// console.log('INFO GOT: ', credentials);

		var checkedEmail = credentials.email.trimEnd().toLocaleLowerCase();
		var checkedPass = credentials.password.trimEnd();

		fbAuth
			.signInWithEmailAndPassword(checkedEmail, checkedPass)
			.then((u) => {
				// console.log('u', u?.user?.uid);
				var user = u ? (u.user ? u.user.uid : '') : '';
				window.localStorage.setItem('user', user);

				dispatch({
					type: TypesOfActions.AUTH_SIGNIN,
					payload: u?.user?.uid
				});
				RedirectTo('/');
				dispatch({
					type: TypesOfActions.AUTH_CHANGE_CHOICE,
					payload: { email: '', password: '' }
				});
			})
			.catch((error) => {
				dispatch({
					type: TypesOfActions.AUTH_ERROR_SIGNIN,
					payload: error
				});
			});
	};
};

export const signUpUser = (credentials: iCred) => {
	return (dispatch: any) => {
		// console.log('INFO GOT: ', credentials);

		var checkedEmail = credentials.email.trimEnd().toLocaleLowerCase();
		var checkedPass = credentials.password.trimEnd().toLocaleLowerCase();

		fbAuth
			.createUserWithEmailAndPassword(checkedEmail, checkedPass)
			.then((data) => {
				if (data.user !== null) {
					// console.log('data.user', data.user);

					var userCrendentials = {
						role: 'user',
						username: data.user.uid,
						email: credentials.email,
						createdAt: new Date().toISOString(),
						imageUrl: TypesToFirebaseGlobals.placeholderImg,
						userId: data.user.uid
					};

					fbDatabase.ref(`${TypesToFirebaseGlobals.User_Root}/${data.user.uid}`).set(
						{
							id: data.user.uid,
							role: 'user',
							email: credentials.email,
							name: credentials.email,
							avatar: TypesToFirebaseGlobals.placeholderImg,
							imgArray: [TypesToFirebaseGlobals.placeholderImg],
							bio: '',
							location: {
								lat: '',
								long: ''
							},
							lang: 'af'
						},
						function (error) {
							if (error) {
								// The write failed...
								// console.log('error adding', error);
								dispatch({
									type: TypesOfActions.AUTH_ERROR_SIGNUP,
									payload: error
								});
							} else {
								// Data saved successfully!
								// console.log('DATA SAVED SUCSESFULLY');
								dispatch({
									type: TypesOfActions.AUTH_CHANGE_CHOICE,
									payload: { email: '', password: '' }
								});
							}
						}
					);
					return fbFirestore.doc(`/${TypesToFirebaseGlobals.User_Root}/${data.user.uid}`).set(userCrendentials);
				}
			})
			.then(() => {
				dispatch({
					type: TypesOfActions.AUTH_SIGNUP,
					payload: null
				});
			})
			.catch((err) => {
				dispatch({
					type: TypesOfActions.AUTH_ERROR_SIGNUP,
					payload: err
				});
			});
	};
};

export const signOutUser = () => {
	return (dispatch: any) => {
		fbAuth
			.signOut()
			.then(() => {
				dispatch({
					type: TypesOfActions.AUTH_SIGNOUT,
					payload: null
				});
				window.location.replace('/');
				window.localStorage.clear();
			})
			.catch(() => {
				dispatch({
					type: TypesOfActions.AUTH_ERROR_SIGNOUT,
					payload: null
				});
			});
	};
};

export const forgotPasswUser = (credentials: iCred) => {
	return (dispatch: any) => {
		var checkedEmail = credentials.email.trimEnd().toLocaleLowerCase();

		fbAuth
			.sendPasswordResetEmail(checkedEmail)
			.then(() => {
				dispatch({
					type: TypesOfActions.AUTH_FORGOTPW,
					payload: null
				});
			})
			.catch((err) => {
				dispatch({
					type: TypesOfActions.AUTH_ERROR_FORGOTPW,
					payload: err
				});
			});
	};
};

export const changeChoice = (user: any) => {
	return (dispatch: any) => {
		// console.log('???? user chnage choice ', user);
		dispatch({
			type: TypesOfActions.AUTH_CHANGE_CHOICE,
			payload: user
		});
	};
};

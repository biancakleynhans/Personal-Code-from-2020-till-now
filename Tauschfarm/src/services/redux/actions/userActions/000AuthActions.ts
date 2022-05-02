import { TypesOfActions } from '../../TypesOfActions';
import FIREBASE from '../../../firebase/firebaseConfig';
import { TypesToFirebaseGlobals } from '../../../firebase/TypesToServer';
import { iCred } from '../../../../models/000AuthModels';
import { SetLanguage } from '../../../translate/TranslateServices';
import { iTimeLineEntry } from '../../../../models/TimelineModels';

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
				window.location.replace('/');
				dispatch({
					type: TypesOfActions.AUTH_CHANGE_CHOICE,
					payload: { firstname: '', lastname: '', email: '', password: '' }
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
		var checkedPass = credentials.password.trimEnd();

		fbAuth
			.createUserWithEmailAndPassword(checkedEmail, checkedPass)
			.then((data) => {
				if (data.user !== null) {
					fbAuth.currentUser?.sendEmailVerification();

					var userCrendentials = {
						username: `${credentials.firstName} ${credentials.lastName}`,
						email: checkedEmail,
						createdAt: new Date().toISOString(),
						imageUrl: TypesToFirebaseGlobals.placeholderImg,
						userId: data.user.uid
					};

					var userContent = {
						id: data.user.uid,
						name: `${credentials.firstName} ${credentials.lastName}`,
						email: checkedEmail,
						lang: 'de',
						subscriptionType: {
							type: 'free',
							startDate: new Date().getTime(),
							payedWith: 'free'
						}
					};

					var tlData: iTimeLineEntry = {
						type: 'New User',
						date: new Date().getTime(),
						name: userContent.name,
						id: userContent.id
					};

					fbDatabase
						.ref(`${TypesToFirebaseGlobals.User_Root}/${data.user.uid}`)
						.set(userContent)
						.then(() => {
							fbDatabase
								.ref(`${TypesToFirebaseGlobals.TIMELINE}`)
								.push(tlData)
								.catch((err) => {
									dispatch({
										type: TypesOfActions.AUTH_ERROR_SIGNUP,
										payload: err
									});
								});
						})
						.catch((err) => {
							dispatch({
								type: TypesOfActions.AUTH_ERROR_SIGNUP,
								payload: err
							});
						});
					return fbFirestore.doc(`/${TypesToFirebaseGlobals.User_Root}/${data.user.uid}`).set(userCrendentials);
				}
			})
			.then(() => {
				SetLanguage('de');
				window.location.replace('/dashboard/settings/newUser');
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
				window.localStorage.clear();
				window.location.replace('/');
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
		fbAuth.sendPasswordResetEmail(checkedEmail).catch((err) => {
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

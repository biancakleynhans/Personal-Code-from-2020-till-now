import { TypesOfActions } from '../TypesOfActions';
import FIREBASE from '../../firebase/FirebaseConfig';
import { TypesToFirebaseGlobals } from '../../firebase/TypesToServer';
import { SetLanguage } from '../../translate/TranslateServices';
import { i_Redux_ActionFunc_Interface_User, i_BaseInterface_User, i_AdminNeedsThisInfo_Interface_User } from '../../../models/001UserModels';

import { getReverseGeoCodeRegion } from '../../../components/HERE maps/adressGetAndValidate/ReverseGeoCoding';
import { NamedDict } from '../../helpers/Tools';
import { iTimePeriod } from '../../../models/FastModels';
import { iWeightMesureEntry } from '../../../models/WeightModels';
import { iWaterDiaryEntry } from '../reducers/004WaterDiaryReducer';
import { iFoodDiaryEntry } from '../reducers/005FoodDiaryReducer';
import { convertObjectToArray } from '../../ownServices/ConverterFuncs';

const fbDatabase = FIREBASE.database();
const rootDBref = fbDatabase.ref();

var Latitude: string = '';
var Longitude: string = '';

interface iFB_DB {
	USERS: NamedDict<i_BaseInterface_User>;
	ActiveFast: NamedDict<any>;
	ChatPosts: NamedDict<any>;
}

var Latitude: string = '';
var Longitude: string = '';

var globalDb = {
	db: {} as iFB_DB
};

export const Global_GetAllData_AtStartUp = (user: i_Redux_ActionFunc_Interface_User) => {
	return (dispatch: any, getState: any) => {
		// console.log('user', user);
		const lang = 'af';
		const Uid = getState().firebase.auth.uid;
		// console.log('Uid', Uid);
		SetLanguage(lang);

		var FastData: NamedDict<iTimePeriod> = {};
		var WeightData: NamedDict<iWeightMesureEntry> = {};
		// var WaterDiaryData: NamedDict<iWaterDiaryEntry> = {};
		var FoodDiaryData: NamedDict<iFoodDiaryEntry> = {};
		var ChatPageData: NamedDict<any> = {};
		var AllGlobalUsers: NamedDict<i_BaseInterface_User> = {};
		var SeverRunningFast = {
			startTime: 0,
			id: ''
		};

		var user: i_BaseInterface_User = {
			id: '',
			email: '',
			role: 'user',
			name: '',
			avatar: '',
			imgArray: [],
			bio: '',
			location: {
				address: {
					district: '',
					houseNumber: '',
					street: '',
					city: '',
					state: '',
					postalCode: '',
					country: '',
					county: '',
					label: ''
				},

				locationId: '',
				locationType: '',

				coords: {
					lat: 0,
					long: 0
				}
			},
			lang: '',
			fasts: {},
			weights: {},
			waterDiary: {},
			foodDiary: {}
		};

		rootDBref.on('value', (c) => {
			globalDb.db = c.val();
			console.log('on value', c.val());
			console.log('on value', globalDb.db);

			const DB_UserKeys = Object.keys(globalDb.db.USERS);
			DB_UserKeys.forEach((key: string) => {
				if (key !== Uid) {
					AllGlobalUsers[key] = globalDb.db.USERS[key];
				} else {
					user = globalDb.db.USERS[Uid];
					FastData = globalDb.db.USERS[Uid]?.fasts;
					FoodDiaryData = globalDb.db.USERS[Uid]?.foodDiary;
					WeightData = globalDb.db.USERS[Uid]?.weights;
					SeverRunningFast = globalDb.db.ActiveFast[Uid] ? globalDb.db.ActiveFast[Uid] : {};
					ChatPageData = globalDb.db.ChatPosts;
				}
			});

			const userValues: i_BaseInterface_User = {
				id: Uid,
				role: user.role ? user.role : 'user',
				email: user.email,
				name: user.name,
				avatar: user.avatar,
				imgArray: user.imgArray,
				bio: user.bio,
				location: user.location,
				lang: user.lang,
				fasts: FastData,
				weights: WeightData,
				waterDiary: {},
				foodDiary: FoodDiaryData
			};

			const globalValues = {
				fastRunning: SeverRunningFast,
				chats: ChatPageData,
				allUsers: AllGlobalUsers
			};

			const sendOnDispatch = {
				user: userValues,
				global: globalValues,
				loading: false
			};

			console.log('sendOnDispatch', sendOnDispatch);

			dispatch({
				type: TypesOfActions.APP_DATA_LOADED,
				payload: sendOnDispatch
			});
		});
	};
};

export const Global_User_Loc = (user: i_BaseInterface_User) => {
	return (dispatch: any) => {
		// console.log('user loc', user.id);

		var newLoc = {
			location: {
				address: {
					district: '',
					houseNumber: '',
					street: '',
					city: '',
					state: '',
					postalCode: '',
					country: '',
					county: '',
					label: ''
				},

				locationId: '',
				locationType: '',

				coords: {
					lat: 0,
					long: 0
				}
			}
		};

		if (user.location.address === undefined) {
			console.log('user location ', user.location);

			navigator.geolocation.getCurrentPosition(
				(position: any) => {
					Latitude = position.coords.latitude;
					Longitude = position.coords.longitude;
					console.log('lat, long', Latitude, Longitude);
					//43.42387,15.490238

					var locCode = `${Latitude},${Longitude}`;
					getReverseGeoCodeRegion(locCode).then((res: any) => {
						// console.log('res', res);

						if (res.address) {
							// console.log('res', res);
							newLoc = {
								location: {
									address: res.address,
									locationId: res.locationId,
									locationType: res.locationType,
									coords: res.coords
								}
							};

							//server call
							fbDatabase.ref(`${TypesToFirebaseGlobals.User_Root}/${user.id}`).update(newLoc, function (error: any) {
								if (error) {
									// The write failed...
									// console.log('error adding', error);
									dispatch({
										type: TypesOfActions.CURRENT_USER_GLOBAL_ERRORS,
										payload: error
									});
								} else {
									// Data saved successfully!
									// console.log('DATA SAVED SUCSESFULLY');
									dispatch({
										type: TypesOfActions.CURRENT_USER_CHANGE_LOCATION,
										payload: newLoc.location
									});
								}
							});
						} else {
							// console.log('!!!!!res', res);
						}
					});
				},
				(error: any) => {
					// eslint-disable-next-line
					// console.log('code: ' + error.code + '\n' + 'message: ' + error.message + '\n');
				},
				{ enableHighAccuracy: true }
			);
		} else {
			// console.log('user location ', user.location.address);

			newLoc = {
				location: {
					address: user.location.address,
					locationId: user.location.locationId,
					locationType: user.location.locationType,
					coords: {
						lat: +user.location.coords.lat,
						long: +user.location.coords.long
					}
				}
			};

			dispatch({
				type: TypesOfActions.CURRENT_USER_CHANGE_LOCATION,
				payload: newLoc.location
			});
		}
	};
};

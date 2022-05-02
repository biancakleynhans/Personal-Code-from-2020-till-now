import { TypesOfActions } from '../../TypesOfActions';
import FIREBASE from '../../../firebase/firebaseConfig';
import { TypesToFirebaseGlobals } from '../../../firebase/TypesToServer';
import {
	i_Redux_ActionFunc_Interface_Event_SetOnNav,
	i_BaseInterface_EventIndexer,
	i_Redux_ActionFunc_Interface_Event_Going,
	i_BaseInterface_Event
} from '../../../../models/005EventModels';
import { i_Redux_ActionFunc_Interface_ImgUpload, i_Redux_ActionFunc_Interface_ImgEdit, i_Redux_ActionFunc_Interface_ImgDelete } from '../../../../models/007ImageModels';
import { CheckNameMakeNew } from '../../../ownServices/HelperFuncs';
import { iTimeLineEntry } from '../../../../models/TimelineModels';

const fbDatabase = FIREBASE.database();
const fbStorage = FIREBASE.storage();

export const User_Event_Set_onNav = (eventData: i_Redux_ActionFunc_Interface_Event_SetOnNav) => {
	return (dispatch: any) => {
		// console.log('INFO GOT: ', eventData);
		dispatch({
			type: TypesOfActions.CURRENT_USER_EVENT_SET,
			payload: {
				id: eventData.id,
				name: eventData.name,
				location: eventData.location,
				date: eventData.date,
				time: eventData.time,
				counts: eventData.counts,
				imgArray: eventData.imgArray,
				avatar: eventData.avatar,
				description: eventData.description,
				userWhoAddedEvent: eventData.userWhoAddedEvent
			}
		});
	};
};

export const User_Event_Set_Location = (data: any) => {
	return (dispatch: any) => {
		dispatch({
			type: TypesOfActions.CURRENT_USER_EVENT_SET_LOC,
			payload: data
		});
	};
};

export const User_Event_AddImg = (imgData: i_Redux_ActionFunc_Interface_ImgUpload) => {
	return (dispatch: any, getState: any) => {
		// console.log('INFO GOT: ', imgData);
		const profile = getState().user;

		var newMetadata = {
			cacheControl: 'public,max-age=31536000',
			contentType: 'image/webp'
		};
		var change = CheckNameMakeNew(imgData.fileName);
		// console.log('change', change);
		const getResized = fbStorage.ref(`${profile.id}/${TypesToFirebaseGlobals.FBStorage_EventImgs}/${change}`);
		const uploadTask = fbStorage.ref(`${profile.id}/${TypesToFirebaseGlobals.FBStorage_EventImgs}/${imgData.fileName}`).put(imgData.file, newMetadata);
		uploadTask.on(
			'state_changed',
			(snapshot) => {
				// Observe state change events such as progress, pause, and resume
				// Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
				var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
				// console.log('Upload is ' + progress + '% done');
				dispatch({
					type: TypesOfActions.FILE_UPLOAD_PROGRESS,
					payload: {
						progress: progress.toFixed(0),
						fileName: imgData.fileName
					}
				});
				dispatch({
					type: TypesOfActions.SHOW_LOADER,
					payload: 'start'
				});
			},
			(error) => {
				// Handle unsuccessful uploads
				dispatch({
					type: TypesOfActions.CURRENT_USER_GLOBAL_ERRORS,
					payload: error
				});
			},
			() => {
				// Handle successful uploads on complete
				// For instance, get the download URL: https://firebasestorage.googleapis.com/...
				setTimeout(() => {
					getResized
						.getDownloadURL()

						.then((downloadURL) => {
							// console.log('File available at', downloadURL);
							// make full array from from profile arra plus this one
							var arr: string[] = [];
							var secArr: string[] = [];
							var combArr: string[] = [];
							var itemId: string = '';
							itemId = getState().events.creatingEvent.id;
							arr = getState().events.pendingImgUrl;
							secArr = getState().events.creatingEvent.imgArray;
							combArr = [...arr, ...secArr];

							console.log('can i get the correct id???', itemId);

							console.log('arr', arr);
							console.log('secarr', secArr);
							// eslint-disable-next-line
							secArr.length > 0 ? (arr = combArr) : (arr = arr);

							console.log('b4', arr);
							//.filter(function (a: string) {
							// return a !== '/static/media/no-img.6732bd42.png' || a.length !== 0;
							// } )

							arr.push(downloadURL);
							console.log('ARRR ', arr);

							fbDatabase.ref(`${TypesToFirebaseGlobals.Events_Root}/${itemId}/imgArray`).update(arr);

							return arr;
						})
						.then((arr) => {
							console.log('after then', arr);
							dispatch({
								type: TypesOfActions.CURRENT_USER_EVENT_IMG_ADD,
								payload: arr
							});
							dispatch({
								type: TypesOfActions.SHOW_LOADER,
								payload: 'stop'
							});
						})
						.catch((error: any) => {
							dispatch({
								type: TypesOfActions.CURRENT_USER_GLOBAL_ERRORS,
								payload: error
							});
						});
				}, 5000);
			}
		);
	};
};

export const User_Event_EditImg = (imgData: i_Redux_ActionFunc_Interface_ImgEdit) => {
	return (dispatch: any, getState: any) => {
		// console.log('INFO GOT: ', imgData);
		const profile = getState().user;
		var newMetadata = {
			cacheControl: 'public,max-age=31536000',
			contentType: 'image/webp'
		};
		var change = CheckNameMakeNew(imgData.newFileName);
		// console.log('change', change);
		const getResized = fbStorage.ref(`${profile.id}/${TypesToFirebaseGlobals.FBStorage_EventImgs}/${change}`);
		const uploadTask = fbStorage.ref(`${profile.id}/${TypesToFirebaseGlobals.FBStorage_EventImgs}/${imgData.newFileName}`).put(imgData.newFile, newMetadata);
		uploadTask.on(
			'state_changed',
			(snapshot) => {
				// Observe state change events such as progress, pause, and resume
				// Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
				var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
				// console.log('Upload is ' + progress + '% done');
				dispatch({
					type: TypesOfActions.FILE_UPLOAD_PROGRESS,
					payload: {
						progress: progress.toFixed(0),
						fileName: imgData.newFileName
					}
				});
				dispatch({
					type: TypesOfActions.SHOW_LOADER,
					payload: 'start'
				});
			},
			(error) => {
				// Handle unsuccessful uploads
				dispatch({
					type: TypesOfActions.CURRENT_USER_GLOBAL_ERRORS,
					payload: error
				});
			},
			() => {
				// Handle successful uploads on complete
				// For instance, get the download URL: https://firebasestorage.googleapis.com/...
				setTimeout(() => {
					getResized
						.getDownloadURL()
						.then((downloadURL) => {
							// console.log('File available at', downloadURL);
							var newArraywithNewImg: any[] = [];
							newArraywithNewImg = [...imgData.newArray];

							// ...getState().events.pendingImgUrl.filter( function ( a: string ) {
							// 	return a !== '/static/media/no-img.6732bd42.png' || a !== imgData.oldFileName;
							// } )

							// newArraywithNewImg.push(downloadURL);
							newArraywithNewImg.splice(imgData.indexOfImg, 0, downloadURL);
							console.log('arry', newArraywithNewImg);

							dispatch({
								type: TypesOfActions.CURRENT_USER_EVENT_IMG_EDIT,
								payload: newArraywithNewImg
							});
							dispatch({
								type: TypesOfActions.SHOW_LOADER,
								payload: 'stop'
							});
						})
						.catch((error) => {
							dispatch({
								type: TypesOfActions.CURRENT_USER_GLOBAL_ERRORS,
								payload: error
							});
						});
				}, 5000);
			}
		);
	};
};

export const User_Event_DeleteImg = (imgData: i_Redux_ActionFunc_Interface_ImgDelete) => {
	return (dispatch: any, getState: any) => {
		var newArraywithNewImg: any[] = [];
		newArraywithNewImg = [...imgData.newArray];

		//...getState().events.pendingImgUrl.filter(function (a: string) {
		// return a !== '/static/media/no-img.6732bd42.png'
		// }),

		console.log('DELETE arry', newArraywithNewImg);

		dispatch({
			type: TypesOfActions.CURRENT_USER_EVENT_IMG_EDIT,
			payload: newArraywithNewImg
		});
	};
};

export const User_Event_Save = (data: i_BaseInterface_Event) => {
	return (dispatch: any, getState: any) => {
		// console.log('INFO GOT: ', data);
		const profile = getState().user;
		var obj: i_BaseInterface_EventIndexer = {
			id: data.id
		};
		// console.log('obj', obj);
		var LocObj = {
			address: {
				district: data.location.address.district !== undefined ? data.location.address.district : '',
				houseNumber: data.location.address.houseNumber !== undefined ? data.location.address.houseNumber : '',
				street: data.location.address.street !== undefined ? data.location.address.street : '',
				city: data.location.address.city !== undefined ? data.location.address.city : '',
				state: data.location.address.state !== undefined ? data.location.address.state : '',
				postalCode: data.location.address.postalCode !== undefined ? data.location.address.postalCode : '',
				country: data.location.address.country !== undefined ? data.location.address.country : '',
				county: data.location.address.county !== undefined ? data.location.address.county : '',
				label: data.location.address.label !== undefined ? data.location.address.label : ''
			},
			locationId: data.location.locationId,
			locationType: data.location.locationType,
			coords: data.location.coords
		};
		var EventDataFormat: i_BaseInterface_Event = {
			id: data.id,
			name: data.name,
			location: LocObj,
			date: data.date,
			time: data.time,
			counts: data.counts,
			imgArray: data.imgArray,
			avatar: data.imgArray[0],
			description: data.description,
			dateCreated: new Date().getTime(),
			userWhoAddedEvent: data.userWhoAddedEvent
		};

		var tlData: iTimeLineEntry = {
			type: 'User added new event',
			date: new Date().getTime(),
			name: data.userWhoAddedEvent.name,
			id: data.userWhoAddedEvent.id,
			content: {
				avatar: data.userWhoAddedEvent.avatar,
				event: EventDataFormat
			}
		};
		// console.log('EventDataFormat', EventDataFormat);
		fbDatabase
			.ref(`${TypesToFirebaseGlobals.User_Root}/${profile.id}/${TypesToFirebaseGlobals.Events_Container}/${data.id}`)
			.set(obj)
			.catch((error) => {
				dispatch({
					type: TypesOfActions.CURRENT_USER_GLOBAL_ERRORS,
					payload: error
				});
			});

		fbDatabase
			.ref(`${TypesToFirebaseGlobals.Events_Root}/${data.id}`)
			.set(EventDataFormat)
			.catch((error) => {
				dispatch({
					type: TypesOfActions.CURRENT_USER_GLOBAL_ERRORS,
					payload: error
				});
			});

		fbDatabase
			.ref(`${TypesToFirebaseGlobals.TIMELINE}`)
			.push(tlData)
			.catch((error) => {
				dispatch({
					type: TypesOfActions.CURRENT_USER_GLOBAL_ERRORS,
					payload: error
				});
			});
	};
};

export const User_Event_Update = (data: i_Redux_ActionFunc_Interface_Event_SetOnNav) => {
	return (dispatch: any) => {
		console.log('INFO GOT: ', data);
		var LocObj = {
			address: {
				district: data.location.address.district !== undefined ? data.location.address.district : '',
				houseNumber: data.location.address.houseNumber !== undefined ? data.location.address.houseNumber : '',
				street: data.location.address.street !== undefined ? data.location.address.street : '',
				city: data.location.address.city !== undefined ? data.location.address.city : '',
				state: data.location.address.state !== undefined ? data.location.address.state : '',
				postalCode: data.location.address.postalCode !== undefined ? data.location.address.postalCode : '',
				country: data.location.address.country !== undefined ? data.location.address.country : '',
				county: data.location.address.county !== undefined ? data.location.address.county : '',
				label: data.location.address.label !== undefined ? data.location.address.label : ''
			},
			locationId: data.location.locationId,
			locationType: data.location.locationType,
			coords: data.location.coords
		};
		var EventDataFormat = {
			id: data.id,
			name: data.name,
			location: LocObj,
			date: data.date,
			time: data.time,
			counts: data.counts,
			imgArray: data.imgArray,
			avatar: data.imgArray[0],
			description: data.description,
			userWhoAddedEvent: data.userWhoAddedEvent
		};
		// console.log('EventDataFormat', EventDataFormat);

		if (data.timelineId !== undefined && data.timelineId.length > 0) {
			console.log('enter tl update');
			fbDatabase.ref(`${TypesToFirebaseGlobals.TIMELINE}/${data.timelineId}/content/event`).update(data);
		} else {
			console.log('cannot enter tl update', data.timelineId);
		}
		fbDatabase
			.ref(`${TypesToFirebaseGlobals.Events_Root}/${data.id}`)
			.update(EventDataFormat)
			.catch((error) => {
				dispatch({
					type: TypesOfActions.CURRENT_USER_GLOBAL_ERRORS,
					payload: error
				});
			});
	};
};

export const User_Event_going = (event: i_Redux_ActionFunc_Interface_Event_Going) => {
	return (dispatch: any) => {
		// console.log('event going ', event, event.event.id, event.going);
		var other = event.event.counts.goingAdded !== undefined ? event.event.counts.goingAdded : {};
		// console.log('other', other);
		var updateObj = {
			counts: {
				going: event.going,
				goingAdded: {
					...other,
					...event.goingAdded
				},
				intrested: event.event.counts.intrested !== undefined ? event.event.counts.intrested : 0,
				intrestedAdded: event.event.counts.intrestedAdded !== undefined ? event.event.counts.intrestedAdded : {},
				liked: 0
			}
		};
		// console.log('updateObj', updateObj);
		event.event.counts.going = event.going;
		event.event.counts.goingAdded = updateObj.counts.goingAdded;

		// console.log('sendG', sendG);
		fbDatabase
			.ref(`${TypesToFirebaseGlobals.Events_Root}/${event.event.id}`)
			.update({ counts: updateObj.counts })
			.catch((error) => {
				dispatch({
					type: TypesOfActions.CURRENT_USER_GLOBAL_ERRORS,
					payload: error
				});
			});
	};
};

export const User_Event_Intrested = (event: i_Redux_ActionFunc_Interface_Event_Going) => {
	return (dispatch: any) => {
		// console.log('event going ', event, event.event.id, event.going);
		var other = event.event.counts.intrestedAdded !== undefined ? event.event.counts.intrestedAdded : {};
		// console.log('other', other);
		var updateObj = {
			counts: {
				going: event.event.counts.going,
				goingAdded: event.event.counts.goingAdded,
				intrestedAdded: {
					...other,
					...event.goingAdded
				},
				intrested: event.going,
				liked: event.event.counts.liked
			}
		};
		// console.log('updateObj', updateObj);
		event.event.counts.intrested = event.going;
		event.event.counts.intrestedAdded = updateObj.counts.intrestedAdded;

		fbDatabase
			.ref(`${TypesToFirebaseGlobals.Events_Root}/${event.event.id}`)
			.update({ counts: updateObj.counts })
			.catch((error) => {
				dispatch({
					type: TypesOfActions.CURRENT_USER_GLOBAL_ERRORS,
					payload: error
				});
			});
	};
};

export const EventDelete = (reqData: { userId: string; eventId: string }) => {
	return (dispatch: any) => {
		console.log('data', reqData);
		fbDatabase
			.ref(`${TypesToFirebaseGlobals.Events_Root}/${reqData.eventId}`)
			.remove()
			.catch((error) => {
				dispatch({
					type: TypesOfActions.CURRENT_USER_GLOBAL_ERRORS,
					payload: error
				});
			});

		fbDatabase
			.ref(`${TypesToFirebaseGlobals.User_Root}/${reqData.userId}/events/${reqData.eventId}`)
			.remove()
			.catch((error) => {
				dispatch({
					type: TypesOfActions.CURRENT_USER_GLOBAL_ERRORS,
					payload: error
				});
			});
	};
};

import FIREBASE from '../../../firebase/firebaseConfig';
import { TypesToFirebaseGlobals } from '../../../firebase/TypesToServer';
import { i_BaseInterface_User, i_BaseInterface_Member, followingData } from '../../../../models/001UserModels';
import { i_Redux_ActionFunc_Interface_ImgUpload, i_Redux_ActionFunc_Interface_ImgEdit, i_Redux_ActionFunc_Interface_ImgDelete } from '../../../../models/007ImageModels';
import { NamedDict } from '../../../helpers/Tools';
import { catItemIndexer } from '../../../../models/002CatagoryModels';
import { convertObjectToArray } from '../../../ownServices/ConverterFuncs';
import { i_BaseInterface_Group } from '../../../../models/004GroupModels';
import { CheckNameMakeNew } from '../../../ownServices/HelperFuncs';
import { TypesOfActions } from '../../TypesOfActions';
import { subtype } from '../../../../pages/userPersonalPages/accountSettings/28UserNotificationPermissions';
import { i_BaseInterface_Item } from '../../../../models/006ItemModels';
import { i_BaseInterface_Event } from '../../../../models/005EventModels';
import { Post_A_FAQ } from '../../../../models/010SupportModels';

const fbDatabase = FIREBASE.database();
const fbStorage = FIREBASE.storage();

export const User_ChangeLang = (user: i_BaseInterface_User) => {
	return (dispatch: any) => {
		//console.log('INFO GOT: ', user);
		//make async call to firebase server
		fbDatabase
			.ref(`${TypesToFirebaseGlobals.User_Root}/${user.id}`)
			.update({ lang: user.lang })
			.catch((error) => {
				// The write failed...
				// console.log('error adding', error);
				dispatch({
					type: TypesOfActions.CURRENT_USER_GLOBAL_ERRORS,
					payload: error
				});
			});
	};
};

export const User_Update = (user: any) => {
	return (dispatch: any, getState: any) => {
		// console.log('INFO GOT: ', user.categories);
		const profile = getState().user;
		var changedObj: NamedDict<catItemIndexer> = {};
		convertObjectToArray(user.categories).forEach((cat) => {
			// console.log('cat', cat);
			changedObj = {
				...changedObj,
				[cat.checkMatch]: {
					name: cat.checkMatch,
					checkMatch: cat.checkMatch,
					avatar: cat.avatar,
					items: {}
				}
			};
			convertObjectToArray(cat.items).forEach((item) => {
				// console.log('item', item);
				changedObj[cat.checkMatch].items = {
					...changedObj[cat.checkMatch].items,
					[item.id]: {
						id: item.id,
						categories: item.categories
					}
				};
				return changedObj;
			});
			return changedObj;
		});

		var UserUpdatedObj = {
			name: user.name.length === 0 ? profile.name : user.name,
			avatar: profile.avatar ? profile.avatar : user.imgArray[0],
			imgArray: user.imgArray ? user.imgArray : profile.imgArray,
			bio: user.userBioUpdate ? user.userBioUpdate : profile.bio,
			categories: convertObjectToArray(user.categories).length > 0 ? changedObj : profile.categories
		};

		fbDatabase
			.ref(`${TypesToFirebaseGlobals.User_Root}/${profile.id}`)
			.update(UserUpdatedObj)
			.then(() => {
				if (user.name !== profile.name && user.name.length > 0) {
					fbDatabase
						.ref(`${TypesToFirebaseGlobals.Groups_Root}`)
						.once('value')
						.then((snapshot: any) => {
							// console.log('snapshot', snapshot.val());
							const data = snapshot.val();
							if (data !== null) {
								// eslint-disable-next-line
								convertObjectToArray(data).forEach((entry: i_BaseInterface_Group) => {
									// console.log('entry', entry);
									if (entry.membersList) {
										// eslint-disable-next-line
										convertObjectToArray(entry.membersList).forEach((mem: i_BaseInterface_Member) => {
											// console.log('mem', mem);
											if (mem.id === profile.id) {
												fbDatabase
													.ref(`${TypesToFirebaseGlobals.Groups_Root}/${entry.id}`)
													.child('membersList')
													.child(mem.id)
													.update({
														name: user.name,
														avatar: UserUpdatedObj.avatar
													})
													.catch((error) => {
														dispatch({
															type: TypesOfActions.CURRENT_USER_GLOBAL_ERRORS,
															payload: error
														});
													});
											}
										});
									}
								});
							}
						});

					fbDatabase
						.ref(`${TypesToFirebaseGlobals.Items_Root}`)
						.once('value')
						.then((snapshot: any) => {
							// console.log('snapshot', snapshot.val());
							const data = snapshot.val();
							if (data !== null) {
								// eslint-disable-next-line
								convertObjectToArray(data).forEach((entry: i_BaseInterface_Item) => {
									// console.log('entry', entry);
									if (entry.userWhoAddedItem.id === profile.id) {
										// eslint-disable-next-line
										fbDatabase
											.ref(`${TypesToFirebaseGlobals.Items_Root}/${entry.id}`)
											.child('userWhoAddedItem')
											.update({
												name: user.name,
												avatar: UserUpdatedObj.avatar
											})
											.catch((error) => {
												dispatch({
													type: TypesOfActions.CURRENT_USER_GLOBAL_ERRORS,
													payload: error
												});
											});
									}
								});
							}
						});

					fbDatabase
						.ref(`${TypesToFirebaseGlobals.Donations_Root}`)
						.once('value')
						.then((snapshot: any) => {
							// console.log('snapshot', snapshot.val());
							const data = snapshot.val();
							if (data !== null) {
								// eslint-disable-next-line
								convertObjectToArray(data).forEach((entry: i_BaseInterface_Item) => {
									// console.log('entry', entry);
									if (entry.userWhoAddedItem.id === profile.id) {
										// eslint-disable-next-line
										fbDatabase
											.ref(`${TypesToFirebaseGlobals.Donations_Root}/${entry.id}`)
											.child('userWhoAddedItem')
											.update({
												name: user.name,
												avatar: UserUpdatedObj.avatar
											})
											.catch((error) => {
												dispatch({
													type: TypesOfActions.CURRENT_USER_GLOBAL_ERRORS,
													payload: error
												});
											});
									}
								});
							}
						});

					fbDatabase
						.ref(`${TypesToFirebaseGlobals.Events_Root}`)
						.once('value')
						.then((snapshot: any) => {
							// console.log('snapshot', snapshot.val());
							const data = snapshot.val();
							if (data !== null) {
								// eslint-disable-next-line
								convertObjectToArray(data).forEach((entry: i_BaseInterface_Event) => {
									// console.log('entry', entry);
									if (entry.userWhoAddedEvent.id === profile.id) {
										// eslint-disable-next-line
										fbDatabase
											.ref(`${TypesToFirebaseGlobals.Events_Root}/${entry.id}`)
											.child('userWhoAddedEvent')
											.update({
												name: user.name,
												avatar: UserUpdatedObj.avatar
											})
											.catch((error) => {
												dispatch({
													type: TypesOfActions.CURRENT_USER_GLOBAL_ERRORS,
													payload: error
												});
											});
									}
								});
							}
						});

					fbDatabase
						.ref(`${TypesToFirebaseGlobals.FAQ_Root}`)
						.once('value')
						.then((snapshot: any) => {
							// console.log('snapshot', snapshot.val());
							const data = snapshot.val();
							if (data !== null) {
								// eslint-disable-next-line
								convertObjectToArray(data).forEach((entry: Post_A_FAQ) => {
									// console.log('entry', entry);
									if (entry.userWhoFAQ.id === profile.id) {
										// eslint-disable-next-line
										fbDatabase
											.ref(`${TypesToFirebaseGlobals.FAQ_Root}/${entry.id}`)
											.child('userWhoFAQ')
											.update({
												name: user.name,
												avatar: UserUpdatedObj.avatar
											})
											.catch((error) => {
												dispatch({
													type: TypesOfActions.CURRENT_USER_GLOBAL_ERRORS,
													payload: error
												});
											});
									}
								});
							}
						});

					fbDatabase
						.ref(`${TypesToFirebaseGlobals.User_Root}`)
						.once('value')
						.then((snapshot: any) => {
							// console.log('snapshot', snapshot.val());
							const data = snapshot.val();
							if (data !== null) {
								// eslint-disable-next-line
								convertObjectToArray(data).forEach((entry: i_BaseInterface_User) => {
									// console.log('entry', entry);
									convertObjectToArray(entry.UsersFollowingMe).forEach((i: i_BaseInterface_Member) => {
										if (i.id === profile.id) {
											// eslint-disable-next-line
											fbDatabase
												.ref(`${TypesToFirebaseGlobals.User_Root}/${entry.id}/UsersFollowingMe/${i.id}`)
												.update({
													name: user.name,
													avatar: UserUpdatedObj.avatar
												})
												.catch((error) => {
													dispatch({
														type: TypesOfActions.CURRENT_USER_GLOBAL_ERRORS,
														payload: error
													});
												});
										}
									});
								});
							}
						});
				}
			})

			.catch((error) => {
				// The write failed...
				// console.log('error adding', error);
				dispatch({
					type: TypesOfActions.CURRENT_USER_GLOBAL_ERRORS,
					payload: error
				});
			});
	};
};

export const User_Profile_AddImg = (imgData: i_Redux_ActionFunc_Interface_ImgUpload) => {
	return (dispatch: any, getState: any) => {
		// console.log('INFO GOT: ', imgData);
		const profile = getState().user;
		var newMetadata = {
			cacheControl: 'public,max-age=31536000',
			contentType: 'image/webp'
		};
		var change = CheckNameMakeNew(imgData.fileName);
		// console.log('change', change);
		const getResized = fbStorage.ref(`${profile.id}/${TypesToFirebaseGlobals.FBStorage_profileImgs}/${change}`);
		const uploadTask = fbStorage.ref(`${profile.id}/${TypesToFirebaseGlobals.FBStorage_profileImgs}/${imgData.fileName}`).put(imgData.file, newMetadata);
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
							console.log('File available at', downloadURL);
							// make full array from from profile arra plus this one
							var sendArray = [
								...getState().user.imgArray.filter(function (a: string) {
									return a !== '/static/media/no-img.6732bd42.png';
								})
							];
							sendArray.push(downloadURL);
							// console.log(`${TypesToFirebaseGlobals.User_Root}/${profile.id}`);
							return sendArray;
						})
						.then((arr) => {
							fbDatabase.ref(`${TypesToFirebaseGlobals.User_Root}/${profile.id}`).update(
								{
									imgArray: arr,
									avatar: arr[0]
								},
								function (error) {
									if (error) {
										// The write failed...
										// console.log('error adding', error);
										dispatch({
											type: TypesOfActions.CURRENT_USER_GLOBAL_ERRORS,
											payload: error
										});
									} else {
										dispatch({
											type: TypesOfActions.SHOW_LOADER,
											payload: 'stop'
										});
									}
								}
							);
						});
				}, 5000);
			}
		);
	};
};

export const User_Profile_EditImg = (imgData: i_Redux_ActionFunc_Interface_ImgEdit) => {
	return (dispatch: any, getState: any) => {
		// console.log('INFO GOT: ', imgData);
		const profile = getState().user;
		var newMetadata = {
			cacheControl: 'public,max-age=31536000',
			contentType: 'image/webp'
		};
		var change = CheckNameMakeNew(imgData.newFileName);
		// console.log('change', change);
		const getResized = fbStorage.ref(`${profile.id}/${TypesToFirebaseGlobals.FBStorage_profileImgs}/${change}`);
		const uploadTask = fbStorage.ref(`${profile.id}/${TypesToFirebaseGlobals.FBStorage_profileImgs}/${imgData.newFileName}`).put(imgData.newFile, newMetadata);
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
							var newArraywithNewImg = [
								//...imgData.newArray
								...imgData.newArray.filter(function (a: string) {
									return a !== '/static/media/no-img.6732bd42.png';
								})
							]; // make a separate copy of the array
							// newArraywithNewImg.push(downloadURL);
							newArraywithNewImg.splice(imgData.indexOfImg, 0, downloadURL);
							// console.log('arry', newArraywithNewImg);
							return newArraywithNewImg;
						})
						.then((newArraywithNewImg) => {
							fbDatabase
								.ref(`${TypesToFirebaseGlobals.User_Root}/${profile.id}`)
								.update({
									imgArray: newArraywithNewImg,
									avatar: newArraywithNewImg[0]
								})
								.then(() => {
									dispatch({
										type: TypesOfActions.SHOW_LOADER,
										payload: 'stop'
									});
								})
								.then(() => {
									// console.log('updated storage of img now dispatching updata ???');
									// console.log(`${TypesToFirebaseGlobals.Groups_Root}`);
									fbDatabase
										.ref(`${TypesToFirebaseGlobals.Groups_Root}`)
										.once('value')
										.then((snapshot: any) => {
											// console.log('snapshot', snapshot.val());
											const data = snapshot.val();
											if (data !== null) {
												// eslint-disable-next-line
												convertObjectToArray(data).forEach((entry: i_BaseInterface_Group) => {
													// console.log('entry', entry);
													if (entry.membersList) {
														// eslint-disable-next-line
														convertObjectToArray(entry.membersList).forEach((mem: i_BaseInterface_Member) => {
															// console.log('mem', mem);
															if (mem.id === profile.id) {
																fbDatabase
																	.ref(`${TypesToFirebaseGlobals.Groups_Root}/${entry.id}`)
																	.child('membersList')
																	.child(mem.id)
																	.update({
																		avatar: newArraywithNewImg[0]
																	})
																	.catch((error) => {
																		dispatch({
																			type: TypesOfActions.CURRENT_USER_GLOBAL_ERRORS,
																			payload: error
																		});
																	});
															}
														});
													}
												});
											}
										});

									fbDatabase
										.ref(`${TypesToFirebaseGlobals.Items_Root}`)
										.once('value')
										.then((snapshot: any) => {
											// console.log('snapshot', snapshot.val());
											const data = snapshot.val();
											if (data !== null) {
												// eslint-disable-next-line
												convertObjectToArray(data).forEach((entry: i_BaseInterface_Item) => {
													// console.log('entry', entry);
													if (entry.userWhoAddedItem.id === profile.id) {
														// eslint-disable-next-line
														fbDatabase
															.ref(`${TypesToFirebaseGlobals.Items_Root}/${entry.id}`)
															.child('userWhoAddedItem')
															.update({
																avatar: newArraywithNewImg[0]
															})
															.catch((error) => {
																dispatch({
																	type: TypesOfActions.CURRENT_USER_GLOBAL_ERRORS,
																	payload: error
																});
															});
													}
												});
											}
										});

									fbDatabase
										.ref(`${TypesToFirebaseGlobals.Donations_Root}`)
										.once('value')
										.then((snapshot: any) => {
											// console.log('snapshot', snapshot.val());
											const data = snapshot.val();
											if (data !== null) {
												// eslint-disable-next-line
												convertObjectToArray(data).forEach((entry: i_BaseInterface_Item) => {
													// console.log('entry', entry);
													if (entry.userWhoAddedItem.id === profile.id) {
														// eslint-disable-next-line
														fbDatabase
															.ref(`${TypesToFirebaseGlobals.Donations_Root}/${entry.id}`)
															.child('userWhoAddedItem')
															.update({
																avatar: newArraywithNewImg[0]
															})
															.catch((error) => {
																dispatch({
																	type: TypesOfActions.CURRENT_USER_GLOBAL_ERRORS,
																	payload: error
																});
															});
													}
												});
											}
										});

									fbDatabase
										.ref(`${TypesToFirebaseGlobals.Events_Root}`)
										.once('value')
										.then((snapshot: any) => {
											// console.log('snapshot', snapshot.val());
											const data = snapshot.val();
											if (data !== null) {
												// eslint-disable-next-line
												convertObjectToArray(data).forEach((entry: i_BaseInterface_Event) => {
													// console.log('entry', entry);
													if (entry.userWhoAddedEvent.id === profile.id) {
														// eslint-disable-next-line
														fbDatabase
															.ref(`${TypesToFirebaseGlobals.Events_Root}/${entry.id}`)
															.child('userWhoAddedEvent')
															.update({
																avatar: newArraywithNewImg[0]
															})
															.catch((error) => {
																dispatch({
																	type: TypesOfActions.CURRENT_USER_GLOBAL_ERRORS,
																	payload: error
																});
															});
													}
												});
											}
										});

									fbDatabase
										.ref(`${TypesToFirebaseGlobals.FAQ_Root}`)
										.once('value')
										.then((snapshot: any) => {
											// console.log('snapshot', snapshot.val());
											const data = snapshot.val();
											if (data !== null) {
												// eslint-disable-next-line
												convertObjectToArray(data).forEach((entry: Post_A_FAQ) => {
													// console.log('entry', entry);
													if (entry.userWhoFAQ.id === profile.id) {
														// eslint-disable-next-line
														fbDatabase
															.ref(`${TypesToFirebaseGlobals.FAQ_Root}/${entry.id}`)
															.child('userWhoFAQ')
															.update({
																avatar: newArraywithNewImg[0]
															})
															.catch((error) => {
																dispatch({
																	type: TypesOfActions.CURRENT_USER_GLOBAL_ERRORS,
																	payload: error
																});
															});
													}
												});
											}
										});

									fbDatabase
										.ref(`${TypesToFirebaseGlobals.User_Root}`)
										.once('value')
										.then((snapshot: any) => {
											// console.log('snapshot', snapshot.val());
											const data = snapshot.val();
											if (data !== null) {
												// eslint-disable-next-line
												convertObjectToArray(data).forEach((entry: i_BaseInterface_User) => {
													// console.log('entry', entry);
													convertObjectToArray(entry.UsersFollowingMe).forEach((i: i_BaseInterface_Member) => {
														if (i.id === profile.id) {
															// eslint-disable-next-line
															fbDatabase
																.ref(`${TypesToFirebaseGlobals.User_Root}/UsersFollowingMe/${i.id}`)
																.update({
																	avatar: newArraywithNewImg[0]
																})

																.catch((error) => {
																	dispatch({
																		type: TypesOfActions.CURRENT_USER_GLOBAL_ERRORS,
																		payload: error
																	});
																});
														}
													});
												});
											}
										});
								})
								.then(() => {
									window.location.replace('/dashboard');
								})
								.catch((error) => {
									// console.log('Huston we have a problem', error);
									dispatch({
										type: TypesOfActions.CURRENT_USER_GLOBAL_ERRORS,
										payload: error
									});
								});
						});
				}, 5000);
			}
		);
	};
};

export const User_Profile_DeleteImg = (imgData: i_Redux_ActionFunc_Interface_ImgDelete) => {
	return (dispatch: any, getState: any) => {
		const profile = getState().user;
		if (imgData.newArray.length === 0) {
			imgData.newArray.push(TypesToFirebaseGlobals.placeholderImg);
		}

		fbDatabase
			.ref(`${TypesToFirebaseGlobals.User_Root}/${profile.id}`)
			.update({
				imgArray: imgData.newArray,
				avatar: imgData.newArray[0]
			})
			.then(() => {
				window.location.replace('/dashboard');
			})
			.catch((error) => {
				// console.log('Huston we have a problem', error);
				dispatch({
					type: TypesOfActions.CURRENT_USER_GLOBAL_ERRORS,
					payload: error
				});
			});
	};
};

export const User_Update_Location = (locationData: any) => {
	return (dispatch: any, getState: any) => {
		// console.log('INFO GOT: ', locationData);
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
		// //server call
		fbDatabase
			.ref(`${TypesToFirebaseGlobals.User_Root}/${profile.id}`)
			.update(newLoc)
			.catch((error) => {
				// The write failed...
				// console.log('error adding', error);
				dispatch({
					type: TypesOfActions.CURRENT_USER_GLOBAL_ERRORS,
					payload: error
				});
			});
	};
};

export const User_Update_SubType = (data: any) => {
	return (dispatch: any) => {
		// console.log('INFO GOT: ', data);
		// make async call to firebase server
		fbDatabase
			.ref(`${TypesToFirebaseGlobals.User_Root}/${data.id}`)
			.update({ subscriptionType: data.sub })

			.catch((error) => {
				// The write failed...
				// console.log('error adding', error);
				dispatch({
					type: TypesOfActions.CURRENT_USER_GLOBAL_ERRORS,
					payload: error
				});
			});
	};
};

export const User_AddFollowing = (FollowingData: followingData) => {
	return (dispatch: any) => {
		fbDatabase
			.ref(`${TypesToFirebaseGlobals.User_Root}/${FollowingData.currentUser.id}/${TypesToFirebaseGlobals.followers}/${FollowingData.follow.id}`)
			.update(FollowingData.follow)
			.catch((error) => {
				dispatch({
					type: TypesOfActions.CURRENT_USER_GLOBAL_ERRORS,
					payload: error
				});
			});

		fbDatabase
			.ref(`${TypesToFirebaseGlobals.User_Root}/${FollowingData.follow.id}/${TypesToFirebaseGlobals.followersMe}/${FollowingData.currentUser.id}`)
			.update(FollowingData.currentUser)
			.catch((error) => {
				dispatch({
					type: TypesOfActions.CURRENT_USER_GLOBAL_ERRORS,
					payload: error
				});
			});
	};
};

export const User_RemoveFollowing = (followingData: followingData) => {
	return (dispatch: any) => {
		fbDatabase
			.ref(`${TypesToFirebaseGlobals.User_Root}/${followingData.currentUser.id}/${TypesToFirebaseGlobals.followers}/${followingData.follow.id}`)
			// .update(followingData.follow)
			.remove()
			.catch((error) => {
				dispatch({
					type: TypesOfActions.CURRENT_USER_GLOBAL_ERRORS,
					payload: error
				});
			});

		fbDatabase
			.ref(`${TypesToFirebaseGlobals.User_Root}/${followingData.follow.id}/${TypesToFirebaseGlobals.followersMe}/${followingData.currentUser.id}`)
			// .update(followingData.currentUser)
			.remove()
			.catch((error) => {
				dispatch({
					type: TypesOfActions.CURRENT_USER_GLOBAL_ERRORS,
					payload: error
				});
			});
	};
};

export const User_Update_NotifyToken = (token: string) => {
	return (dispatch: any, getState: any) => {
		const profile = getState().user;
		// console.log('INFO GOT: ', token);
		fbDatabase
			.ref(`${TypesToFirebaseGlobals.User_Root}/${profile.id}`)
			.child('notifyToken')
			.set(token)
			.catch((error) => {
				dispatch({
					type: TypesOfActions.CURRENT_USER_GLOBAL_ERRORS,
					payload: error
				});
			});
		// fbDatabase
		// 	.ref(`${TypesToFirebaseGlobals.TOKENS}/${profile.id}`)
		// 	.set(token)
		// 	.catch((error) => {
		// 		dispatch({
		// 			type: TypesOfActions.CURRENT_USER_GLOBAL_ERRORS,
		// 			payload: error
		// 		});
		// 	});
	};
};

export const AddNotifToRedux = (notifs: any[]) => {
	return (dispatch: any) => {
		dispatch({
			type: TypesOfActions.CURRENT_USER_NOTIFS,
			payload: notifs
		});
	};
};

export const User_Update_Notify_SubTypes = (subtypeObj: subtype) => {
	return (dispatch: any, getState: any) => {
		const profile = getState().user;
		// console.log('INFO GOT: ', subtypeObj);
		fbDatabase
			.ref(`${TypesToFirebaseGlobals.User_Root}/${profile.id}`)
			.child(TypesToFirebaseGlobals.notifySubs)
			.set(subtypeObj)
			.catch((error) => {
				dispatch({
					type: TypesOfActions.CURRENT_USER_GLOBAL_ERRORS,
					payload: error
				});
			});
	};
};

export const SetStateAddImg = (data: { bio: string; name: string }) => {
	return (dispatch: any) => {
		dispatch({
			type: TypesOfActions.CURRENT_USER_ADD_IMG,
			payload: data
		});
	};
};

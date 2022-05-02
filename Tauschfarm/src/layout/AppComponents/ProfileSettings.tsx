import React, { Component, Dispatch } from 'react';
import { IAppState } from '../../services/redux/reduxModels';
import { i_BaseInterface_User } from '../../models/001UserModels';
import { User_Update, SetStateAddImg } from '../../services/redux/actions/userActions/001UserActions';
import { connect } from 'react-redux';
import { NamedDict } from '../../services/helpers/Tools';
import { i_BaseInterface_Category } from '../../models/002CatagoryModels';
import {
	IonList,
	IonItem,
	IonInput,
	IonButton,
	IonIcon,
	IonLabel,
	IonSelectOption,
	IonSelect,
	IonGrid,
	IonRow,
	IonTitle,
	IonTextarea,
	IonSpinner,
	IonCard,
	IonCol,
	IonPopover,
	IonCardHeader,
	IonCardTitle,
	IonCardSubtitle,
	IonCardContent,
	IonReorderGroup,
	IonFab,
	IonRouterLink,
	IonFabButton,
	IonReorder
} from '@ionic/react';
import { CombinedString } from '../../services/translate/CombinedStrings';
import { Translate } from '../../services/translate/TranslateServices';
import { lsInj } from '../../services/translate/LocalLangDict';
import { trashBin, pencil } from 'ionicons/icons';
import { convertObjectToArray } from '../../services/ownServices/ConverterFuncs';
import { AppStartGloabalBase_Categories } from '../../models/AppStartGlobal_CatSetUp';
import { Group_AddCats } from '../../services/redux/actions/userActions/006GroupsActions';
import ProfileSettingsLoadingScreen from '../Loading_Redirecting/ProfileSettingsLoadingScreen';
import { RedirectTo } from '../Loading_Redirecting/CommonUIServices';
import { AllRoutesListed } from '../../routes/AllRoutesListed';
import { TypesToFirebaseGlobals } from '../../services/firebase/TypesToServer';

interface iState {
	name: string;
	stringNames: string[];
	categories: {};
	userBioUpdate: string;
	allowPres: boolean;
	showModal: boolean;
	showmodal: boolean;
	oldCats: NamedDict<i_BaseInterface_Category>;
	imgArray: string[];
}

export interface GroupProfileUpdate {
	groupId: string;
	description: string;
	name: string;
	categories: any;
	imgArray: string[];
}

function sortByTextDsc(a: any, b: any) {
	if (a.name !== undefined && b.name !== undefined) {
		const diff = a.name.toLowerCase().localeCompare(b.name.toLowerCase());
		return -1 * -diff;
	} else return 1;
}

export class ProfileSettings extends Component<any, iState> {
	catString = '';

	componentDidMount() {
		const { isFirst, uOg } = this.props;
		this.setState({ showmodal: isFirst && uOg === 'group' ? true : false });
	}

	constructor(props: any) {
		super(props);
		const { user, isFirst, uOg } = this.props;
		console.log(isFirst, uOg);

		this.state = {
			oldCats: user.categories,
			name: user.name,
			stringNames: [],
			categories: [],
			userBioUpdate: user.bio !== undefined ? user.bio : user.description,
			allowPres: false,
			showModal: false,
			showmodal: isFirst && uOg === 'group' ? true : false,
			imgArray: user.imgArray
		};

		this.setCatString = this.setCatString.bind(this);
		this.addCat = this.addCat.bind(this);
		this.changeUsername = this.changeUsername.bind(this);
		this.Submit = this.Submit.bind(this);

		// console.log('Props ProfileSettings', isFirst, this.props);
	}

	componentDidUpdate(prevProps: any) {
		if (prevProps.user.categories !== this.props.user.categories) {
			this.setState({
				name: this.props.user.name,
				stringNames: [],
				categories: [],
				userBioUpdate: this.props.user.bio,
				allowPres: false,
				showModal: false,
				oldCats: this.props.user.categories,
				showmodal: this.props.isFirst && this.props.uOg === 'group' ? true : false
			});
		}
		if (prevProps.user.imgArray !== this.props.user.imgArray) {
			this.setState({
				imgArray: this.props.user.imgArray
			});
		}
	}

	setCatString(e: any) {
		e.preventDefault();
		// console.log('setString', e.detail.value);
		if (e.detail.value !== '') {
			this.catString = e.detail.value;
			return this.catString;
		}
		return this.catString;
	}

	addCat(e: any) {
		// console.log('addCat', e.detail.value);
		const { user } = this.props;
		const arrCats = e.detail.value;
		var objAll: NamedDict<i_BaseInterface_Category> = {};
		arrCats.map((cat: i_BaseInterface_Category) => {
			objAll = {
				...user.categories,
				...objAll,
				[cat.checkMatch]: cat
			};

			return objAll;
		});

		// console.log('objAll', objAll);
		this.setState({ categories: objAll });
	}

	changeUsername(e: any) {
		e.preventDefault();
		// console.log('e', e.detail.value);
		this.setState({ name: e.detail.value });
	}

	changeBio(e: any) {
		this.setState({ userBioUpdate: e.detail.value });
	}

	setOnNavAway() {
		var nav = {
			bio: this.state.userBioUpdate,
			name: this.state.name
		};
		this.props.setOnNav(nav);
	}

	Submit() {
		const { uOg, groupId, isFirst, user } = this.props;
		// // console.log('final State', this.state);
		console.log('final props', uOg, isFirst);

		if (uOg === 'user') {
			if (isFirst && uOg === 'user') {
				if (this.state.userBioUpdate.length === 0 || convertObjectToArray(this.state.categories).length === 0 || user.imgArray[0] === TypesToFirebaseGlobals.placeholderImg) {
					alert(Translate(lsInj.transDict.newbie));
					// console.log('first time after regertering', this.state, user);
				} else {
					this.props.UpdateUserSettings(this.state);
					RedirectTo(AllRoutesListed.userRoutes.dash_Landing);
				}
			} else {
				this.props.UpdateUserSettings(this.state);
				window.location.replace(AllRoutesListed.userRoutes.dash_Landing);
			}
		} else {
			// console.log('add group here');
			var send: GroupProfileUpdate = {
				groupId,
				description: this.state.userBioUpdate,
				name: this.state.name,
				categories: this.state.categories,
				imgArray: this.state.imgArray
			};
			// console.log('send', send);
			this.props.editData(send);
			// alert(Translate(lsInj.transDict.startTrial));
			window.location.replace(`/dashboard/groups`);
		}
	}

	doReorder(event: any) {
		const newArr: string[] = [...this.state.imgArray];

		// The `from` and `to` properties contain the index of the item
		console.log('Dragged from index', event.detail.from, 'to', event.detail.to);
		// when the drag started and ended, respectively

		// Finish the reorder and position the item in the DOM based on
		// where the gesture ended. This method can also be called directly
		// by the reorder group
		// event.detail.complete();

		event.detail.complete(newArr);
		console.log('oldArr', this.state.imgArray);
		console.log('newArr', newArr);
		this.setState({ imgArray: newArr });
	}

	componentWillUnmount() {
		const { isFirst, user } = this.props;
		var fakeUpdate = {
			oldCats: {},
			name: user.name,
			stringNames: [],
			categories: [],
			userBioUpdate: '',
			allowPres: false,
			showModal: false
		};
		if (isFirst && this.state.userBioUpdate.length === 0 && convertObjectToArray(this.state.categories).length === 0 && user.imgArray[0] === undefined) {
			this.props.UpdateUserSettings(fakeUpdate);
		}
	}

	render() {
		const { user, routeObJ, uOg, groupId, loading, lang, spinner } = this.props;
		return (
			<div>
				{!loading && (
					<>
						<IonList>
							<IonItem style={{ fontSize: '1.3.em' }} lines='none' className='eventInput'>
								<IonLabel position='floating'>
									{Translate(lsInj.transDict.Username)} <span style={{ opacity: 0.5, fontSize: '0.8em' }}>{Translate(lsInj.transDict.req2)}</span>
								</IonLabel>
								<IonInput placeholder={user.name} inputmode='text' type='text' name='username' value={this.state.name} onIonChange={(e) => this.changeUsername(e)} />
							</IonItem>

							<IonItem lines='none' className='eventInput' style={{ maxHeight: '200px' }}>
								<IonLabel position='floating'>
									{Translate(lsInj.transDict.placeholderProfile)} <br /> <span style={{ opacity: 0.5, fontSize: '0.7em' }}>{Translate(lsInj.transDict.req2)}</span>
								</IonLabel>
								<IonTextarea
									style={{ padding: '0px !important' }}
									autoGrow
									placeholder={user.bio}
									name='bio'
									value={this.state.userBioUpdate}
									onIonChange={(e) => this.changeBio(e)}
								/>
							</IonItem>

							<IonItem className='eventInput'>
								<IonLabel class='ion-text-wrap' style={{ fontSize: '0.9em', backgroundColor: 'var(--ion-color-secondary)', color: 'black' }}>
									{CombinedString.profilePhotos} <br /> <span style={{ opacity: 0.5, fontSize: '0.7em' }}>{Translate(lsInj.transDict.req2)}</span>
								</IonLabel>
								{/* {uOg === 'user' && ( */}
								<IonButton
									style={{ marginRight: '15px', width: '100px', height: '40px' }}
									size='small'
									fill='solid'
									onClick={() => this.setOnNavAway()}
									routerLink={routeObJ.addProfile}>
									{Translate(lsInj.transDict.Add)}
								</IonButton>
								{/* )} */}
							</IonItem>

							{/* <IonItem lines='none'> */}
							<IonGrid>
								<IonRow>
									<IonCol></IonCol>
									<IonCol>{spinner === 'start' && <IonSpinner name='circles'></IonSpinner>}</IonCol>
									<IonCol></IonCol>
								</IonRow>

								<IonReorderGroup disabled={false} onIonItemReorder={(e: any) => this.doReorder(e)}>
									{this.state.imgArray.length > 0 &&
										this.state.imgArray.slice(0, 4).map((url: any, index: number) => {
											return (
												<IonCard
													key={url}
													color='secondary'
													style={{
														width: '330px',
														height: '90px'
													}}>
													<IonCardContent style={{ margin: '0px', padding: '0px' }}>
														<IonFab style={{ top: '0', right: '0', zIndex: 'auto' }} vertical='top' horizontal='end' slot='fixed'>
															<IonRouterLink routerLink={`${routeObJ.editProfile}/${index.toString()}`}>
																<IonFabButton size='small'>
																	<IonIcon color='light' size='small' icon={pencil} />
																</IonFabButton>
															</IonRouterLink>
														</IonFab>

														<IonFab vertical='top' horizontal='start' slot='fixed'>
															<IonFabButton disabled={true} style={{ '--box-shadow': 'none', '--border-radius': '0px', fontSize: '1.4em' }}>
																{/* <IonIcon color='light' size='small' icon={pencil} /> */}
																{index + 1}
															</IonFabButton>
														</IonFab>
													</IonCardContent>

													<IonReorder>
														<img style={{ width: '90px', height: '90px' }} src={url} alt='broken' />
													</IonReorder>
												</IonCard>
											);
										})}
								</IonReorderGroup>
							</IonGrid>
							{/* </IonItem> */}

							<br />
							<br />
							<IonTitle>
								{Translate(lsInj.transDict.CatMultiple)} <span style={{ opacity: 0.5, fontSize: '0.7em' }}>{Translate(lsInj.transDict.req2)}</span>
							</IonTitle>
							<br />
							<br />

							<IonItem lines='none' style={{ width: '100%' }}>
								<IonLabel class='ion-text-wrap'>{Translate(lsInj.transDict.profileSettingsAddNewCat)}</IonLabel>
								<IonSelect multiple onIonChange={(e) => this.addCat(e)} cancelText={Translate(lsInj.transDict.Cancel)} okText={Translate(lsInj.transDict.Done)}>
									{convertObjectToArray(AppStartGloabalBase_Categories(lang))
										.sort(sortByTextDsc)
										.map((i, index: number) => {
											// console.log('what happend ?', i);
											return (
												<React.Fragment key={index}>
													{i.checkMatch !== 'Uncategorized' && (
														<IonSelectOption key={index} value={i}>
															{i.name}
														</IonSelectOption>
													)}
												</React.Fragment>
											);
										})}
								</IonSelect>
							</IonItem>
						</IonList>
						{this.state.categories &&
							convertObjectToArray(this.state.categories).map((cat: any, index: number) => {
								return (
									<IonItem key={index}>
										<IonLabel class='ion-text-wrap'>{cat.name}</IonLabel>
									</IonItem>
								);
							})}

						{this.state.oldCats &&
							convertObjectToArray(this.state.oldCats).map((cat: any, index: number) => {
								// console.log('cat', cat);
								const delroute = uOg === 'user' ? `${routeObJ.deleteCat}/${cat.checkMatch}` : `${routeObJ.deleteCat}/${cat.checkMatch}/${groupId}`;

								const editRoute = uOg === 'user' ? `${routeObJ.editCat}/${cat.checkMatch}` : `${routeObJ.editCat}/${cat.checkMatch}/${groupId}`;
								return (
									<IonItem key={index}>
										<IonLabel class='ion-text-wrap'>
											{/* {Translate(
												CategoriesToChosefrom.transDict[cat.checkMatch]
											)} */}
											{cat.name}
										</IonLabel>

										<IonLabel class='ion-text-wrap'>
											{user.categories ? convertObjectToArray(cat.items).length : 0} {Translate(lsInj.transDict.ItemMultiple)}
										</IonLabel>

										<IonButton fill='clear' routerLink={delroute}>
											<IonIcon color='secondary' slot='end' icon={trashBin} />
										</IonButton>
										<IonButton fill='clear' routerLink={editRoute}>
											<IonIcon color='secondary' slot='end' icon={pencil} />
										</IonButton>
									</IonItem>
								);
							})}
						<IonButton onClick={() => this.Submit()}>{Translate(lsInj.transDict.Save)}</IonButton>

						{this.state.showmodal && (
							<IonPopover cssClass='my-custom-class3' isOpen={this.state.showmodal} backdropDismiss={true} onDidDismiss={(e) => this.setState({ showmodal: false })}>
								<IonCard style={{ padding: '0px' }}>
									{user.lang === 'de' && (
										<>
											<IonCardHeader>
												<IonCardTitle>Um deine Tauschfarm-Gruppe vollständig anzulegen</IonCardTitle>
												<IonCardSubtitle></IonCardSubtitle>
											</IonCardHeader>
											<IonCardContent style={{ padding: '0px' }}>
												<b> Schritt 1</b> Wähle passende Kategorien aus
												<br />
												<b> Schritt 2</b>Klick auf Speichern <br />
											</IonCardContent>
										</>
									)}
									{user.lang === 'en' && (
										<>
											<IonCardHeader>
												<IonCardTitle>To publish your event </IonCardTitle>
												<IonCardSubtitle></IonCardSubtitle>
											</IonCardHeader>
											<IonCardContent>
												<b> Step 1</b> Give your event a name <br />
												<b> Step 2</b> Upload a matching image <br />
												<b> Step 3</b> Make details of date, time &amp; location <br />
												<b> Step 4</b> Describe your event <br />
												<b> Step 4</b> click Save <br />
											</IonCardContent>
										</>
									)}
									<IonButton onClick={() => this.setState({ showmodal: false })}>{Translate(lsInj.transDict.Close)}</IonButton>
								</IonCard>
							</IonPopover>
						)}
					</>
				)}
				{loading && <ProfileSettingsLoadingScreen />}
			</div>
		);
	}
}

const mapStateToProps = (state: IAppState, ownProps: any) => {
	// console.log('state', state);
	console.log('ownProps', ownProps);
	//ok so here i will have to ceck for user or group then send the user value as the correct one
	const groupId = ownProps.groupId;
	const uOg = ownProps.userOrGroup;

	const routerObjForUser = {
		editProfile: '/dashboard/settings/imgBio',
		addProfile: '/dashboard/settings/imgBio',
		deleteCat: '/dashboard/settings/categories/deleteCat',
		editCat: '/dashboard/settings/categories/editCat'
	};

	const routerObjForGroup = {
		editProfile: `/dashboard/groups/${groupId}/imgBio`,
		addProfile: `/createGroup/imgDesc/${groupId}/group`,
		deleteCat: '/dashboard/groups/categories/deleteCat',
		editCat: '/dashboard/groups/categories/editCat'
	};

	var whoUse = uOg === 'user' ? state.user : state.groups.UserGroups[groupId];
	var whoRoute = uOg === 'user' ? routerObjForUser : routerObjForGroup;

	console.log('whoUse', whoUse);
	console.log('whoRoute', whoRoute);

	return {
		spinner: state.user.loader,
		loading: state.user.isEmpty,
		user: whoUse,
		routeObJ: whoRoute,
		uOg,
		lang: state.user.lang
		// isFirst: ownProps.match.params.isFirst === 'newUser' ? true : false
	};
};

const matchDispatchToProps = (dispatch: Dispatch<any>) => {
	return {
		UpdateUserSettings: (user: i_BaseInterface_User) => {
			dispatch(User_Update(user));
		},
		editData: (data: any) => dispatch(Group_AddCats(data)),
		setOnNav: (data: { bio: string; name: string }) => dispatch(SetStateAddImg(data))
	};
};

export default connect(mapStateToProps, matchDispatchToProps)(ProfileSettings);

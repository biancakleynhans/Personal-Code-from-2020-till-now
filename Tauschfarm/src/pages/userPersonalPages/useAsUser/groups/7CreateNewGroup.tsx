import React, { Component, Dispatch } from 'react';
import {
	IonPage,
	IonContent,
	IonItem,
	IonInput,
	IonButton,
	IonLabel,
	IonHeader,
	IonGrid,
	IonRow,
	IonTextarea,
	IonCol,
	IonSpinner,
	IonIcon,
	IonFab,
	IonFabButton,
	IonPopover,
	IonCard,
	IonCardHeader,
	IonCardTitle,
	IonCardSubtitle,
	IonCardContent,
	IonReorderGroup,
	IonRouterLink,
	IonReorder
} from '@ionic/react';
import PageHeader from '../../../../layout/Headers/PageHeader';
import { NamedDict } from '../../../../services/helpers/Tools';
import { connect } from 'react-redux';
import { TypesToFirebaseGlobals } from '../../../../services/firebase/TypesToServer';
import { Group_Set_onNav, Group_create } from '../../../../services/redux/actions/userActions/006GroupsActions';
import { CombinedString } from '../../../../services/translate/CombinedStrings';
import { Translate } from '../../../../services/translate/TranslateServices';
import { lsInj } from '../../../../services/translate/LocalLangDict';
import { RedirectTo } from '../../../../layout/Loading_Redirecting/CommonUIServices';
import { i_BaseInterface_Member, i_BaseInterface_Location } from '../../../../models/001UserModels';
import { i_BaseInterface_Category } from '../../../../models/002CatagoryModels';
import { IAppState } from '../../../../services/redux/reduxModels';
import { informationOutline, pencil } from 'ionicons/icons';

interface iState {
	id: string;
	name: string;
	imgArray: string[];
	avatar: string;
	memberCount: number;
	membersList: NamedDict<i_BaseInterface_Member>;
	categories: NamedDict<i_BaseInterface_Category>;
	description: string;
	location: i_BaseInterface_Location;
	lang: string;
	showmodal: boolean;
}

class CreateNewGroup extends Component<any, iState> {
	constructor(props: any) {
		super(props);
		const { user } = this.props;
		this.state = {
			id: `${user.id}-${new Date().getTime()}`,
			name: this.props.groupCrea.name,
			imgArray: [],
			avatar: '',
			memberCount: 0,
			membersList: {},
			categories: {},
			description: '',
			location: {
				lat: '',
				long: '',
				locString: ''
			},
			lang: user.lang,
			showmodal: false
		};

		this.setSelectedName = this.setSelectedName.bind(this);
		this.setSelectedDesc = this.setSelectedDesc.bind(this);
	}

	componentDidUpdate(prevProps: any) {
		if (prevProps.groupCrea !== this.props.groupCrea) {
			this.setState({
				id: this.props.groupCrea.id,
				name: this.props.groupCrea.name,
				imgArray: this.props.Eimgs, //.length > 0 ? this.props.Eimgs : [TypesToFirebaseGlobals.placeholderImg],
				avatar: this.props.Eimgs[0], //.length > 0 ? this.props.Eimgs[0] : [TypesToFirebaseGlobals.placeholderImg],
				memberCount: 0,
				membersList: {},
				categories: this.props.groupCrea.categories,
				description: this.props.groupCrea.description,
				location: this.props.groupCrea.location,
				lang: this.props.groupCrea.lang
			});
		}

		if (prevProps !== this.props) {
			this.setState({
				imgArray: this.props.Eimgs, //.length > 0 ? this.props.Eimgs : [TypesToFirebaseGlobals.placeholderImg],
				avatar: this.props.Eimgs[0] //.length > 0 ? this.props.Eimgs[0] : [TypesToFirebaseGlobals.placeholderImg],
			});
		}
	}

	setSelectedName(e: any) {
		// console.log('e', e.detail.value);
		this.setState({ name: e.detail.value });
	}

	setSelectedDesc(e: any) {
		// console.log('e', e.detail.value);
		this.setState({ description: e.detail.value });
	}

	setStateWhenAddImg() {
		var obj = {
			id: this.state.id,
			name: this.state.name,
			imgArray: this.state.imgArray,
			avatar: this.state.avatar,
			description: this.state.description,
			memberCount: this.state.memberCount,
			membersList: this.state.membersList,
			categories: this.state.categories,
			location: this.state.location,
			lang: this.state.lang
		};
		// console.log('group on nav away', obj);
		this.props.setOnNavAdd(obj);
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

	subit() {
		// console.log('state', this.state);
		const { lang, user } = this.props;
		var obj = {
			id: this.state.id,
			name: this.state.name,
			imgArray: this.props.Eimgs.length > 0 ? this.props.Eimgs : [TypesToFirebaseGlobals.placeholderImg],
			avatar: this.props.Eimgs[0] !== undefined ? this.props.Eimgs[0] : TypesToFirebaseGlobals.placeholderImg,
			description: this.state.description,
			memberCount: 1,
			membersList: {
				[user.id]: {
					id: user.id,
					name: user.name,
					avatar: user.avatar
				}
			},
			categories: this.state.categories,
			location: user.location,
			lang: lang
		};
		// console.log('group save', obj);
		this.props.addGroup(obj);

		RedirectTo(`/dashboard/groups/selectedGroup/${obj.id}/newUser`);
		this.setState({
			id: '',
			name: '',
			imgArray: [],
			avatar: '',
			memberCount: 0,
			membersList: {},
			categories: {},
			description: '',
			location: {
				lat: '',
				long: '',
				locString: ''
			},
			lang: ''
		});
	}

	render() {
		const { spinner, user } = this.props;
		return (
			<IonPage>
				<IonContent>
					<IonHeader slot='fixed'>
						<PageHeader backBtn={true} titleString={CombinedString.GroupCreate} />
					</IonHeader>{' '}
					<br />
					<br />
					<br />
					<form>
						<IonItem className='eventInput'>
							<IonLabel class='ion-text-wrap' position='floating'>
								{Translate(lsInj.transDict.Name)} <span style={{ opacity: 0.5, fontSize: '0.7em' }}>{Translate(lsInj.transDict.req2)}</span>
							</IonLabel>
							<IonInput value={this.state.name} onIonChange={(e) => this.setSelectedName(e)} clearInput />
						</IonItem>

						<IonItem className='eventInput'>
							<IonLabel style={{ fontSize: '1em', backgroundColor: 'var(--ion-color-secondary)', color: 'black' }} class='ion-text-wrap'>
								{Translate(lsInj.transDict.PhotoMultiple)} <br /> <span style={{ opacity: 0.5, fontSize: '0.7em' }}>{Translate(lsInj.transDict.req2)}</span>
							</IonLabel>
							<IonButton
								style={{ marginRight: '15px', width: '100px', height: '40px' }}
								size='small'
								fill='solid'
								onClick={() => this.setStateWhenAddImg()}
								routerLink={`/createGroup/imgDesc/${this.state.id}/${'group'}`}>
								{Translate(lsInj.transDict.Add)}
							</IonButton>
						</IonItem>

						<IonGrid>
							<IonRow>
								<IonCol></IonCol>
								<IonCol>{spinner === 'start' && <IonSpinner name='circles'></IonSpinner>}</IonCol>
							</IonRow>

							<IonReorderGroup disabled={false} onIonItemReorder={(e: any) => this.doReorder(e)}>
								{this.state.imgArray.length > 0 &&
									this.state.imgArray.slice(0, 4).map((url: any, index) => {
										return (
											<IonCard
												key={url}
												color='secondary'
												style={{
													width: '330px',
													height: '90px'
												}}
												onClick={() => this.setStateWhenAddImg()}>
												<IonCardContent style={{ margin: '0px', padding: '0px' }}>
													<IonFab style={{ top: '0', right: '0', zIndex: 'auto' }} vertical='top' horizontal='end' slot='fixed'>
														<IonRouterLink routerLink={`/dashboard/groups/${this.state.id}/imgBio/${index}`}>
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

						<IonItem className='eventInput'>
							<IonLabel class='ion-text-wrap' position='floating'>
								{Translate(lsInj.transDict.Descript)} <span style={{ opacity: 0.5, fontSize: '0.7em' }}>{Translate(lsInj.transDict.req2)}</span>
							</IonLabel>
							<IonTextarea autoGrow value={this.state.description} onIonChange={(e) => this.setSelectedDesc(e)} />
						</IonItem>

						<IonButton onClick={() => this.subit()} disabled={this.state.name.length < 3 || this.state.description.length < 3 || this.props.Eimgs.length === 0}>
							{Translate(lsInj.transDict.Continue)}
						</IonButton>
					</form>
					<IonFab style={{ width: '50px', height: '50px', opacity: 0.6, marginTop: '60px', marginRight: '10px' }} color='light' vertical='center' horizontal='end' slot='fixed'>
						<IonFabButton
							style={{ width: '40px', height: '40px' }}
							onClick={() => {
								this.setState({ showmodal: true });
							}}
							color='primary'>
							<IonIcon size='small' icon={informationOutline}></IonIcon>
						</IonFabButton>
					</IonFab>
					{this.state.showmodal && (
						<IonPopover cssClass='my-custom-class3' isOpen={this.state.showmodal} backdropDismiss={true} onDidDismiss={(e) => this.setState({ showmodal: false })}>
							<IonCard style={{ padding: '0px' }}>
								{user.lang === 'de' && (
									<>
										<IonCardHeader>
											<IonCardTitle>Um deine Tauschfarm-Gruppe vollständig anzulegen:</IonCardTitle>
											<IonCardSubtitle></IonCardSubtitle>
										</IonCardHeader>
										<IonCardContent style={{ padding: '0px' }}>
											<b> Schritt 1 </b>Geb deiner Gruppe einen Namen <br />
											<b> Schritt 2 </b> Lade ein passendes Bild hoch <br />
											<b> Schritt 3 </b> Beschreibe deine Gruppe <br />
											{/* <b> Schritt 4 </b> Wähle passende Kategorien aus <br /> */}
											<b> Schritt 4 </b> Klick auf weiter <br />
										</IonCardContent>
									</>
								)}
								{user.lang === 'en' && (
									<>
										<IonCardHeader>
											<IonCardTitle>To create your Tauschfarm group in full:</IonCardTitle>
											<IonCardSubtitle></IonCardSubtitle>
										</IonCardHeader>
										<IonCardContent>
											<b> Step 1 </b> Give your group a name <br />
											<b> Step 2 </b> Upload a matching image
											<br />
											<b> Step 3 </b> Describe your group <br />
											{/* <b> Step 4 </b> Choose matching categories <br /> */}
											<b> Step 4 </b> Click on Continue <br />
										</IonCardContent>
									</>
								)}
								<IonButton onClick={() => this.setState({ showmodal: false })}>{Translate(lsInj.transDict.Close)}</IonButton>
							</IonCard>
						</IonPopover>
					)}
				</IonContent>
			</IonPage>
		);
	}
}

const mapStateToProps = (state: IAppState, ownProps: any) => {
	// console.log('Group ', ownProps.match.params.idOfUserOrGroup);
	// var who = state.groups.UserGroups[ownProps.match.params.idOfUserOrGroup];
	// console.log('who', who);

	// const whoUse = who ? who : state.user;
	// console.log('whoUse', whoUse);
	return {
		lang: state.user.lang,
		user: state.user, //whoUse,
		groupCrea: state.groups.creatingGroup,
		Eimgs: state.groups.pendingImgUrl,
		spinner: state.groups.loader
	};
};

const mapDispatchToProps = (dispatch: Dispatch<any>) => {
	return {
		setOnNavAdd: (newGroup: any) => dispatch(Group_Set_onNav(newGroup)),
		addGroup: (newG: any) => dispatch(Group_create(newG))
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateNewGroup);

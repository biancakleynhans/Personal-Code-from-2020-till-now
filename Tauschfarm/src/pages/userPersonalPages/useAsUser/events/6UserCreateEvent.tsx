import React, { Component, Dispatch } from 'react';
import {
	IonPage,
	IonContent,
	IonItem,
	IonInput,
	IonButton,
	IonDatetime,
	IonLabel,
	IonHeader,
	IonGrid,
	IonRow,
	IonTextarea,
	IonCol,
	IonSpinner,
	IonFab,
	IonFabButton,
	IonIcon,
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
import { connect } from 'react-redux';
import { TypesToFirebaseGlobals } from '../../../../services/firebase/TypesToServer';
import { i_Redux_ActionFunc_Interface_Event_SetOnNav, i_BaseInterface_Location_Full, i_goingAdded, i_BaseInterface_Event } from '../../../../models/005EventModels';
import { User_Event_Set_onNav, User_Event_Save } from '../../../../services/redux/actions/userActions/005EventsActions';
import { CombinedString } from '../../../../services/translate/CombinedStrings';
import { Translate } from '../../../../services/translate/TranslateServices';
import { lsInj } from '../../../../services/translate/LocalLangDict';
import { RedirectTo } from '../../../../layout/Loading_Redirecting/CommonUIServices';
import AddressForm from '../../../../components/HERE maps/adressGetAndValidate/000AdressForm';
import { NamedDict } from '../../../../services/helpers/Tools';
import { IAppState } from '../../../../services/redux/reduxModels';
import ConfirmDoneModal from '../../../../layout/Loading_Redirecting/ConfirmDoneModal';
import { informationOutline, pencil } from 'ionicons/icons';

interface iState {
	name: string;
	loc: i_BaseInterface_Location_Full;
	date: string;
	time: string;
	counts: {
		liked: number;
		intrested: number;
		going: number;
		goingAdded: NamedDict<i_goingAdded>;
		intrestedAdded: NamedDict<i_goingAdded>;
	};
	imgArray: string[];
	avatar: string;
	desc: string;
	showModal: boolean;
	showmodal: boolean;
}

class CreateNewEvent extends Component<any, iState> {
	user = { id: '', name: '', avatar: '' };
	id = `${this.props.user.id}-${new Date().getTime()}`;
	eventStart = { id: '', name: 'blank' };
	eventImgDisp = [TypesToFirebaseGlobals.placeholderImg];

	constructor(props: any) {
		super(props);
		this.state = {
			showModal: false,
			showmodal: false,
			name: '',
			loc: {
				address: {
					street: '',
					city: '',
					state: '',
					postalCode: '',
					country: '',
					county: '',
					label: '',
					houseNumber: '',
					district: ''
				},

				locationId: '',
				locationType: '',

				coords: {
					lat: '',
					long: ''
				}
			},
			date: '',
			time: '',
			counts: {
				liked: 0,
				intrested: 0,
				going: 0,
				goingAdded: {},
				intrestedAdded: {}
			},
			imgArray: [],
			avatar: '',
			desc: ''
		};

		const { user } = this.props;
		this.user.name = user ? user.name : '';
		this.user.avatar = user ? user.avatar : '';
		this.user.id = user ? user.id : '';
		this.eventStart.id = this.id;

		this.setSelectedName = this.setSelectedName.bind(this);
		this.setSelectedDate = this.setSelectedDate.bind(this);
		this.setSelectedTime = this.setSelectedTime.bind(this);
		this.setSelectedLocation = this.setSelectedLocation.bind(this);
		this.setSelectedDesc = this.setSelectedDesc.bind(this);
		this.subitEvent = this.subitEvent.bind(this);
	}

	componentDidUpdate(prevProps: any) {
		console.log('Images Events', prevProps, this.props);
		if (prevProps !== this.props) {
			this.setState({ imgArray: this.props.Eimgs });
		}

		if (prevProps.event !== this.props.event) {
			this.setState({
				name: this.props.event.name,
				date: this.props.event.date,
				time: this.props.event.time,
				counts: this.props.event.counts,
				desc: this.props.event.description
				// imgArray: this.props.Eimgs
			});
		}
	}

	setStateWhenAddImg() {
		var obj: i_Redux_ActionFunc_Interface_Event_SetOnNav = {
			id: this.id,
			name: this.state.name,
			location: this.state.loc,
			date: this.state.date,
			time: this.state.time,
			counts: {
				liked: 0,
				intrested: 0,
				going: 0,
				goingAdded: {},
				intrestedAdded: {}
			},
			imgArray: [],
			avatar: '',
			userWhoAddedEvent: this.user,
			description: this.state.desc,
			timelineId: ''
		};
		// console.log('Event on nav away', obj);
		this.props.setEventOnNavAdd(obj);
	}

	setSelectedDate(e: any) {
		// console.log('e', e.detail.value);
		this.setState({ date: e.detail.value });
	}

	setSelectedTime(e: any) {
		// console.log('e', e.detail.value);
		this.setState({ time: e.detail.value });
	}

	setSelectedName(e: any) {
		// console.log('e', e.detail.value);
		this.setState({ name: e.detail.value });
	}

	setSelectedLocation(e: any) {
		// console.log('e', e.detail.value);
		this.setState({ loc: e.detail.value });
	}

	setSelectedDesc(e: any) {
		// console.log('e', e.detail.value);
		this.setState({ desc: e.detail.value });
	}

	subitEvent() {
		// console.log('state', this.state);
		// console.log('props', this.props, this.props.loc);

		if (this.props.loc.location.locationType.length === 0) {
			alert('please press the check button for Location');
			// console.log('??', this.props.loc.location.locationType.length);
		} else {
			const { user } = this.props;

			var EventDataFormat: i_Redux_ActionFunc_Interface_Event_SetOnNav = {
				id: this.id,
				name: this.state.name,
				location: this.props.loc.location,
				date: this.state.date,
				time: this.state.time,
				counts: this.state.counts,
				imgArray: this.state.imgArray, //this.props.Eimgs.length > 0 ? this.props.Eimgs : [TypesToFirebaseGlobals.placeholderImg],
				avatar: this.state.imgArray[0], //this.props.Eimgs.length > 0 ? this.props.Eimgs[0] : TypesToFirebaseGlobals.placeholderImg,
				description: this.state.desc,
				userWhoAddedEvent: {
					id: user.id,
					avatar: user.avatar,
					name: user.name
				},
				timelineId: ''
			};

			// console.log('EventDataFormat', EventDataFormat);
			this.props.addEvent(EventDataFormat);
			// this.setState({ showModal: !this.state.showModal });
			this.setState({
				showModal: false,
				name: '',
				loc: {
					address: {
						street: '',
						city: '',
						state: '',
						postalCode: '',
						country: '',
						county: '',
						label: '',
						houseNumber: '',
						district: ''
					},

					locationId: '',
					locationType: '',

					coords: {
						lat: '',
						long: ''
					}
				},
				date: '',
				time: '',
				counts: {
					liked: 0,
					intrested: 0,
					going: 0,
					goingAdded: {},
					intrestedAdded: {}
				},
				imgArray: [],
				avatar: '',
				desc: ''
			});
			RedirectTo('/dashboard');
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

	render() {
		const { spinner, user } = this.props;
		return (
			<IonPage>
				<IonContent>
					<IonHeader slot='fixed'>
						<PageHeader backBtn={true} titleString={CombinedString.eventCreate} />
					</IonHeader>{' '}
					<br />
					<br />
					<br />
					<IonItem className='eventInput'>
						<IonLabel class='ion-text-wrap' position='floating'>
							{Translate(lsInj.transDict.Name)} <span style={{ opacity: 0.5, fontSize: '0.7em' }}>{Translate(lsInj.transDict.req2)}</span>
						</IonLabel>
						<IonInput value={this.state.name} onIonChange={(e) => this.setSelectedName(e)} clearInput />
					</IonItem>
					<IonItem className='eventInput'>
						<IonLabel class='ion-text-wrap' style={{ fontSize: '1em', backgroundColor: 'var(--ion-color-secondary)', color: 'black' }}>
							{Translate(lsInj.transDict.PhotoMultiple)} <br /> <span style={{ opacity: 0.5, fontSize: '0.7em' }}>{Translate(lsInj.transDict.req2)}</span>
						</IonLabel>
						<IonButton
							style={{ marginRight: '15px', width: '100px', height: '40px' }}
							size='small'
							fill='solid'
							onClick={() => this.setStateWhenAddImg()}
							routerLink={`/createEvent/imgDesc/${this.props.match.params.idOfUserOrGroup}/user`}>
							{Translate(lsInj.transDict.Add)}
						</IonButton>
					</IonItem>
					<IonGrid>
						<IonRow>
							<IonCol></IonCol>
							<IonCol>{spinner === 'start' && <IonSpinner name='circles'></IonSpinner>}</IonCol>
							<IonCol></IonCol>
						</IonRow>
						{/* <IonRow>
							{Eimgs !== undefined ? (
								Eimgs.map((url: any, index: number) => {
									return ImageDisplay(url, `/events/editIMG/selectedEvent/${this.props.match.params.idOfUserOrGroup}/${index}`, index, true);
								})
							) : (
								<>{ImageDisplay(TypesToFirebaseGlobals.placeholderImg, `/events/editIMG/selectedEvent/${this.props.match.params.idOfUserOrGroup}/${0}`, 0, true)}</>
							)}
						</IonRow> */}

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
													<IonRouterLink routerLink={`/events/editIMG/selectedEvent/${this.props.match.params.idOfUserOrGroup}/${index}`}>
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
					{/* Adress from testing this  */}
					<IonItem lines='none'>
						<IonLabel>
							<span style={{ opacity: 0.5, fontSize: '0.7em' }}>{Translate(lsInj.transDict.req2)}</span>
						</IonLabel>
					</IonItem>
					<AddressForm type={'createEvent'} />
					<IonItem className='eventInput'>
						<IonLabel class='ion-text-wrap' position='floating'>
							{Translate(lsInj.transDict.SelectDate)} <span style={{ opacity: 0.5, fontSize: '0.7em' }}>{Translate(lsInj.transDict.req2)}</span>
						</IonLabel>
						<IonDatetime displayFormat='DD MM YY' value={this.state.date} onIonChange={(e) => this.setSelectedDate(e)}></IonDatetime>
					</IonItem>
					<IonItem className='eventInput'>
						<IonLabel class='ion-text-wrap' position='floating'>
							{Translate(lsInj.transDict.SelectTime)} <span style={{ opacity: 0.5, fontSize: '0.7em' }}>{Translate(lsInj.transDict.req2)}</span>
						</IonLabel>
						<IonDatetime displayFormat='HH:mm' value={this.state.time} onIonChange={(e) => this.setSelectedTime(e)}></IonDatetime>
					</IonItem>
					<IonItem className='eventInput'>
						<IonLabel class='ion-text-wrap' position='floating'>
							{Translate(lsInj.transDict.Descript)} <span style={{ opacity: 0.5, fontSize: '0.7em' }}>{Translate(lsInj.transDict.req2)}</span>
						</IonLabel>
						<IonTextarea autoGrow value={this.state.desc} onIonChange={(e) => this.setSelectedDesc(e)} />
					</IonItem>
					<IonButton
						onClick={() => this.subitEvent()}
						disabled={
							this.state.name.length < 3 ||
							this.state.desc.length < 3 ||
							this.props.loc.location.locationType.length === 0 ||
							this.state.date.length < 1 ||
							this.state.time.length < 1
						}>
						{Translate(lsInj.transDict.Publish)}
					</IonButton>
					{this.state.showModal && <ConfirmDoneModal confirmModalMsg={Translate(lsInj.transDict.doneEvent)} />}
					{/* POPOVER */}
					<IonFab style={{ width: '50px', height: '50px', opacity: 0.6, marginTop: '80px', marginRight: '10px' }} color='light' vertical='center' horizontal='end' slot='fixed'>
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
											<IonCardTitle>Um deine Veranstaltung zu veröffentlichen</IonCardTitle>
											<IonCardSubtitle></IonCardSubtitle>
										</IonCardHeader>
										<IonCardContent style={{ padding: '0px' }}>
											<b> Schritt 1</b> Gebe deinem Event einen Namen <br />
											<b> Schritt 2</b> Lade ein passendes Bild hoch <br />
											<b> Schritt 3</b> Mach Angaben zu Datum, Uhrzeit &amp; Ort <br />
											<b> Schritt 4</b> Beschreibe dein Event <br />
											<b> Schritt 5</b> Klick auf Speichern <br />
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
				</IonContent>
			</IonPage>
		);
	}
}
const mapStateToProps = (state: IAppState, ownProps: any) => {
	// console.log('Event ', ownProps.match.params.idOfUserOrGroup);
	var who = state.groups.UserGroups[ownProps.match.params.idOfUserOrGroup];
	// console.log('who', who);
	const whoUse = who ? who : state.user;
	// console.log('whoUse', whoUse);
	// console.log('?????? STATE ????', state.events.creatingEvent);
	return {
		user: whoUse,
		event: state.events.creatingEvent,
		Eimgs: state.events.pendingImgUrl,
		loc: state.events.creatingEvent,
		spinner: state.events.loader
	};
};

const mapDispatchToProps = (dispatch: Dispatch<any>) => {
	return {
		setEventOnNavAdd: (newEvent: i_Redux_ActionFunc_Interface_Event_SetOnNav) => dispatch(User_Event_Set_onNav(newEvent)),
		addEvent: (newEvent: i_BaseInterface_Event) => dispatch(User_Event_Save(newEvent))
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateNewEvent);

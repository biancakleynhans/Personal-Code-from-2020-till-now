import React, { Component, Dispatch } from 'react';
import {
	IonPage,
	IonContent,
	IonItem,
	IonInput,
	IonLabel,
	IonGrid,
	IonRow,
	IonButton,
	IonHeader,
	IonDatetime,
	IonTextarea,
	IonReorderGroup,
	IonCard,
	IonCardContent,
	IonFab,
	IonRouterLink,
	IonFabButton,
	IonIcon,
	IonReorder,
	IonCol,
	IonSpinner
} from '@ionic/react';
import PageHeader from '../../../../layout/Headers/PageHeader';
import { connect } from 'react-redux';
import { i_Redux_ActionFunc_Interface_Event_SetOnNav, i_BaseInterface_Location_Full, i_goingAdded, i_BaseInterface_Event } from '../../../../models/005EventModels';
import { User_Event_Set_onNav, User_Event_Update } from '../../../../services/redux/actions/userActions/005EventsActions';
import { RedirectTo } from '../../../../layout/Loading_Redirecting/CommonUIServices';
import { CombinedString } from '../../../../services/translate/CombinedStrings';
import { Translate } from '../../../../services/translate/TranslateServices';
import { lsInj } from '../../../../services/translate/LocalLangDict';
import AddressForm from '../../../../components/HERE maps/adressGetAndValidate/000AdressForm';
import { NamedDict } from '../../../../services/helpers/Tools';
import { IAppState } from '../../../../services/redux/reduxModels';
import { pencil } from 'ionicons/icons';
import { convertObjectToArray } from '../../../../services/ownServices/ConverterFuncs';
import { iTimeLineEntry } from '../../../../models/TimelineModels';

interface iState {
	id: string;
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
	userWhoAddedEvent: {
		id: string;
		name: string;
		avatar: string;
	};
}

class UserEditEventPage extends Component<any, iState> {
	constructor(props: any) {
		super(props);

		this.state = {
			id: this.props.currentEventEdit.id,
			name: this.props.currentEventEdit.name,
			loc: this.props.currentEventEdit.location,
			date: this.props.currentEventEdit.date,
			time: this.props.currentEventEdit.time,
			counts: {
				liked: 0,
				intrested: 0,
				going: this.props.currentEventEdit.counts.going,
				goingAdded: {},
				intrestedAdded: {}
			},
			imgArray: this.props.currentEventEdit.imgArray,
			avatar: this.props.currentEventEdit.avatar,
			desc: this.props.currentEventEdit.description,
			userWhoAddedEvent: {
				id: this.props.currentEventEdit.userWhoAddedEvent.id,
				name: this.props.currentEventEdit.userWhoAddedEvent.name,
				avatar: this.props.currentEventEdit.userWhoAddedEvent.avatar
			}
		};

		this.setSelectedName = this.setSelectedName.bind(this);
		this.setSelectedDate = this.setSelectedDate.bind(this);
		this.setSelectedTime = this.setSelectedTime.bind(this);
		this.setSelectedLocation = this.setSelectedLocation.bind(this);
		this.setSelectedDesc = this.setSelectedDesc.bind(this);
		this.subitEvent = this.subitEvent.bind(this);

		// console.log('constuctor of edit event page is plank why???? ', this.props);
	}

	componentDidUpdate(prevProps: any) {
		if (prevProps.Eimgs !== this.props.Eimgs) {
			this.setState({
				imgArray: this.props.Eimgs,
				avatar: this.props.Eimgs[0]
			});
		} else if (prevProps.loc !== this.props.loc) {
			this.setState({ loc: this.props.loc });
		} else if (prevProps.currentEventEdit !== this.props.currentEventEdit) {
			this.setState({
				id: this.props.currentEventEdit.id,
				name: this.props.currentEventEdit.name,
				loc: this.props.currentEventEdit.location,
				date: this.props.currentEventEdit.date,
				time: this.props.currentEventEdit.time,
				counts: {
					liked: 0,
					intrested: 0,
					going: this.props.currentEventEdit.counts.going,
					goingAdded: {},
					intrestedAdded: {}
				},
				imgArray: this.props.currentEventEdit.imgArray,
				avatar: this.props.currentEventEdit.avatar,
				desc: this.props.currentEventEdit.description,
				userWhoAddedEvent: {
					id: this.props.currentEventEdit.userWhoAddedEvent.id,
					name: this.props.currentEventEdit.userWhoAddedEvent.name,
					avatar: this.props.currentEventEdit.userWhoAddedEvent.avatar
				}
			});
		}
	}

	setStateWhenAddImg() {
		var obj: i_Redux_ActionFunc_Interface_Event_SetOnNav = {
			id: this.state.id,
			name: this.state.name,
			location: this.state.loc,
			date: this.state.date,
			time: this.state.time,
			counts: {
				liked: 0,
				intrested: this.props.currentEventEdit.counts.intrested,
				going: this.props.currentEventEdit.counts.going,
				goingAdded: this.props.currentEventEdit.counts.goingAdded,
				intrestedAdded: this.props.currentEventEdit.counts.intrestedAdded
			},
			imgArray: this.state.imgArray,
			avatar: '',
			userWhoAddedEvent: this.state.userWhoAddedEvent,
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

	subitEvent() {
		// console.log('state', this.state, this.props.Eimgs);

		if (this.state.loc.address.label.length === 0) {
			alert('please press the check button for Location');
			// console.log('??', this.props.loc.location.locationType.length);
		} else {
			var EventDataFormat: i_Redux_ActionFunc_Interface_Event_SetOnNav = {
				id: this.state.id,
				name: this.state.name,
				location: this.state.loc,
				date: this.state.date,
				time: this.state.time,
				counts: this.state.counts,
				imgArray: this.props.Eimgs.length > 0 ? this.props.Eimgs : this.state.imgArray,
				avatar: this.props.Eimgs.length > 0 ? this.props.Eimgs[0] : this.state.avatar,
				description: this.state.desc,
				userWhoAddedEvent: this.state.userWhoAddedEvent,
				timelineId: this.props.delteTl
			};

			// console.log('EventDataFormat', EventDataFormat);
			this.props.editEvent(EventDataFormat);
			RedirectTo('/events');
		}
	}

	render() {
		const { spinner, eventId } = this.props;
		return (
			<IonPage>
				<IonContent>
					<IonHeader slot='fixed'>
						<PageHeader backBtn={true} titleString={CombinedString.eventEdit} />
					</IonHeader>
					<br />
					<br />
					<br />
					<IonItem className='eventInput'>
						<IonLabel class='ion-text-wrap' position='floating'>
							{Translate(lsInj.transDict.Name)}
							<span style={{ opacity: 0.5, fontSize: '0.7em' }}>{Translate(lsInj.transDict.req2)}</span>
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
													<IonRouterLink routerLink={`/events/editIMG/selectedEvent/${eventId}/${index}`}>
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
					<IonItem lines='none'>
						<IonLabel>
							<span style={{ opacity: 0.5, fontSize: '0.7em' }}>{Translate(lsInj.transDict.req2)}</span>
						</IonLabel>
					</IonItem>
					<AddressForm type={'createEvent'} />

					<IonItem className='eventInput'>
						<IonLabel class='ion-text-wrap' position='floating'>
							{Translate(lsInj.transDict.SelectDate)}
							<span style={{ opacity: 0.5, fontSize: '0.7em' }}>{Translate(lsInj.transDict.req2)}</span>
						</IonLabel>
						<IonDatetime displayFormat='DD MM YY' value={this.state.date} onIonChange={(e) => this.setSelectedDate(e)}></IonDatetime>
					</IonItem>
					<IonItem className='eventInput'>
						<IonLabel class='ion-text-wrap' position='floating'>
							{Translate(lsInj.transDict.SelectTime)}
							<span style={{ opacity: 0.5, fontSize: '0.7em' }}>{Translate(lsInj.transDict.req2)}</span>
						</IonLabel>
						<IonDatetime displayFormat='HH:mm' value={this.state.time} onIonChange={(e) => this.setSelectedTime(e)}></IonDatetime>
					</IonItem>
					<IonItem className='eventInput'>
						<IonLabel class='ion-text-wrap' position='floating'>
							{Translate(lsInj.transDict.Descript)}
							<span style={{ opacity: 0.5, fontSize: '0.7em' }}>{Translate(lsInj.transDict.req2)}</span>
						</IonLabel>
						<IonTextarea value={this.state.desc} onIonChange={(e) => this.setSelectedDesc(e)} autoGrow />
					</IonItem>
					<IonButton onClick={() => this.subitEvent()}>{Translate(lsInj.transDict.Publish)}</IonButton>
				</IonContent>
			</IonPage>
		);
	}
}

const mapStateToProps = (state: IAppState, ownProps: any) => {
	console.log('Event ', state, ownProps);

	const current = state.user.events[ownProps.match.params.eventname];
	const event = current !== undefined ? current : ({} as i_BaseInterface_Event);

	var delteTl = '';

	convertObjectToArray(state.timeline.tl, true).forEach((tl: iTimeLineEntry) => {
		// console.log('tl', tl);
		if (tl.content?.event?.id === event.id) {
			console.log('delete this tl', tl);

			delteTl = tl.id;
		}
	});
	return {
		currentEventEdit: event,
		event: state.events.creatingEvent,
		Eimgs: state.events.pendingImgUrl,
		loc: state.events.creatingEvent.location,
		eventId: ownProps.match.params.eventname,
		spinner: state.events.loader,
		delteTl
	};
};

const mapDispatchToProps = (dispatch: Dispatch<any>) => {
	return {
		setEventOnNavAdd: (newEvent: i_Redux_ActionFunc_Interface_Event_SetOnNav) => dispatch(User_Event_Set_onNav(newEvent)),
		editEvent: (newEvent: i_Redux_ActionFunc_Interface_Event_SetOnNav) => dispatch(User_Event_Update(newEvent))
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(UserEditEventPage);

import React, { Component, Dispatch } from 'react';
import {
	IonPage,
	IonContent,
	IonCard,
	IonButton,
	IonToolbar,
	IonItem,
	IonIcon,
	IonLabel,
	IonHeader,
	IonModal,
	IonCardContent,
	IonText,
	IonGrid,
	IonRow,
	IonCol,
	IonAvatar
} from '@ionic/react';
import PageHeader from '../../../layout/Headers/PageHeader';
import { timeOutline, calendar, map, eyeOutline } from 'ionicons/icons';
import { connect } from 'react-redux';
import moment from 'moment';
import { User_Event_going, User_Event_Intrested } from '../../../services/redux/actions/userActions/005EventsActions';
import { i_Redux_ActionFunc_Interface_Event_Going, i_BaseInterface_Event } from '../../../models/005EventModels';
import { Translate } from '../../../services/translate/TranslateServices';
import { lsInj } from '../../../services/translate/LocalLangDict';
import { IAppState } from '../../../services/redux/reduxModels';
import ShareFab from '../../../layout/Buttons/ShareFab';
import { i_BaseInterface_User } from '../../../models/001UserModels';

interface iState {
	openModalGoing: boolean;
	openModalIntrested: boolean;
}

export class EventDetails extends Component<any, iState> {
	constructor(props: any) {
		super(props);
		this.state = {
			openModalGoing: false,
			openModalIntrested: false
		};
	}
	goingFunc() {
		const { currentEvent, globalEvent, currentUser } = this.props;
		// console.log('currentEvent', currentEvent);
		// console.log('globalEvent', globalEvent);

		var use = globalEvent !== undefined ? globalEvent : currentEvent;

		// console.log('use', use.counts);

		if (use.counts.goingAdded !== undefined) {
			//going to event is created check if it was this current user

			//was not this current user
			if (use.counts.goingAdded[currentUser.id] === undefined) {
				var send: i_Redux_ActionFunc_Interface_Event_Going = {
					event: use,
					going: use.counts.going + 1,
					goingAdded: {
						[currentUser.id]: {
							id: currentUser.id
						}
					},
					userOrGlobal: globalEvent !== undefined ? 'global' : 'user'
				};
				// console.log('send going ', send);
				this.props.addGoing(send);
				this.setState({ openModalGoing: !this.state.openModalGoing });
				// RedirectTo('/events');
			}
		}
		//fist going ever to event
		else {
			var send1: i_Redux_ActionFunc_Interface_Event_Going = {
				event: use,
				going: use.counts.going + 1,
				goingAdded: {
					[currentUser.id]: {
						id: currentUser.id
					}
				},
				userOrGlobal: globalEvent !== undefined ? 'global' : 'user'
			};
			// console.log('send going ', send1);
			this.props.addGoing(send1);
			this.setState({ openModalGoing: !this.state.openModalGoing });
			// RedirectTo('/events');
		}
	}

	intrestFunc() {
		const { currentEvent, globalEvent, currentUser } = this.props;
		// console.log('currentEvent', currentEvent);
		// console.log('globalEvent', globalEvent);

		var use = globalEvent !== undefined ? globalEvent : currentEvent;

		// console.log('use', use.counts);

		if (use.counts.intrestedAdded !== undefined) {
			//going to event is created check if it was this current user

			//was not this current user
			if (use.counts.intrestedAdded[currentUser.id] === undefined) {
				var send2: i_Redux_ActionFunc_Interface_Event_Going = {
					event: use,
					going: use.counts.intrested + 1,
					goingAdded: {
						[currentUser.id]: {
							id: currentUser.id
						}
					},
					userOrGlobal: globalEvent !== undefined ? 'global' : 'user'
				};
				// console.log('send intrested ', send2);
				this.props.addIntrested(send2);
				this.setState({ openModalIntrested: !this.state.openModalIntrested });
				// RedirectTo('/events');
			}
			//it was this user
			else {
				// console.log('this user already said going ');
			}
		}
		//fist going ever to event
		else {
			var send3: i_Redux_ActionFunc_Interface_Event_Going = {
				event: use,
				going: use.counts.intrested + 1,
				goingAdded: {
					[currentUser.id]: {
						id: currentUser.id
					}
				},
				userOrGlobal: globalEvent !== undefined ? 'global' : 'user'
			};
			// console.log('send intrested ', send3);
			this.props.addIntrested(send3);
			this.setState({ openModalIntrested: !this.state.openModalIntrested });
			// RedirectTo('/events');
		}
	}

	renderEvent(event: i_BaseInterface_Event, type: 'user' | 'global', user: i_BaseInterface_User) {
		return (
			<>
				<img style={{ display: 'block', height: '400px', width: '400px' }} src={event.avatar} alt='Broken' />
				<IonToolbar className='rounding'>
					<IonItem lines='none'>
						<IonLabel style={{ fontSize: '1.5em' }} class='ion-text-wrap'>
							{event.name}
						</IonLabel>
					</IonItem>
				</IonToolbar>
				<IonItem lines='none' button routerLink={`/members/${event.userWhoAddedEvent.id}/${user.id}`}>
					<IonAvatar class='avatar'>
						<img src={event.userWhoAddedEvent.avatar} alt='broken' />
					</IonAvatar>
					<IonLabel>{event.userWhoAddedEvent.name}</IonLabel>
				</IonItem>
				<IonItem lines='none'>
					<IonIcon size='small' color='primary' icon={timeOutline}></IonIcon>
					<IonLabel class='ion-text-wrap' style={{ fontSize: 'medium' }}>
						{Translate(lsInj.transDict.Time)} <br /> {moment(event.time).utcOffset('+0200').format('HH:mm')}
					</IonLabel>
					<IonIcon size='small' color='primary' icon={calendar}></IonIcon>
					<IonLabel class='ion-text-wrap' style={{ fontSize: 'medium' }}>
						{Translate(lsInj.transDict.Date)} <br /> {moment(event.date).utcOffset('+0200').format('DD/MM')}
					</IonLabel>
				</IonItem>
				<IonItem lines='none'>
					<IonIcon size='small' color='primary' icon={map}></IonIcon>
					<IonLabel class='ion-text-wrap' style={{ fontSize: 'medium' }}>
						{Translate(lsInj.transDict.Place)} <br />
						{event.location.address.label}
					</IonLabel>
				</IonItem>
				<IonCard color='light'>
					<IonCardContent>{event.description}</IonCardContent>
				</IonCard>
				{type === 'user' && (
					<>
						<IonItem lines='none'>
							<IonLabel class='ion-text-wrap'>
								{event.counts.going} {Translate(lsInj.transDict.Going)}
							</IonLabel>
							<IonButton routerLink={`/events/seeStats/going/${event.id}`}>
								<IonIcon icon={eyeOutline} />
							</IonButton>
						</IonItem>

						<IonItem lines='none'>
							<IonLabel class='ion-text-wrap'>
								{event.counts.intrested} {Translate(lsInj.transDict.Intrested)}
							</IonLabel>
							<IonButton routerLink={`/events/seeStats/intrested/${event.id}`}>
								<IonIcon icon={eyeOutline} />
							</IonButton>
						</IonItem>

						<IonItem lines='none'>
							<IonButton slot='end' routerLink={`/events/editEvent/selectedEvent/${event.id}`}>
								{Translate(lsInj.transDict.Edit)}
							</IonButton>
						</IonItem>

						<IonItem lines='none'>
							<IonButton slot='end' routerLink={`/events/delete/selectedEvent/${event.id}`}>
								{Translate(lsInj.transDict.Delete)}
							</IonButton>
						</IonItem>
					</>
				)}
				{type === 'global' && (
					<>
						<IonItem lines='none'>
							<IonLabel class='ion-text-wrap'>
								{event.counts.going} {Translate(lsInj.transDict.Going)}
							</IonLabel>
							<IonButton onClick={() => this.goingFunc()}>{Translate(lsInj.transDict.Going)}</IonButton>
						</IonItem>

						<IonItem lines='none'>
							<IonLabel class='ion-text-wrap'>
								{event.counts.intrested} {Translate(lsInj.transDict.Intrested)}
							</IonLabel>
							<IonButton onClick={() => this.intrestFunc()}>{Translate(lsInj.transDict.Intrested)}</IonButton>
						</IonItem>

						{this.state.openModalGoing && (
							<IonModal cssClass='Modal1' showBackdrop={true} isOpen={this.state.openModalGoing}>
								<IonText style={{ color: 'black', fontSize: '1.2em', fontWeight: 'bolder' }}>{Translate(lsInj.transDict.goingEvent)}</IonText>
								<IonButton
									shape='round'
									size='small'
									onClick={() => {
										return this.setState({
											openModalGoing: !this.state.openModalGoing
										});
									}}>
									{Translate(lsInj.transDict.Close)}
								</IonButton>
							</IonModal>
						)}
						{this.state.openModalIntrested && (
							<IonModal cssClass='Modal1' showBackdrop={true} isOpen={this.state.openModalIntrested}>
								<IonText style={{ color: 'black', fontSize: '1.2em', fontWeight: 'bolder' }}>{Translate(lsInj.transDict.intrestEvent)}</IonText>
								<IonButton
									shape='round'
									size='small'
									onClick={() => {
										return this.setState({
											openModalIntrested: !this.state.openModalIntrested
										});
									}}>
									{Translate(lsInj.transDict.Close)}
								</IonButton>
							</IonModal>
						)}
					</>
				)}
				<ShareFab
					titleProp={Translate(lsInj.transDict.checkevent)}
					descProp={event.description}
					imageProp={event.avatar}
					partFallback={`events/selectedEvent/${event.id}/undefined`}
				/>
			</>
		);
	}

	disp(event: i_BaseInterface_Event, type: 'user' | 'global', user: i_BaseInterface_User) {
		var windowSize = window.innerWidth;
		//console.log('windowSize', windowSize);
		if (windowSize < 400) {
			return <>{this.renderEvent(event, type, user)}</>;
		} else {
			return (
				<IonGrid>
					<IonRow>
						<IonCol size='4'></IonCol>
						<IonCol size='4'>{this.renderEvent(event, type, user)}</IonCol>
						<IonCol size='4'></IonCol>
					</IonRow>
				</IonGrid>
			);
		}
	}

	render() {
		const { currentEvent, globalEvent, currentUser, paramId } = this.props;
		return (
			<IonPage>
				<IonContent>
					<IonHeader slot='fixed'>
						<PageHeader backBtn={true} contactBtn={true} rl={`/chats/${currentUser.id}/withUser/${paramId}`} />
					</IonHeader>
					<br />
					<br />
					<br />
					{currentEvent && this.disp(currentEvent, 'user', currentUser)}
					{globalEvent && this.disp(globalEvent, 'global', currentUser)}
				</IonContent>
			</IonPage>
		);
	}
}

const mapStateToProps = (state: IAppState, ownProps: any) => {
	// console.log('ownProps', ownProps);

	const g = state.globalUsers.GlobalUsers[ownProps.match.params.userName];
	const globalU = g !== undefined ? g.events : undefined;
	const hasEvent = globalU !== undefined ? globalU[ownProps.match.params.eventname] : undefined;

	console.log('???', globalU, hasEvent, g);

	var ev = state.user.events[ownProps.match.params.eventname];
	var gev = state.globalUsers.GlobalUsers[ownProps.match.params.userName]?.events[ownProps.match.params.eventname];

	if (ev !== undefined) {
		ev.userWhoAddedEvent.name = state.user.name;
		ev.userWhoAddedEvent.avatar = state.user.avatar;
	}

	if (gev !== undefined) {
		gev.userWhoAddedEvent.name = state.globalUsers.GlobalUsers[ownProps.match.params.userName].name;
		gev.userWhoAddedEvent.avatar = state.globalUsers.GlobalUsers[ownProps.match.params.userName].avatar;
	}

	return {
		currentUser: state.user,
		currentEvent: state.user.events[ownProps.match.params.eventname],
		globalEvent: hasEvent,
		paramId: ownProps.match.params.userName
	};
};

const mapDispatchToProps = (dispatch: Dispatch<any>) => {
	return {
		addGoing: (event: i_Redux_ActionFunc_Interface_Event_Going) => dispatch(User_Event_going(event)),
		addIntrested: (event: i_Redux_ActionFunc_Interface_Event_Going) => dispatch(User_Event_Intrested(event))
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(EventDetails);

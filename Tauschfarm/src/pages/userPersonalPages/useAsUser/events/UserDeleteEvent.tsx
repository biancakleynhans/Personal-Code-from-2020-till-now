import React, { Component, Dispatch } from 'react';
import { connect } from 'react-redux';
import { IAppState } from '../../../../services/redux/reduxModels';
import { IonPage, IonContent, IonHeader, IonCard, IonButton, IonCardHeader, IonCardTitle, IonCardContent, IonToolbar, IonTitle, IonItem, IonIcon, IonLabel } from '@ionic/react';
import PageHeader from '../../../../layout/Headers/PageHeader';
import { Translate } from '../../../../services/translate/TranslateServices';
import { lsInj } from '../../../../services/translate/LocalLangDict';
import { EventDelete } from '../../../../services/redux/actions/userActions/005EventsActions';
import { timeOutline, calendar, map } from 'ionicons/icons';
import moment from 'moment';

export class UserDeleteEvent extends Component<any> {
	delGroup() {
		const { eventDel, userId } = this.props;
		if (eventDel.split('-')[0] === userId) {
			if (window.confirm(Translate(lsInj.transDict.delEvent))) {
				console.log('user is allowed to delete and confiremd to delete ');
				var delData = {
					userId: userId,
					eventId: eventDel
				};
				this.props.delEvent(delData);
				window.location.replace('/events');
			} else {
				console.log('user is allowed to delete but did not confirm to delete ');
				window.history.back();
			}
		} else {
			alert(Translate(lsInj.transDict.noPermission));
			console.log('user is not  allowed to delete');
			window.history.back();
		}
	}

	render() {
		const { eventDetails, loading } = this.props;
		return (
			<IonPage>
				<IonContent>
					<IonHeader slot='fixed'>
						<PageHeader backBtn={true} />
					</IonHeader>
					<br />
					<br />
					<br />

					{!loading && (
						<>
							<IonCard>
								<IonCardHeader>
									<IonCardTitle>{Translate(lsInj.transDict.delEventHeader)}</IonCardTitle>
								</IonCardHeader>
								<IonCardContent>
									<img style={{ width: '100%' }} src={eventDetails.avatar} alt='Broken' />
									<IonToolbar className='rounding'>
										<IonTitle>{eventDetails.name}</IonTitle>
									</IonToolbar>
									<IonItem lines='none'>
										<IonIcon size='small' color='primary' icon={timeOutline}></IonIcon>
										<IonLabel class='ion-text-wrap' style={{ fontSize: 'medium' }}>
											{Translate(lsInj.transDict.Time)} <br /> {moment(eventDetails.time).utcOffset('+0200').format('LT')}
										</IonLabel>
										<IonIcon size='small' color='primary' icon={calendar}></IonIcon>
										<IonLabel class='ion-text-wrap' style={{ fontSize: 'medium' }}>
											{Translate(lsInj.transDict.Date)} <br /> {moment(eventDetails.date).utcOffset('+0200').format('DD/MM')}
										</IonLabel>
									</IonItem>

									<IonItem lines='none'>
										<IonIcon size='small' color='primary' icon={map}></IonIcon>
										<IonLabel class='ion-text-wrap' style={{ fontSize: 'medium' }}>
											{Translate(lsInj.transDict.Place)} <br />
											{eventDetails.location.address.label}
										</IonLabel>
									</IonItem>

									<IonCard color='light'>
										<IonCardContent>{eventDetails.description}</IonCardContent>
									</IonCard>
								</IonCardContent>
							</IonCard>
							<IonButton onClick={() => this.delGroup()}>{Translate(lsInj.transDict.Delete)}</IonButton>
						</>
					)}
				</IonContent>
			</IonPage>
		);
	}
}

const mapStateToProps = (state: IAppState, ownProps: any) => {
	const param = ownProps.match.params.eventname;
	const evnt = state.user.events[param];
	console.log('UserDeleteEvent', param);
	console.log('comp', evnt);
	return {
		userId: state.user.id,
		eventDel: param,
		eventDetails: evnt,
		loading: state.user.isEmpty
	};
};

const mapDispatchToProps = (dispatch: Dispatch<any>) => {
	return {
		delEvent: (reqData: { userId: string; eventId: string }) => dispatch(EventDelete(reqData))
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(UserDeleteEvent);

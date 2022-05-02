import React, { Component, Dispatch } from 'react';
import { IonPage, IonContent, IonList, IonItem, IonToggle, IonLabel, IonHeader, IonButton } from '@ionic/react';
import PageHeader from '../../../layout/Headers/PageHeader';
import { Translate } from '../../../services/translate/TranslateServices';
import { lsInj } from '../../../services/translate/LocalLangDict';
import { connect } from 'react-redux';
import { IAppState } from '../../../services/redux/reduxModels';
import { User_Update_NotifyToken, User_Update_Notify_SubTypes } from '../../../services/redux/actions/userActions/001UserActions';
import { Plugins, PushNotificationToken } from '@capacitor/core';

const { PushNotifications } = Plugins;

export interface subtype {
	NewItemsinGroups: boolean;
	NewMessages: boolean;
	NewEventsNearYou: boolean;
	NewFollowAddedSomething: boolean;
}
interface iState {
	notifications: any[];
	typesOfsubjectsTonotifyOn: subtype;
}

class UserNotificationPermissions extends Component<any, iState> {
	constructor(props: any) {
		super(props);
		this.state = {
			notifications: [{ id: 'id', title: 'Test Push', body: 'This is my first push notification' }],
			typesOfsubjectsTonotifyOn: {
				NewItemsinGroups: this.props.notifyObj.NewItemsinGroups,
				NewMessages: this.props.notifyObj.NewMessages,
				NewEventsNearYou: this.props.notifyObj.NewEventsNearYou,
				NewFollowAddedSomething: this.props.notifyObj.NewFollowAddedSomething
			}
		};
	}

	push() {
		// Register with Apple / Google to receive push via APNS/FCM
		PushNotifications.register();

		// On succcess, we should be able to receive notifications
		PushNotifications.addListener('registration', (token: PushNotificationToken) => {
			// alert('Push registration success, token: ' + token.value);
			alert(Translate(lsInj.transDict.ispush));
			localStorage.setItem('pushToken', JSON.stringify(token.value));
			//send token to backend
			this.props.saveNotifyCode(token.value);
		});

		// Some issue with your setup and push will not work
		PushNotifications.addListener('registrationError', (error: any) => {
			alert('Error on registration: ' + JSON.stringify(error));
		});
	}

	setSubjectNotifications(e: any, type: 'msg' | 'event' | 'follow' | 'itemsInGroup') {
		// console.log('e', e.detail.checked, type);
		var newObj = { ...this.state.typesOfsubjectsTonotifyOn };
		if (type === 'msg') {
			newObj = { ...newObj, NewMessages: e.detail.checked };
			this.setState({ typesOfsubjectsTonotifyOn: newObj });
			// console.log('newObj', newObj);
			this.props.updateNotifySubs(newObj);
		} else if (type === 'event') {
			newObj = { ...newObj, NewEventsNearYou: e.detail.checked };
			this.setState({ typesOfsubjectsTonotifyOn: newObj });
			// console.log('newObj', newObj);
			this.props.updateNotifySubs(newObj);
		} else if (type === 'follow') {
			newObj = { ...newObj, NewFollowAddedSomething: e.detail.checked };
			this.setState({ typesOfsubjectsTonotifyOn: newObj });
			// console.log('newObj', newObj);
			this.props.updateNotifySubs(newObj);
		} else if (type === 'itemsInGroup') {
			newObj = { ...newObj, NewItemsinGroups: e.detail.checked };
			this.setState({ typesOfsubjectsTonotifyOn: newObj });
			// console.log('newObj', newObj);
			this.props.updateNotifySubs(newObj);
		}
	}

	render() {
		const { isRegesterdForPush } = this.props;
		return (
			<IonPage>
				<IonContent>
					<IonHeader slot='fixed'>
						<PageHeader backBtn={true} titleString={Translate(lsInj.transDict.Notifications)} />
					</IonHeader>{' '}
					<br />
					<br />
					<br />
					<IonList>
						{!isRegesterdForPush && (
							<IonItem>
								<IonLabel class='ion-text-wrap'>{Translate(lsInj.transDict.push)}</IonLabel>
								<IonButton expand='full' onClick={() => this.push()}>
									{Translate(lsInj.transDict.Register)}
								</IonButton>
							</IonItem>
						)}

						{isRegesterdForPush && (
							<IonItem>
								<IonLabel class='ion-text-wrap'>{Translate(lsInj.transDict.ispush)}</IonLabel>
							</IonItem>
						)}

						<IonItem>
							<IonLabel class='ion-text-wrap'>{Translate(lsInj.transDict.NewMessages)}</IonLabel>
							<IonToggle
								checked={this.state.typesOfsubjectsTonotifyOn.NewMessages}
								slot='end'
								onIonChange={(e) => {
									this.setSubjectNotifications(e, 'msg');
								}}
							/>
						</IonItem>

						<IonItem>
							<IonLabel class='ion-text-wrap'>{Translate(lsInj.transDict.NewItemsinGroups)}</IonLabel>
							<IonToggle
								checked={this.state.typesOfsubjectsTonotifyOn.NewItemsinGroups}
								slot='end'
								onIonChange={(e) => {
									this.setSubjectNotifications(e, 'itemsInGroup');
								}}
							/>
						</IonItem>

						<IonItem>
							<IonLabel class='ion-text-wrap'>{Translate(lsInj.transDict.NewEventsNearYou)}</IonLabel>
							<IonToggle
								checked={this.state.typesOfsubjectsTonotifyOn.NewEventsNearYou}
								slot='end'
								onIonChange={(e) => {
									this.setSubjectNotifications(e, 'event');
								}}
							/>
						</IonItem>

						<IonItem>
							<IonLabel class='ion-text-wrap'>{Translate(lsInj.transDict.NewFollowAddedSomething)}</IonLabel>
							<IonToggle
								checked={this.state.typesOfsubjectsTonotifyOn.NewFollowAddedSomething}
								slot='end'
								onIonChange={(e) => {
									this.setSubjectNotifications(e, 'follow');
								}}
							/>
						</IonItem>
					</IonList>
				</IonContent>
			</IonPage>
		);
	}
}

const mapStateToProps = (state: IAppState) => {
	return {
		notifyObj: state.user.typesOfsubjectsTonotifyOn,
		isRegesterdForPush: state.user.notifyToken.length > 0 ? true : false
	};
};
const matchDispatchToProps = (dispatch: Dispatch<any>) => {
	return {
		saveNotifyCode: (token: string) => dispatch(User_Update_NotifyToken(token)),
		// addNotifToredux: (notifs: any[]) => dispatch(AddNotifToRedux(notifs)),
		updateNotifySubs: (notifyObj: subtype) => dispatch(User_Update_Notify_SubTypes(notifyObj))
	};
};

export default connect(mapStateToProps, matchDispatchToProps)(UserNotificationPermissions);

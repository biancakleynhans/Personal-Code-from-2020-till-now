import React, { Component } from 'react';
import { IonGrid, IonRow, IonButton } from '@ionic/react';
import { Translate } from '../../services/translate/TranslateServices';
import { lsInj } from '../../services/translate/LocalLangDict';
import { Plugins, PushNotification, PushNotificationToken, PushNotificationActionPerformed } from '@capacitor/core';
const { PushNotifications } = Plugins;

const INITIAL_STATE = {
	notifications: []
};

class PushNotify extends Component<any, any> {
	constructor(props: any) {
		super(props);
		this.state = { ...INITIAL_STATE };
	}

	push() {
		console.log('Initializing PushNotify');

		// Register with Apple / Google to receive push via APNS/FCM
		PushNotifications.register();

		// On succcess, we should be able to receive notifications
		PushNotifications.addListener('registration', (token: PushNotificationToken) => {
			console.log('Push registration success, token: ' + token.value);
			alert('Push registration success, token: ' + token.value);
			this.props.saveNotifyCode(token.value);
		});

		// Some issue with our setup and push will not work
		PushNotifications.addListener('registrationError', (error: any) => {
			console.log('Error on registration: ' + JSON.stringify(error));
			alert('Error on registration: ' + JSON.stringify(error));
		});

		// Show us the notification payload if the app is open on our device
		PushNotifications.addListener('pushNotificationReceived', (notification: PushNotification) => {
			console.log('Push received: ' + JSON.stringify(notification));
			// alert('Push received: ' + JSON.stringify(notification));
			let notif = this.state.notifications;
			notif.push({ id: notification.id, title: notification.title, body: notification.body });
			this.setState({
				notifications: notif
			});
			this.props.addToRedux(notif);
		});

		// Method called when tapping on a notification
		PushNotifications.addListener('pushNotificationActionPerformed', (notification: PushNotificationActionPerformed) => {
			console.log('Push action performed: ' + JSON.stringify(notification));
			// alert('Push action performed: ' + JSON.stringify(notification));
			let notif = this.state.notifications;
			notif.push({ id: notification.notification.data.id, title: notification.notification.data.title, body: notification.notification.data.body });
			this.setState({
				notifications: notif
			});
			this.props.addToRedux(notif);
		});
	}
	render() {
		// const { notifications } = this.state;
		return (
			<IonGrid>
				<IonRow>
					<IonButton class='ion-text-wrap' onClick={() => this.push()}>
						{Translate(lsInj.transDict.waterReminder)}
					</IonButton>
				</IonRow>
				<br />
				<br />
			</IonGrid>
		);
	}
}

export default PushNotify;

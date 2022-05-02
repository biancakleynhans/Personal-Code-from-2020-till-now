/** @format */

import React from 'react';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';
import './theme/variablesDark.css';
import './theme/loader.css';
import './theme/pulse.css';

import { IonApp } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import Menu from './routes/sideMenu/Menu';
import { getDeviceTypeString } from './capAddOns/deviceDetect/DetectTypeOfDevice';
import { LocalNotify_Mobile_GetPermission } from './capAddOns/localNotifications/LocalNotify';
import firebaseApp from './services/firebase/firebase';
import Tabs from './routes/tabs/Tabs';

class App extends React.Component {
	componentDidMount() {
		this.AuthListener();

		var dev = getDeviceTypeString();
		if (dev === 'android' || dev === 'ios') {
			console.log('andriod or ios device');
			LocalNotify_Mobile_GetPermission();
		} else {
			console.log('Not andriod or ios device');
			return;
		}
	}

	AuthListener() {
		firebaseApp.auth().onAuthStateChanged(user => {
			// console.log("user", user)
			if (user !== null) {
				// console.log("user", user.uid)
				localStorage.setItem('user', user.uid);
			} else {
				// console.log("No user")
				localStorage.removeItem('user');
			}
		});
	}

	render() {
		return (
			<IonApp>
				<Menu />

				{/* <Tabs /> */}
			</IonApp>
		);
	}
}

export default App;

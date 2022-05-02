/** @format */

import React, { Component } from 'react';
import { IonPage, IonContent } from '@ionic/react';

export class LoadingScreen extends Component {
	render() {
		// console.log('LoadingScreen');
		return (
			<IonPage>
				<IonContent className='container'></IonContent>
			</IonPage>
		);
	}
}

export default LoadingScreen;

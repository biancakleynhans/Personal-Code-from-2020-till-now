import React, { Component } from 'react';
import { IonPage, IonContent, IonTitle, IonSpinner } from '@ionic/react';

export class LoadingScreen extends Component {
	render() {
		// console.log('LoadingScreen');
		return (
			<IonPage>
				<IonContent className='container'>
					<IonTitle>Loading</IonTitle>
					<IonSpinner name='circles'></IonSpinner>
				</IonContent>
			</IonPage>
		);
	}
}

export default LoadingScreen;

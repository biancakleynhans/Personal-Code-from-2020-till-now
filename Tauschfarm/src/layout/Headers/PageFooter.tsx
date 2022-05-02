import React, { Component } from 'react';
import { IonToolbar, IonButton, IonButtons } from '@ionic/react';

export class PageFooter extends Component {
	render() {
		return (
			<IonToolbar color='medium' style={{ opacity: 0.0 }}>
				<IonButtons>
					<IonButton color='dark' expand='full' fill='clear' style={{ opacity: 0.0, fontSize: '0.9em' }} href='https://icons8.com/icons'>
						Icons By Icon8
					</IonButton>
				</IonButtons>
			</IonToolbar>
		);
	}
}

export default PageFooter;

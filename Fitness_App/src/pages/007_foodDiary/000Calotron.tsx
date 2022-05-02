/** @format */

import React, { Component } from 'react';
import { IonCardContent, IonCardTitle, IonCardSubtitle } from '@ionic/react';

interface iProps {
	netCalories: number;
	caloriesEaten: number;
	caloriesBurned: number;
}

class Calotron extends Component<iProps> {
	render() {
		console.log('Calotron', this.props);
		return (
			<IonCardContent>
				<IonCardTitle style={{ textAlign: 'end', fontSize: 'x-large' }}> {this.props.netCalories}</IonCardTitle>
				<IonCardSubtitle style={{ textAlign: 'end', fontSize: 'small' }} color='danger'>
					+{this.props.caloriesEaten}
				</IonCardSubtitle>
				<IonCardSubtitle style={{ textAlign: 'end', fontSize: 'small' }} color='success'>
					-{this.props.caloriesBurned ? this.props.caloriesBurned : 0}
				</IonCardSubtitle>
			</IonCardContent>
		);
	}
}

export default Calotron;

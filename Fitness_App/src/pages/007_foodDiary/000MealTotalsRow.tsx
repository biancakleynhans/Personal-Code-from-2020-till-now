/** @format */

import React, { Component } from 'react';
import { IonGrid, IonRow, IonCol } from '@ionic/react';
import { LablesList } from '../../components/titleLists/Titles';

interface iProps {
	totals: {
		carbs: any;
		fat: any;
		protein: any;
		calories: any;
	};
}
class MealTotalsRow extends Component<iProps> {
	render() {
		// console.log("MealTotalsRow",this.props)
		return (
			<IonGrid>
				<IonRow align-items-end>
					<IonCol align-self-end>{LablesList.FoodDiary.mealTotals.af}</IonCol>
					<IonCol align-self-end></IonCol>
					<IonCol align-self-end></IonCol>
					<IonCol align-self-end>{+this.props.totals.carbs.toFixed(2)}</IonCol>
					<IonCol align-self-end>{+this.props.totals.fat.toFixed(2)}</IonCol>
					<IonCol align-self-end>{+this.props.totals.protein.toFixed(2)}</IonCol>
					<IonCol align-self-end>{this.props.totals.calories ? +this.props.totals.calories.toFixed(2) : '--'}</IonCol>
				</IonRow>
			</IonGrid>
		);
	}
}

export default MealTotalsRow;

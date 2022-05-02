/** @format */

import React, { Component } from 'react';
import { iGoals } from '../../models/FoodDiaryModels';
import { IonGrid, IonRow, IonCol, IonText } from '@ionic/react';
import { FavList } from '../../components/icons/FaviconList';
import { LablesList } from '../../components/titleLists/Titles';

interface iProps {
	totalCarbs: any;
	totalFat: any;
	totalProtein: any;
	goals: iGoals;
}

class MacroTotals extends Component<iProps> {
	render() {
		console.log('macro totals', this.props);
		// console.log("?????", this.props.goals.calories)

		let goalDifferences = {
			carbs: this.props.totalCarbs - (this.props.goals.carbs / 100) * +this.props.goals.calories,
			fat: this.props.totalFat - (this.props.goals.fat / 100) * +this.props.goals.calories,
			protein: this.props.totalProtein - (this.props.goals.protein / 100) * +this.props.goals.calories
		};

		let carbsDifference;
		// console.log("goalDifferences.carbs", goalDifferences.carbs)
		if (goalDifferences.carbs > 0) {
			carbsDifference = <IonText color='danger'>(+{goalDifferences.carbs.toFixed(2)} g)</IonText>;
		} else {
			carbsDifference = <IonText color='success'>({goalDifferences.carbs.toFixed(2)} g)</IonText>;
		}

		let fatDifference;
		// console.log("goalDifferences.fat", goalDifferences.fat)
		if (goalDifferences.fat > 0) {
			fatDifference = <IonText color='danger'>(+{goalDifferences.fat.toFixed(2)} g)</IonText>;
		} else {
			fatDifference = <IonText color='success'>({goalDifferences.fat.toFixed(2)} g)</IonText>;
		}

		let proteinDifference;
		// console.log("goalDifferences.protein", goalDifferences.protein)
		if (goalDifferences.protein > 0) {
			proteinDifference = <IonText color='danger'>(+{goalDifferences.protein.toFixed(2)} g)</IonText>;
		} else {
			proteinDifference = <IonText color='success'>({goalDifferences.protein.toFixed(2)} g)</IonText>;
		}

		return (
			<IonGrid>
				<IonRow>
					<IonCol>
						<IonText color='dark'>
							{FavList.foodIcons.breadSlice.icon} <br />
							{LablesList.FoodDiary.macroTotal.carb.af}
							<br />
							{this.props.totalCarbs.toFixed(2)} g
							<br />
							{carbsDifference}
						</IonText>
					</IonCol>

					<IonCol>
						<IonText color='dark'>
							{FavList.foodIcons.bacon.icon} <br />
							{LablesList.FoodDiary.macroTotal.fat.af} <br />
							{this.props.totalFat.toFixed(2)} g <br />
							{fatDifference}
						</IonText>
					</IonCol>

					<IonCol>
						<IonText color='dark'>
							{FavList.foodIcons.egg.icon} <br />
							{LablesList.FoodDiary.macroTotal.protein.af} <br />
							{this.props.totalProtein.toFixed(2)} g <br />
							{proteinDifference}
						</IonText>
					</IonCol>
				</IonRow>
				<IonRow>
					<IonCol>
						{this.props.goals.calories > 0 ? (
							<IonText color='dark'>
								{FavList.other.fire.icon} <br /> {LablesList.FoodDiary.macroTotal.calGoal.af}: {this.props.goals.calories}
							</IonText>
						) : (
							<IonText color='dark'>{LablesList.FoodDiary.macroTotal.set.af}</IonText>
						)}
					</IonCol>
				</IonRow>
			</IonGrid>
		);
	}
}

export default MacroTotals;

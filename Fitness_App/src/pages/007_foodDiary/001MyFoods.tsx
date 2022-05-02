/** @format */

import React, { Component } from 'react';
import AddableFoodItem from './001AddableFoodItem';
import { iFoodItemComplete } from '../../models/FoodDiaryModels';
import { Get } from '../../services/firebase/ConectToServer';
import { TypesToServer } from '../../services/firebase/TypesToServer';
import { convertObjectToArray, generator } from '../../helpers/Tools';
import { LablesList } from '../../components/titleLists/Titles';

interface iProps {
	// getFoods: ()=> void
	deleteUserFoodItem: (string: any) => void;
	// foods: iFoodItemComplete[]
	day: any;
	editMode: any;
	mealGroupContext: any;
}

class MyFoods extends Component<iProps> {
	foodsARR: iFoodItemComplete[] = [];

	constructor(props: any) {
		super(props);

		Get(TypesToServer.FoodDb)
			.then(snapshot => {
				console.log('snapshot.val()', snapshot.val());
				if (snapshot.val() !== null) {
					var ArrFromServer = convertObjectToArray(snapshot.val());
					this.foodsARR = ArrFromServer;

					// this.forceUpdate()
					return this.foodsARR;
				} else {
					ArrFromServer = [];
					this.foodsARR = ArrFromServer;

					// this.forceUpdate()
					return this.foodsARR;
				}
			})
			.catch(error => {
				console.log('error get', error);
			});
		// appInj.setLoading("Besig om voedsel te ontvang")
		// GetFood()
		// .then((res:any) => {
		// 	console.log("GetFood", res.data)
		// 	var ArrFromServer = convertObjectToArray(res.data)
		//   this.foodsARR = ArrFromServer
		//   appInj.setLoading('')
		//   this.forceUpdate()
		//   return this.foodsARR
		// })
		// .catch((error)=>{
		//   if (error.response){
		//     console.log(error.response.data);
		//     console.log(error.response.status);

		//     return <>{appInj.setLoading("Daar was i probleem probeer weer asb")}</>
		//   }
		// })
	}

	deleteUserFoodItem(foodItemId: any) {
		// console.log("deleteUserFoodItem", foodItemId)
		this.props.deleteUserFoodItem(foodItemId);
	}

	render() {
		// console.log("GetFood", this.foodsARR)
		var deleteUserFoodItem: (term: any) => void = this.deleteUserFoodItem.bind(this);

		let foodsDisplay;
		if (this.foodsARR.length > 0) {
			foodsDisplay = this.foodsARR.map(food => {
				console.log(food);
				return (
					<AddableFoodItem
						key={generator()}
						completeItem={food}
						day={this.props.day}
						editMode={this.props.editMode}
						funcDelete={{ deleteUserFoodItem }}
						mealGroupContext={this.props.mealGroupContext}
					/>
				);
			});
		} else {
			foodsDisplay = <span>{LablesList.FoodDiary.myFood.nofood.af}</span>;
		}
		return <>{foodsDisplay}</>;
	}
}

export default MyFoods;

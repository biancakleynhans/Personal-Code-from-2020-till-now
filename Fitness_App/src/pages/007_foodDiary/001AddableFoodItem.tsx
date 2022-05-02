/** @format */

import React, { Component } from 'react';
import ServingSelect from './000ServingSelect';
// import {getMacroTotals} from './000DayView'
import { iFoodItemComplete } from '../../models/FoodDiaryModels';
import { IonGrid, IonRow, IonCol, IonCardContent } from '@ionic/react';
import { FavList } from '../../components/icons/FaviconList';
import { Add, FoodDbMaker } from '../../services/firebase/ConectToServer';
import { TypesToServer } from '../../services/firebase/TypesToServer';
import { NutriApi } from "../../services/foodDatabase/FoodApiService";

interface iProps {
	key: any;
	completeItem: iFoodItemComplete;
	day: any;
	mealGroupContext: any;
	editMode?: any;
	funcDelete?: { deleteUserFoodItem: (string?: any) => void };
	item?: iFoodItemComplete;
}

interface iState {
	adding: boolean;
	item: any;
	loading: boolean;
	deleting: boolean;
	hasBeenAddedToCurrentMealGroup: boolean;
}

export function convert_NutriApi_ResultTo_iFoodItemComplete(result: any, day: string, mealName: string, mUri: any, mUriLabel: string, id?: string) {
	var foodObj: iFoodItemComplete = {
		id: '',
		day: '',
		mealName: '',

		name: '',
		foodId: '',
		macros: {
			calories: 0,
			protein: 0,
			carbs: 0,
			fat: 0,
			fiber: 0,
			sodium: 0
		},
		dailyReq: {
			calories: 0,
			Calcium: 0,
			protein: 0,
			carbs: 0,
			Cholesterol: 0,
			Sugar: 0,
			fat: 0
		},
		selectedServing: {
			servingSizeString: '',
			quantity: 0,
			yieldTotalPortions: 0,
			totalWeightOfFood: 0,
			mUriList: [{ label: '', uri: '' }]
		}
	};

	foodObj.name = result.ingredients[0].parsed[0].food; //request
	foodObj.foodId = result.ingredients[0].parsed[0].foodId; //request
	foodObj.id = id;
	foodObj.day = day;
	foodObj.mealName = mealName;

	foodObj.macros.calories = result.totalNutrients.ENERC_KCAL !== undefined ? +result.totalNutrients.ENERC_KCAL.quantity.toFixed(2) : 0.1;
	foodObj.macros.carbs = result.totalNutrients.CHOCDF !== undefined ? +result.totalNutrients.CHOCDF.quantity.toFixed(2) : 0.1;
	foodObj.macros.fat = result.totalNutrients.FAT !== undefined ? +result.totalNutrients.FAT.quantity.toFixed(2) : 0.1;
	foodObj.macros.protein = result.totalNutrients.PROCNT !== undefined ? +result.totalNutrients.PROCNT.quantity.toFixed(2) : 0.1;
	foodObj.macros.fiber = result.totalNutrients.FIBTG !== undefined ? +result.totalNutrients.FIBTG.quantity.toFixed(2) : 0.1;
	foodObj.macros.sodium = result.totalNutrients.NA !== undefined ? +result.totalNutrients.NA.quantity.toFixed(2) : 0.1;

	foodObj.dailyReq.calories = result.totalDaily.ENERC_KCAL !== undefined ? +result.totalDaily.ENERC_KCAL.quantity.toFixed(2) : 0.1;
	foodObj.dailyReq.carbs = result.totalDaily.CHOCDF !== undefined ? +result.totalDaily.CHOCDF.quantity.toFixed(2) : 0.1;
	foodObj.dailyReq.fat = result.totalDaily.FAT !== undefined ? +result.totalDaily.FAT.quantity.toFixed(2) : 0.1;
	foodObj.dailyReq.protein = result.totalDaily.PROCNT !== undefined ? +result.totalDaily.PROCNT.quantity.toFixed(2) : 0.1;
	foodObj.dailyReq.Calcium = result.totalDaily.CA !== undefined ? +result.totalDaily.CA.quantity.toFixed(2) : 0.1;
	foodObj.dailyReq.Cholesterol = result.totalDaily.CHOLE !== undefined ? +result.totalDaily.CHOLE.quantity.toFixed(2) : 0.1;
	foodObj.dailyReq.Sugar = result.totalDaily.SUGAR !== undefined ? +result.totalDaily.SUGAR.quantity.toFixed(2) : 0.1;
	foodObj.selectedServing.servingSizeString = mUriLabel;
	foodObj.selectedServing.quantity = result.ingredients[0].parsed[0].quantity;
	foodObj.selectedServing.yieldTotalPortions = +result.yield;
	foodObj.selectedServing.totalWeightOfFood = +result.ingredients[0].parsed[0].retainedWeight;
	foodObj.selectedServing.mUriList = mUri;

	console.log('foodObj Remade', foodObj);
	return foodObj;
}

class AddableFoodItem extends Component<iProps, iState> {
	constructor(props: any) {
		super(props);
		this.state = {
			adding: false,
			item: this.props.completeItem,
			loading: false,
			deleting: false,
			hasBeenAddedToCurrentMealGroup: false
		};
		// console.log("AddableFoodItem => props, state",props, this.state)
	}

	handleSizeChange(newServingSizeId: any) {
		console.log('handleSizeChange', newServingSizeId); // eslint-disable-next-line
		this.state.item.selectedServing.servingSizeString = newServingSizeId;
	}

	handleQuantityChange(newServingQuantity: number) {
		console.log('newServingQuantity', newServingQuantity); // eslint-disable-next-line
		this.state.item.selectedServing.quantity = newServingQuantity;
	}

	handleItemClick() {
		// if not in edit mode, get item details for ServingSelect
		// console.log("handleItemClick ...")
		if (!this.props.editMode) {
			if (!this.state.adding && !this.state.item) {
				this.setState({ adding: true });
			} else {
				this.setState(prevState => ({ adding: !prevState.adding }));
			}
		}
		// if in edit mode, activate deleting state
		else {
			this.setState(prevState => ({ deleting: !prevState.deleting }));
		}
	}

	handleAddClick() {
		// console.log("handleAddClick",this.state.item)

		var q = this.state.item.selectedServing.quantity;
		var fId = this.state.item.foodId;
		var mUri = this.state.item.selectedServing.mUriList.find((list: any) => list.label === this.state.item.selectedServing.servingSizeString);

		// console.log("mUri", mUri.qualified[1])
		// console.log("??????", q,mUri.uri,fId)

		if (mUri === undefined) {
			alert('Kies asb u porsie hoeveelheid');
		} else {
			// alert("Are you sure you would like to add "+ this.state.item.name)
			NutriApi(q, mUri.uri, fId).then((res: any) => {
				// some items do not work did email ianko to try and find out what to do but for now my code is working and fine
				console.log('res from Nutri API', res.data);
				console.log('ID', this.state.item);
				var consumed = convert_NutriApi_ResultTo_iFoodItemComplete(res.data, this.props.day, this.props.mealGroupContext, this.state.item.selectedServing.mUriList, mUri.label);
				this.addConsumption(consumed);

				//reImplement when doing meals
				// this.addFoodToMeal();
			}).then(()=>{window.location.reload()})
		}
	}

	addConsumption(conusmedItem: iFoodItemComplete) {
		conusmedItem.id = 'string';
		Add(TypesToServer.FoodConsumed, conusmedItem);
		FoodDbMaker(conusmedItem);
	}

	deleteUserFoodItem() {
		console.log('deleteUserFoodItem', this.state.item.id);
		if (this.props.funcDelete) this.props.funcDelete.deleteUserFoodItem(this.state.item.id);
	}

	RenderFuncs() {
		let foodName;
		if (this.props.completeItem) {
			foodName = this.state.item.name;
		} else if (this.props.item) {
			foodName = this.props.item.name;
		} else {
			foodName = 'Name';
		}

		// let itemTotals  = {calories: 0,carbs: 0,fat: 0,protein: 0};
		// itemTotals = getMacroTotals([], this.state.item)
		// set plus icon if in loading/editing state
		let plusButtonImg;
		if (this.props.editMode) {
			plusButtonImg = FavList.navIcons.delete.icon;
		} else {
			plusButtonImg = FavList.navIcons.add.icon;
		}

		// don't display food item once it's been added to a meal
		let hiddenStyle = { display: '' };
		if (this.state.hasBeenAddedToCurrentMealGroup) {
			hiddenStyle.display = 'none';
		}

		// FUnc Send
		var handleAddClick: (term: any) => void = this.handleAddClick.bind(this);
		var handleRemoveClick: (term: any) => void = this.deleteUserFoodItem.bind(this);

		return (
			<div>
				{this.state.item && (
					<IonGrid>
						<IonRow align-items-end>
							<IonCol>
								<div onClick={this.handleItemClick.bind(this)} style={hiddenStyle}>
									{plusButtonImg}
								</div>
							</IonCol>
							<IonCol align-self-end>{foodName}</IonCol>
							<IonCol></IonCol>
							<IonCol align-self-end>{this.state.item.macros.carbs}</IonCol>
							<IonCol align-self-end>{this.state.item.macros.fat}</IonCol>
							<IonCol align-self-end>{this.state.item.macros.protein}</IonCol>
							<IonCol align-self-end>{this.state.item.macros.calories}</IonCol>
						</IonRow>
					</IonGrid>
				)}

				{this.state.adding && this.state.item && (
					<ServingSelect
						showAddButton={true}
						showRemoveButton={true}
						item={this.state.item}
						mealGroupContext={this.props.mealGroupContext}
						funcQuantChange={this.handleQuantityChange.bind(this)}
						funcSizeChange={this.handleSizeChange.bind(this)}
						funcAddClick={{ handleAddClick }}
						funcItemRemove={{ handleRemoveClick }}
					/>
				)}
			</div>
		);
	}

	render() {
		return <IonCardContent>{this.RenderFuncs()}</IonCardContent>;
	}
}

export default AddableFoodItem;

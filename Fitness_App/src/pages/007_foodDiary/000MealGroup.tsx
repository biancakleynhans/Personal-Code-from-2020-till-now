/** @format */

import React, { Component } from 'react';
import MealTotalsRow from './000MealTotalsRow';
import MealItem from './000MealItem';
import { iFoodItemComplete } from '../../models/FoodDiaryModels';
import { IonGrid, IonRow, IonCol, IonRouterLink } from '@ionic/react';
import { generator } from '../../helpers/Tools';
import { LablesList } from '../../components/titleLists/Titles';

interface iProps {
	type: string;
	items: iFoodItemComplete[];
	totals: any;
	handleServingUpdate: (data: any) => void;
	handleItemRemove: (id: any) => void;
	removingItem: (items: iFoodItemComplete) => void;
	day: any;
}

interface iState {
	items: any;
}

class MealGroup extends Component<iProps, iState> {
	constructor(props: any) {
		super(props);
		this.state = {
			items: this.props.items
		};
		// console.log("MealGroup constructor",this.props)
	}

	UNSAFE_componentWillReceiveProps(nextProps: any) {
		// console.log("componentWillReceiveProps",nextProps)
		this.setState({ items: nextProps.items });
	}

	/**
	 * Update current serving size information within context of MealGroup
	 * (will be propagated up to DayView when checkmark clicked)
	 */
	handleSizeChange(newServingSizeId: any, consumptionId: any) {
		console.log('handleSizeChange newServingQuantity=>', newServingSizeId);
		console.log('handleSizeChange consumptionId=>', consumptionId);
		// eslint-disable-next-line
		let mealItem = this.state.items.find((item: any) => item._id === consumptionId._id);
		let mealItemIndex = this.state.items.indexOf(mealItem);

		this.state.items.find((item: any) => {
			// eslint-disable-next-line
			item._id === consumptionId._id;
			// return this.setState(this.state.items[mealItemIndex].selectedServing.servingSizeString = newServingSizeId)
			// eslint-disable-next-line
			return (this.state.items[mealItemIndex].selectedServing.servingSizeString = newServingSizeId);
		});
	}

	handleQuantityChange(newServingQuantity: any, consumptionId: any) {
		console.log('handleQuantityChange newServingQuantity=>', newServingQuantity);
		console.log('handleQuantityChange consumptionId=>', consumptionId);
		// eslint-disable-next-line
		let mealItem = this.state.items.find((item: any) => {
			// eslint-disable-next-line
			item.consumptionId === consumptionId;
			return item;
		});
		let mealItemIndex = this.state.items.indexOf(mealItem);

		this.state.items.find((item: any) => {
			// eslint-disable-next-line
			item._id === consumptionId._id;
			// return this.setState(this.state.items[mealItemIndex].selectedServing.quantity = newServingQuantity)
			// eslint-disable-next-line
			return (this.state.items[mealItemIndex].selectedServing.quantity = newServingQuantity);
		});
	}

	handleNewServingSave(item: any) {
		console.log('?????', item);
		this.props.handleServingUpdate(item);
	}

	handleItemRemove(consumptionId: any) {
		this.props.handleItemRemove(consumptionId);
	}

	render() {
		let mealItems;
		// console.log("render MealGroup", itemTotals, mealItems)

		if (this.state) {
			mealItems = this.state.items.map((item: any) => {
				return (
					<MealItem
						key={generator()}
						item={item}
						handleQuantityChange={this.handleQuantityChange.bind(this)}
						handleSizeChange={this.handleSizeChange.bind(this)}
						handleNewServingSave={this.handleNewServingSave.bind(this)}
						handleItemRemove={this.handleItemRemove.bind(this)}
						removingItem={this.props.removingItem}
					/>
				);
			});
		}

		return (
			<IonGrid>
				{mealItems}

				<IonRow>
					<IonCol></IonCol>
					<IonCol></IonCol>
					<IonCol></IonCol>
					<IonCol></IonCol>
				</IonRow>

				<IonRow>
					<IonCol></IonCol>
					<IonCol>
						<IonRouterLink color='medium' href={`add/${this.props.type.toLowerCase()}/${this.props.day}`}>
							{LablesList.FoodDiary.mealGroup.af}
						</IonRouterLink>
					</IonCol>
				</IonRow>

				<IonRow>{this.props.items.length > 0 && <MealTotalsRow totals={this.props.totals} />}</IonRow>
			</IonGrid>
		);
	}
}

export default MealGroup;

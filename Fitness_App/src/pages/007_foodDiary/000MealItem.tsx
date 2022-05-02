/** @format */

import React, { Component } from 'react';
import ServingSelect from './000ServingSelect';
import { iFoodItemComplete } from '../../models/FoodDiaryModels';
import { IonGrid, IonRow, IonCol, IonButton, IonText, IonCard } from '@ionic/react';
import { FavList } from '../../components/icons/FaviconList';
import { LablesList } from '../../components/titleLists/Titles';

interface iProps {
	key: any;
	item: any;
	handleQuantityChange: (data: any, data1: any) => void;
	handleSizeChange: (data: any, data1: any) => void;
	handleNewServingSave: (item: any) => void;
	handleItemRemove: (item: any) => void;
	removingItem: (item: iFoodItemComplete) => void;
}

interface iState {
	editMode: boolean;
}

class MealItem extends Component<iProps, iState> {
	constructor(props: any) {
		super(props);
		this.state = {
			editMode: false
		};
	}

	handleEditClick() {
		this.setState(prevState => ({ editMode: !prevState.editMode }));
	}

	handleSaveClick() {
		this.setState(prevState => ({
			editMode: !prevState.editMode
		}));
		this.props.handleNewServingSave(this.props.item);
	}

	handleSizeChange(servingSizeId: any) {
		this.props.handleSizeChange(servingSizeId, this.props.item);
	}

	handleQuantityChange(quantity: any) {
		this.props.handleQuantityChange(quantity, this.props.item);
	}

	handleRemove() {
		console.log('id', this.props.item);
		this.props.handleItemRemove(this.props.item);
	}

	render() {
		let icon;

		if (this.state.editMode) {
			icon = (
				<IonButton fill='clear' size='small' onClick={this.handleSaveClick.bind(this)}>
					{FavList.navIcons.done.icon} {LablesList.OptionsBtn.ok.af}
				</IonButton>
			);
		} else {
			icon = (
				<IonButton fill='clear' size='small' onClick={this.handleEditClick.bind(this)}>
					{FavList.navIcons.edit.icon}
				</IonButton>
			);
		}

		// FUnc Send
		var handleRemoveClick: (term: any) => void = this.handleRemove.bind(this);

		return (
			<IonCard color='light'>
				<IonGrid>
					<IonRow>
						<IonCol>
							{icon}
							{this.state.editMode && (
								<ServingSelect
									mealGroupContext={this.props.item.mealName}
									showAddButton={false}
									showRemoveButton={true}
									item={this.props.item}
									funcQuantChange={this.handleQuantityChange.bind(this)}
									funcSizeChange={this.handleSizeChange.bind(this)}
									funcItemRemove={{ handleRemoveClick }}
									removingItem={this.props.removingItem}
								/>
							)}
						</IonCol>
						<IonCol align-self-end>{FavList.foodIcons.breadSlice.icon}</IonCol>
						<IonCol align-self-end>{FavList.foodIcons.bacon.icon}</IonCol>
						<IonCol align-self-end>{FavList.foodIcons.egg.icon}</IonCol>
						<IonCol align-self-end>{FavList.other.fire.icon}</IonCol>
					</IonRow>

					<IonRow>
						{/* <IonCol></IonCol> */}
						<IonCol>
							<IonText>
								{this.props.item.name} <br />
								<br />
								{this.props.item.selectedServing.quantity} <br />
								{this.props.item.selectedServing.servingSizeString}
							</IonText>
						</IonCol>

						<IonCol>
							<IonText>{this.props.item.macros.carbs}</IonText>
						</IonCol>
						<IonCol>
							<IonText>{this.props.item.macros.fat}</IonText>
						</IonCol>
						<IonCol>
							<IonText>{this.props.item.macros.protein}</IonText>
						</IonCol>
						<IonCol>
							<IonText>{this.props.item.macros.calories}</IonText>
						</IonCol>
					</IonRow>
				</IonGrid>
			</IonCard>
		);
	}
}

export default MealItem;

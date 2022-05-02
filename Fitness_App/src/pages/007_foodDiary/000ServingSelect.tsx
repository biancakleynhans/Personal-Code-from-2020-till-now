/** @format */

import React, { Component } from 'react';
import { IonCard, IonList, IonItem, IonLabel, IonInput, IonSelect, IonSelectOption, IonButton } from '@ionic/react';
import { generator } from '../../helpers/Tools';
import { LablesList } from '../../components/titleLists/Titles';

interface iProps {
	item?: any;
	showAddButton: boolean;
	showRemoveButton: boolean;
	mealGroupContext: string;
	removingItem?: any;
	funcQuantChange: (quantity: any) => void;
	funcSizeChange: (servingSizeName: any) => void;
	funcAddClick?: { handleAddClick: (string: any) => void };
	funcItemRemove?: { handleRemoveClick: (string: any) => void };
}

interface iState {
	quantityValue: any;
	servSize: [];
	itemId: any;
}

class ServingSelect extends Component<iProps, iState> {
	constructor(props: any) {
		super(props);
		this.state = {
			quantityValue: this.props.item.selectedServing.quantity,
			itemId: this.props.item.id,
			servSize: this.props.item.selectedServing.servingSize
		};
		console.log('Serving Select Props', props);
	}

	handleQuantityChange(e: any) {
		this.setState({
			quantityValue: e.target.value
		});
		if (this.props.funcQuantChange) this.props.funcQuantChange(e.target.value);
	}

	handleSizeChange(e: any) {
		console.log('handleSizeChange', e.target.value);
		if (this.props.funcSizeChange) this.props.funcSizeChange(e.target.value);
	}

	handleItemRemove() {
		if (this.props.funcItemRemove) this.props.funcItemRemove.handleRemoveClick(this.props.item.id);
	}

	/**
	 * Click handler to prevent propogation up to AddableFoodItem
	 * (prevent the item from hiding <ServingSelect />)
	 */
	handleInputClick(e: any) {
		e.stopPropagation();
	}

	handleAddClick(e: any) {
		e.stopPropagation();
		// console.log("this.props.itemId need id", this.props.item)
		if (this.props.funcAddClick) this.props.funcAddClick.handleAddClick(this.props.item);
	}

	render() {
		console.log('render Serving Props', this.props);

		let servingUnitOptions;
		var list = Object.assign(this.props.item.selectedServing.mUriList);

		servingUnitOptions = list.map((entry: any) => {
			// console.log("servingUnitOptions entry", entry)
			return (
				<IonSelectOption key={generator()} value={entry.label}>
					{entry.label}
				</IonSelectOption>
			);
		});

		let removeButtonText = LablesList.FoodDiary.servingSelec.buttons.remove.af;

		let addButtonText = LablesList.FoodDiary.servingSelec.buttons.add.af + this.props.mealGroupContext;

		return (
			<IonCard color='medium'>
				<IonList>
					<IonItem>
						<IonLabel position='floating'>{LablesList.FoodDiary.servingSelec.buttons.amt.af}</IonLabel>
						<IonInput
							autofocus={true}
							inputmode='numeric'
							name='height'
							type='number'
							value={this.state.quantityValue}
							onIonChange={this.handleQuantityChange.bind(this)}
							onClick={this.handleInputClick.bind(this)}
						/>
					</IonItem>

					<IonItem>
						<IonLabel>{LablesList.FoodDiary.servingSelec.buttons.quan.af}</IonLabel>
						<IonSelect
							placeholder={LablesList.OptionsBtn.placeHolder.af}
							cancelText={LablesList.OptionsBtn.cancel.af}
							okText={LablesList.OptionsBtn.ok.af}
							onIonChange={this.handleSizeChange.bind(this)}
							onClick={this.handleInputClick.bind(this)}>
							{servingUnitOptions}
						</IonSelect>
					</IonItem>

					{this.props.showAddButton && <IonButton onClick={this.handleAddClick.bind(this)}>{addButtonText}</IonButton>}

					{this.props.showRemoveButton && (
						<IonButton className={'ServingSelect__remove-button' + (this.props.removingItem ? ' removing' : '')} onClick={this.handleItemRemove.bind(this)}>
							{removeButtonText}
						</IonButton>
					)}

					{this.props.showRemoveButton && <IonButton onClick={() => window.location.reload()}>{LablesList.OptionsBtn.cancel.af}</IonButton>}
				</IonList>
			</IonCard>
		);
	}
}

export default ServingSelect;

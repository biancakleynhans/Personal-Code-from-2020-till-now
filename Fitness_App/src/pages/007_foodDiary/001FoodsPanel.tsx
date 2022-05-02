/** @format */

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import SearchResults from './001SearchResults';
import RecentFoods from './001RecentFoods';
import MyFoods from './001MyFoods';
import { IonGrid, IonRow, IonCol, IonButton, IonSearchbar } from '@ionic/react';
import { ListHeader2 } from '../../components/layout/ListHeader';
import { LablesList } from '../../components/titleLists/Titles';

interface iProps {
	getSearch: (string: string) => void;
	currentTab: any;
	handleSwitchTab: (tabNumber: number) => void;
	searchResults: any[];
	searchError: boolean;
	recentFoods: any[];
	// getUserFoods:()=> void
	myFoods: any[];
	deleteUserFoodItem: (foodItemId: any) => void;
	day: string;
	mealGroupContext: any;
	nextPagesearchResults: () => void;
	prevPagesearchResults: () => void;
}

interface iState {
	editMode: boolean;
}

class FoodsPanel extends Component<iProps, iState> {
	constructor(props: any) {
		super(props);
		this.state = {
			editMode: false
		};
		// console.log("FoodsPanel props", props)
	}

	// /**
	//  * Switches which tab is displayed based on click
	//  */
	handleSwitchTab(e: any) {
		// console.log("FoodsPanel => handleSwitchTab props ", e.target.attributes.class.value)
		console.log('FoodsPanel => handleSwitchTab props ', e);
		if (e === 'FoodsPanel__tab--searchresults current') {
			this.props.handleSwitchTab(0);
			this.forceUpdate();
		} else {
			let tab = e.target.attributes.id.value;
			if (!tab.includes(' ')) {
				// make sure we're actually switching to a different tab
				tab = tab.substring(tab.indexOf('--') + 2);
				let tabNumber = ['searchresults', 'recent', 'myfoods'].indexOf(tab);
				console.log('FoodsPanel =>tabNumber', tabNumber);
				// make sure edit mode is off when switching to My Foods tab
				if (tabNumber === 2) {
					this.setState({ editMode: false });
				}

				this.props.handleSwitchTab(tabNumber);
				this.forceUpdate();
			}
		}
	}

	shouldDisplayPanelHeader() {
		if ((this.props.currentTab === 0 && this.props.searchError) || (this.props.currentTab === 2 && !this.props.myFoods.length)) {
			return false;
		}
		return true;
	}

	editMode() {
		this.setState(prevState => ({
			editMode: !prevState.editMode
		}));
	}

	// getUserFoods() {
	//   this.props.getUserFoods();
	// }

	deleteUserFoodItem(foodItemId: any) {
		// console.log("deleteUserFoodItem", foodItemId)
		this.props.deleteUserFoodItem(foodItemId);
	}

	handleSearchChange(e: any) {
		console.log('AddFoodView => handleSearchChange', e);
		this.props.getSearch(e.detail.value);
		this.handleSwitchTab('FoodsPanel__tab--searchresults current');
	}

	render() {
		console.log('this.props.currentTab', this.props.currentTab);
		return (
			<IonGrid>
				<IonRow>
					<IonCol>
						<IonSearchbar
							placeholder='Tik asb die engelse naam in'
							color='secondary'
							inputmode='text'
							showCancelButton='focus'
							cancelButtonText='Kanseleer'
							debounce={900}
							animated
							type='text'
							onIonChange={(e: any) => this.handleSearchChange(e)}
						/>
					</IonCol>
				</IonRow>
				<IonRow>
					<IonCol>
						<IonButton size='small' fill='solid' id={'FoodsPanel__tab--searchresults' + (this.props.currentTab === 0 ? ' current' : '')} onClick={this.handleSwitchTab.bind(this)}>
							{LablesList.FoodDiary.FoodsPannel.search.af}
						</IonButton>

						<IonButton size='small' fill='solid' id={'FoodsPanel__tab--recent' + (this.props.currentTab === 1 ? ' current' : '')} onClick={this.handleSwitchTab.bind(this)}>
							{LablesList.FoodDiary.FoodsPannel.recent.af}
						</IonButton>

						<IonButton size='small' fill='solid' id={'FoodsPanel__tab--myfoods' + (this.props.currentTab === 2 ? ' current' : '')} onClick={this.handleSwitchTab.bind(this)}>
							{LablesList.FoodDiary.FoodsPannel.myFood.af}
						</IonButton>

						<Link to={'/createfood/' + this.props.mealGroupContext + '/' + this.props.day}>
							<IonButton size='small' fill='solid' id={'FoodsPanel__tab--createfoodbutton small-button' + (this.props.currentTab === 2 ? ' current' : '')}>
								{LablesList.FoodDiary.FoodsPannel.new.af}
							</IonButton>
						</Link>
					</IonCol>
				</IonRow>

				<IonRow>
					<IonCol>
						{this.shouldDisplayPanelHeader() && <ListHeader2 />}
						{this.props.currentTab === 0 && (
							<SearchResults
								nextPagesearchResults={this.props.nextPagesearchResults}
								prevPagesearchResults={this.props.prevPagesearchResults}
								results={this.props.searchResults}
								error={this.props.searchError}
								day={this.props.day}
								mealGroupContext={this.props.mealGroupContext}
							/>
						)}
						{this.props.currentTab === 1 && <RecentFoods foods={this.props.recentFoods} mealName={this.props.mealGroupContext} day={this.props.day} mealGroupContext={this.props.mealGroupContext} />}

						{this.props.currentTab === 2 && (
							<MyFoods day={this.props.day} deleteUserFoodItem={this.deleteUserFoodItem.bind(this)} editMode={this.state.editMode} mealGroupContext={this.props.mealGroupContext} />
						)}
					</IonCol>
				</IonRow>
			</IonGrid>
		);
	}
}

export default FoodsPanel;

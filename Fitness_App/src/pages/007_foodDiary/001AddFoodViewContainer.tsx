/** @format */

import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { RouteComponentProps } from 'react-router-dom';
import { IonPage, IonCard, IonCardHeader, IonButton, IonRouterLink } from '@ionic/react';
import AddFoodView from './001AddFoodView';
import { RCPprops } from '../../models/FoodDiaryModels';
import PageHeader from '../../components/layout/PageHeader';
import { LablesList } from '../../components/titleLists/Titles';

interface iProps {}

interface iState {
	tab: any;
	mealGroupContext: any; //string | undefined
}

class AddFoodViewContainer extends Component<iProps & RouteComponentProps<RCPprops>, iState> {
	constructor(props: any) {
		super(props);
		this.state = {
			tab: 1,
			mealGroupContext: undefined
		};
		// console.log("AddFoodViewContainer", props,this.state)
	}

	componentDidMount() {
		window.scrollTo(0, 0);
	}

	fetchMealGroupToProvideAsContext(mealGroupContext: any) {
		// console.log("mealGroupContext", mealGroupContext)
		this.setState({ mealGroupContext: mealGroupContext });
		this.setState({ tab: 1 });
	}

	handleDoneAddingFoodsClick() {
		const currentLocation = this.props.location.pathname;
		const nextLocation = '/foodDiary';
		// console.log("currentLocation", currentLocation)
		this.setState({ tab: 3 });
		return <Redirect to={nextLocation} from={currentLocation} />;
	}

	render() {
		const day = this.props.match.params.day;
		const tab = this.state.tab;
		const mealGroupContext = this.state.mealGroupContext;

		// console.log("mealGroupContext", mealGroupContext)
		// console.log("day", day)
		// console.log("tab", tab)

		if (tab && this.state.tab !== tab) {
			this.setState({ tab });
		}

		if (mealGroupContext && !this.state.mealGroupContext) {
			this.fetchMealGroupToProvideAsContext(this.props.match.params.meal);
		}

		let cancelLinkContents;
		if (!this.state.mealGroupContext) {
			cancelLinkContents = (
				<IonButton color='light'>
					<IonRouterLink routerLink={'/foodDiary'} routerDirection='none'>
						{LablesList.OptionsBtn.cancel.af}
					</IonRouterLink>
				</IonButton>
			);
		} else {
			cancelLinkContents = (
				<IonCard>
					<IonCardHeader>
						{LablesList.FoodDiary.addFoodViewContainer.add.af}
						{this.state.mealGroupContext}
					</IonCardHeader>
					<IonButton onClick={this.handleDoneAddingFoodsClick.bind(this)}>{LablesList.FoodDiary.addFoodViewContainer.done.af}</IonButton>
				</IonCard>
			);
		}

		return (
			<IonPage>
				<PageHeader titleString={LablesList.Page_Header_Names.FoodDiary.foodView.af} />
				<AddFoodView day={day} tab={this.state.tab} mealGroupContext={this.props.match.params.meal} />
				{cancelLinkContents}
			</IonPage>
		);
	}
}

export default AddFoodViewContainer;

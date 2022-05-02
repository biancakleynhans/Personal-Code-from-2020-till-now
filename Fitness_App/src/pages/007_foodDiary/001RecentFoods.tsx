/** @format */

import React, { Component } from 'react';
import AddableFoodItem from './001AddableFoodItem';
import { generator } from '../../helpers/Tools';


interface iProps {
	foods: any;
	mealName: any;
	day: any;
	mealGroupContext: any;
}

class RecentFoods extends Component<iProps> {
	render() {
		let foods;
		if (this.props.foods) {
			foods = this.props.foods.map((food: any) => {
				return <AddableFoodItem key={generator()} completeItem={food} day={this.props.day} mealGroupContext={this.props.mealGroupContext} />;
			});
		}

		return <>{foods}</>;
	}
}

export default RecentFoods;

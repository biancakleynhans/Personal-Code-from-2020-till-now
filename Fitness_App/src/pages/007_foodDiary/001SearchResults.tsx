/** @format */

import React, { Component } from 'react';
import AddableFoodItem from './001AddableFoodItem';
import Edam from './transparent.png';
import { IonImg } from '@ionic/react';
import { generator } from '../../helpers/Tools';
import { LablesList } from '../../components/titleLists/Titles';

interface iProps {
	results: any;
	error: any;
	day: any;
	mealGroupContext: any;
	nextPagesearchResults: () => void;
	prevPagesearchResults: () => void;
}
class SearchResults extends Component<iProps> {
	nextArr: any[] = [];
	prevArr: any[] = [];

	DisplayRes() {
		// console.log(" Search result", this.props.results)
		var resArr = this.props.results.map((result: any) => {
			return <AddableFoodItem key={generator()} completeItem={result} day={this.props.day} mealGroupContext={this.props.mealGroupContext} />;
		});

		return (
			<div>
				{resArr}
				<IonImg style={{ width: '150px', height: '150px' }} src={Edam} alt='img.png'></IonImg>
				{/* <SearchNextPageButton
      nextPagesearchResults={this.props.nextPagesearchResults}
      prevPagesearchResults={this.props.prevPagesearchResults}
      /> */}
			</div>
		);
	}

	render() {
		// console.log("render search res",this.props)
		return (
			<div className='SearchResults'>
				{this.DisplayRes()}

				{this.props.error && <p>{LablesList.FoodDiary.search.nope.af}</p>}

				{!this.props.results && <p className='SearchResults__error'>{LablesList.FoodDiary.search.nope.af}</p>}
			</div>
		);
	}
}

export default SearchResults;

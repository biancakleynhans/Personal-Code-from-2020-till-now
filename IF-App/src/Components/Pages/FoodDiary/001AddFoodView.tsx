import React, { Component } from 'react';
import FoodsPanel from './001FoodsPanel';
import SearchFood from './001SearchFood';
import { SearchFoodApi } from '../../../Services/FoodApiService';
import { GetFoodConsumed, GetFood, DeleteFood } from '../../../Services/ConectToServerServicesFoodDiary';
import update from 'immutability-helper';
import { generator } from '../../Util/tools';
import axios from 'axios';

interface iProps{
	day:string
	tab:number
	mealGroupContext:string
}

interface iState{
	searchTerm: string,
	searchResults: any[],
	searchError: boolean,
	foodsPanelTab: number
	recentFoods: [],
	myFoods: [],
	
}

class AddFoodView extends Component<iProps, iState> {
	
	nextPageArr: any[] = []
	constructor(props:any) {
		super(props);
		this.state = {
			searchTerm: '',
			searchResults: [],
			searchError: false,
			foodsPanelTab: this.props.tab ? this.props.tab : 1,
			recentFoods: [],
			myFoods: [],
			
		}
	}
	
	componentDidMount() {
		// get recent consumptions
		GetFoodConsumed().then((res:any) => {this.setState({recentFoods: res.data});});
	}

	UNSAFE_componentWillReceiveProps(nextProps:any) {
		// update tab when new tab is passed down from AddFoodViewContainer
		if(nextProps.tab) {
			if(nextProps.tab !== this.state.foodsPanelTab) {
				this.setState({foodsPanelTab: nextProps.tab}, () => {window.scrollTo(0, 0);});
			}
		}
	}

	switchTabs(tabNumber:number) {
		this.setState({foodsPanelTab: tabNumber});
	}

	handleSearchChange(term:string) {
		// console.log("AddFoodView => handleSearchChange", term)
		this.setState({
			searchTerm: term,
			foodsPanelTab: 0
		});
		this.getSearchResults(term);
	}

	convertResults(results:any){
		var resArray:any[] = []
		results.forEach((result:any) => {
			// console.log("result", result)
			var foodObj  = {
				name: '',
				foodId:'',
				macros: {
					glycemicIndex:0,
					calories: 0,
					protein:0, 
					carbs:0,
					fat: 0,
					fiber:0,
					sodium:0
				},
				selectedServing: {
					servingSizeString: '',  // selected serving size in Serving select use this value to do map for call on right cal needs 
					quantity: 0,
					totalWeightOfFood:0,
					yieldTotalPortions: 0,
					mUriList: [{label : "", uri: ""}],
				}
				
			}

			foodObj.name = result.food.label
			foodObj.foodId = result.food.foodId
			foodObj.macros.glycemicIndex = 0
			foodObj.macros.calories = (result.food.nutrients.ENERC_KCAL !== undefined) ? +((result.food.nutrients.ENERC_KCAL).toFixed(2)) : 0.1
			foodObj.macros.carbs = (result.food.nutrients.CHOCDF !== undefined)?  	 	 +((result.food.nutrients.CHOCDF).toFixed(2)) :0.1
			foodObj.macros.fat = (result.food.nutrients.FAT !== undefined)?  		 	 +((result.food.nutrients.FAT).toFixed(2)): 0.1
			foodObj.macros.protein = (result.food.nutrients.PROCNT !== undefined)?   	 +((result.food.nutrients.PROCNT).toFixed(2)): 0.1
			foodObj.macros.fiber = (result.food.nutrients.FIBTG !== undefined)?  	 	 +((result.food.nutrients.FIBTG).toFixed(2)): 0.1
			foodObj.macros.sodium = (result.food.nutrients.NA !== undefined)?  		 	 +((result.food.nutrients.NA).toFixed(2)): 0.1
			
			foodObj.selectedServing.servingSizeString = 'unknown'
			foodObj.selectedServing.quantity = 1
			foodObj.selectedServing.yieldTotalPortions = 1
			foodObj.selectedServing.totalWeightOfFood = 1
			foodObj.selectedServing.mUriList = result.measures
			
			// console.log("foodObj", foodObj)

			resArray.push(foodObj)
			return resArray	
		});
		return resArray
	}

	getSearchResults(searchTerm:string) {
		let term = searchTerm.replace(/\s/g, "%20");
		var data: any[] = []
		var nextPage: any[] = []
		// console.log("getSearchResults => searchTerm", term)
		SearchFoodApi(term)
		.then((res:any )=> {
			  console.log("res from FoodApi",res)
			  if(res.status === 200){
					// console.log("Res Good")
					data = this.convertResults(res.data.hints)
					this.setState({searchResults: data})
					
					var entry = res.data._links.next
					this.nextPageArr.push(entry)
					console.log("nextPage", this.nextPageArr)
					
					this.forceUpdate()
				}
			  	else {
				//   console.log("Res Bad")
				  data = []
				  this.setState({searchResults: data})
				  this.forceUpdate()
				}
				
		 })
		 
	}

	getNextpage(){
		var link = ''
		link = this.nextPageArr[0].href
		console.log("SearchNextPageButton handleClickNext", link)
		
		return axios.get(link).then((res:any)=>{
		console.log("res", res)

		if(res.status === 200){
			// console.log("Res Good")
			var data = this.convertResults(res.data.hints)
			this.setState({searchResults: data})
			
			var entry = res.data._links.next
			this.nextPageArr.push(entry)
			console.log("nextPage", this.nextPageArr)
			
			this.forceUpdate()
		}
		else {console.log("Res Bad", res.status)}
		})
	}

	getPrevpage(){
		var link = ''
		var ind = 0
		ind = this.nextPageArr.length-2
		link = this.nextPageArr[0].href

		console.log("SearchNextPageButton handleClickPrev",ind, link)
		var uselink = (ind <= -1) ? this.nextPageArr[0].href : this.nextPageArr[ind].href
		
		return axios.get(uselink).then((res:any)=>{
		console.log("res", res)

		if(res.status === 200){
			// console.log("Res Good")
			var data = this.convertResults(res.data.hints)
			this.setState({searchResults: data})
			
			if(this.nextPageArr.length > 1)
			{
				this.nextPageArr.pop()
				console.log("nextPage Poped", this.nextPageArr)
			}
			else{
				this.nextPageArr = this.nextPageArr
			}
			
			this.forceUpdate()
		}
		else {console.log("Res Bad", res.status)}
		})
	}

	getUserFoods() {
		GetFood().then((res)=> {
			// console.log("getUserFoods",res)
			this.setState({myFoods: res.data});
		})
	}

	deleteUserFoodItem(foodItemId:any) {

		DeleteFood(foodItemId)
		.then((res:any) => {
			if(res.status === 200) {
			  let foodItem = this.state.myFoods.find((food:any) => food._id === foodItemId);
			  if(foodItem)
			  {
				let foodItemIndex = this.state.myFoods.indexOf(foodItem);
				let newState = update(this.state, {
				  myFoods: {$splice: [[foodItemIndex, 1]]}
				});
				this.setState(newState);
			  }
			  
			} else {
			  alert('This food item could not be deleted.');
			}
		});
	}

  render() {
	//   console.log("why no update ???",this.state)
    return (
      <div className="AddFoodView content-container">
        <SearchFood
        	searchTerm={this.state.searchTerm}
			handleSearchChange={this.handleSearchChange.bind(this)}
			mealGroupContext={this.props.mealGroupContext}
			
      	 />
		<FoodsPanel 
        	currentTab={this.state.foodsPanelTab}
      		handleSwitchTab={this.switchTabs.bind(this)} 
			searchResults={this.state.searchResults}
			nextPagesearchResults={this.getNextpage.bind(this)}
			prevPagesearchResults={this.getPrevpage.bind(this)}
      		searchError={this.state.searchError}
      		recentFoods={this.state.recentFoods}
      		getUserFoods={this.getUserFoods.bind(this)}
      		myFoods={this.state.myFoods}
      		deleteUserFoodItem={this.deleteUserFoodItem.bind(this)}
			day={this.props.day}
			mealGroupContext={this.props.mealGroupContext}
    	/>
      </div>
    );
  }
}

export default AddFoodView;

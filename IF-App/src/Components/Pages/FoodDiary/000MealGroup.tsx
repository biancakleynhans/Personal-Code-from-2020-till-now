import React, { Component } from 'react';
import update from 'immutability-helper';
import MealTotalsRow from './000MealTotalsRow';
import { FavList } from '../../../Shared/FaviconList';
import { iFoodItemComplete } from '../../Models/000Models';
import { generator } from '../../Util/tools';
import MealItem from './000MealItem';
import { Link } from 'react-router-dom';


interface iProps{
  type: string
  items: iFoodItemComplete[]
  totals: any
  handleServingUpdate: (data:any)=>void 
  handleItemRemove: (id:any)=>void 
  removingItem: ( items: iFoodItemComplete)=> void
  day: any
}

interface iState{
  items:any
}

class MealGroup extends Component<iProps, iState> {

  constructor(props:any) {
    super(props);
    this.state = {
      items: this.props.items
    }
    // console.log("MealGroup constructor",this.props)
  }

  UNSAFE_componentWillReceiveProps(nextProps:any) {
    console.log("componentWillReceiveProps",nextProps)
    this.setState({items: nextProps.items});
  }

   /**
    * Update current serving size information within context of MealGroup 
    * (will be propagated up to DayView when checkmark clicked)
   */
  handleSizeChange(newServingSizeId:any , consumptionId:any ) {
    // console.log("handleSizeChange newServingQuantity=>",newServingSizeId)
    // console.log("handleSizeChange consumptionId=>", consumptionId)
    
    let mealItem = this.state.items.find((item:any) => item._id === consumptionId._id);
    let mealItemIndex = this.state.items.indexOf(mealItem);

    this.state.items.find((item:any) => {
      item._id === consumptionId._id
      this.state.items[mealItemIndex].selectedServing.servingSizeString = newServingSizeId
    });
  }

  handleQuantityChange(newServingQuantity:any, consumptionId:any) {
    // console.log("handleQuantityChange newServingQuantity=>",newServingQuantity)
    // console.log("handleQuantityChange consumptionId=>", consumptionId)
    
    let mealItem = this.state.items.find((item:any) => {item.consumptionId === consumptionId; return item});
    let mealItemIndex = this.state.items.indexOf(mealItem);

    this.state.items.find((item:any) => {
      item._id === consumptionId._id
      this.state.items[mealItemIndex].selectedServing.quantity = newServingQuantity
    });
  }

 
  handleNewServingSave() {
    // pass cloned state object up to DayView
    var data = JSON.parse(JSON.stringify(this.state))
    // console.log("handleNewServingSave => ",data)
    this.props.handleServingUpdate(data);
  }

  handleItemRemove(consumptionId:any ) {
    this.props.handleItemRemove(consumptionId);
  }

  render() {

    let mealItems;
    // console.log("render MealGroup", itemTotals, mealItems)

  	if(this.state) {
  		mealItems = this.state.items.map((item:any) => {
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
      <div className="MealGroup">
  		<div className="MealGroup__header">
      <div className="MealGroup__header--edit" >{FavList.edit.icon}</div>
  			<span className="MealGroup__header--type">{this.props.type}</span>
  			<span className="MealGroup__header--macros"> {FavList.breadSlice.icon}</span>
        <span className="MealGroup__header--macros" >{FavList.bacon.icon}</span>
        <span className="MealGroup__header--macros" >{FavList.egg.icon}</span>
  			<span className="MealGroup__header--caltotal">{FavList.fire.icon}</span>
  		</div>
  		  {mealItems}
        <Link to={`add/${this.props.type.toLowerCase()}/${this.props.day}` } className="AddFoodItem__link">
          <div className="AddFoodItem">
            <span> {FavList.add.icon} Add Food Item</span>
          </div>
        </Link>
        {this.props.items.length > 0 && <MealTotalsRow totals={this.props.totals} />}
      </div>
   
    );
  }
}

export default MealGroup;

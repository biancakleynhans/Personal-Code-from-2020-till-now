import React, { Component } from 'react';
import AddableFoodItem from './001AddableFoodItem';
import { FavList } from '../../../Shared/FaviconList';
import { iFoodItemComplete } from '../../Models/000Models';
import { generator } from '../../Util/tools';


interface iProps{
  getFoods: ()=> void
  deleteUserFoodItem: (string:any)=> void
  foods: iFoodItemComplete[]
  day:any
  editMode:any
  mealGroupContext:any
}

class MyFoods extends Component<iProps> {

  componentDidMount() {
    this.props.getFoods();
  }

  deleteUserFoodItem(foodItemId:any) {
    // console.log("deleteUserFoodItem", foodItemId)
    this.props.deleteUserFoodItem(foodItemId);
  }

  render() {
      // FUnc Send 
      var deleteUserFoodItem: (term:any)=>void  = this.deleteUserFoodItem.bind(this)

    let foods;
    if(this.props.foods.length) {
      foods = this.props.foods.map(food => {
        return (
          <AddableFoodItem
            key={generator()} 
            completeItem={food}
            day={this.props.day} 
            editMode={this.props.editMode}
            funcDelete={{deleteUserFoodItem}} 
            mealGroupContext={this.props.mealGroupContext} />
        );
      });
    } else {
      foods = (
        
        <span className="MyFoods__no-foods">
          Looks like you haven't created any foods yet. <br/> <br/>
          {FavList.sad.icon}
        </span>
      );
    }
    return (
      <div className="MyFoods">
        {foods}
      </div>
    );
  }
}

export default MyFoods;

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { FavList } from '../../../Shared/FaviconList';
import { iGoals } from '../../Models/000Models';


interface iProps{
  totalCarbs:any
  totalFat:any
  totalProtein:any
  goals:iGoals
}

class MacroTotals extends Component<iProps> {
  render() {
    let goalDifferences = {
      carbs: this.props.totalCarbs - this.props.goals.carbs,
      fat: this.props.totalFat - this.props.goals.fat,
      protein: this.props.totalProtein - this.props.goals.protein 
    };

    let carbsDifference;
    if(goalDifferences.carbs > 0) {
      carbsDifference = (
        <span className="MacroTotals__macro--goaldifference over">
          (+{goalDifferences.carbs})
        </span>
      );
    } else {
      carbsDifference = (
        <span className="MacroTotals__macro--goaldifference under">
          ({goalDifferences.carbs})
        </span>
      );
    }

    let fatDifference;
    if(goalDifferences.fat > 0) {
      fatDifference = (
        <span className="MacroTotals__macro--goaldifference over">
          (+{goalDifferences.fat})
        </span>
      );
    } else {
      fatDifference = (
        <span className="MacroTotals__macro--goaldifference under">
          ({goalDifferences.fat})
        </span>
      );
    }

    let proteinDifference;
    if(goalDifferences.protein > 0) {
      proteinDifference = (
        <span className="MacroTotals__macro--goaldifference over">
          (+{goalDifferences.protein})
        </span>
      );
    } else {
      proteinDifference = (
        <span className="MacroTotals__macro--goaldifference under">
          ({goalDifferences.protein})
        </span>
      );
    }

    let caloriesGoalText;
    if(this.props.goals.calories > -1) {
      caloriesGoalText = (
        <span className="MacroTotals__caloriesgoal">Calorie Goal: {this.props.goals.calories}</span>
      );
    } else {
      caloriesGoalText = (
        <span className="MacroTotals__caloriesgoal">
          You haven't <Link to={'/me'}>set your goals</Link> yet.
        </span>
      );
    }

    return (
      <div className="MacroTotals">
  		  <span className="MacroTotals__label">Macros:</span>
  		  
        <span className="MacroTotals__macro">
  		  	<span className="MacroTotals__macro--value">{FavList.breadSlice.icon} {this.props.totalCarbs} g</span>
  		  	{this.props.goals.carbs > -1 && carbsDifference}
  		  </span>

  		  <span className="MacroTotals__macro">
  		  	<span className="MacroTotals__macro--value">{FavList.bacon.icon} {this.props.totalFat} g</span>
  		  	{this.props.goals.fat > -1 && fatDifference}
  		  </span>

  		  <span className="MacroTotals__macro protein">
  		  	<span className="MacroTotals__macro--value">	{FavList.egg.icon} {this.props.totalProtein} g</span>
  		  	{this.props.goals.protein > -1 && proteinDifference}
  		  </span>
  		  
        {caloriesGoalText}
      </div>
    );
  }
}

export default MacroTotals;

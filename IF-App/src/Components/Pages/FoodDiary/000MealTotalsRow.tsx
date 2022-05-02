import React, { Component } from 'react';

interface iProps{
  totals:{
    carbs:any,
    fat:any,
    protein: any
    calories:any
  }
}
class MealTotalsRow extends Component<iProps> {
  render() {
    // console.log("MealTotalsRow",this.props)
    return (
      <div className="MealTotalsRow">
        <span></span>
  		  <span className="MealTotalsRow__label">TOTALS</span>
        <span className="MealTotals__macros">
          <span className="MealTotals__macros--carbs">{+((this.props.totals.carbs).toFixed(2))}</span>
          <span className="MealTotals__macros--fat">{+((this.props.totals.fat).toFixed(2))}</span>
          <span className="MealTotals__macros--protein">{+((this.props.totals.protein).toFixed(2))}</span>
        </span>
        <span className="MealTotals__calories">{this.props.totals.calories ? +((this.props.totals.calories).toFixed(2)) : '--'}</span>
        <div className="clearfix"></div>
      </div>
    );
  }
}

export default MealTotalsRow;

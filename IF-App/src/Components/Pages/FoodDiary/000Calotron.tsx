import React, { Component } from 'react';
import { FavList } from '../../../Shared/FaviconList';


interface iProps{
  netCalories: any
  caloriesEaten: any
  caloriesBurned:any 
}

class Calotron extends Component<iProps> {
  render() {
    let netCalories;
    netCalories = (
      <span className="Calotron__net">{new Intl.NumberFormat().format(this.props.netCalories)}</span>
    )

    return (
      <div className="Calotron">
        
  		  {netCalories}
        <span className="Calotron__plusminuscontainer">
          <span className="Calotron__plusminus">
            <span className="Calotron__plusminus--food">+{this.props.caloriesEaten}</span>
            <span className="Calotron__plusminus--exercise">
              -{(this.props.caloriesBurned ? this.props.caloriesBurned : 0)}
            </span>
          </span>
        </span>
      </div>
    );
  }
}

export default Calotron;

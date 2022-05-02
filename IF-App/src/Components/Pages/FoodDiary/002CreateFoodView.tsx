import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import {RouteComponentProps} from 'react-router-dom'
import { AddFood} from '../../../Services/ConectToServerServicesFoodDiary';
import { FavList } from '../../../Shared/FaviconList';
import update from 'immutability-helper';
import { measuresUri, iFoodItemComplete } from '../../Models/000Models';
import { generator } from '../../Util/tools';

interface iProps{}

interface RCPprops{
  meal:string
  day: string
}


class CreateFoodView extends Component<iProps& RouteComponentProps<RCPprops>> {

  handleSubmit(e:any) {
    e.preventDefault();

    var foodObj:iFoodItemComplete  = {
      day: this.props.match.params.day,
      mealName: this.props.match.params.meal,
      name: e.target[0].value,
      foodId:"",
      macros: {
          glycemicIndex: 0,   
          calories: 0,
          carbs: e.target[2].value,
          fat: e.target[3].value,
          protein: e.target[4].value,
          fiber: e.target[5].value,
          sodium: e.target[7].value
      },
      micros:{
        // Water:0,
        Calcium:0,
        Cholesterol:0,
        Sugar: e.target[6].value,
        Monounsaturated_Fat: 0,
        Polyunsaturated_Fat: 0,
        Saturated_Fat: 0,
        Trans_Fat: 0,
        vitaminA:0,
        vitaminB1:0,
        vitaminB2:0,
        vitaminB3:0,
        vitaminB6:0,
        vitaminB12:0,
        vitaminC:0,
        vitaminD:0,
        vitaminK:0,
      },
      dailyReq:{
        calories: 0,
        // Water:0,
        Calcium:0,
        protein:0, 
        carbs:0,
        Cholesterol:0,
        Sugar:0,
        fat: 0,
        Monounsaturated_Fat: 0,
        Polyunsaturated_Fat: 0,
        Saturated_Fat: 0,
        Trans_Fat: 0,
        fiber: 0,
        sodium:0,
        vitaminA:0,
        vitaminB1:0,
        vitaminB2:0,
        vitaminB3:0,
        vitaminB6:0,
        vitaminB12:0,
        vitaminC:0,
        vitaminD:0,
        vitaminK:0,
      },
      selectedServing: {
        servingSizeString:e.target[1].value,
        quantity: 0,
        yieldTotalPortions: 0,
        totalWeightOfFood: 0,
        mUriList: [{label : '', uri: ''}]
      },
      clasification: {
        dietLabels:[],
        healthLabels:[],
        cautions:[]
      }
    }
      
    // console.log("reqObj", reqObj)
    AddFood(foodObj)
  }

  handleDoneAddingFoodsClick() {
    const currentLocation = this.props.location.pathname
    const nextLocation = '/foodDiary'
    // console.log("currentLocation", currentLocation)
    return <Redirect to={nextLocation} from = {currentLocation}/>
  }

  render() {
    let meal = this.props.match.params.meal;
    let day = this.props.match.params.day;
    // console.log(meal, day, "info")
    
    let servingUnitOptions;
    
    if(measuresUri) {
      servingUnitOptions = measuresUri.map((entry:any) => {
        return (<option key={generator()} value={entry.label}>{entry.label}</option>);
      });
    }

    
    return (
      <div className="CreateFoodView content-container">
        <h1 className="page-title">Create Food</h1>
        <form className="CreateFoodView__form" onSubmit={this.handleSubmit.bind(this)}>
          <label htmlFor="name">Food Name</label>
          <input type="text" name="name" id="name" placeholder="Caesar Salad" />
          
          <label htmlFor="servingsize">Serving Size</label>
          <br/>
          <select className="ServingSelect" name="servingsize" id="servingsize" 
            defaultValue="Single Serving"
            // onChange={this.handleSizeChange.bind(this)} 
            // onClick={this.handleInputClick.bind(this)}
          >
            {servingUnitOptions}
        </select> 

          <span className="CreateFoodView__nutrition-separator">NUTRITION</span>

          <div className="CreateFoodView__inputgroup">
            <div className="CreateFoodView__input">
              <span className="CreateFoodView__input--image">
                {FavList.breadSlice.icon}
              </span>
              <label htmlFor="carbs"><strong>Carbohydrates</strong></label>
              <input type="text" name="carbs" id="carbs" placeholder="80 g" />
            </div>
            <div className="CreateFoodView__input">
              <span className="CreateFoodView__input--image">
                {FavList.bacon.icon}
              </span>
              <label htmlFor="fat"><strong>Fat</strong></label>
              <input type="text" name="fat" id="fat" placeholder="16 g" />
            </div>
            <div className="CreateFoodView__input">
              <span className="CreateFoodView__input--image">
                {FavList.egg.icon}
              </span>
              <label htmlFor="protein"><strong>Protein</strong></label>
              <input type="text" name="protein" id="protein" placeholder="33 g" />
            </div>
          </div>

          <div className="CreateFoodView__inputgroup">
            <div className="CreateFoodView__input">
              <span className="CreateFoodView__input--image">
                {FavList.carrot.icon}
              </span>
              <label htmlFor="fiber">Fiber</label>
              <input type="text" name="fiber" id="fiber" placeholder="4 g" />
            </div>
            <div className="CreateFoodView__input">
              <span className="CreateFoodView__input--image">
                {FavList.candy.icon}
              </span>
              <label htmlFor="sugar">Sugar</label>
              <input type="text" name="sugar" id="sugar" placeholder="20 g" />
            </div>
            <div className="CreateFoodView__input">
              <span className="CreateFoodView__input--image">
               {FavList.lemon.icon}
              </span>
              <label htmlFor="sodium">Sodium</label>
              <input type="text" name="sodium" id="sodium" placeholder="400 mg" />
            </div>
          </div>
          <button className="CreateFoodView__submit-button" type="submit">Create Food</button>

          <Link to={"/add" + "/" +meal+ "/" + day}>Cancel</Link>
        
        </form>
        <div className="clearfix"></div>
      </div>
    );
  }
}

export default CreateFoodView;

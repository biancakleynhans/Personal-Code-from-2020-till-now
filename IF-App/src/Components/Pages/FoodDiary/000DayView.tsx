import React, { Component } from 'react';
import DaySelect from './000DaySelect';
import Calotron from './000Calotron';
import MealGroup from './000MealGroup';
import MacroTotals from './000MacroTotals';
import { GetFoodConsumed,GetGoals, DeleteFood, UpdateFoodConsumed, DeleteFoodConsumed} from '../../../Services/ConectToServerServicesFoodDiary';
import { iGoals, iMealsArray, iFoodItemComplete, measuresUri } from '../../Models/000Models';
import update from 'immutability-helper';
import { NutriApi } from '../../../Services/FoodApiService';
import { convert_NutriApi_ResultTo_iFoodItemComplete } from './001AddableFoodItem';


interface iState{
    
  selectedDay: any,
  meals: any,
  goals: iGoals,
  removingItem: any
  caloriesBurned: number
}

interface iProps{}

export function convertQueryStringToDate(queryStr: Date) {
  // console.log("queryStr", queryStr)
  var q = new Date(queryStr)
  let year = q.getFullYear()
  let month = q.getMonth()
  let day = q.getDate()+1
  
  var dateDone = new Date(year, month, day).toISOString().split('T')[0];
  // console.log("date DayView",dateDone)
  return dateDone
  
}

export function getMacroTotals(mealItems: any[], mealItem?:any){
  // console.log(mealItems, mealItem)
  let cal,carb,fat,prot,fib,sod
  cal = carb = fat = prot = fib= sod = 0
  
  if(mealItems.length > 0){
    console.log("mealItems",mealItems.length, mealItems )
    for (let i = 0; i < mealItems.length; i++) {
      cal +=   +((mealItems[i].macros.calories).toFixed(2));
      carb +=  +((mealItems[i].macros.carbs).toFixed(2));
      fat +=   +((mealItems[i].macros.fat).toFixed(2));
      prot +=  +((mealItems[i].macros.protein).toFixed(2));
      // fib +=  +((mealItems[i].macros.fiber).toFixed(2));
      // sod +=  +((mealItems[i].macros.sodium).toFixed(2));
      // console.log("cal", cal, carb, fat, prot)
    }
    return {
      calories: cal,
      carbs: carb,
      fat: fat,
      protein: prot,
      fiber: fib,
      sodium: sod
    }
  }
  if (mealItem){
    // console.log("mealItem")
    let totalCals, totalCarbs, totalFat, totalProtein, totalFiber, totalSodium;
    totalCals = totalCarbs = totalFat = totalProtein =totalFiber =  totalSodium = 0;
    // console.log("calculateItemTotals => item.selectedServing.quantity",item.selectedServing.quantity)
    // console.log("calculateItemTotals => item.selectedServing.ratio",item.selectedServing.yieldTotalPortions)
    
    let servingSizeMultiplier = mealItem.selectedServing.quantity * mealItem.selectedServing.yieldTotalPortions;
    // console.log("calculateItemTotals => servingSizeMultiplier", servingSizeMultiplier)

    totalCals +=    +((mealItem.macros.calories * servingSizeMultiplier).toFixed(2));
    totalCarbs +=   +((mealItem.macros.carbs * servingSizeMultiplier).toFixed(2));
    totalFat +=     +((mealItem.macros.fat * servingSizeMultiplier).toFixed(2));
    totalProtein += +((mealItem.macros.protein * servingSizeMultiplier).toFixed(2));
    // totalFiber += +((mealItem.macros.fiber * servingSizeMultiplier).toFixed(2));
    // totalSodium += +((mealItem.macros.sodium * servingSizeMultiplier).toFixed(2));
    return {
      calories: totalCals,
      carbs: totalCarbs,
      fat: totalFat,
      protein: totalProtein,
      fiber: totalFiber,
      sodium: totalSodium
    };
  }
  else {
    // console.log("neither")
    var empty = {calories: 0, carbs:0, fat:0, protein: 0, fiber:0, sodium:0}
    return empty 
  }
}

class DayView extends Component<iProps,iState> {

  constructor(props:any) {
    super(props);
    this.state = { 
        selectedDay: this.getTodaysDate(),
        meals: {
            breakfast: {
              items: [],
              mealTotals: {
                caloriesEaten: 0,
                netCalories: 0,
                carbs: 0,
                fat: 0,
                protein: 0
              }
            },
            lunch: {
              items: [],
              mealTotals: {
                caloriesEaten: 0,
                netCalories: 0,
                calories: 0,
                carbs: 0,
                fat: 0,
                protein: 0
              }
            },
            dinner: {
              items: [],
              mealTotals: {
                caloriesEaten: 0,
                netCalories: 0,
                carbs: 0,
                fat: 0,
                protein: 0
              }
            },
            snacks: {
              items: [],
              mealTotals: {
                caloriesEaten: 0,
                netCalories: 0,
                carbs: 0,
                fat: 0,
                protein: 0
              }
            }
        },
        goals: {
            calories: 0,
            carbs: 0,
            fat: 0,
            fiber: 0,
            protein: 0,
            sodium: 0,
            sugar: 0,
        },
        caloriesBurned: 0,
        removingItem: false
    }
    // console.log("Dayview Props from constuctor ",this.state)
  }

  getTodaysDate() {return new Date(Date.now())}

  componentDidMount() {

    let dayParam = this.state.selectedDay
    // console.log(dayParam, "dayParam")
    if(dayParam) {
        convertQueryStringToDate(dayParam)  
      this.setState({selectedDay: convertQueryStringToDate(dayParam)});
    }
    let selectedDay = dayParam ? convertQueryStringToDate(dayParam) : this.state.selectedDay;
    this.getConsumptions();
    this.getGoals(selectedDay);
    this.setState({selectedDay: selectedDay})
  }

  getConsumptions() {
    var Barr:iFoodItemComplete[] = []
    var Larr:iFoodItemComplete[] = []
    var Darr:iFoodItemComplete[] = []
    var Sarr:iFoodItemComplete[] = []
    GetFoodConsumed()
    .then((res:any) => {
      // console.log("getConsumptions => res from Server", res)
      if(res.status === 200)
      {
        if(res.data.length > 0)
        {
          res.data.forEach((entry:iFoodItemComplete, index:number) => {
            // console.log("GetCons", entry)
            var stateDay = convertQueryStringToDate(this.state.selectedDay)
            // console.log("Inside Res Data index: ",entry.day, "this.state.selectedDay", stateDay)
            if(entry.day === stateDay)
            {
              // console.log("Inside Res Data index: ",index,"info: ", entry.mealName)
              if(entry.mealName === "breakfast"){ Barr.push(entry); return Barr }
              if(entry.mealName === "lunch")    { Larr.push(entry); return Larr }
              if(entry.mealName === "dinner")   { Darr.push(entry); return Darr }
              if(entry.mealName === "snacks")   { Sarr.push(entry); return Sarr }
              
            }
          });
          let newState = update(this.state, {
            meals: {
              breakfast:  {items:{$set: Barr}},
              lunch:      {items:{$set: Larr}},
              dinner:     {items:{$set: Darr}},
              snacks:     {items:{$set: Sarr}}
            }
          });
          this.setState(newState)
        }
        else{alert("no entries found in db, status: " + res.status )}
      }
      else {alert("Error in retrieving Consumption for this day, status: "+ res.status)}
    }) 

  }

  getGoals(day:any) {
    let date = day
    GetGoals(date)
    .then((res:any )=> {
      // console.log("getGoals=> res from server", res.data)
    //goals
    //     this.setState({goals: goals});
    });
  }

  changeSelectedDay(newDay:String) {
    this.setState({selectedDay: newDay}, () => {
      this.getConsumptions();
    });
  }

//   /**
//    * Calculates totals for each meal being displayed
//   */
  calculateMealTotals() {

    var totalArr: any[] = []
    var brekkieTotal = getMacroTotals(this.state.meals.breakfast.items )
    var lunchTotal = getMacroTotals(this.state.meals.lunch.items)
    var dinnerTotal = getMacroTotals(this.state.meals.dinner.items )
    var snackTotal = getMacroTotals(this.state.meals.snacks.items)
   
    totalArr.push(brekkieTotal, lunchTotal, dinnerTotal, snackTotal)
    return totalArr
  }

  calculateDayTotals(mealTotals: any) {
    // calculate consumption totals (nutrients & calories)
    // console.log("calculateDayTotals",mealTotals) 
    let caloriesEaten: number, carbs: number, fat: number, protein: number, fiber: number, sodium: number;
    caloriesEaten = carbs = fat = protein = fiber = sodium =  0;
    mealTotals.forEach((mealTotal:any) => {
      caloriesEaten +=  +((mealTotal.calories).toFixed(2))
      carbs +=          +((mealTotal.carbs).toFixed(2))
      fat +=            +((mealTotal.fat).toFixed(2))
      protein +=        +((mealTotal.protein).toFixed(2))
      // fiber +=        +((mealTotal.fiber).toFixed(2))
      // sodium +=        +((mealTotal.sodium).toFixed(2))
    });

    // calculate net calories (consumption - activity)
    let netCalories = caloriesEaten - (this.state.caloriesBurned ? this.state.caloriesBurned : 0);
  
    return {
      caloriesEaten: +((caloriesEaten).toFixed(2)),
      netCalories: +((netCalories).toFixed(2)),
      carbs: carbs,
      fat: fat,
      protein: protein
    }
  }

  //   /**
  //    * Merge changed MealGroup states with DayView state,
  //    * send PUT request to backend
  //   */
  handleServingUpdate(newItemsList:any) {
    
    for (var i = 0; i < newItemsList.items.length; i++){
      // console.log("handleServingUpdate newItemsList ", newItemsList.items[i]) 
      var __id = newItemsList.items[i]._id
      var d = newItemsList.items[i].day
      var mN = newItemsList.items[i].mealName
      var quan = newItemsList.items[i].selectedServing.quantity
      var fId = newItemsList.items[i].foodId
      var mURILIST = newItemsList.items[i].selectedServing.mUriList
      var mArr = newItemsList.items[i].selectedServing.mUriList
      var mLabel = newItemsList.items[i].selectedServing.servingSizeString
      var mFound = mArr.find((i:any)=> i.label == mLabel)
      
      console.log("m", mFound)

      NutriApi(quan, mFound.uri,fId).then((res:any)=> {
        console.log(res.data)
        var cFI = convert_NutriApi_ResultTo_iFoodItemComplete(res.data,d,mN, mURILIST,mLabel, __id)
        console.log(cFI)
        UpdateFoodConsumed(__id, cFI).then(()=> window.location.reload())
      })
    }

  }

  
  removeItem(consumptionId:any ) {
    console.log("removeItem",consumptionId._id, "consumptionId")
    this.setState({removingItem: true});
    DeleteFoodConsumed(consumptionId._id).then(()=>window.location.reload())
    this.setState({removingItem: false});
  }


  render() {
    console.log("Base",this.state, this.props)
    let mealTotals = this.calculateMealTotals();
    let dayTotals = this.calculateDayTotals(mealTotals);

    return (
      <div className="DayView content-container">
        
        <DaySelect 
          selectedDay={this.state.selectedDay}
          changeSelectedDay={this.changeSelectedDay.bind(this)}
        />
       <Calotron
          netCalories={dayTotals.netCalories}
          caloriesEaten={dayTotals.caloriesEaten}
          caloriesBurned={this.state.caloriesBurned}
        />
        <div className="clearfix"></div>

        <MealGroup 
          type="Breakfast"
          items={this.state.meals.breakfast.items}
          totals ={mealTotals[0]}
          handleServingUpdate={this.handleServingUpdate.bind(this)}
          handleItemRemove={this.removeItem.bind(this)}
          removingItem={this.state.removingItem}
          day={this.state.selectedDay}
        />
        <MealGroup 
          type="Lunch"
          items={this.state.meals.lunch.items}
          totals ={mealTotals[1]}
          handleServingUpdate={this.handleServingUpdate.bind(this)}
          handleItemRemove={this.removeItem.bind(this)}
          removingItem={this.state.removingItem}
          day={this.state.selectedDay}
        />
        <MealGroup 
          type="Dinner"
          items={this.state.meals.dinner.items}
          totals ={mealTotals[2]}
          handleServingUpdate={this.handleServingUpdate.bind(this)}
          handleItemRemove={this.removeItem.bind(this)}
          removingItem={this.state.removingItem}
          day={this.state.selectedDay}
        />
        <MealGroup 
          type="Snacks"
          items={this.state.meals.snacks.items}
          totals ={mealTotals[3]}
          handleServingUpdate={this.handleServingUpdate.bind(this)}
          handleItemRemove={this.removeItem.bind(this)}
          removingItem={this.state.removingItem}
          day={this.state.selectedDay}
        />

        <MacroTotals
          totalCarbs={dayTotals.carbs}
          totalFat={dayTotals.fat}
          totalProtein={dayTotals.protein}
          goals={this.state.goals}
        />
      </div>
    );
  }
}

export default DayView;





    
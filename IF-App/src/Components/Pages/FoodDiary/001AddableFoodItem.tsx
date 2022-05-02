import React, { Component } from 'react';
import update from 'immutability-helper';
import ServingSelect from './000ServingSelect';
import { FavList } from '../../../Shared/FaviconList';
import { iFoodItemComplete } from '../../Models/000Models';
import { GetSingleFood, AddFoodConsumed, AddFood} from '../../../Services/ConectToServerServicesFoodDiary';
import {getMacroTotals} from './000DayView'
import { NutriApi } from '../../../Services/FoodApiService';

interface iProps{
  key:any
  completeItem:iFoodItemComplete
  day:any
  mealGroupContext:any
  editMode?:any
  funcDelete?: { deleteUserFoodItem: (string?:any)=> void} 
  item?:iFoodItemComplete
}

interface iState{
  adding: boolean,
  item: any
  loading: boolean,
  deleting: boolean,
  hasBeenAddedToCurrentMealGroup: boolean
}

export function convert_NutriApi_ResultTo_iFoodItemComplete(result:any, day:string,mealName:string, mUri:any, mUriLabel:string, id?: string){
  var foodObj:iFoodItemComplete  = {
    day: day,
    mealName: mealName,
    name: "",
    foodId:"",
    macros: {
        glycemicIndex: 0,   
        calories: 0,
        protein:0, 
        carbs:0,
        fat: 0,
        fiber: 0,
        sodium:0,
    },
    micros:{
      // Water:0,
      Calcium:0,
      Cholesterol:0,
      Sugar:0,
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
      servingSizeString: "",
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

  foodObj.name    = result.ingredients[0].parsed[0].food    //request
  foodObj.foodId  = result.ingredients[0].parsed[0].foodId  //request
  foodObj._id = (id !== undefined)  ?  id  : undefined
  
  foodObj.macros.glycemicIndex  = 0//(result.result.glycemicIndex !== undefined)       ?  +((result.result.glycemicIndex).toFixed(2))  : 1
  foodObj.macros.calories       = (result.totalNutrients.ENERC_KCAL !== undefined)  ?  +((result.totalNutrients.ENERC_KCAL.quantity).toFixed(2))  : 0.1
  foodObj.macros.carbs          = (result.totalNutrients.CHOCDF !== undefined)      ?  +((result.totalNutrients.CHOCDF.quantity).toFixed(2))      : 0.1
  foodObj.macros.fat            = (result.totalNutrients.FAT !== undefined)         ?  +((result.totalNutrients.FAT.quantity).toFixed(2))         : 0.1
  foodObj.macros.protein        = (result.totalNutrients.PROCNT !== undefined)      ?  +((result.totalNutrients.PROCNT.quantity).toFixed(2))      : 0.1
  foodObj.macros.fiber          = (result.totalNutrients.FIBTG !== undefined)       ?  +((result.totalNutrients.FIBTG.quantity).toFixed(2))       : 0.1
  foodObj.macros.sodium         = (result.totalNutrients.NA !== undefined)          ?  +((result.totalNutrients.NA.quantity).toFixed(2))          : 0.1

  
  foodObj.micros.Calcium              = (result.totalNutrients.CA !== undefined)      ?   +((result.totalNutrients.CA.quantity).toFixed(2))      : 0.1
  foodObj.micros.Cholesterol          = (result.totalNutrients.CHOLE !== undefined)   ?  	+((result.totalNutrients.CHOLE.quantity).toFixed(2))   : 0.1
  foodObj.micros.Sugar                = (result.totalNutrients.SUGAR !== undefined)   ?   +((result.totalNutrients.SUGAR.quantity).toFixed(2))   : 0.1
  foodObj.micros.Monounsaturated_Fat  = (result.totalNutrients.FAMS !== undefined)    ?   +((result.totalNutrients.FAMS.quantity).toFixed(2))    : 0.1
  foodObj.micros.Polyunsaturated_Fat  = (result.totalNutrients.FAPU !== undefined)    ?  	+((result.totalNutrients.FAPU.quantity).toFixed(2))    : 0.1
  foodObj.micros.Trans_Fat            = (result.totalNutrients.FATRN !== undefined)   ?   +((result.totalNutrients.FATRN.quantity).toFixed(2))   : 0.1
  foodObj.micros.Saturated_Fat        = (result.totalNutrients.FASAT !== undefined)   ?   +((result.totalNutrients.FASAT.quantity).toFixed(2))   : 0.1
  foodObj.micros.vitaminA             = (result.totalNutrients.VITA_RAE !== undefined)?  	+((result.totalNutrients.VITA_RAE.quantity).toFixed(2)): 0.1
  foodObj.micros.vitaminB1            = (result.totalNutrients.THIA !== undefined)    ?   +((result.totalNutrients.THIA.quantity).toFixed(2))    : 0.1
  foodObj.micros.vitaminB2            = (result.totalNutrients.RIBF !== undefined)    ?   +((result.totalNutrients.RIBF.quantity).toFixed(2))    : 0.1
  foodObj.micros.vitaminB3            = (result.totalNutrients.NIA !== undefined)     ?   +((result.totalNutrients.NIA.quantity).toFixed(2))     : 0.1
  foodObj.micros.vitaminB6            = (result.totalNutrients.VITB6A !== undefined)  ?   +((result.totalNutrients.VITB6A.quantity).toFixed(2))  : 0.1
  foodObj.micros.vitaminB12           = (result.totalNutrients.VITB12 !== undefined)  ?  	+((result.totalNutrients.VITB12.quantity).toFixed(2))  : 0.1
  foodObj.micros.vitaminC             = (result.totalNutrients.VITC !== undefined)    ?   +((result.totalNutrients.VITC.quantity).toFixed(2))    : 0.1
  foodObj.micros.vitaminD             = (result.totalNutrients.VITD !== undefined)    ?   +((result.totalNutrients.VITD.quantity).toFixed(2))    : 0.1
  foodObj.micros.vitaminK             = (result.totalNutrients.VITK1 !== undefined)   ?  	+((result.totalNutrients.VITK1.quantity).toFixed(2))   : 0.1

  
  foodObj.dailyReq.calories             = (result.totalDaily.ENERC_KCAL !== undefined)  ?   +((result.totalDaily.ENERC_KCAL.quantity).toFixed(2))  : 0.1
  foodObj.dailyReq.carbs                = (result.totalDaily.CHOCDF !== undefined)      ?  	+((result.totalDaily.CHOCDF.quantity).toFixed(2))      : 0.1
  foodObj.dailyReq.fat                  = (result.totalDaily.FAT !== undefined)         ?   +((result.totalDaily.FAT.quantity).toFixed(2))         : 0.1
  foodObj.dailyReq.protein              = (result.totalDaily.PROCNT !== undefined)      ?   +((result.totalDaily.PROCNT.quantity).toFixed(2))      : 0.1
  foodObj.dailyReq.fiber                = (result.totalDaily.FIBTG !== undefined)       ?  	+((result.totalDaily.FIBTG.quantity).toFixed(2))       : 0.1
  foodObj.dailyReq.sodium               = (result.totalDaily.NA !== undefined)          ?   +((result.totalDaily.NA.quantity).toFixed(2))          : 0.1
  foodObj.dailyReq.Calcium              = (result.totalDaily.CA !== undefined)          ?   +((result.totalDaily.CA.quantity).toFixed(2))          : 0.1
  foodObj.dailyReq.Cholesterol          = (result.totalDaily.CHOLE !== undefined)       ?  	+((result.totalDaily.CHOLE.quantity).toFixed(2))       : 0.1
  foodObj.dailyReq.Sugar                = (result.totalDaily.SUGAR !== undefined)       ?   +((result.totalDaily.SUGAR.quantity).toFixed(2))       : 0.1
  foodObj.dailyReq.Monounsaturated_Fat  = (result.totalDaily.FAMS !== undefined)        ?   +((result.totalDaily.FAMS.quantity).toFixed(2))        : 0.1
  foodObj.dailyReq.Polyunsaturated_Fat  = (result.totalDaily.FAPU !== undefined)        ?  	+((result.totalDaily.FAPU.quantity).toFixed(2))        : 0.1
  foodObj.dailyReq.Trans_Fat            = (result.totalDaily.FATRN !== undefined)       ?   +((result.totalDaily.FATRN.quantity).toFixed(2))       : 0.1
  foodObj.dailyReq.Saturated_Fat        = (result.totalDaily.FASAT !== undefined)       ?   +((result.totalDaily.FASAT.quantity).toFixed(2))       : 0.1
  foodObj.dailyReq.vitaminA             = (result.totalDaily.VITA_RAE !== undefined)    ?  	+((result.totalDaily.VITA_RAE.quantity).toFixed(2))    : 0.1
  foodObj.dailyReq.vitaminB1            = (result.totalDaily.THIA !== undefined)        ?   +((result.totalDaily.THIA.quantity).toFixed(2))        : 0.1
  foodObj.dailyReq.vitaminB2            = (result.totalDaily.RIBF !== undefined)        ?   +((result.totalDaily.RIBF.quantity).toFixed(2))        : 0.1
  foodObj.dailyReq.vitaminB3            = (result.totalDaily.NIA !== undefined)         ?   +((result.totalDaily.NIA.quantity).toFixed(2))         : 0.1
  foodObj.dailyReq.vitaminB6            = (result.totalDaily.VITB6A !== undefined)      ?   +((result.totalDaily.VITB6A.quantity).toFixed(2))      : 0.1
  foodObj.dailyReq.vitaminB12           = (result.totalDaily.VITB12 !== undefined)      ?  	+((result.totalDaily.VITB12.quantity).toFixed(2))      : 0.1
  foodObj.dailyReq.vitaminC             = (result.totalDaily.VITC !== undefined)        ?   +((result.totalDaily.VITC.quantity).toFixed(2))        : 0.1
  foodObj.dailyReq.vitaminD             = (result.totalDaily.VITD !== undefined)        ?   +((result.totalDaily.VITD.quantity).toFixed(2))        : 0.1
  foodObj.dailyReq.vitaminK             = (result.totalDaily.VITK1 !== undefined)       ?  	+((result.totalDaily.VITK1.quantity).toFixed(2))       : 0.1
  
  
  foodObj.selectedServing.servingSizeString   = mUriLabel
  foodObj.selectedServing.quantity            = result.ingredients[0].parsed[0].quantity
  foodObj.selectedServing.yieldTotalPortions  = +result.yield
  foodObj.selectedServing.totalWeightOfFood   = +result.ingredients[0].parsed[0].retainedWeight
  foodObj.selectedServing.mUriList            = mUri


  foodObj.clasification.cautions      = result.cautions
  foodObj.clasification.dietLabels    = result.dietLabels
  foodObj.clasification.healthLabels  = result.healthLabels
  

  console.log("foodObj Remade", foodObj)
  return foodObj

}

class AddableFoodItem extends Component<iProps, iState> {

  constructor(props:any) {
    super(props);
    this.state = {
      adding: false,
      item: this.props.completeItem,
      loading: false,
      deleting: false,
      hasBeenAddedToCurrentMealGroup: false
    }
    // console.log("AddableFoodItem => props, state",props, this.state)
   
  }

  handleSizeChange(newServingSizeId:any) {
    console.log("handleSizeChange", newServingSizeId)
    this.state.item.selectedServing.servingSizeString = newServingSizeId
  }

  handleQuantityChange(newServingQuantity:number) {
    console.log("newServingQuantity", newServingQuantity)
    this.state.item.selectedServing.quantity = newServingQuantity
  }

  handleItemClick() {
    // if not in edit mode, get item details for ServingSelect
    // console.log("handleItemClick ...")
    if(!this.props.editMode) { 
      if(!this.state.adding && !this.state.item) { this.setState({ adding: true}) } 
      else{ this.setState(prevState => ({ adding: !prevState.adding})) }
    } 
    // if in edit mode, activate deleting state
    else { this.setState(prevState => ({deleting: !prevState.deleting})) }
  }

  handleAddClick() {
    // console.log("handleAddClick",this.state.item)
    
    var q = this.state.item.selectedServing.quantity
    var fId = this.state.item.foodId
    var mUri = this.state.item.selectedServing.mUriList.find((list:any)=>list.label === this.state.item.selectedServing.servingSizeString)
    
    // console.log("mUri", mUri.qualified[1])
    // console.log("??????", q,mUri.uri,fId)
    
    if(mUri === undefined)
    { alert("please select a serving size to continue") }
    else{
      alert("Are you sure you would like to add "+ this.state.item.name)
     
      NutriApi(q,mUri.uri,fId).then((res:any)=>{
        // some items do not work did email ianko to try and find out what to do but for now my code is working and fine 
        console.log("res from Nutri API", res.data)
        var consumed = convert_NutriApi_ResultTo_iFoodItemComplete(res.data, this.props.day, this.props.mealGroupContext, this.state.item.selectedServing.mUriList, mUri.label)
        this.addConsumption(consumed);
       
        //reImplement when doing meals
        // this.addFoodToMeal();
      })
    }
   
  }

  addConsumption(conusmedItem: iFoodItemComplete) {

    AddFood(conusmedItem)
    AddFoodConsumed(conusmedItem)
    .then(res => {
      if(res.status === 200) {
        // console.log(window.location.pathname, "<= loc", "res => ", res)
        window.location.replace('/foodDiary')
      }
       else {
        //  console.log('res', res)
        window.alert('There was a problem adding this food to your log.');
      }
    })
  }

  addFoodToMeal() {
    const { item } = this.state;
    
    console.log("addFoodToMeal reqObj", item)
    // AddFoodConsumed(item, this.props.mealGroupContext, this.props.day)
    // .then(res => {
    //   if(res.status === 200) {
    //     this.setState({hasBeenAddedToCurrentMealGroup: true});
    //     alert('Done adding this ' + item.name +' to ' + this.props.mealGroupContext);
    //   } 
    //   else {
    //     alert('There was an error adding this food to ' + this.props.mealGroupContext);
    //   }
    // });
  }

  deleteUserFoodItem() {
    // console.log("deleteUserFoodItem", this.state.item._id)
    if(this.props.funcDelete)
    this.props.funcDelete.deleteUserFoodItem(this.state.item._id);
  }


  RenderFuncs(){
    let foodName;
    if(this.props.completeItem) {
      foodName = this.state.item.name;
    } else if(this.props.item) {
      foodName = this.props.item.name;
    } else {
      foodName = 'Name';
    }

    let itemTotals  = {calories: 0,carbs: 0,fat: 0,protein: 0};
    itemTotals = getMacroTotals([], this.state.item)
    // set plus icon if in loading/editing state
    let plusButtonImg;
    if(this.props.editMode) {
      plusButtonImg = FavList.delete.icon;
    } else {
      plusButtonImg = this.state.loading ? FavList.spinner.icon : FavList.add.icon
    }

    // don't display food item once it's been added to a meal
    let hiddenStyle = {display: ''};
    if(this.state.hasBeenAddedToCurrentMealGroup) {
      hiddenStyle.display = 'none';
    }

    // FUnc Send 
    var handleAddClick: (term:any)=>void  = this.handleAddClick.bind(this)
    
    return <div 
      className={'AddableFoodItem' + (this.state.adding ? ' adding' : '') + (this.state.deleting ? ' deleting' : '')} 
      onClick={this.handleItemClick.bind(this)} style={hiddenStyle}> {plusButtonImg}
			<span className="MealItem__food"><span className="MealItem__food--name">{foodName}</span></span>

      {this.state.item && <span>
          <span className="MealItem__macros">
            <span className="MealItem__macros--carbs">{itemTotals.carbs}</span>
            <span className="MealItem__macros--fat">{itemTotals.fat}</span>
            <span className="MealItem__macros--protein">{itemTotals.protein}</span>
          </span>
          <span className="MealItem__calories">{itemTotals.calories}</span>
        </span>
      }
      <div className="clearfix"></div>

      {this.state.adding && this.state.item && 
        <ServingSelect
          showAddButton={true}
          showRemoveButton={true}
          item = {this.state.item}
          mealGroupContext={this.props.mealGroupContext}
          funcQuantChange={this.handleQuantityChange.bind(this)}
          funcSizeChange={this.handleSizeChange.bind(this)}
          funcAddClick={{handleAddClick}}
        /> 
      }

      {this.state.deleting && 
        <div className="ItemDeleteButton animated fadeInDown" 
          id="ItemDeleteButton" onClick={this.deleteUserFoodItem.bind(this)}
        >
        <span>Delete this item</span>
      </div>}
    </div> 

  }

  render() {
    return (
    <div>{this.RenderFuncs()}</div>
    );
  }
}

export default AddableFoodItem;

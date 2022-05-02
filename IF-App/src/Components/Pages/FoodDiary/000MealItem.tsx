import React, { Component } from 'react';
import  ServingSelect from './000ServingSelect';
import { FavList } from '../../../Shared/FaviconList';
import { iFoodItemComplete } from '../../Models/000Models';


interface iProps{
  key:any
  item : any
  handleQuantityChange:(data:any, data1:any)=>void
  handleSizeChange:(data:any, data1:any)=>void
  handleNewServingSave:()=> void
  handleItemRemove:(item:any)=> void
  removingItem: (item: iFoodItemComplete)=> void
}

interface iState{
  editMode: boolean
}


class MealItem extends Component<iProps, iState> {

  constructor(props: any) {
    super(props);
    this.state = {
      editMode: false
    }
  }

  handleEditClick() {
    this.setState(prevState => ({ editMode: !prevState.editMode}));
  }

  handleSaveClick() {
    this.setState(prevState => ({
      editMode: !prevState.editMode
    }));
    this.props.handleNewServingSave();
  }

  handleSizeChange(servingSizeId:any) { this.props.handleSizeChange(servingSizeId, this.props.item) }

  handleQuantityChange(quantity:any) { this.props.handleQuantityChange(quantity, this.props.item) }

  handleItemRemove() { this.props.handleItemRemove(this.props.item) }

  render() {

    let icon;
    
    if(this.state.editMode) {
      icon = <div className="MealItem__save" onClick={this.handleSaveClick.bind(this)}>
                {FavList.edit.icon} Save
              </div>
    } else {
      icon = <div className="MealItem__edit" 
              onClick={this.handleEditClick.bind(this)} >
                {FavList.edit.icon} Edit
            </div>
    }

    // FUnc Send 
    var handleItemRemove: ()=>void  = this.handleItemRemove.bind(this)
    

    return (
      <div className={'MealItem' + (this.state.editMode ? 'editing' : '')}>
        {icon}
  		  <span className="MealItem__food">
          <span className="MealItem__food--info">
            <span className="MealItem__food--name">{this.props.item.name}</span>
            {/* <span className="MealItem__food--quantity"> */}
              {/* {this.props.item.selectedServing.quantity} {this.props.item.selectedServing.servingSizeString} */}
            {/* </span> */}
          </span>
        </span>
        <span className="MealItem__macros">
          <span className="MealItem__macros--carbs">{this.props.item.macros.carbs}</span>
          <span className="MealItem__macros--fat">{this.props.item.macros.fat}</span>
          <span className="MealItem__macros--protein">{this.props.item.macros.protein}</span>
        </span>
        <span className="MealItem__calories">{this.props.item.macros.calories}</span> 
        <div className="clearfix"></div>
        {this.state.editMode && 
          <ServingSelect
            mealGroupContext={this.props.item.mealName}
            showAddButton={false}
            showRemoveButton={true}
            item={this.props.item}
            funcQuantChange={this.handleQuantityChange.bind(this)}
            funcSizeChange={this.handleSizeChange.bind(this)}
            funcItemRemove={{handleItemRemove}}
            removingItem={this.props.removingItem}
          />}
      </div>
    );
  }
}



export default MealItem;

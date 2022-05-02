import React, { Component } from 'react';
import { generator } from '../../Util/tools';
import { measuresUri } from '../../Models/000Models';


interface iProps{
  
  item?: any
  showAddButton: boolean
  showRemoveButton:boolean
  mealGroupContext:string
  removingItem?: any
  funcQuantChange: (quantity:any)=>void
  funcSizeChange: (servingSizeName: any)=>void
  funcAddClick?:     {handleAddClick: (string:any) => void}
  funcItemRemove?:   {handleItemRemove: ()=>void}
  
}

interface iState{
  quantityValue: any,
  servSize: [],
  itemId: any,

}


class ServingSelect extends Component<iProps, iState> {

  constructor(props:any) {
    super(props);
    this.state = {
      quantityValue: this.props.item.selectedServing.quantity,
      itemId: this.props.item._id,
      servSize: this.props.item.selectedServing.servingSize
    }
    console.log("Serving Select Props",props)
  }

  handleQuantityChange(e:any) {
    this.setState({
      quantityValue: e.target.value
    });
    if(this.props.funcQuantChange)
      this.props.funcQuantChange(e.target.value);
  }

  handleSizeChange(e:any) {
    console.log("handleSizeChange",e.target.value)
    if(this.props.funcSizeChange)
      this.props.funcSizeChange(e.target.value);
    
  }

  handleItemRemove() {
    if(this.props.funcItemRemove)
      this.props.funcItemRemove.handleItemRemove();
  }

  /**
  * Click handler to prevent propogation up to AddableFoodItem
  * (prevent the item from hiding <ServingSelect />)
  */
  handleInputClick(e:any) { e.stopPropagation() }

  handleAddClick(e:any) {
    e.stopPropagation();
    // console.log("this.props.itemId need id", this.props.item)
    if(this.props.funcAddClick)
      this.props.funcAddClick.handleAddClick(this.props.item);
  }


  render() {
    console.log("render Serving Props",this.props)
    
    let servingUnitOptions;
    var list  =Object.assign(this.props.item.selectedServing.mUriList)
    
    servingUnitOptions = list.map((entry:any) => {
          // console.log("servingUnitOptions entry", entry)
          return (<option key={generator()} value={entry.label}>{entry.label}</option>);
        });

    let removeButtonText = this.props.removingItem ? 'Removing...' : 'Remove'

    let addButtonText = this.props.mealGroupContext ? 'Add to ' + this.props.mealGroupContext : 'Add';

    return (
      <div className="ServingSelect animated fadeInDown" id="ServingSelect">
        <input className="servingAmt" type="number" name="servingAmt" id="servingAmt" placeholder="1" 
          value={this.state.quantityValue} 
          onChange={this.handleQuantityChange.bind(this)} 
          onClick={this.handleInputClick.bind(this)} 
        />
        
        <select className="servingAmt" name="servingUnit" id="servingUnit" 
        defaultValue="Single Serving" onChange={this.handleSizeChange.bind(this)} 
          onClick={this.handleInputClick.bind(this)}
          >
          {servingUnitOptions}
        </select> 
        {this.props.showAddButton && 
          <button className="ServingSelect__add-button" onClick={this.handleAddClick.bind(this)}>{addButtonText}</button>}
        
        {this.props.showRemoveButton && 
          <button className={'ServingSelect__remove-button' + (this.props.removingItem ? ' removing' : '')} 
                  onClick={this.handleItemRemove.bind(this)}>{removeButtonText}</button>}
      </div>
    );
  }
}

export default ServingSelect;

import React, { Component } from 'react';
import { FavList } from '../../../Shared/FaviconList';


interface iProps{
  searchTerm?:string
  handleSearchChange:(searchString:string)=> void
  mealGroupContext:string
}

class SearchFood extends Component<iProps> {
stringSS=''


	handleSearchChange(e:any) {
    // console.log("SearchFood => handleSearchChange ",e.target.value )
   return this.stringSS = e.target.value 
  }
  
  submit(e:any){
    // console.log("?????????",this.stringSS)
    this.props.handleSearchChange(this.stringSS);
  }

  render() {
    let mealName;
    if(this.props.mealGroupContext) {
      mealName = this.props.mealGroupContext;
    } else {
      mealName = this.props.mealGroupContext;
    }
    return (
      <div className={'SearchFood' + (this.props.mealGroupContext ? ' with-meal-context' : '')}>
        <h1 className="page-title">Add to:  {mealName}</h1>
        
        <input type="text"
         placeholder="Search ..." 
         onChange={e=> this.handleSearchChange(e)} 
        />
        
        <button className="search-icon" onClick={e=> {this.submit(e)}}>{FavList.search.icon}</button>
      </div>
    );
  }
}

export default SearchFood;

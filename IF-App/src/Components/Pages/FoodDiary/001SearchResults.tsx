import React, { Component } from 'react';
import AddableFoodItem from './001AddableFoodItem';
import { FavList } from '../../../Shared/FaviconList';
import { iFoodItemComplete } from '../../Models/000Models';
import { generator } from '../../Util/tools';
import SearchNextPageButton from './004SearchNextPage';

interface iProps{
  results:any
  error:any 
  day:any 
  mealGroupContext:any 
  nextPagesearchResults:()=>void
  prevPagesearchResults: ()=> void
}
class SearchResults extends Component<iProps> {

  DisplayRes(){
    // console.log(" Search result", this.props.results)
    var resArr = this.props.results.map((result:any) => {
      return <AddableFoodItem
          key={generator()} 
          completeItem={result} 
          day={this.props.day}
          mealGroupContext={this.props.mealGroupContext}
        />
      })

    return <div>
      {resArr}

      <SearchNextPageButton
      nextPagesearchResults={this.props.nextPagesearchResults}
      prevPagesearchResults={this.props.prevPagesearchResults}
      />
      </div>
    
  }

  render() {
  	// console.log("render search res",this.props)
    return (
      <div className="SearchResults">
        {this.DisplayRes()}

        {
          this.props.error &&  <p className="SearchResults__error">
            {FavList.sad.icon}
            Sorry, I can't find anything that matches your query.  Maybe try something different?
            </p>
        }

        {!this.props.results &&  <p className="SearchResults__error">{FavList.sad.icon} Sorry, I can't find your Query </p>}
        
      </div>
    );
  }
}

export default SearchResults;

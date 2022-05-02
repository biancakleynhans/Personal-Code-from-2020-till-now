import React, { Component } from 'react';
import axios from 'axios';
import { FavList } from '../../../Shared/FaviconList';

interface iProps{
  nextPagesearchResults:()=> void
  prevPagesearchResults:()=> void
}

class SearchNextPageButton extends Component<iProps> {

  
  handleClickNext(e:any){
    this.props.nextPagesearchResults()
  }
  
  handleClickBack(e:any){
    this.props.prevPagesearchResults()
  }
    
    render() {
    

    return (
      <div>
            {/* <button onClick={this.handleClickBack.bind(this)}>Prev Items</button>
            <button onClick={this.handleClickNext.bind(this)}>Next Items</button> */}
            <button className='themeButton' onClick={this.handleClickBack.bind(this)}>{FavList.arrowLeftALT.icon}</button>
            <span>Pages</span>
            <button className='themeButton' onClick={this.handleClickNext.bind(this)}>{FavList.arrowRightALT.icon}</button>
      </div>
      
    );
  }
}

export default SearchNextPageButton;

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import SearchResults from './001SearchResults';
import RecentFoods from './001RecentFoods';
import MyFoods from './001MyFoods';
import { FavList } from '../../../Shared/FaviconList';


interface iProps{
  currentTab:any
  handleSwitchTab:(tabNumber: number)=> void
  searchResults:any[]
  searchError:boolean
  recentFoods:any[]
  getUserFoods:()=> void
  myFoods:any[]
  deleteUserFoodItem:(foodItemId: any)=> void 
  day:string
  mealGroupContext:any
  nextPagesearchResults: ()=>void
  prevPagesearchResults: ()=> void
}


interface iState{
  editMode: boolean
}

class FoodsPanel extends Component<iProps, iState> {

  constructor(props:any) {
    super(props);
    this.state = {
      editMode: false
    };
    // console.log("FoodsPanel props", props)
  }

	// /**
	//  * Switches which tab is displayed based on click
  //  */
	handleSwitchTab(e:any) {
    // console.log("FoodsPanel => handleSwitchTab props", this.props)
		let tab = e.target.attributes.class.value;
		if(!tab.includes(' ')) { // make sure we're actually switching to a different tab
			tab = tab.substring(tab.indexOf('--') + 2);
			let tabNumber = ['searchresults', 'recent', 'myfoods'].indexOf(tab);

      // make sure edit mode is off when switching to My Foods tab
      if(tabNumber === 2) {
        this.setState({editMode: false});
      }

      this.props.handleSwitchTab(tabNumber);
      this.forceUpdate()
		}
	}

  shouldDisplayPanelHeader() {
    if((this.props.currentTab === 0 && this.props.searchError) || (this.props.currentTab === 2 && !this.props.myFoods.length) ) {
    return false;
  }
  return true;
  }

  editMode() {
    this.setState(prevState => ({
      editMode: !prevState.editMode
    }));
  }

  getUserFoods() {
    this.props.getUserFoods();
  }

  deleteUserFoodItem(foodItemId:any) {
    // console.log("deleteUserFoodItem", foodItemId)
    this.props.deleteUserFoodItem(foodItemId);
  }

  render() {
    let editLink;
    if(!this.state.editMode) {
      editLink = (
          <span className={'FoodsPanel__edit-foods' + ([2].includes(this.props.currentTab) ? ' current' : '')} 
            onClick={this.editMode.bind(this)}
          >
          {FavList.edit.icon}edit
          </span>
        );
    } 
    else {
      editLink = (
          <span className={'FoodsPanel__edit-foods edit-mode' + ([2].includes(this.props.currentTab) ? ' current' : '')}>
             {FavList.edit.icon}<b>Edit Mode</b> 
             <span className="FoodsPanel__edit-foods--done-link" onClick={this.editMode.bind(this)}>(done)</span>
          </span>
        );
    }

    return (
      <div className="FoodsPanel">
        <div className="FoodsPanel__tabs">
        	<span 
        		className={'FoodsPanel__tab--searchresults' + (this.props.currentTab === 0 ? ' current' : '')}
        		onClick={this.handleSwitchTab.bind(this)}>Search Results</span>
        	<span 
        		className={'FoodsPanel__tab--recent' + (this.props.currentTab === 1 ? ' current' : '')}
      			onClick={this.handleSwitchTab.bind(this)}>Recent</span>
        	<span 
        		className={'FoodsPanel__tab--myfoods' + (this.props.currentTab === 2 ? ' current' : '')}
        		onClick={this.handleSwitchTab.bind(this)}>My Foods</span>
          
      		<Link to={'/createfood/' + this.props.mealGroupContext +'/'+  this.props.day}>
            <span className={'FoodsPanel__tab--createfoodbutton small-button' + (this.props.currentTab === 2 ? ' current' : '')}>+ New</span>
          </Link>
          {editLink}
        </div>

        {this.shouldDisplayPanelHeader() && 
          <div className="FoodsPanel__header">
            <span className="FoodsPanel__header--macros">
              <span>Product Name</span> 
              <span>{FavList.breadSlice.icon}</span>
              <span>{FavList.bacon.icon}</span>
              <span>{FavList.egg.icon}</span>
              <span>{FavList.fireAlt.icon} Calories</span>
            </span>
          </div>
        }

        {this.props.currentTab === 0 && 
          <SearchResults 
            nextPagesearchResults={this.props.nextPagesearchResults}
            prevPagesearchResults={this.props.prevPagesearchResults}
            results={this.props.searchResults} 
            error={this.props.searchError} 
            day={this.props.day}
            mealGroupContext={this.props.mealGroupContext}
          />}
  			{this.props.currentTab === 1 && 
          <RecentFoods 
            foods={this.props.recentFoods} 
            mealName={this.props.mealGroupContext}
            day={this.props.day}
            mealGroupContext={this.props.mealGroupContext}
          />}

  			{this.props.currentTab === 2 && 
          <MyFoods 
            day={this.props.day}
            getFoods={this.getUserFoods.bind(this)}
            foods={this.props.myFoods}
            deleteUserFoodItem={this.deleteUserFoodItem.bind(this)}
            editMode={this.state.editMode}
            mealGroupContext={this.props.mealGroupContext}
          />}
        
      </div>
    );

  }
}

export default FoodsPanel;
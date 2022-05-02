import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import {RouteComponentProps} from 'react-router-dom'
import AddFoodView from './001AddFoodView';
import { FavList } from '../../../Shared/FaviconList';
import { RCPprops } from '../../Models/000Models';



interface iProps{}

interface iState{

  tab: any,
  mealGroupContext: any //string | undefined
}

class AddFoodViewContainer extends Component<iProps & RouteComponentProps<RCPprops>, iState> {
  
  constructor(props:any) {
    super(props);
    this.state = {
      tab: 1,
      mealGroupContext: undefined
    };
    // console.log("AddFoodViewContainer", props,this.state)
  }

	componentDidMount() {
		window.scrollTo(0, 0);
  }
  
  fetchMealGroupToProvideAsContext(mealGroupContext:any) {
    
    // console.log("mealGroupContext", mealGroupContext)
    this.setState({mealGroupContext: mealGroupContext});
    this.setState({tab: 1});
  }

  handleDoneAddingFoodsClick() {
    const currentLocation = this.props.location.pathname
    const nextLocation = '/foodDiary'
    // console.log("currentLocation", currentLocation)
    this.setState({tab: 3})
    return <Redirect to={nextLocation} from = {currentLocation}/>
  }

  render() {
    
    const day = this.props.match.params.day;
    const tab = this.state.tab
    const mealGroupContext = this.state.mealGroupContext;
    
    // console.log("mealGroupContext", mealGroupContext)
    // console.log("day", day)
    // console.log("tab", tab)

    if(tab && this.state.tab !== tab) {
      this.setState({tab});
    }

    if(mealGroupContext && !this.state.mealGroupContext) {
      this.fetchMealGroupToProvideAsContext(this.props.match.params.meal);
    }

    let cancelLinkContents;
    if(!this.state.mealGroupContext) {
      cancelLinkContents = (
        <div className="container">
          <Link to={"/foodDiary"}>Cancel</Link>
        </div>
      );
    } else {
      cancelLinkContents = (
        <div className="container">
          <span className="FoodsPanel__context">
            Adding foods to <b>{this.state.mealGroupContext}</b>...
          </span>
          <button className="FoodsPanel__done-button" onClick={this.handleDoneAddingFoodsClick.bind(this)}>
            {FavList.done.icon}
            I'm done adding foods
          </button>
        </div>
      );
    }

    return (
      <div className="AddFoodViewContainer">
        
        <AddFoodView
          day={day} 
          tab={this.state.tab} 
          mealGroupContext={this.props.match.params.meal}
        />
        <div className="FoodsPanel__cancel-link">
          {cancelLinkContents}
        </div>
      </div>
    );
  }
}


export default AddFoodViewContainer;

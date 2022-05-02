import React, { Component } from 'react'
import {Route,Link, Switch} from 'react-router-dom'
import {routes, NotFound} from './Routes'
import { slide as Menu } from 'react-burger-menu'
import { getUser } from '../Services/ConectToServerServices';
import { ProtectedRoute, ProtectedRouteProps } from '../Services/ProtectRoutes';


export default class Navbar extends Component{
  user:any 
  authed:any
  x:any 
  
  dProtectedRP: ProtectedRouteProps = {
    isAuthenticated: this.x,
    authenticationPath: '/login',
  };

  constructor(props:any)
  {
    super(props)
    this.x  = this.getAuthedStatus()
    console.log(this.x, "????x")
    this.dProtectedRP.isAuthenticated = this.x
  }
  
  getAuthedStatus()
  {
    this.user = getUser()
    if(this.user !== null){return this.authed = true}
    if(this.user === null){return this.authed = false}
  }

  display()
  {
    if(this.authed === true)
    {
      return <Menu>
        
      {/* Shared Routes */}
      <Link to={routes.home.path}>{routes.home.name}</Link>
      {/* Authing Routes */}
      <Link to={routes.dashboard.path}>{routes.dashboard.name}</Link>
      <br/>
      
      {/* Fasting Routes */}
      {routes.home.FastTitle}
      <Link to={routes.fastType.path}>{routes.fastType.name}</Link>
      <Link to={routes.fastTimer.path}>{routes.fastTimer.name}</Link>
      <Link to={routes.fastHistory.path}>{routes.fastHistory.name}</Link>
      <Link to={routes.fastBackLogs.path}>{routes.fastBackLogs.name}</Link>
      <br/>
      
      {/* Weight Routes */}
      {routes.home.WeightTitle}
      <Link to={routes.weightAdd.path}>{routes.weightAdd.name}</Link>
      <Link to={routes.weightHistory.path}>{routes.weightHistory.name}</Link>
      <Link to={routes.weightBackLogs.path}>{routes.weightBackLogs.name}</Link>
      <br/>

      {/* FoodDairy Routes */}
      {routes.home.FoodTitle}
      <Link to={routes.dayView.path}>{routes.dayView.name}</Link>


    </Menu>}
    else 
    {
      return <Menu>
      {/* Shared Routes */}
      <Link to={routes.home.path}>{routes.home.name}</Link>
     
      {/* Authing Routes */}
      <Link to={routes.login.path}>{routes.login.name}</Link>
      <Link to={routes.register.path}>{routes.register.name} </Link>
    </Menu>
    }
  }

  render(){
    return <div>
        {this.display()}
        
        <div id="page-wrap">
        <Switch>
          {/* Shared Routes */}
          <Route exact  path={routes.home.path} component={routes.home.component} />
         
          {/* Authing Routes */}
          <Route exact  path={routes.login.path} component={routes.login.component} />
          <Route exact  path={routes.register.path} component={routes.register.component} />
          <ProtectedRoute {...this.dProtectedRP} exact path={routes.dashboard.path} component={routes.dashboard.component}/>
          
          
          {/* Fasting Routes */}
          <ProtectedRoute {...this.dProtectedRP} exact path={routes.fastType.path}    component={routes.fastType.component}/>
          <ProtectedRoute {...this.dProtectedRP} exact path={routes.fastTimer.path}   component={routes.fastTimer.component}/>
          <ProtectedRoute {...this.dProtectedRP} exact path={routes.fastHistory.path} component={routes.fastHistory.component}/>
          <ProtectedRoute {...this.dProtectedRP} exact path={routes.fastBackLogs.path} component={routes.fastBackLogs.component}/>
          <ProtectedRoute {...this.dProtectedRP} exact path={'/fastEdit/:id/:fast'}   component={routes.fastEdit.component}/>

          {/* Weight Routes */}
          <ProtectedRoute {...this.dProtectedRP} exact path={routes.weightAdd.path}    component={routes.weightAdd.component}/>
          <ProtectedRoute {...this.dProtectedRP} exact path={routes.weightHistory.path}   component={routes.weightHistory.component}/>
          <ProtectedRoute {...this.dProtectedRP} exact path={routes.weightBackLogs.path} component={routes.weightBackLogs.component}/>
          

          {/* foodDiary Routes */}
          <ProtectedRoute {...this.dProtectedRP}  exact path={routes.dayView.path}    component={routes.dayView.component}/>
          <ProtectedRoute {...this.dProtectedRP}  exact path={'/add/:meal/:day/:mealId?'}    component={routes.addFoodViewContainer.component}/>
          <ProtectedRoute {...this.dProtectedRP}  exact path={'/createfood/:meal/:day'}    component={routes.createFood.component}/>
          
          {/* Edit */}
          {/* <ProtectedRoute {...this.dProtectedRP}  path={routes.fastEdit.path} component={routes.fastEdit.component}/> */}
          
          <Route component={NotFound}/>
        </Switch>
      </div>
    </div>
  }   
}


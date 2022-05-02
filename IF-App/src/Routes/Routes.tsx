import React from 'react'
import Home from '../Shared/Home.component'
import RegisterPage from '../Components/Pages/Authentication/Register.component';
import DashboardPage from '../Components/Pages/Authentication/Dashboard.component';
import LoginPage from '../Components/Pages/Authentication/Login.component';
import FastTypeSelectPage from '../Components/Pages/Fast/001FastType';
import FastTimerPage from '../Components/Pages/Fast/002FastTimer';
import FastHistoryPage from '../Components/Pages/Fast/003FastHistory';
import FastEditPage from '../Components/Pages/Fast/004FastEdit';
import WeightAdd from '../Components/Pages/Weight/001WeightAdd';
import WeightHistory from '../Components/Pages/Weight/002WeightHistory';
import WeightBackLogs from '../Components/Pages/Weight/003WeightBackLogs';
import FastBackLogs from '../Components/Pages/Fast/005FastBacklog';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import DayView from '../Components/Pages/FoodDiary/000DayView';
import AddFoodViewContainer from '../Components/Pages/FoodDiary/001AddFoodViewContainer';
import CreateFoodView from '../Components/Pages/FoodDiary/002CreateFoodView';

export const routes = 
{
  //Shared Routes
  home:{
    path: '/',
    exact: true,
    component: Home,
    name: <span className="ico"><FontAwesomeIcon  icon="home"/> Home</span>,
    
    //Titles for all
    AuthTitle:    <span className="ico1"><FontAwesomeIcon  icon="user"/> Auth</span>,
    FastTitle:    <span className="ico1"><FontAwesomeIcon  icon="hourglass"/> Fast</span>,
    WeightTitle:  <span className="ico1"><FontAwesomeIcon  icon="weight"/> Weight</span>,
    FoodTitle:    <span className="ico1"><FontAwesomeIcon  icon="weight"/> FoodDiary</span>
  },
  
  //Auting Routes
  login:{
    path: '/login',
    exact: true,
    component: LoginPage,
    name:<span className="ico"><FontAwesomeIcon  icon="user-lock"/> Login</span>
  },
  register:{
    path: '/register',
    exact: true,
    component: RegisterPage,
    name: <span className="ico"><FontAwesomeIcon  icon="user-plus"/> Register</span>
  },
  dashboard:{
    path: '/dashboard',
    exact: true,
    component: DashboardPage,
    name: <span className="ico"><FontAwesomeIcon  icon="user-cog"/> Dashboard</span>
    },

  //FASTS
  fastType:{
    path: '/fastType',
    exact: true,
    component: FastTypeSelectPage,
    name: <span className="ico"><FontAwesomeIcon  icon="clock"/> Type</span>
  },
  fastTimer:{
    path: '/fastTimer',
    exact: true,
    component: FastTimerPage,
    name:<span className="ico"><FontAwesomeIcon  icon="hourglass"/> Timer</span>
  },
  fastHistory:{
    path: '/fastHistory',
    exact: true,
    component: FastHistoryPage,
    name:<span className="ico"><FontAwesomeIcon  icon="history"/> History</span>
  },
  fastEdit:{
    path: '/fastEdit',
    exact: true,
    component: FastEditPage,
    name: <span className="ico"><FontAwesomeIcon  icon="edit"/> Edit</span>
  },
  fastBackLogs:{
    path: '/fastBackLogs',
    exact: true,
    component: FastBackLogs,
    name: <span className="ico"><FontAwesomeIcon  icon="file-csv"/> Back Logs</span>
  },

  //WEIGHT
  weightAdd:{
    path: '/WeightAdd',
    exact: true,
    component: WeightAdd,
    name: <span className="ico"><FontAwesomeIcon  icon="weight"/> <FontAwesomeIcon  icon="plus"/></span>
  },
  weightHistory:{
    path: '/WeightHistory',
    exact: true,
    component: WeightHistory,
    name: <span className="ico"><FontAwesomeIcon  icon="weight"/> <FontAwesomeIcon  icon="history"/></span>
  },
  weightBackLogs:{
    path: '/WeightBackLogs',
    exact: true,
    component: WeightBackLogs,
    name: <span className="ico"><FontAwesomeIcon  icon="weight"/> Back Logs</span>
  },


  //FOOD DAIRY
  dayView:{
    path: '/foodDiary',
    component: DayView,
    name: <span className="ico"><FontAwesomeIcon  icon="plus"/>food Dairy</span>
  },
  addFoodViewContainer:{
    path: '/add/:meal/:day',
    component: AddFoodViewContainer,
    name: <span className="ico"><FontAwesomeIcon  icon="plus"/>add food</span>
  },
  createFood:{
    path: '/createfood/:meal/:day',
    component: CreateFoodView,
    name: <span className="ico"><FontAwesomeIcon  icon="plus"/>create food</span>
  },
  stats:{
    path: '/stats',
    component: '',
    name: <span className="ico"><FontAwesomeIcon  icon="plus"/>stats</span>
  },
  me:{
    path: 'me',
    component: CreateFoodView,
    name: <span className="ico"><FontAwesomeIcon  icon="plus"/>me</span>
  },




  //Not defined show this
  NoRouteDefined: {
    NotFound: 
    <div>
      <h1>Page NotFound !!!</h1>
      <span className="ico"><FontAwesomeIcon  icon="redo"/>Please try again</span>
    </div>
  }
  
}
export const NotFound = () => routes.NoRouteDefined.NotFound
  
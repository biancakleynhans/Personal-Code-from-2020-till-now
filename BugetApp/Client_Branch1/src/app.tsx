import React, { Component } from 'react';
import { appInj, IsIE } from './Service/tools';
import { BrowserRouter } from 'react-router-dom';
import Navbar from './Routes/Navbar';
import FindAndSetTheme, { Spinner } from './Theme/ThemeService';

//FONTAWESOME
// import { library } from '@fortawesome/fontawesome-svg-core'
// import { fab} from '@fortawesome/free-brands-svg-icons'
// import { 
//   faHome, faUserLock, faUserPlus, faUserCog, faClock, faSignOutAlt,
//   faHourglass, faHistory, faEdit, faFileCsv , faWeight, faPlus,
//   faRedo, faUser, faSignInAlt
// } from '@fortawesome/free-solid-svg-icons'

// library.add(
//   fab,  
//   faHome,faUserLock,faUserPlus, faUserCog,faRedo,faUser,faSignOutAlt,faSignInAlt,
//   faClock, faHourglass, faHistory, faEdit,faFileCsv, faWeight, faPlus
// )


export default class App extends Component{
  loading=''
  componentDidMount(){
    appInj.forceUpdate=()=>this.forceUpdate();
    appInj.setLoading=(m)=>{
      this.loading=m
      this.forceUpdate()
      return this.loading
    }
  }

  render()
  {
    return (
      <BrowserRouter>
      <Navbar  />
      <div id="page-wrap">
        <React.Fragment>
          {FindAndSetTheme()}
          {IsIE()}
          {
            this.loading && 
            <div className="overlay">
              <div onClick={()=>{ appInj.setLoading('')}}>
                {this.loading}{Spinner()}
              </div>
            </div>
        }
        </React.Fragment>
      </div>
      </BrowserRouter>
    );
  }
}
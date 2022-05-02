import React, { Component } from 'react';
import Navbar from './Routes/Navbar.component';
import { BrowserRouter } from 'react-router-dom';
import { appInj, IsIE } from './Components/Util/tools';
import FindAndSetTheme, { Spinner } from './Theme/ThemeService';


//FONTAWESOME
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab} from '@fortawesome/free-brands-svg-icons'
import { 
  faHome, faUserLock, faUserPlus, faUserCog, faClock, faSignOutAlt,
  faHourglass, faHistory, faEdit, faFileCsv , faWeight, faPlus,
  faRedo, faUser, faSignInAlt, faSync, faBreadSlice, faBacon, faEgg, faDrumstickBite, faHeart, faFire, faFireAlt,
   faCalendar, faCalendarAlt, faArrowLeft, faArrowRight, faSpinner, faPenFancy, faPlusCircle, faCheck,
    faHamburger, faTrash, faTrashAlt, faMinus, faSadCry, faSearch, faCarrot, faCandyCane, faLemon, faAngleLeft, faAngleRight,
    faChevronLeft, faChevronRight
} from '@fortawesome/free-solid-svg-icons'

library.add(
  fab,  
  faHome,faUserLock,faUserPlus, faUserCog,faRedo,faUser,faSignOutAlt,faSignInAlt,
  faClock, faHourglass, faHistory, faEdit,faFileCsv, faWeight, faPlus, faSync, 
  faBreadSlice, faBacon, faEgg, faDrumstickBite, faHeart, faFire, faFireAlt,
  faCalendar, faCalendarAlt, faArrowLeft, faArrowRight,faSpinner, faPenFancy,faPlusCircle,
  faCheck,faHamburger,faTrash, faTrashAlt, faMinus,faSadCry, faSearch, faCarrot, faCandyCane, faLemon,
  faAngleLeft, faAngleRight, faChevronLeft, faChevronRight
)

export default class App extends Component {

  loading=''
  
  UNSAFE_componentWillMount()
  {
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
        <script src="https://developer.edamam.com/attribution/badge.js"></script>
        <div id="edamam-badge" data-color="badge"></div>
        <div id="edamam-badge" data-color="Light"></div>
        <div id="edamam-badge" data-color="white"></div>
        <div id="edamam-badge" data-color="transparent"></div>
        </React.Fragment>
      </div>
      </BrowserRouter>
    );
  }
  
}


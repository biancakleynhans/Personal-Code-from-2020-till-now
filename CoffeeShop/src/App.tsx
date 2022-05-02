import React from 'react';
import Navbar from './Components/Shared/Navbar.component';
import { BrowserRouter } from 'react-router-dom';
import { appInj, IsIE } from './Services/tools';
import FindAndSetTheme from './Theme/ThemeService';

export class App extends React.Component  {

  loading=''
  componentWillMount()
  {
    appInj.forceUpdate=()=>this.forceUpdate();
    appInj.setLoading=(m)=>{
      this.loading=m
      this.forceUpdate()
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
          {this.loading && <div style={{}} className="overlay">
          <div onClick={()=>{
              appInj.setLoading('')
          }}>Loading</div>
          </div>}
        </React.Fragment>
      </div>
      </BrowserRouter>
    );
  }
  
}

export default App;

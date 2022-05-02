import React, { Component } from 'react'
import {Route,Link, Switch} from 'react-router-dom'
import {routes, NotFound} from './Routes'
import { slide as Menu } from 'react-burger-menu'


class Navbar extends Component{

  render(){
    return <div>
        <Menu>
          <Link to={routes.home.path}>{routes.home.name}</Link>
          <Link to={routes.PdfReader.path}>{routes.PdfReader.name}</Link>
          <Link to={routes.CsvReader.path}>{routes.CsvReader.name}</Link>
        </Menu>
        
        <div id="page-wrap">
        <Switch>

          {/* Routes */}
          <Route exact  path={routes.home.path} component={routes.home.component} />
          <Route exact  path={routes.PdfReader.path} component={routes.PdfReader.component} />
          <Route exact  path={routes.CsvReader.path} component={routes.CsvReader.component} />
          <Route exact  path={routes.ViewTable.path} component={routes.ViewTable.component} />
          <Route exact  path={routes.ViewBreakdown.path} component={routes.ViewBreakdown.component} />

           {/* Redirects */}
          {/* <Route exact path={'/editItem/:id/:name/:cost/:ps/:pv/:PrepMethod'} component={routes.editItem.component}/> */}
         
          <Route component={NotFound}/>
        </Switch>
      </div>
    </div>
  }   
}

export default Navbar

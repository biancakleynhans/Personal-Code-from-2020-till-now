import React, { Component } from 'react'
import {Route,Link, Switch} from 'react-router-dom'
import {routes, NotFound} from './Routes'
import { slide as Menu } from 'react-burger-menu'
import '../../Theme/Styles/Navbar.styles.css';
import { getUser } from '../../Services/ConectToServerServices';
import { ProtectedRouteProps, ProtectedRoute } from '../../Services/ProtectedRoutes';

class Navbar extends Component{

  user:any 
  authed:any
  x:any 
  defaultProtectedRouteProps: ProtectedRouteProps = {
    isAuthenticated: this.x,
    authenticationPath: '/login',
  };
  constructor(props:any)
  {
    super(props)
    this.x  = this.getAuthedStatus()
    console.log(this.x, "????x")
    this.defaultProtectedRouteProps.isAuthenticated = this.x
  }
  
  getAuthedStatus()
  {
    this.user = getUser()
    if(this.user !== null){return this.authed = true}
    if(this.user === null){return this.authed = false}
  }

  render(){
    return <div>
        <Menu>
        {/* <div className="dropdown">  
          <a className="dropbtn">Auth</a>
          <div className="dropdown-content">
                 
          </div>
        </div> */}

          {/* Shared Routes */}
          <Link to={routes.home.path}>{routes.home.name}</Link>
          <Link to={routes.test.path}>{routes.test.name}</Link>
          <Link to={routes.viewShopNL.path}>{routes.viewShopNL.name}</Link>

          {/* Authing Routes */}
          <div className="dropdown">  
          <p  className="dropbtn">Auth</p>
          <div className="dropdown-content">
            <Link to={routes.login.path}>{routes.login.name}</Link>
            <Link to={routes.register.path}>{routes.register.name}</Link>
            <Link to={routes.dashboard.path}>{routes.dashboard.name}</Link>
          </div>
        </div>
          
          
          {/* Shopping Routes  */}
          <div className="dropdown">  
          <p  className="dropbtn">Admin</p>
          <div className="dropdown-content">
            <Link to={routes.addItem.path}>{routes.addItem.name}</Link>
            <Link to={routes.viewItem.path}>{routes.viewItem.name}</Link>

            <Link to={routes.addProduct.path}>{routes.addProduct.name}</Link>
            <Link to={routes.viewProduct.path}>{routes.viewProduct.name}</Link>

            <Link to={routes.addCatagory.path}>{routes.addCatagory.name}</Link>
            <Link to={routes.viewCatagory.path}>{routes.viewCatagory.name}</Link>
          </div>
        </div>

        {/* User Shopping Routes  */}
        <div className="dropdown">  
          <p className="dropbtn">User</p>
          <div className="dropdown-content">
            <Link to={routes.viewShop.path}>{routes.viewShop.name}</Link>
            <Link to={routes.viewCart.path}>{routes.viewCart.name}</Link>
          </div>
        </div>
          

        </Menu>
        
        <div id="page-wrap">
        <Switch>

          {/* Redirects */}
          <Route exact path={'/editItem/:id/:name/:cost/:ps/:pv/:PrepMethod'} component={routes.editItem.component}/>
          <Route exact path={'/editProduct/:id/:name/:price/:des/:content'} component={routes.editProduct.component}/>
          <Route exact path={'/editCatagory/:id/:name/:prods'} component={routes.editCatagory.component}/>

          <Route exact path={'/addToCart/:catName/:item'} component={routes.addToCart.component}/>
          <Route exact path={'/checkOut'} component={routes.checkOut.component}/>

          {/* Shared Routes */}
          <Route exact  path={routes.home.path} component={routes.home.component} />
          <Route exact  path={routes.test.path} component={routes.test.component} />
          <Route exact  path={routes.viewShopNL.path} component={routes.viewShopNL.component} />
          
          {/* Authing Routes */}
          <Route exact  path={routes.login.path} component={routes.login.component} />
          <Route exact  path={routes.register.path} component={routes.register.component} />
          {/* <Route exact  path={routes.dashboard.path} component={routes.dashboard.component} /> */}
          <ProtectedRoute {...this.defaultProtectedRouteProps} exact={true} path={routes.dashboard.path} component={routes.dashboard.component}/>
          
          
          {/* Shopping Routes  */}
          <Route exact  path={routes.addItem.path} component={routes.addItem.component} />
          <Route exact  path={routes.viewItem.path} component={routes.viewItem.component} />

          <Route exact  path={routes.addProduct.path} component={routes.addProduct.component} />
          <Route exact  path={routes.viewProduct.path} component={routes.viewProduct.component} />

          <Route exact  path={routes.addCatagory.path} component={routes.addCatagory.component} />
          <Route exact  path={routes.viewCatagory.path} component={routes.viewCatagory.component} />

          {/* User Shopping Routes  */}
          <Route exact  path={routes.viewShop.path} component={routes.viewShop.component} />
          <Route exact  path={routes.viewCart.path} component={routes.viewCart.component} />

          {/* <PrivateRoute path="/account" component={Account} /> */}
          {/* <Redirect exact  from={routes.login.path} to={routes.dashboard.path} /> */}
          <Route component={NotFound}/>
        </Switch>
      </div>
    </div>
  }   
}

export default Navbar

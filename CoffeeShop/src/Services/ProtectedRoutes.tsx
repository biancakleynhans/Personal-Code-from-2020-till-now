import * as React from 'react';
import {Redirect, Route, RouteProps} from 'react-router';

export interface ProtectedRouteProps extends RouteProps {
    isAuthenticated: boolean;
    authenticationPath: string;
}

// export const defaultProtectedRouteProps: ProtectedRouteProps = {
    
//     isAuthenticated: true,
//     authenticationPath: '/login',
// };


export class ProtectedRoute extends Route<ProtectedRouteProps> {
    public render() {
        let redirectPath: string = '';
        if (!this.props.isAuthenticated) {
            redirectPath = this.props.authenticationPath;
        }

        if (redirectPath) {
            const renderComponent = () => (<Redirect to={{pathname: redirectPath}}/>);
            return <Route {...this.props} component={renderComponent} render={undefined}/>;
        } else {
            return <Route {...this.props}/>;
        }
    }
}


//use as: 

/* <ProtectedRoute
    {...defaultProtectedRouteProps}
    exact={true}
    path='/'
    component={togoto}
/> */
/* <ProtectedRoute
    { 
     isAuthenticated: true,
     authenticationPath: '/login'
    }
    exact={true}
    path='/'
    component={togoto}
/> */

import { IonRouterOutlet } from '@ionic/react';
import { Route } from 'react-router';
import { AllRoutePaths } from './Allroutes';

import Home from '../pages/basic/Home';
import About from '../pages/basic/About';
import ContactUs from '../pages/basic/ContactUs';
import SignIn from '../pages/auth/SignIn';
import SignUp from '../pages/auth/SignUp';
import ForgotPass from '../pages/auth/ForgotPass';
import ResetPassword from '../pages/auth/ResetPass';
import Dashbord from '../pages/auth/Dashbord';
import Rooms from '../pages/basic/Rooms';
import Services from '../pages/basic/Services';
import GalleryPage from '../pages/basic/GalleryPage';
import BookingsLandingUser from '../pages/bookings/BookingsLandingUser';
import ProtectedRouteAdmin from './ProtectedRouteAdmin';
import AdminDashboard from '../pages/admin/AdminDashboard';

export default function Routing() {
  return (
    <IonRouterOutlet id='main'>
      {/* Admin Pages  */}
      <ProtectedRouteAdmin path={AllRoutePaths.ADMIN} comp={AdminDashboard} />

      {/* Auth ROutes  */}
      <Route exact={true} path={AllRoutePaths.SIGN_IN} component={SignIn} />
      <Route exact={true} path={AllRoutePaths.SIGN_UP} component={SignUp} />
      <Route exact={true} path={AllRoutePaths.PASSWORD_FORGET} component={ForgotPass} />
      <Route exact={true} path={AllRoutePaths.PASSWORD_RESET} component={ResetPassword} />
      <Route exact={true} path={AllRoutePaths.ACCOUNT} component={Dashbord} />

      {/* BASIC ROUTES  */}
      <Route exact path={AllRoutePaths.ABOUT} component={About} />
      <Route exact path={AllRoutePaths.ROOMS} component={Rooms} />
      <Route exact path={AllRoutePaths.SERVICES} component={Services} />
      <Route exact path={AllRoutePaths.CONTACT} component={ContactUs} />
      <Route exact path={'/gallery'} component={GalleryPage} />
      {/* <Route exact path={AllRoutePaths.BOOK} component={BookingsLandingUser} /> */}

      {/* Default Route */}
      <Route exact={true} path={AllRoutePaths.HOME} component={Home} />
    </IonRouterOutlet>
  );
}

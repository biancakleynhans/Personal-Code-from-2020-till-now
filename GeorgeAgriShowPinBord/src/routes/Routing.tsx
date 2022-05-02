import React from "react";
import { Route } from "react-router";
import { IonRouterOutlet } from "@ionic/react";
import { AllRoutePaths } from "./Allroutes";
import Home from "../pages/basic/Home";
import SignIn from "../pages/auth/SignIn";
import SignUp from "../pages/auth/SignUp";
import ForgotPass from "../pages/auth/ForgotPass";
import ResetPassword from "../pages/auth/ResetPass";
import DashUser from "../pages/users/DashUser";
import DashAdmin from "../pages/admin/DashAdmin";
import AdminProtectedRoute from "./ProtectedRouteAdmin";
import UserProtectedRoute from "./ProtectedRoutesUser";

export default function Routing() {
  return (
    <IonRouterOutlet id='main'>
      {/* Auth routes  */}
      <Route exact path={AllRoutePaths.SIGN_IN} component={SignIn} />
      <Route exact path={AllRoutePaths.SIGN_UP} component={SignUp} />
      <Route exact path={AllRoutePaths.PASSWORD_FORGET} component={ForgotPass} />
      <Route exact path={AllRoutePaths.PASSWORD_RESET} component={ResetPassword} />

      {/* User Routes */}
      <UserProtectedRoute path={AllRoutePaths.DASH_USER} comp={DashUser} />

      {/* Admin routes */}
      <AdminProtectedRoute path={AllRoutePaths.DASH_ADMIN} comp={DashAdmin} />

      <Route exact path={AllRoutePaths.HOME} component={Home} />
    </IonRouterOutlet>
  );
}

import React from "react";
import { IonRouterOutlet } from "@ionic/react";
import { Route } from "react-router";

import { AllRoutePaths } from "./Allroutes";
import ProtectedRoute from "./ProtectedRoute";

import AdminDash from "../pages/admin/AdminDash";
import ProductUpload from "../pages/admin/ProductUpload";
import ProductUploadFromFile from "../pages/admin/ProductUploadFromFile";

import SignIn from "../pages/auth/SignIn";
import SignUp from "../pages/auth/SignUp";
import ForgotPass from "../pages/auth/ForgotPass";
import ResetPassword from "../pages/auth/ResetPass";

import Home from "../pages/basic/Home";
import Dashbord from "../pages/auth/Dashbord";
import About from "../pages/basic/About";
import FAQ from "../pages/basic/FAQ";
import ContactUs from "../pages/basic/ContactUs";

import ProductLanding from "../pages/products/ProductLanding";

export default function Routing() {
  return (
    <IonRouterOutlet id='main'>
      {/* Admin Pages  */}
      <ProtectedRoute path={AllRoutePaths.ADMIN} comp={AdminDash} />
      <ProtectedRoute path={AllRoutePaths.ADMIN_UPLOAD_MANUAL} comp={ProductUpload} />
      <ProtectedRoute path={AllRoutePaths.ADMIN_UPLOAD_FILES} comp={ProductUploadFromFile} />

      {/* Auth ROutes  */}
      <Route exact={true} path={AllRoutePaths.SIGN_IN} component={SignIn} />
      <Route exact={true} path={AllRoutePaths.SIGN_UP} component={SignUp} />
      <Route exact={true} path={AllRoutePaths.PASSWORD_FORGET} component={ForgotPass} />
      <Route exact={true} path={AllRoutePaths.PASSWORD_RESET} component={ResetPassword} />
      <Route exact={true} path={AllRoutePaths.ACCOUNT} component={Dashbord} />

      {/* BASIC ROUTES  */}
      <Route exact path={AllRoutePaths.ABOUT} component={About} />
      <Route exact path={AllRoutePaths.FAQ} component={FAQ} />
      <Route exact path={AllRoutePaths.CONTACT} component={ContactUs} />

      {/* PRODUCT ROUTES  */}
      <Route exact path={AllRoutePaths.PRODUCTS} component={ProductLanding} />

      {/* Default Route */}
      <Route exact={true} path={AllRoutePaths.HOME} component={Home} />
    </IonRouterOutlet>
  );
}

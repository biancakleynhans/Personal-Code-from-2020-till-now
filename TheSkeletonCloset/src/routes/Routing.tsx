import { IonRouterOutlet } from "@ionic/react";
import { Route } from "react-router";

import { AllRoutesObj } from "./AllRoutes";
import ProtectedRoute from "./ProtectedRoute";

import AdminDash from "../pages/admin/AdminDash";
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

import Cart from "../pages/cart/Cart";
import CategoriesPage from "../pages/products/00CategoriesPage";
import SubCategoriesPage from "../pages/products/01SubCategoriesPage";
import AllProductsPage from "../pages/products/02AllProductsPage";
import ProductUploadManual from "../pages/admin/ProductUploadManual";
import ProductUploadFromImages from "../pages/admin/ProductUploadFromImages";
import ProductPage from "../pages/products/03ProductPage";

export default function Routing() {
  return (
    <IonRouterOutlet id='main'>
      {/* Auth Routes  */}
      <Route exact={true} path={AllRoutesObj.auth.signIn.path} component={SignIn} />
      <Route exact={true} path={AllRoutesObj.auth.signUp.path} component={SignUp} />
      <Route exact={true} path={AllRoutesObj.auth.forgotPass.path} component={ForgotPass} />
      <Route exact={true} path={AllRoutesObj.auth.resetPass.path} component={ResetPassword} />

      {/* BASIC ROUTES  */}
      {/* <Route exact path={AllRoutesObj.menu.about.path} component={About} /> */}
      {/* <Route exact path={AllRoutesObj.menu.faq.path} component={FAQ} /> */}
      <Route exact path={AllRoutesObj.menu.contact.path} component={ContactUs} />

      {/* PRODUCT ROUTES  */}
      <Route path={AllRoutesObj.products.product.path} component={ProductPage} />
      <Route path={AllRoutesObj.products.subCat.path} component={AllProductsPage} />
      <Route path={AllRoutesObj.products.cat.path} component={SubCategoriesPage} />
      <Route exact path={AllRoutesObj.menu.landing.path} component={CategoriesPage} />

      {/* User routes  */}
      <Route exact={true} path={AllRoutesObj.user.dash.path} component={Dashbord} />
      <Route exact={true} path={AllRoutesObj.user.cart.path} component={Cart} />

      {/* Admin Pages  */}
      <ProtectedRoute path={AllRoutesObj.admin.dash.path} comp={AdminDash} />
      <ProtectedRoute path={AllRoutesObj.admin.uploadManual.path} comp={ProductUploadManual} />
      {/* <ProtectedRoute path={AllRoutesObj.admin.uploadFiles.path} comp={ProductUploadFromFile} /> */}
      <ProtectedRoute path={AllRoutesObj.admin.uploadImages.path} comp={ProductUploadFromImages} />

      {/* Default Route */}
      <Route exact={true} path={AllRoutesObj.menu.home.path} component={Home} />
      {/* <Route path='*' component={PageNotFound} /> */}
    </IonRouterOutlet>
  );
}

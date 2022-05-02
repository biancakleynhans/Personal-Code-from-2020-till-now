import React from "react";
import { Redirect, Route } from "react-router";
import { AllRoutePaths } from "./Allroutes";

import { Base_User } from "../models/UserModels";
import { useAuth } from "../firebase/FirebaseContextAuth";

export default function AdminProtectedRoute(props: { path: string; comp: React.ComponentType<any> }) {
  //   const location = useLocation<LocationState>();
  //   if (path === AllRoutePaths.SIGN_IN || path === AllRoutePaths.SIGN_UP || path === AllRoutePaths.PASSWORD_FORGET || path === AllRoutePaths.PASSWORD_RESET) {
  //     return currentUser != null ? <Redirect to={location.state?.from ?? AllRoutePaths.HOME} /> : <Route {...props} />;
  //   }

  const { currentUser } = useAuth();
  let curr_user: Base_User = {} as Base_User;

  if (currentUser !== null) {
    let curr: Base_User = {
      displayName: currentUser.displayName && currentUser.displayName.length > 1 ? currentUser.displayName : "",
      adress: currentUser.adress && currentUser.adress.length > 1 ? currentUser.adress : "",
      cell: currentUser.cell && currentUser.cell.length > 1 ? currentUser.cell : "",
      email: currentUser.email && currentUser.email.length > 1 ? currentUser.email : "",
      fn: currentUser.fn && currentUser.fn.length > 1 ? currentUser.fn : "",
      ln: currentUser.ln && currentUser.ln.length > 1 ? currentUser.ln : "",
      profileUrl: currentUser.profileUrl && currentUser.profileUrl.length > 1 ? currentUser.profileUrl : "",
      role: currentUser.role ? currentUser.role : "user",
      uid: currentUser.uid ? currentUser.uid : "",
      company: curr_user.company ? curr_user.company : "GAS",
      fmcToken: curr_user.fmcToken ? curr_user.fmcToken : ""
    };

    window.localStorage.setItem("user", JSON.stringify(curr));
    curr_user = curr;
  } else {
    let ls = window.localStorage.getItem("user");
    let user = ls !== null ? JSON.parse(ls) : ({ role: "user" } as Base_User);
    curr_user = user;
  }

  return curr_user !== null && (curr_user.role == "admin" || curr_user.role == "super") ? (
    <Route exact={true} path={props.path} component={props.comp} />
  ) : (
    <Redirect to={{ pathname: AllRoutePaths.HOME, state: { from: props.path } }} />
  );
}

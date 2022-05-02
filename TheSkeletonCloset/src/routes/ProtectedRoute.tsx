import { Redirect, Route } from "react-router";
import { AllRoutesObj } from "./AllRoutes";
import { useAuth } from "../firebase/FirebaseAuthContext";
import { Base_User } from "../models/User_models";

export default function ProtectedRoute(props: { path: string; comp: React.ComponentType<any> }) {
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
      orders: currentUser.orders ? currentUser.orders : {},
      profileUrl: currentUser.profileUrl && currentUser.profileUrl.length > 1 ? currentUser.profileUrl : "",
      requests: currentUser.requests ? currentUser.requests : {},
      role: currentUser.role ? currentUser.role : "user",
      uid: currentUser.uid ? currentUser.uid : ""
    };

    window.localStorage.setItem("user", JSON.stringify(curr));
    curr_user = curr;
  } else {
    let ls = window.localStorage.getItem("user");
    let user = ls !== null ? JSON.parse(ls) : ({ role: "user" } as Base_User);
    curr_user = user;
  }

  return curr_user !== null && curr_user.role === "admin" ? (
    <Route exact path={props.path} component={props.comp} />
  ) : (
    <Redirect to={{ pathname: AllRoutesObj.menu.home.path, state: { from: props.path } }} />
  );
}

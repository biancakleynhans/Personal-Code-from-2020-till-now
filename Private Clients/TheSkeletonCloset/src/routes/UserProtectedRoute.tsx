import React from "react";
import { Redirect, Route } from "react-router";
import { useAuth } from "../hooks/AuthHook";
import { RoutesObj } from "./Routes";

interface iProps {
  path: string;
  comp: React.ComponentType<any>;
  name: string;
  ex: boolean;
  show: boolean;
}

export default function UserProtectedRoute(props: iProps) {
  const { currentUser } = useAuth();

  return (
    <>
      {currentUser && (currentUser.role === "user" || currentUser?.role === "super") ? (
        <Route path={props.path} exact={props.ex} component={props.comp} />
      ) : (
        <Redirect to={{ pathname: RoutesObj.basic.home.path, state: { from: props.path } }} />
      )}
    </>
  );
}

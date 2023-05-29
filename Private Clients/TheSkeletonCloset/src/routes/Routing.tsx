import { Route } from "react-router-dom";
import { IonRouterOutlet } from "@ionic/react";
import AppBaseHome from "../pages/shared/AppBaseHome";
import Page404 from "../pages/shared/Page404";
import { AdminRoutes, AuthRoutes, ClientRoutes, ProductRoutes } from "./Routes";
import AdminProtectedRoute from "./AdminProtectedRoute";
import UserProtectedRoute from "./UserProtectedRoute";

export default function Routing() {
  return (
    <IonRouterOutlet id='main'>
      {/* Auth  */}
      {AuthRoutes.map((r, i) => (
        <Route key={i} path={r.path} exact={r.ex} component={r.comp} />
      ))}

      {/* Admin  */}
      {AdminRoutes.map((r, i) => (
        <AdminProtectedRoute key={i} path={r.path} ex={r.ex} comp={r.comp} name={r.name} show={r.show} />
      ))}

      {/* Products */}
      {ProductRoutes.map((r, i) => (
        <Route key={i} path={r.path} exact={r.ex} component={r.comp} />
      ))}

      {/* Client */}
      {ClientRoutes.map((r, i) => (
        <Route key={i} path={r.path} exact={r.ex} component={r.comp} />
      ))}

      {/* Defaults */}
      <Route exact path='/' component={AppBaseHome} />
      <Route component={Page404} />
    </IonRouterOutlet>
  );
}

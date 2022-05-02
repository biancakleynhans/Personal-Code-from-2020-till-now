import React, { Component } from "react";
import { IonRouterOutlet } from "@ionic/react";
import { Route } from "react-router";
import HomePage from "../pages/HomePage";
import MontlyReportPage from "../pages/MontlyReportPage";
import ErrorReportPage from "../pages/ErrorReportPage";
import SalarySchedulePage from "../pages/SalarySchedulePage";

export class Routing extends Component {
  render() {
    return (
      <IonRouterOutlet id='main'>
        <Route
          exact
          path='/monthly'
          render={(props) => {
            return <MontlyReportPage {...props} />;
          }}
        />

        <Route
          exact
          path='/errorReport'
          render={(props) => {
            return <ErrorReportPage {...props} />;
          }}
        />

        <Route
          exact
          path='/perPerson'
          render={(props) => {
            return <SalarySchedulePage {...props} />;
          }}
        />

        <Route path='/' component={HomePage} exact={true} />
      </IonRouterOutlet>
    );
  }
}

export default Routing;

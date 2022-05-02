import { IonRouterOutlet } from "@ionic/react";
import React, { Component } from "react";
import { Route } from "react-router";
import DashboardPage from "../authentication/DashboardPage";
import LoginPage from "../authentication/LoginPage";
import RegisterPage from "../authentication/RegisterPage";
import Home from "../pages/Home";
import QuestionareResultsSwitchPage from "../pages/QuestionareResultsSwitchPage";
import CreateNewQuestionaire from "../questionares/CreateNewQuestionaire";

export class Routing extends Component {
  render() {
    return (
      <IonRouterOutlet id='main'>
        <Route path='/login' component={LoginPage} exact={true} />
        <Route path='/register' component={RegisterPage} exact={true} />

        <Route
          exact
          path='/dash'
          render={(props) => {
            return <DashboardPage {...props} />;
          }}
        />

        <Route
          exact
          path='/createQ'
          render={(props) => {
            return <CreateNewQuestionaire {...props} />;
          }}
        />

        <Route
          exact
          path='/questionaire'
          render={(props) => {
            return <QuestionareResultsSwitchPage {...props} />;
          }}
        />

        <Route path='/' component={Home} exact={true} />
      </IonRouterOutlet>
    );
  }
}

export default Routing;

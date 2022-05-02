import { IonContent, IonPage } from "@ionic/react";
import React, { Component } from "react";
import HeaderComponent from "../components/HeaderComponent";

export class DashboardPage extends Component {
  render() {
    return (
      <IonPage>
        <HeaderComponent title='Dashboard' />
        <IonContent fullscreen></IonContent>
      </IonPage>
    );
  }
}

export default DashboardPage;

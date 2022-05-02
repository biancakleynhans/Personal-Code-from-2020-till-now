import { IonContent, IonPage } from "@ionic/react";
import React, { Component } from "react";
import HeaderComponent from "../components/HeaderComponent";

export class CreateNewQuestionaire extends Component {
  render() {
    return (
      <IonPage>
        <HeaderComponent title='Create new Questionare' />
        <IonContent fullscreen></IonContent>
      </IonPage>
    );
  }
}

export default CreateNewQuestionaire;

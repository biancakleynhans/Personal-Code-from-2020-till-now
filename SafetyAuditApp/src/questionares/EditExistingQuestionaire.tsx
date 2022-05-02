import { IonContent, IonPage } from "@ionic/react";
import React, { Component } from "react";
import HeaderComponent from "../components/HeaderComponent";

export class EditExistingQuestionaire extends Component {
  render() {
    return (
      <IonPage>
        <HeaderComponent title='Edit Existing Questionaire' />
        <IonContent fullscreen></IonContent>
      </IonPage>
    );
  }
}

export default EditExistingQuestionaire;

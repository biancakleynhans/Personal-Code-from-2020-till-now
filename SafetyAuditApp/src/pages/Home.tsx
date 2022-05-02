import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonContent, IonPage } from "@ionic/react";
import React, { Component } from "react";
import HeaderComponent from "../components/HeaderComponent";

export class Home extends Component {
  render() {
    return (
      <IonPage>
        <HeaderComponent title='Home' />
        <IonContent fullscreen>
          <IonCard>
            <IonCardHeader>
              <IonCardTitle>Construction Health & Safety Audit Inspection Checklist </IonCardTitle>
            </IonCardHeader>

            <IonCardContent>
              <IonButton href={"/questionaire"}>Go Now</IonButton>
            </IonCardContent>
          </IonCard>
        </IonContent>
      </IonPage>
    );
  }
}

export default Home;

import React, { Component } from "react";
import { IonBackButton, IonButton, IonButtons, IonHeader, IonLabel, IonToolbar } from "@ionic/react";

interface iProps {
  title: string;
}
interface iState {}

export class HeaderComponent extends Component<iProps, iState> {
  render() {
    return (
      <IonHeader>
        <IonToolbar
          style={{
            "--background": "rgba(35,11,79,1)"
          }}>
          <IonButtons slot='start'>
            <IonBackButton color='tertiary' defaultHref='/' />
          </IonButtons>
          {/* <IonButtons slot='end'>
            <IonButton href='/login' color='tertiary' fill='clear'>
              <IonLabel color='secondary'>Log In</IonLabel>
            </IonButton>

            <IonButton href='/register' color='primary' fill='solid' expand='block'>
              <IonLabel style={{ color: "white" }}>Register</IonLabel>
            </IonButton>

            <IonButton href='/dash' color='primary' fill='clear'>
              <IonLabel color='medium'>Dashboard</IonLabel>
            </IonButton>
          </IonButtons> */}
        </IonToolbar>
      </IonHeader>
    );
  }
}

export default HeaderComponent;

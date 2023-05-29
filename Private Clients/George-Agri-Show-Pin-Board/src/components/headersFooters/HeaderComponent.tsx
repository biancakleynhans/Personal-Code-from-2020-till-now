import React from "react";
import { IonHeader, IonText, IonToolbar } from "@ionic/react";
import NavButtons from "./NavButton";

export default function HeaderComponent(props: { title: string }) {
  return (
    <IonHeader collapse='fade' className='ion-no-border'>
      <IonToolbar color='medium'>
        <NavButtons />
      </IonToolbar>
      <IonToolbar color='secondary' style={{ textAlign: "center" }}>
        <IonText style={{ fontSize: "2.5rem" }}>{props.title}</IonText>
      </IonToolbar>
    </IonHeader>
  );
}

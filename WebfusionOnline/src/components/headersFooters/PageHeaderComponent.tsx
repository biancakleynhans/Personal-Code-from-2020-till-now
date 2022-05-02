import React from "react";
import { IonHeader, IonTitle, IonToolbar } from "@ionic/react";

export default function PageHeaderComponent(props: { header: string }) {
  return (
    // <IonToolbar>
    //   <IonHeader>{props.header}</IonHeader>
    // </IonToolbar>

    <IonHeader className='ion-no-border' style={{ padding: "15px" }}>
      <IonToolbar>
        <IonTitle class='ion-text-wrap' style={{ fontSize: "2em", padding: "10px", textOverflow: "unset" }}>
          {props.header && props.header.replaceAll("/", "").replaceAll("_", " ").toUpperCase()}
        </IonTitle>
      </IonToolbar>
    </IonHeader>
    // </IonHeader>
  );
}

import { IonLabel } from "@ionic/react";
import React from "react";

function Error(props: { error: string }) {
  return (
    <IonLabel class='ion-text-wrap' color='danger' style={{ fontSize: "12px" }}>
      {props.error}
    </IonLabel>
  );
}

export default Error;

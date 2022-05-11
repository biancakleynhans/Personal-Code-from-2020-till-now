import { IonIcon, IonItem, IonLabel } from "@ionic/react";
import { ellipse } from "ionicons/icons";

export function colorCoder(paid: boolean, packed: string, shipped: string, delivered: string) {
  if (!paid) {
    return "danger";
  }
  if (paid && packed.length === 0 && shipped.length === 0 && delivered.length === 0) {
    return "warning";
  }
  if (paid && packed.length > 0 && shipped.length === 0 && delivered.length === 0) {
    return "secondary";
  }
  if (paid && packed.length > 0 && shipped.length > 0 && delivered.length === 0) {
    return "tertiary";
  }
  if (paid && packed.length > 0 && shipped.length > 0 && delivered.length > 0) {
    return "success";
  }
  return "none";
}

export function colorMarker() {
  return (
    <>
      <IonLabel class='ion-text-wrap'>STATUS OF ORDER:</IonLabel>
      <IonItem>
        <IonLabel class='ion-text-wrap'>
          <IonIcon style={{ marginLeft: "5px" }} color='danger' icon={ellipse} />
          Not paid
          <IonIcon style={{ marginLeft: "5px" }} color='warning' icon={ellipse} />
          Paid
          <IonIcon style={{ marginLeft: "5px" }} color='secondary' icon={ellipse} />
          Packed
          <IonIcon style={{ marginLeft: "5px" }} color='tertiary' icon={ellipse} />
          Shipped
          <IonIcon style={{ marginLeft: "5px" }} color='success' icon={ellipse} />
          Out to Delevery
        </IonLabel>
      </IonItem>
    </>
  );
}

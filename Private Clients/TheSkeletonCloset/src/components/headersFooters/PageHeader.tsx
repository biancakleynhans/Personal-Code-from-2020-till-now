import { IonHeader, IonLabel, IonToolbar } from "@ionic/react";

export default function PageHeader(props: { header: string }) {
  return (
    <IonHeader>
      <IonToolbar>
        <IonLabel color='secondary' class='ion-text-wrap' style={{ fontSize: "1.5em" }}>
          {props.header && props.header.toUpperCase()}
        </IonLabel>
      </IonToolbar>
    </IonHeader>
  );
}

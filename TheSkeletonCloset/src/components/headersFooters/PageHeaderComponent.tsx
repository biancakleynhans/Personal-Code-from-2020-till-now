import { IonHeader, IonLabel, IonToolbar } from "@ionic/react";

export default function PageHeaderComponent(props: { header: string }) {
  return (
    <IonHeader className='ion-no-border' style={{ padding: "15px" }}>
      <IonToolbar>
        <IonLabel class='ion-text-wrap' style={{ fontSize: "2em", padding: "10px", textOverflow: "unset" }}>
          {props.header && props.header.replaceAll("/", "").replaceAll("_", " ").toUpperCase()}
        </IonLabel>
      </IonToolbar>
    </IonHeader>
  );
}

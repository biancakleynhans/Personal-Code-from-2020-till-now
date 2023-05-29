import { IonButton, IonHeader, IonIcon, IonLabel, IonToolbar } from "@ionic/react";
import { optionsOutline } from "ionicons/icons";

interface iProps {
  col: string;
  title: string;
  layoutCb: () => void;
}

export default function CategoryBar(props: iProps) {
  return (
    <IonToolbar>
      <IonButton fill='outline' onClick={() => props.layoutCb()} slot='start'>
        <IonLabel>Layout {props.col}</IonLabel>
      </IonButton>
      <IonHeader>
        <IonLabel color='primary' class='ion-text-wrap'>
          {props.title.replace("%20", " ").toUpperCase()}
        </IonLabel>
      </IonHeader>
      <IonButton fill='outline' slot='end'>
        <IonIcon slot='start' icon={optionsOutline} />
        <IonLabel slot='end'>Sort/Filter</IonLabel>
      </IonButton>
    </IonToolbar>
  );
}

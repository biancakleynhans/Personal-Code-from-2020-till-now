import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCol, IonIcon, IonLabel } from "@ionic/react";
import { build, cash, trashBin } from "ionicons/icons";
import { ReviewEmail } from "../../models/User_models";

export default function ReviewDisplay(keyVal: number, entry: ReviewEmail, isAdmin: boolean) {
  return (
    <IonCol key={keyVal}>
      <IonCard style={{ textAlign: "center" }}>
        <IonCardHeader>
          <IonCardTitle color='primary'>Name: {entry.name}</IonCardTitle>
          <IonCardTitle color='primary'>Email: {entry.email}</IonCardTitle>
          <IonCardTitle color='primary'>Cell: {entry.cell}</IonCardTitle>

          <IonCardSubtitle>
            <IonLabel class="class='ion-text-wrap">Review: {entry.msg}</IonLabel>
          </IonCardSubtitle>
        </IonCardHeader>
        <IonCardContent>
          {isAdmin && (
            <>
              <IonButton fill='clear'>
                <IonIcon icon={build} color='primary' />
              </IonButton>
              <IonButton fill='clear'>
                <IonIcon icon={trashBin} color='primary' />
              </IonButton>
              <IonButton fill='clear'>
                <IonIcon icon={cash} color='primary' />
              </IonButton>
            </>
          )}
        </IonCardContent>
      </IonCard>
    </IonCol>
  );
}

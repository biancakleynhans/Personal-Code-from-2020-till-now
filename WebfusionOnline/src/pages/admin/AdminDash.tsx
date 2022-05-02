import React from "react";
import { IonButton, IonCard, IonCardContent, IonCardHeader, IonContent, IonLabel, IonPage } from "@ionic/react";
import { AllRoutePaths } from "../../routes/Allroutes";
import HeaderComponent from "../../components/headersFooters/HeaderComponent";

export default function AdminDash() {
  return (
    <IonPage>
      <IonContent>
        <HeaderComponent title={"Welcome to your admin Dash"} showBanner={false} />

        <IonCard>
          <IonCardHeader>
            <IonLabel>Upload of Products</IonLabel>
          </IonCardHeader>
          <IonCardContent>
            <IonButton href={AllRoutePaths.ADMIN_UPLOAD_MANUAL}>Upload items manuallly</IonButton>
            <IonButton href={AllRoutePaths.ADMIN_UPLOAD_FILES}>Upload items as tsv file</IonButton>
          </IonCardContent>
        </IonCard>

        <IonCard>
          <IonCardHeader>
            <IonLabel>Site requests</IonLabel>
          </IonCardHeader>
          <IonCardContent></IonCardContent>
        </IonCard>

        <IonCard>
          <IonCardHeader>
            <IonLabel>Site orders</IonLabel>
          </IonCardHeader>
          <IonCardContent></IonCardContent>
        </IonCard>
      </IonContent>
    </IonPage>
  );
}

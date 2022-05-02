import { IonButton, IonCard, IonCardContent, IonCardHeader, IonContent, IonLabel, IonPage } from "@ionic/react";
import { AllRoutesObj } from "../../routes/AllRoutes";
import HeaderComponent from "../../components/headersFooters/HeaderComponent";

export default function AdminDash() {
  return (
    <IonPage>
      <IonContent>
        <HeaderComponent title={"Welcome to your admin dash"} />

        <IonCard>
          <IonCardHeader>
            <IonLabel>Upload of Products</IonLabel>
          </IonCardHeader>
          <IonCardContent>
            <IonButton routerLink={AllRoutesObj.admin.uploadManual.path}>Upload items manuallly</IonButton>
            <IonButton routerLink={AllRoutesObj.admin.uploadImages.path}>Upload items as jpg</IonButton>
            {/* <IonButton routerLink={AllRoutesObj.admin.uploadFiles.path}>Upload items as pdf file</IonButton> */}
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

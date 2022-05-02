import { IonButton, IonContent, IonPage, IonTitle } from "@ionic/react";
import FooterComponent from "../../components/headersFooters/FooterComponent";
import HeaderComponent from "../../components/headersFooters/HeaderComponent";
import { AllRoutesObj } from "../../routes/AllRoutes";

export default function PageNotFound() {
  return (
    <IonPage>
      <IonContent>
        <HeaderComponent title={""} />
        <IonTitle>Page Not Found</IonTitle>
        <IonButton routerLink={AllRoutesObj.menu.home.path}>Go back to home page</IonButton>
        <FooterComponent />
      </IonContent>
    </IonPage>
  );
}

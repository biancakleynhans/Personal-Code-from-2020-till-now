import React from "react";
import { IonContent, IonPage } from "@ionic/react";
import HeaderComponent from "../../components/headersFooters/HeaderComponent";
import FooterComponent from "../../components/headersFooters/FooterComponent";

export default function ProductLanding() {
  return (
    <IonPage>
      <IonContent>
        <HeaderComponent title='Products' showBanner={true} />
        <FooterComponent />
      </IonContent>
    </IonPage>
  );
}

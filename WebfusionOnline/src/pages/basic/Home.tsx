import React from "react";
import { IonContent, IonPage } from "@ionic/react";
import FooterComponent from "../../components/headersFooters/FooterComponent";
import HeaderComponent from "../../components/headersFooters/HeaderComponent";

export default function Home() {
  return (
    <IonPage>
      <IonContent>
        <HeaderComponent title={""} showBanner={true} />
        <FooterComponent />
      </IonContent>
    </IonPage>
  );
}

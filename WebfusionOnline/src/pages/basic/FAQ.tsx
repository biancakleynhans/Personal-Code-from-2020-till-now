import React from "react";
import { IonCard, IonCardContent, IonContent, IonLabel, IonPage } from "@ionic/react";
import HeaderComponent from "../../components/headersFooters/HeaderComponent";
import FooterComponent from "../../components/headersFooters/FooterComponent";

export default function FAQ() {
  return (
    <IonPage>
      <IonContent>
        <HeaderComponent title={"FAQ"} showBanner={true} />
        <IonCard color='light'>
          <IonCardContent>
            <IonLabel class='ion-text-wrap'></IonLabel>
            <br />
            <br />
          </IonCardContent>
        </IonCard>
        <FooterComponent />
      </IonContent>
    </IonPage>
  );
}

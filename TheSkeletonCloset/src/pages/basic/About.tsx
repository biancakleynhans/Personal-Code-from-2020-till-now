import { IonCard, IonContent, IonPage } from "@ionic/react";
import HeaderComponent from "../../components/headersFooters/HeaderComponent";
import FooterComponent from "../../components/headersFooters/FooterComponent";

export default function About() {
  return (
    <IonPage>
      <IonContent>
        <HeaderComponent title='About' />
        <IonCard color='light'></IonCard>
        <FooterComponent />
      </IonContent>
    </IonPage>
  );
}

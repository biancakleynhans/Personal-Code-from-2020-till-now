import { IonButton, IonCol, IonContent, IonGrid, IonPage, IonRow } from "@ionic/react";
import HeaderComponent from "../../components/headersFooters/HeaderComponent";
import FooterComponent from "../../components/headersFooters/FooterComponent";
import AboutBanner from "../../components/displayElements/AboutBanner";

export default function About() {
  return (
    <IonPage>
      <IonContent fullscreen={true}>
        <HeaderComponent />
        <br />
        <br />
        <AboutBanner showfull={true} />
        <br />
        <br />
        <IonGrid>
          <IonRow>
            <IonCol></IonCol>
            <IonCol>
              <IonButton expand='full' routerLink='/gallery'>
                View images
              </IonButton>
            </IonCol>
            <IonCol></IonCol>
          </IonRow>
        </IonGrid>
        <br />
        <br />
        <FooterComponent />
      </IonContent>
    </IonPage>
  );
}

import { IonCol, IonContent, IonGrid, IonPage, IonRow } from "@ionic/react";
import FooterComponent from "../../components/headersFooters/FooterComponent";
import HeaderComponent from "../../components/headersFooters/HeaderComponent";
import BookingSimple from "../../components/bookingSystem/BookingSimple";

export default function BookingsLandingUser() {
  return (
    <IonPage>
      <IonContent>
        <HeaderComponent />

        <IonGrid>
          <IonRow>
            <IonCol></IonCol>
            <IonCol>
              <BookingSimple />
            </IonCol>
            <IonCol></IonCol>
          </IonRow>
        </IonGrid>
        <FooterComponent />
      </IonContent>
    </IonPage>
  );
}

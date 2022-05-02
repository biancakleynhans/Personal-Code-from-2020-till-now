import { IonCard, IonCardHeader, IonCardTitle, IonContent, IonPage } from "@ionic/react";
import { useAuth } from "../../firebase/FirebaseAuthContext";
import HeaderComponent from "../../components/headersFooters/HeaderComponent";
import FooterComponent from "../../components/headersFooters/FooterComponent";

export default function Dashbord() {
  const { currentUser } = useAuth();
  return (
    <IonPage>
      <IonContent>
        <HeaderComponent title='' />

        <IonCard>
          <IonCardHeader>
            <IonCardTitle>Dashboard</IonCardTitle>
          </IonCardHeader>

          {currentUser != null ? <>USER</> : <></>}
        </IonCard>
        <FooterComponent />
      </IonContent>
    </IonPage>
  );
}

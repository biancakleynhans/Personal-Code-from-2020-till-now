import { IonContent, IonPage } from "@ionic/react";
import FooterComponent from "../../components/headersFooters/FooterComponent";
import HeaderComponent from "../../components/headersFooters/HeaderComponent";

export default function Home() {
  return (
    <IonPage>
      <IonContent>
        <HeaderComponent title={"Welcome to The Skeleton Closet"} />
        <FooterComponent />
      </IonContent>
    </IonPage>
  );
}

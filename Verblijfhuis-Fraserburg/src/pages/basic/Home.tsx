import { IonContent, IonPage } from "@ionic/react";
import HeaderComponent from "../../components/headersFooters/HeaderComponent";
import FooterComponent from "../../components/headersFooters/FooterComponent";
import AccomsBanner from "../../components/displayElements/AccomsBanner";
import AboutBanner from "../../components/displayElements/AboutBanner";

export default function Home() {
  return (
    <IonPage>
      <IonContent>
        <HeaderComponent />
        <br />
        <AccomsBanner />
        <br />
        <AboutBanner showfull={false} />
        <br />
        {window.innerWidth > 880 && <FooterComponent />}
      </IonContent>
      {window.innerWidth < 880 && <FooterComponent />}
    </IonPage>
  );
}

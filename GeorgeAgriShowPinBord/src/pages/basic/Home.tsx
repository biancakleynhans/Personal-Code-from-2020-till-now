import { IonCol, IonContent, IonGrid, IonPage, IonRow } from "@ionic/react";
import FooterComponent from "../../components/headersFooters/FooterComponent";
import HeaderComponent from "../../components/headersFooters/HeaderComponent";

import LOGO from "../../assets/images/Logo.jpeg";

const Home: React.FC = () => {
  return (
    <IonPage>
      <HeaderComponent title='Home' />
      <IonContent fullscreen>
        <IonGrid>
          <IonRow>
            <IonCol>
              <img src={LOGO} alt='broken' />
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
      <FooterComponent />
    </IonPage>
  );
};

export default Home;

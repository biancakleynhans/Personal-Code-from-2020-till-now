import { useState } from "react";
import { IonButton, IonCard, IonCol, IonContent, IonFooter, IonGrid, IonIcon, IonPage, IonRow } from "@ionic/react";
import { chevronBack, chevronForward } from "ionicons/icons";
import HeaderComponent from "../../components/headersFooters/HeaderComponent";

import BAN1 from "../../assets/images/actual/Banner1.jpg";
import BAN3 from "../../assets/images/actual/Banner3.jpg";
import BAN6 from "../../assets/images/actual/Banner6.jpg";
import BAN7 from "../../assets/images/actual/Banner7.jpg";
import BAN9 from "../../assets/images/actual/Banner9.jpg";
import BAN10 from "../../assets/images/actual/Banner10.jpg";
import BAN11 from "../../assets/images/actual/Banner11.jpg";
import BAN12 from "../../assets/images/actual/Banner12.jpg";
import BAN13 from "../../assets/images/actual/Banner13.jpg";

const BannerImages = [BAN1, BAN3, BAN6, BAN7, BAN1, BAN9, BAN10, BAN11, BAN12, BAN13];

export default function GalleryPage() {
  const [currNum, setcurrNum] = useState<number>(0);

  function goBack() {
    if (currNum > 0 && currNum < BannerImages.length) {
      setcurrNum(currNum - 1);
    } else if (currNum === 0) {
      setcurrNum(0);
    } else if (currNum === BannerImages.length) {
      setcurrNum(1);
    } else {
      console.log("??????", currNum);
      setcurrNum(0);
    }
  }

  function goFwd() {
    if (currNum > 0 && currNum < BannerImages.length) {
      setcurrNum(currNum + 1);
    } else if (currNum === 0) {
      setcurrNum(1);
    } else if (currNum === BannerImages.length) {
      setcurrNum(0);
    } else {
      console.log("??????", currNum);
      setcurrNum(0);
    }
  }

  // setTimeout(() => {
  //   goFwd();
  // }, 24000);

  return (
    <IonPage>
      <IonContent fullscreen={true}>
        <HeaderComponent />

        <IonGrid>
          <IonRow className='ion-align-self-center'>
            {/* BTN BACK */}
            <IonCol className='ion-align-self-center'>
              {window.innerWidth > 880 && (
                <IonButton shape='round' fill='outline' color='secondary' onClick={() => goBack()}>
                  <IonIcon icon={chevronBack} />
                </IonButton>
              )}
            </IonCol>

            {/* IMAGES */}
            <IonCol>
              <IonCard className={"galleryCard"} style={{ backgroundImage: `url(${BannerImages[currNum]})` }}></IonCard>
            </IonCol>

            {/* BTN FORWARD  */}
            <IonCol className='ion-align-self-center'>
              {window.innerWidth > 880 && (
                <IonButton style={{ float: "right" }} shape='round' fill='outline' color='secondary' onClick={() => goFwd()}>
                  <IonIcon icon={chevronForward} />
                </IonButton>
              )}
            </IonCol>
          </IonRow>
        </IonGrid>

        <IonFooter />
      </IonContent>
    </IonPage>
  );
}

import { IonCard, IonCol, IonContent, IonGrid, IonPage, IonRow, IonCardContent, IonCardHeader, IonCardTitle, IonLabel, IonToolbar, IonIcon } from "@ionic/react";
import HeaderComponent from "../../components/headersFooters/HeaderComponent";
import FooterComponent from "../../components/headersFooters/FooterComponent";
import { bedOutline, bonfireOutline, carOutline } from "ionicons/icons";

const text1 = "Slow cooked “organic” lamb and free range chicken meals, as well as freshly baked bread, are available by prior arrangement. ";

const text2 =
  "There is a scenic 4x4 service road to top of a mountain towards the westernmost part of the farm. It is not open to 4x4 enthusiasts because road maintenance is too time consuming. But if arranged in advance, I can take a party on an open Land Cruiser for a picnic at the summit (this is a day trip)";

const text3 = "The Verblijfhuis is a retreat and not an overnight stay. The 50 km trip takes at least 1.5 hours to complete when the road is in good condition. So, stay a few days.";

export default function Services() {
  return (
    <IonPage>
      <IonContent fullscreen={true}>
        <HeaderComponent />
        <br />
        <br />
        <IonToolbar style={{ "--background": "transparent", "--ion-color-base": "transparent !important", paddingLeft: "10%", paddingRight: "10%" }}>
          <IonGrid>
            <IonRow>
              <IonCol className='AboutImg' />

              <IonCol>
                <IonCard color='none'>
                  <IonCardHeader>
                    <IonCardTitle>
                      <IonLabel color='primary' class='ion-text-wrap' style={{ fontSize: "28px" }}>
                        Services available
                      </IonLabel>
                    </IonCardTitle>
                  </IonCardHeader>

                  <IonCardContent style={{ fontSize: "18px" }}>
                    <IonIcon size='large' color='primary' icon={bonfireOutline} />
                    <IonLabel class="class='ion-text-wrap">{text1}</IonLabel>
                    <br /> <br />
                    <IonIcon size='large' color='primary' icon={carOutline} />
                    <IonLabel class="class='ion-text-wrap">{text2}</IonLabel>
                    <br /> <br />
                    <IonIcon size='large' color='primary' icon={bedOutline} />
                    <IonLabel class="class='ion-text-wrap">{text3}</IonLabel>
                  </IonCardContent>
                </IonCard>
              </IonCol>
            </IonRow>
          </IonGrid>
        </IonToolbar>
        <FooterComponent />
      </IonContent>
    </IonPage>
  );
}

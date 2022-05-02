import { useRef, useState } from "react";
import { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCol, IonContent, IonGrid, IonIcon, IonItem, IonLabel, IonPage, IonRow, IonText } from "@ionic/react";
import HeaderComponent from "../../components/headersFooters/HeaderComponent";
import FooterComponent from "../../components/headersFooters/FooterComponent";
import { leafOutline } from "ionicons/icons";
import RewievForm from "../../components/reuables/RewievForm";

import ROOM1 from "../../assets/images/actual/Room1.jpg";
import ROOM3 from "../../assets/images/actual/Room3.jpg";
import ROOM4 from "../../assets/images/actual/Room4.jpg";
import ROOM5 from "../../assets/images/actual/Room5.jpg";
import ROOM6 from "../../assets/images/actual/Room6.jpg";
import ROOM7 from "../../assets/images/actual/Room7.jpg";
import ROOM8 from "../../assets/images/actual/Room8.jpg";
import ROOM9 from "../../assets/images/actual/Room9.jpg";
import ROOM10 from "../../assets/images/actual/Room10.jpg";

const Text =
  "The main bedroom has a double bed and a small lounge, and the second bedroom two single beds. The kitchen, with gas stove, cooking utensils and fridge, is open plan with the lounge. The bathroom has a walk-in shower (water is heated by a solar geyser), wash basin and toilet. Solar power provides electricity. Wifi and TV are not available although wifi can be accessed at our house, a three minute walk from the Verblijfhuis.";

const textForDetails1 = ["Self catering", "Organic meat available for purchase"];
const textForDetails2 = ["Open plan", "Breath taking views"];
const textForDetails3 = ["Romantic", "Senic"];
const textForDetails4 = ["4x4 adventure trail", "hiking"];

const RoomsImages = [ROOM1, ROOM1, ROOM3, ROOM4, ROOM5, ROOM6, ROOM7, ROOM1, ROOM8, ROOM9, ROOM10];

export default function Rooms() {
  const introRef = useRef(null);
  const aboutRef = useRef(null);
  const reviewRef = useRef(null);
  const [currNum, setcurrNum] = useState<number>(0);
  const [Image, setImage] = useState<string>(RoomsImages[0]);
  const [showReview, setShowReview] = useState<boolean>(false);

  setTimeout(() => {
    goFwd();
  }, 24000);

  const executeScroll = (ref: any) => {
    if (ref && ref.current) {
      ref.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  function subReview(review: any) {
    console.log("ENDS", review);
  }

  function goFwd() {
    if (currNum > 0 && currNum < 10) {
      setcurrNum(currNum + 1);
      setImage(RoomsImages[currNum + 1]);
    } else if (currNum === 0) {
      setcurrNum(1);
      setImage(RoomsImages[1]);
    } else if (currNum === 10) {
      setcurrNum(0);
      setImage(RoomsImages[0]);
    }
    // console.log("??????", currNum);
  }

  function DetailsBig() {
    return (
      <IonRow ref={introRef} className='ion-align-self-center'>
        <IonCard style={{ width: "675px" }}>
          <IonCardHeader>
            <IonCardTitle style={{ fontSize: "28px", textAlign: "center" }}>
              <IonText color='primary'>Verblijfhuis</IonText>
            </IonCardTitle>
            <IonCardSubtitle style={{ fontSize: "28px", textAlign: "center" }}>
              <IonText color='secondary'>Price</IonText>
            </IonCardSubtitle>
          </IonCardHeader>
          <IonCardContent>
            <IonItem lines='full'>
              {textForDetails1.map((entry) => {
                return (
                  <>
                    <IonIcon color='primary' icon={leafOutline} />
                    <IonLabel class="class='ion-text-wrap">{entry}</IonLabel>
                  </>
                );
              })}
            </IonItem>

            <IonItem lines='full'>
              {textForDetails2.map((entry) => {
                return (
                  <>
                    <IonIcon color='primary' icon={leafOutline} />
                    <IonLabel class="class='ion-text-wrap">{entry}</IonLabel>
                  </>
                );
              })}
            </IonItem>

            <IonItem lines='full'>
              {textForDetails3.map((entry) => {
                return (
                  <>
                    <IonIcon color='primary' icon={leafOutline} />
                    <IonLabel class="class='ion-text-wrap">{entry}</IonLabel>
                  </>
                );
              })}
            </IonItem>

            <IonItem lines='full'>
              {textForDetails4.map((entry) => {
                return (
                  <>
                    <IonIcon color='primary' icon={leafOutline} />
                    <IonLabel class="class='ion-text-wrap">{entry}</IonLabel>
                  </>
                );
              })}
            </IonItem>
          </IonCardContent>
        </IonCard>
      </IonRow>
    );
  }

  function DetailsSmall() {
    return (
      <IonRow ref={introRef} className='ion-align-self-center'>
        <IonCard>
          <IonCardHeader>
            <IonCardTitle style={{ fontSize: "28px", textAlign: "center" }}>
              <IonText color='primary'>Verblijfhuis</IonText>
            </IonCardTitle>
            <IonCardSubtitle style={{ fontSize: "20px", textAlign: "center" }}>
              <IonText color='secondary'>Price</IonText>
            </IonCardSubtitle>
          </IonCardHeader>
          <IonCardContent>
            {[...textForDetails1, ...textForDetails2, ...textForDetails3, ...textForDetails4].map((entry) => {
              return (
                <IonItem lines='full'>
                  <IonIcon color='primary' icon={leafOutline} />
                  <IonLabel class="class='ion-text-wrap">{entry}</IonLabel>
                </IonItem>
              );
            })}
          </IonCardContent>
        </IonCard>
      </IonRow>
    );
  }

  return (
    <IonPage>
      <IonContent fullscreen={true}>
        <HeaderComponent />
        <IonGrid>
          <IonRow className='ion-align-self-center'>
            {/* OVER VIEW  */}
            <IonCol>
              <IonCard className='RoomsImg' style={{ backgroundImage: `url(${Image})` }} button onClick={() => goFwd()} />

              <IonItem className='facy' lines='full' button onClick={() => executeScroll(introRef)}>
                <IonLabel>Intro</IonLabel>
              </IonItem>

              <IonItem className='facy' lines='full' button onClick={() => executeScroll(aboutRef)}>
                <IonLabel>About</IonLabel>
              </IonItem>

              <IonItem
                className='facy'
                lines='full'
                button
                onClick={() => {
                  setShowReview(true);
                  executeScroll(reviewRef);
                }}>
                <IonLabel>Review</IonLabel>
              </IonItem>
            </IonCol>

            <IonCol className='ion-align-self-center'>
              {/* DETAILS */}

              {window.innerWidth > 500 ? DetailsBig() : DetailsSmall()}

              <br />
              <br />
              <br />
              <br />

              {/* ABOUT */}
              <IonRow ref={aboutRef} className='ion-align-self-center'>
                <IonCard color='none'>
                  <IonCardHeader>
                    <IonCardTitle style={{ fontSize: "28px", textAlign: "center" }}>
                      <IonText color='primary'>About</IonText>
                    </IonCardTitle>
                  </IonCardHeader>
                  <IonCardContent>
                    <IonLabel class="class='ion-text-wrap">{Text}</IonLabel>
                  </IonCardContent>
                </IonCard>
              </IonRow>

              <br />
              <br />
              <br />
              <br />

              {/* REVIEW */}
              <IonRow ref={reviewRef}>
                {showReview && (
                  <IonCol>
                    <RewievForm callback={(review: any) => subReview(review)} />
                  </IonCol>
                )}
              </IonRow>
            </IonCol>
          </IonRow>
        </IonGrid>
        <FooterComponent />
      </IonContent>
    </IonPage>
  );
}

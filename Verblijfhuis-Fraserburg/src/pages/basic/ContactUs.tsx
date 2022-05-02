import { IonCol, IonContent, IonGrid, IonItem, IonLabel, IonPage, IonRow } from "@ionic/react";
import { COMPANY_DETAILS, ContactEmail, ReviewEmail } from "../../models/User_models";
import HeaderComponent from "../../components/headersFooters/HeaderComponent";
import FooterComponent from "../../components/headersFooters/FooterComponent";
import LOGO from "../../assets/images/logos/LOGO.png";
import ContactForm from "../../components/reuables/ContactForm";
import GoogleMapDisp from "../../components/googleMaps/GoogleMapDisp";
import RewievForm from "../../components/reuables/RewievForm";
import { SendContactEmail, SendReviewEmail } from "../../services/firebase/FirebaseFunctionCalls";
import { SaveReviewsToDB } from "../../services/firebase/FirebaseFireStoreCRUD";

export default function ContactUs() {
  function submit(newEmail: ContactEmail) {
    console.log("??? Sent ", newEmail);

    SendContactEmail(newEmail)
      .then((res) => {
        console.log("??? Sent ", res);
        window.alert("Your message has been sent ");
      })
      .catch((err) => {
        console.log("??? error ", err);
        window.alert("Your message could not be sent please try again");
      });
  }

  function submitReview(newReview: ReviewEmail) {
    console.log("??? Sent ", newReview);

    SendReviewEmail(newReview)
      .then((res) => {
        console.log("??? Sent ", res);
        window.alert("Your review has been sent ");
      })
      .catch((err) => {
        console.log("??? error ", err);
        window.alert("Your review could not be sent please try again");
      });

    SaveReviewsToDB(newReview);
  }

  return (
    <IonPage>
      <IonContent fullscreen={true}>
        {/* title={"Contact Us"} showBanner={true}  */}
        <HeaderComponent />
        <IonGrid>
          <IonRow className='ion-align-self-center'>
            {/* DETAILS */}
            <IonCol className='ion-align-self-center'>
              <IonItem color='none' lines='none'>
                {/* <IonLabel style={{ fontSize: "18px", "--color": "var(--ion-color-medium)" }} class='ion-text-wrap'>
                  Our Location
                </IonLabel> */}
                <img src={LOGO} alt='broken' style={{ maxHeight: "200px", maxWidth: "200px", minHeight: "100px", minWidth: "100px" }} />
              </IonItem>
              <IonItem lines='none'>
                <IonLabel style={{ fontSize: "28px", "--color": "var(--ion-color-medium)" }} class='ion-text-wrap'>
                  Verblyfhuis-Fraserburg
                </IonLabel>
              </IonItem>
              <IonItem color='none' lines='none'>
                <IonLabel style={{ fontSize: "16px", "--color": "var(--ion-color-medium)" }} class='ion-text-wrap'>
                  Fraserburg
                </IonLabel>
              </IonItem>

              <IonItem lines='none'>
                <IonLabel style={{ fontSize: "25px", "--color": "var(--ion-color-primary)" }} class='ion-text-wrap'>
                  Phone
                </IonLabel>
              </IonItem>
              <IonItem color='none' lines='none'>
                <IonLabel style={{ fontSize: "18px", "--color": "var(--ion-color-medium)" }} class='ion-text-wrap'>
                  TEL : {COMPANY_DETAILS.tel}
                </IonLabel>
              </IonItem>
              <IonItem color='none' lines='none'>
                <IonLabel style={{ fontSize: "18px", "--color": "var(--ion-color-medium)" }} class='ion-text-wrap'>
                  TEL : {COMPANY_DETAILS.cel}
                </IonLabel>
              </IonItem>

              <IonItem lines='none'>
                <IonLabel color='primary' style={{ fontSize: "25px", "--color": "var(--ion-color-primary)" }} class='ion-text-wrap'>
                  Email
                </IonLabel>
              </IonItem>
              <IonItem color='none' lines='none'>
                <IonLabel style={{ fontSize: "18px", "--color": "var(--ion-color-medium)" }} class='ion-text-wrap'>
                  {COMPANY_DETAILS.bookemail}
                </IonLabel>
              </IonItem>
            </IonCol>

            {/* FORM  Contact*/}
            <IonCol className='ion-align-self-center'>
              <ContactForm callback={(mail: ContactEmail) => submit(mail)} />
            </IonCol>

            {/* FORM  Review*/}
            <IonCol className='ion-align-self-center'>
              <RewievForm callback={(review: ReviewEmail) => submitReview(review)} />
            </IonCol>
          </IonRow>

          {/* MAP  */}
          <GoogleMapDisp />
          <br />
          <br />
        </IonGrid>
        <FooterComponent />
      </IonContent>
    </IonPage>
  );
}

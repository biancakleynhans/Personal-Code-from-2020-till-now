import React, { useState } from "react";
import { IonButton, IonCard, IonCardContent, IonCol, IonContent, IonGrid, IonIcon, IonInput, IonItem, IonLabel, IonPage, IonRow, IonTextarea } from "@ionic/react";
import { callOutline, locationOutline, mailOpenOutline, timeOutline } from "ionicons/icons";
import { useHistory } from "react-router";
import { AllRoutePaths } from "../../routes/Allroutes";
import HeaderComponent from "../../components/headersFooters/HeaderComponent";
import { SendContactEmail } from "../../firebase/FirebaseFunctionCalls";
import { ContactEmail } from "../../models/User_models";
import FooterComponent from "../../components/headersFooters/FooterComponent";

export default function ContactUs() {
  const history = useHistory();
  const [email, setemail] = useState<string>("");
  const [name, setname] = useState<string>("");
  const [cell, setcell] = useState<string>("");
  const [msg, setmsg] = useState<string>("");

  function submit() {
    const newEmail: ContactEmail = {
      cell: cell,
      email: email,
      msg: msg,
      name: name
    };

    SendContactEmail(newEmail)
      .then((res) => {
        console.log("res", res);
        window.alert("Contact us request sucessfully sent.");
        history.push(AllRoutePaths.HOME);
      })
      .catch((err) => {
        console.log("ERROR", err);
        window.alert("Contact us request could not be sent please try again.");
      });
  }

  return (
    <IonPage>
      <IonContent>
        <HeaderComponent title={"Contact Us"} showBanner={true} />
        <IonGrid>
          <IonRow>
            <IonCol>
              <IonCard
                style={{
                  "--background": "rgba(35,11,79,0.05)"
                }}>
                <IonCardContent>
                  <IonItem lines='none'>
                    <IonLabel style={{ fontSize: "20px", padding: "15px" }} position='stacked'>
                      Name *
                    </IonLabel>
                    <IonInput required style={{ "--background": "rgba(35,11,79,0.3)", "--color": "black" }} value={name} onIonChange={(e) => setname(e.detail.value!)}></IonInput>
                  </IonItem>

                  <IonItem lines='none'>
                    <IonLabel style={{ fontSize: "20px", padding: "15px" }} position='stacked'>
                      Email *
                    </IonLabel>
                    <IonInput required style={{ "--background": "rgba(35,11,79,0.3)", "--color": "black" }} value={email} onIonChange={(e) => setemail(e.detail.value!)}></IonInput>
                  </IonItem>

                  <IonItem lines='none'>
                    <IonLabel style={{ fontSize: "20px", padding: "15px" }} position='stacked'>
                      Phone Number *
                    </IonLabel>
                    <IonInput required style={{ "--background": "rgba(35,11,79,0.3)", "--color": "black" }} value={cell} onIonChange={(e) => setcell(e.detail.value!)}></IonInput>
                  </IonItem>

                  <IonItem lines='none'>
                    <IonLabel style={{ fontSize: "20px", padding: "15px" }} position='stacked'>
                      Message *
                    </IonLabel>
                    <IonTextarea
                      style={{ "--background": "rgba(35,11,79,0.3)", "--color": "black" }}
                      required
                      rows={5}
                      autoGrow
                      maxlength={1000}
                      value={msg}
                      onIonChange={(e) => setmsg(e.detail.value!)}></IonTextarea>
                  </IonItem>
                  <IonButton onClick={() => submit()}>Send</IonButton>
                </IonCardContent>
              </IonCard>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <IonItem lines='none'>
                <IonIcon color='primary' slot='start' icon={callOutline} />
                <IonLabel class='ion-text-wrap'>+27 62 460 5017</IonLabel>
                <IonLabel class='ion-text-wrap'>+27 67 039 8940</IonLabel>
              </IonItem>
              <IonItem lines='none'>
                <IonIcon color='primary' slot='start' icon={mailOpenOutline} />
                <IonLabel class='ion-text-wrap'>webfusiononline265@gmail.com</IonLabel>
                <IonLabel class='ion-text-wrap'>coffeecodersa@gmail.com</IonLabel>
              </IonItem>
              <IonItem lines='none'>
                <IonIcon color='primary' slot='start' icon={timeOutline} />
                <IonLabel class='ion-text-wrap'>Mon - Fri 08:00 - 18:00</IonLabel>
                <IonLabel class='ion-text-wrap'>Mon - Fri 08:00 - 18:00</IonLabel>
              </IonItem>
              <IonItem lines='none'>
                <IonIcon color='primary' slot='start' icon={locationOutline} />
                <IonLabel class='ion-text-wrap'>George WC</IonLabel>
                <IonLabel class='ion-text-wrap'>Gonubie EC</IonLabel>
              </IonItem>
            </IonCol>
          </IonRow>
        </IonGrid>
        <FooterComponent />
      </IonContent>
    </IonPage>
  );
}

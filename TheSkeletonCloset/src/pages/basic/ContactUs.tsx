import { useState } from "react";
import { IonButton, IonCard, IonCardContent, IonCol, IonContent, IonGrid, IonIcon, IonInput, IonItem, IonLabel, IonPage, IonRow, IonTextarea } from "@ionic/react";
import { callOutline, locationOutline, logoWhatsapp, mailOpenOutline, timeOutline } from "ionicons/icons";
import { useHistory } from "react-router";
import { AllRoutesObj } from "../../routes/AllRoutes";
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
        history.push(AllRoutesObj.menu.home.path);
      })
      .catch((err) => {
        console.log("ERROR", err);
        window.alert("Contact us request could not be sent please try again.");
      });
  }

  return (
    <IonPage>
      <IonContent>
        <HeaderComponent title={"Contact Us"} />
        <IonGrid>
          <IonRow>
            <IonCol></IonCol>
            <IonCol>
              <IonCard>
                <IonCardContent>
                  <IonItem lines='none'>
                    <IonLabel style={{ fontSize: "20px", padding: "15px" }} position='stacked'>
                      Name *
                    </IonLabel>
                    <IonInput required value={name} onIonChange={(e) => setname(e.detail.value!)}></IonInput>
                  </IonItem>

                  <IonItem lines='none'>
                    <IonLabel style={{ fontSize: "20px", padding: "15px" }} position='stacked'>
                      Email *
                    </IonLabel>
                    <IonInput required value={email} onIonChange={(e) => setemail(e.detail.value!)}></IonInput>
                  </IonItem>

                  <IonItem lines='none'>
                    <IonLabel style={{ fontSize: "20px", padding: "15px" }} position='stacked'>
                      Phone Number *
                    </IonLabel>
                    <IonInput required value={cell} onIonChange={(e) => setcell(e.detail.value!)}></IonInput>
                  </IonItem>

                  <IonItem lines='none'>
                    <IonLabel style={{ fontSize: "20px", padding: "15px" }} position='stacked'>
                      Message *
                    </IonLabel>
                    <IonTextarea required rows={5} autoGrow maxlength={1000} value={msg} onIonChange={(e) => setmsg(e.detail.value!)}></IonTextarea>
                  </IonItem>
                  <IonButton onClick={() => submit()}>Send</IonButton>
                </IonCardContent>
              </IonCard>
            </IonCol>
            <IonCol></IonCol>
          </IonRow>
          <IonRow>
            <IonCol></IonCol>
            <IonCol>
              <IonItem lines='none'>
                <IonIcon color='primary' slot='start' icon={callOutline} />
                <IonLabel class='ion-text-wrap'>+27 00 000 0000 </IonLabel>
              </IonItem>
              <IonItem lines='none'>
                <IonIcon color='primary' slot='start' icon={mailOpenOutline} />
                <IonLabel class='ion-text-wrap'>email</IonLabel>
              </IonItem>
              <IonItem lines='none'>
                <IonIcon color='primary' slot='start' icon={timeOutline} />
                <IonLabel class='ion-text-wrap'>Mon - Fri 08:00 - 18:00</IonLabel>
              </IonItem>
              <IonItem lines='none'>
                <IonIcon color='primary' slot='start' icon={locationOutline} />
                <IonLabel class='ion-text-wrap'>Location</IonLabel>
              </IonItem>
            </IonCol>
            <IonCol></IonCol>
          </IonRow>
        </IonGrid>
        <FooterComponent />
      </IonContent>
    </IonPage>
  );
}

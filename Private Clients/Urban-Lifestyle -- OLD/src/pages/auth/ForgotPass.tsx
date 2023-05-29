import { useState } from "react";
import { IonContent, IonInput, IonItem, IonLabel, IonList, IonPage, IonButton, IonLoading, IonListHeader } from "@ionic/react";
import { ForgotPassword } from "../../firebase/FirebaseAuth";
import PageHeader from "../../components/headersFooters/PageHeader";
import { RoutesObj } from "../../routes/Routes";

export default function ForgotPass() {
  const [email, setEmail] = useState<string>("");
  const [isSubmitting, setisSubmitting] = useState<boolean>(false);
  const [toastMsg, setToastMsg] = useState<string>("Connecting to server please wait...");

  function submit() {
    ForgotPassword(email)
      .then((res) => {
        console.log("RES Suscess", res);
        setToastMsg("Email sent Sucesesfully, please check your");
      })
      .catch((err) => {
        console.log("ERROR", err.message);
        setToastMsg(err.message);
      })
      .finally(() => {
        setisSubmitting(false);
      });
  }

  return (
    <IonPage>
      <IonContent fullscreen>
        <PageHeader header={"Forgot Password"} />

        <IonList>
          <IonListHeader>We'll send you an email to reset your password.</IonListHeader>

          {/* Email */}
          <IonItem lines='none'>
            <IonLabel style={{ fontSize: "22.5px", padding: "12.5px" }} position='stacked'>
              Email *
            </IonLabel>
            <IonInput required value={email} onIonChange={(e) => setEmail(e.detail.value!)} />
          </IonItem>

          {/* Submit Button */}
          <IonButton disabled={email.length < 5} color='primary' onClick={() => submit()}>
            Submit
          </IonButton>

          <IonItem lines='none'>
            <IonLabel style={{ fontSize: "25px", textAlign: "center", marging: "auto" }}>OR</IonLabel>
          </IonItem>

          <IonButton routerLink={RoutesObj.auth.signUp.path} color='tertiary'>
            {RoutesObj.auth.signUp.name}
          </IonButton>

          <IonButton routerLink={RoutesObj.auth.signIn.path} color='tertiary'>
            {RoutesObj.auth.signIn.name}
          </IonButton>
        </IonList>

        <IonLoading
          // cssClass='my-custom-class'
          backdropDismiss={false}
          showBackdrop={true}
          animated={true}
          spinner='bubbles'
          isOpen={isSubmitting}
          onDidDismiss={() => setisSubmitting(false)}
          message={toastMsg}
          duration={25000}
        />
      </IonContent>
    </IonPage>
  );
}

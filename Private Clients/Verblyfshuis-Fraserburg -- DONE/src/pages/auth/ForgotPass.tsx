import { useState } from "react";
import { IonContent, IonInput, IonItem, IonLabel, IonList, IonPage, IonButton, IonLoading, IonListHeader } from "@ionic/react";
import { AllRoutePaths } from "../../routes/Allroutes";
import HeaderComponent from "../../components/headersFooters/HeaderComponent";
import { useAuth } from "../../services/firebase/FirebaseAuthContext";

export default function ForgotPass() {
  const { forgotPassword } = useAuth();
  const [email, setEmail] = useState<string>("");
  const [isSubmitting, setisSubmitting] = useState<boolean>(false);
  const [toastMsg, setToastMsg] = useState<string>("Connecting to server please wait...");

  function submit() {
    forgotPassword(email)
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
      <IonContent fullscreen={true}>
        {/* title={"Forgot"} showBanner={false} */}
        <HeaderComponent />

        <IonList>
          <IonListHeader>We'll send you an email to reset your password.</IonListHeader>

          {/* Email */}
          <IonItem lines='none'>
            <IonLabel style={{ fontSize: "22.5px", padding: "12.5px" }} position='stacked'>
              Email *
            </IonLabel>
            <IonInput required style={{ "--background": "rgba(164,209,202,0.3)", "--color": "black" }} value={email} onIonChange={(e) => setEmail(e.detail.value!)} />
          </IonItem>

          {/* Submit Button */}
          <IonButton disabled={email.length < 5} color='primary' onClick={() => submit()}>
            Submit
          </IonButton>

          <IonItem lines='none'>
            <IonLabel style={{ fontSize: "25px", textAlign: "center", marging: "auto" }}>OR</IonLabel>
          </IonItem>

          <IonButton routerLink={AllRoutePaths.SIGN_UP} color='tertiary'>
            REGISTER
          </IonButton>

          <IonButton routerLink={AllRoutePaths.SIGN_IN} color='tertiary'>
            LOG IN
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

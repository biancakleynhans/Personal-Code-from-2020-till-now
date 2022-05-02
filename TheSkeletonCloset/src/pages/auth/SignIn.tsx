import React, { useState } from "react";
import { useHistory, useLocation } from "react-router";
import { IonContent, IonInput, IonItem, IonLabel, IonList, IonPage, IonButton, IonLoading, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonIcon } from "@ionic/react";
import { logoGoogle } from "ionicons/icons";
import HeaderComponent from "../../components/headersFooters/HeaderComponent";
import { useAuth } from "../../firebase/FirebaseAuthContext";
import { AllRoutesObj, LocationState } from "../../routes/AllRoutes";
import FooterComponent from "../../components/headersFooters/FooterComponent";

export default function SignIn() {
  const history = useHistory();
  const location = useLocation<LocationState>();
  const { login, signInWithGoogle, createNewUser } = useAuth();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isSubmitting, setisSubmitting] = useState<boolean>(false);
  const [toastMsg, setToastMsg] = useState<string>("Connecting to server please wait...");

  function disableSubmit() {
    if (email.length < 8 || password.length < 4) {
      return true;
    } else {
      return false;
    }
  }

  function submit() {
    console.log("STATE", email, password, isSubmitting);
    setisSubmitting(!isSubmitting);
    login(email, password)
      .then((res) => {
        console.log("RES Suscess", res);
        history.push(location.state?.from ?? AllRoutesObj.menu.home.path);
      })
      .catch((err) => {
        console.log("ERROR", err.message);
        setToastMsg(err.message);
      })
      .finally(() => {
        setisSubmitting(false);
      });
  }

  function Li_G() {
    signInWithGoogle()
      .then((res) => {
        console.log("RES Suscess", res);
        createNewUser(res.user.uid, res.user, { fn: "", ln: "", phone: "", email: email });
        history.push(location.state?.from ?? AllRoutesObj.menu.home.path);
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
      <IonContent>
        <HeaderComponent title={"Sign in"} />

        <IonList>
          {/* Email */}
          <IonItem lines='none'>
            <IonLabel style={{ fontSize: "22.5px", padding: "11.5px" }} position='stacked'>
              Email *
            </IonLabel>
            <IonInput required value={email} onIonChange={(e) => setEmail(e.detail.value!)} />
          </IonItem>

          {/* Password */}
          <IonItem lines='none'>
            <IonLabel style={{ fontSize: "22.5px", padding: "11.5px" }} position='stacked'>
              Password *
            </IonLabel>
            <IonInput required value={password} onIonChange={(e) => setPassword(e.detail.value!)} />
          </IonItem>

          <br />

          {/* Submit Button */}
          <IonButton color='primary' disabled={disableSubmit()} onClick={() => submit()}>
            Sign in
          </IonButton>

          {/* Forgot Password  */}
          <IonButton color='tertiary' routerLink={AllRoutesObj.auth.forgotPass.path}>
            Forgot Password
          </IonButton>

          <br />
          <br />

          {/* Sign in with Google */}
          <IonButton fill='outline' onClick={() => Li_G()}>
            <IonIcon slot='start' icon={logoGoogle} />
            Sign in with Google
          </IonButton>

          <br />
          <br />
          <br />

          {/*Dont have an acc??  */}
          <IonCard>
            <IonCardHeader>
              <IonCardTitle>New Client</IonCardTitle>
            </IonCardHeader>
            <IonCardContent>Sign up for an account to take advantage of order tracking and history as well as pre-filled forms during checkout on subsequent orders.</IonCardContent>
            <IonButton routerLink={AllRoutesObj.auth.signUp.path}>SIGN UP</IonButton>
          </IonCard>
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
        <FooterComponent />
      </IonContent>
    </IonPage>
  );
}

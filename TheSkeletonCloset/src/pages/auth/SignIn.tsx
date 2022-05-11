import { useEffect, useState } from "react";
import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonContent,
  IonHeader,
  IonIcon,
  IonInput,
  IonItem,
  IonLabel,
  IonLoading,
  IonPage,
  IonTitle,
  IonToolbar
} from "@ionic/react";
import { logoGoogle } from "ionicons/icons";
import { iData, iError } from "../../models/Forms";
import { LoginEmailPassAction, LoginWithGoogleAction } from "../../firebase/FirebaseAuth";
import { RoutesObj } from "../../routes/Routes";
import { validateSignUpData } from "../../utils/Validators";
import Error from "../../components/reusable/Error";

export default function SignInPage() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isSubmitting, setisSubmitting] = useState<boolean>(false);
  const [errs, seterrs] = useState<iError>({ email: "", password: "", cell: "" } as iError);

  function Li_G() {
    LoginWithGoogleAction();
  }

  useEffect(() => {
    let data: iData = { email, password } as iData;
    const { valid, errors } = validateSignUpData(data);

    if (!valid) {
      console.log("we have errors", errors, errs);

      if (errors.email !== errs.email) {
        seterrs({ ...errs, email: errors.email });
      }
      if (errors.password !== errs.password) {
        seterrs({ ...errs, password: errors.password });
      }
    }
  }, [email, password]);

  function handleSubmit(e: any) {
    e.preventDefault();
    setisSubmitting(true);
    console.log("submit", email, password);
    LoginEmailPassAction(email, password);
  }

  function disableSubmit() {
    if (email.length < 8 || password.length < 7) {
      return true;
    } else {
      return false;
    }
  }

  return (
    <IonPage>
      <IonContent fullscreen>
        <IonHeader className='ion-no-border'>
          <IonToolbar>
            <IonTitle style={{ fontSize: "25px", textAlign: "center" }}>Sign in</IonTitle>
          </IonToolbar>
        </IonHeader>

        <IonCard>
          {/* Email */}
          {errs.email && <Error error={errs.email} />}
          <IonItem lines='none'>
            <IonLabel class='ion-text-wrap' style={{ fontSize: "18.5px" }} position='floating'>
              Email *
            </IonLabel>
            <IonInput required value={email} onIonChange={(e) => setEmail(e.detail.value!)} />
          </IonItem>

          {/* Password */}
          {errs.password && <Error error={errs.password} />}
          <IonItem lines='none'>
            <IonLabel class='ion-text-wrap' style={{ fontSize: "18.5px" }} position='floating'>
              Password *
            </IonLabel>
            <IonInput required value={password} onIonChange={(e) => setPassword(e.detail.value!)} />
          </IonItem>

          <br />

          {/* Submit Button */}
          <IonButton color='primary' disabled={disableSubmit()} onClick={(e) => handleSubmit(e)}>
            Sign in
          </IonButton>
        </IonCard>

        {/* Forgot Password  */}
        <IonButton color='tertiary' routerLink={RoutesObj.auth.forgot.path}>
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
          <IonButton routerLink={RoutesObj.auth.signUp.path}>SIGN UP</IonButton>
        </IonCard>

        <IonLoading
          // cssClass='my-custom-class'
          backdropDismiss={false}
          showBackdrop={true}
          animated={true}
          spinner='bubbles'
          isOpen={isSubmitting}
          onDidDismiss={() => setisSubmitting(false)}
          message={"Connecting to server please wait..."}
          duration={25000}
        />
      </IonContent>
    </IonPage>
  );
}

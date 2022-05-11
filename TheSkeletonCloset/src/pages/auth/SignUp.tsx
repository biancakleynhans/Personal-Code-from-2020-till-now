import { useEffect, useState } from "react";
import { IonButton, IonCard, IonCheckbox, IonContent, IonHeader, IonInput, IonItem, IonLabel, IonLoading, IonPage, IonTitle, IonToolbar } from "@ionic/react";
import { iData, iError } from "../../models/Forms";
import { RoutesObj } from "../../routes/Routes";
import { validateSignUpData } from "../../utils/Validators";
import { SignUpEmailPassAction } from "../../firebase/FirebaseAuth";
import Error from "../../components/reusable/Error";

export default function SignUpPage() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [fName, setfName] = useState<string>("");
  const [lName, setlName] = useState<string>("");
  const [cell, setcell] = useState<string>("");

  const [agreeBtn, setAgreeBtn] = useState<boolean>(false);
  const [isSubmitting, setisSubmitting] = useState<boolean>(false);
  const [errs, seterrs] = useState<iError>({ email: "", password: "", cell: "" } as iError);

  useEffect(() => {
    let data: iData = { email, password, cell, fn: fName, ln: lName } as iData;
    const { valid, errors } = validateSignUpData(data);

    if (!valid) {
      console.log("we have errors", errors, errs);

      if (errors.email !== errs.email) {
        seterrs({ ...errs, email: errors.email });
      }
      if (errors.password !== errs.password) {
        seterrs({ ...errs, password: errors.password });
      }
      if (errors.cell !== errs.cell) {
        seterrs({ ...errs, cell: errors.cell });
      }
      if (errors.fn !== errs.fn) {
        seterrs({ ...errs, fn: errors.fn });
      }
      if (errors.ln !== errs.ln) {
        seterrs({ ...errs, ln: errors.ln });
      }
    }
  }, [email, password, cell, fName, lName]);

  function handleSubmit(e: any) {
    e.preventDefault();
    setisSubmitting(true);
    console.log("submit", email, password, fName, lName, cell);
    SignUpEmailPassAction(email, password);
  }

  function disableSubmit() {
    if (email.length < 8 || password.length < 7 || !agreeBtn) {
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
            <IonTitle style={{ fontSize: "25px", textAlign: "center" }}>Sign Up</IonTitle>
          </IonToolbar>
        </IonHeader>

        <IonCard>
          {/* First name */}
          {errs.fn && <Error error={errs.fn} />}
          <IonItem lines='none'>
            <IonLabel class='ion-text-wrap' style={{ fontSize: "18px" }} position='floating'>
              First Name *
            </IonLabel>
            <IonInput required value={fName} onIonChange={(e) => setfName(e.detail.value!)}></IonInput>
          </IonItem>

          {/* Last name */}
          {errs.ln && <Error error={errs.ln} />}
          <IonItem lines='none'>
            <IonLabel class='ion-text-wrap' style={{ fontSize: "18px" }} position='floating'>
              Last Name *
            </IonLabel>
            <IonInput required value={lName} onIonChange={(e) => setlName(e.detail.value!)}></IonInput>
          </IonItem>

          {/* Phone number */}
          {errs.cell && <Error error={errs.cell} />}
          <IonItem lines='none'>
            <IonLabel class='ion-text-wrap' style={{ fontSize: "18px" }} position='floating'>
              Phone Number *
            </IonLabel>
            <IonInput required value={cell} onIonChange={(e) => setcell(e.detail.value!)}></IonInput>
          </IonItem>

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

          {/* T's and C's */}
          <IonItem lines='none'>
            <IonLabel class='ion-text-wrap'>
              I Agree to Webfusion Online's Privacy Policy & Terms of Service. Please review our{" "}
              <a href='http://' target='_blank' rel='noopener noreferrer'>
                Privacy Policy
              </a>{" "}
              and{" "}
              <a href='http://' target='_blank' rel='noopener noreferrer'>
                Terms of Service.
              </a>
            </IonLabel>
            <IonCheckbox slot='start' checked={agreeBtn} onIonChange={(e: any) => setAgreeBtn(!agreeBtn)} />
          </IonItem>

          {/* Submit Button */}
          <IonButton color='primary' disabled={disableSubmit()} onClick={(e) => handleSubmit(e)}>
            Sign Up
          </IonButton>

          <br />
          <br />
          {/* Forgot Password  */}
          <IonButton fill='clear' color='tertiary' routerLink={RoutesObj.auth.signIn.path}>
            Already have an account ? Sign in
          </IonButton>
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

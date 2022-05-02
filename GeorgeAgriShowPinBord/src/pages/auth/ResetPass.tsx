import React, { useState } from "react";
import { useLocation } from "react-router";
import { IonContent, IonInput, IonItem, IonLabel, IonList, IonPage, IonButton, IonLoading, IonListHeader } from "@ionic/react";
import HeaderComponent from "../../components/headersFooters/HeaderComponent";
import { useAuth } from "../../firebase/FirebaseContextAuth";

// A custom hook that builds on useLocation to parse the query string for you.
function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export default function ResetPassword() {
  const query = useQuery();
  const { resetPassword } = useAuth();
  const [password, setPassword] = useState<string>("");
  const [isSubmitting, setisSubmitting] = useState<boolean>(false);
  const [toastMsg, setToastMsg] = useState<string>("Connecting to server please wait...");

  function submit() {
    const oob: string | null = query.get("oobCode");
    const code: string = oob == null ? "" : oob;

    // console.log(query.get("mode"), query.get("oobCode"));

    setisSubmitting(true);
    resetPassword(code, password)
      .then((res) => {
        console.log("RES Suscess", res);
        setToastMsg("Email sent Sucesesfully, please check your email");
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
        {/* title={"Password reset"} showBanner={false} */}
        <HeaderComponent title='Password reset' />

        <IonList>
          <IonListHeader>Please provide a new password.</IonListHeader>

          {/* Email */}
          <IonItem lines='none'>
            <IonLabel style={{ fontSize: "22.5px", padding: "12.5px" }} position='stacked'>
              Password *
            </IonLabel>
            <IonInput required style={{ "--background": "rgba(164,209,202,0.3)", "--color": "black" }} value={password} onIonChange={(e) => setPassword(e.detail.value!)} />
          </IonItem>

          {/* Submit Button */}
          <IonButton disabled={password.length < 5} color='secondary' onClick={() => submit()}>
            Submit
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
          duration={35000}
        />
      </IonContent>
    </IonPage>
  );
}

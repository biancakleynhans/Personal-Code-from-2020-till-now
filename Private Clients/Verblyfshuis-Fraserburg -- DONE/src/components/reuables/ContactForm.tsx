import { useState } from "react";
import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonInput, IonItem, IonLabel, IonText, IonTextarea } from "@ionic/react";
import { ContactEmail } from "../../models/User_models";

export default function ContactForm(props: { callback: (email: ContactEmail) => void; isSmall?: boolean }) {
  const [email, setemail] = useState<string>("");
  const [name, setname] = useState<string>("");
  const [cell, setcell] = useState<string>("");
  const [msg, setmsg] = useState<string>("");
  const [sub, setsub] = useState<string>("");

  function submit() {
    const newEmail: ContactEmail = {
      cell: cell,
      email: email,
      msg: msg,
      name: name,
      sub: sub
    };

    props.callback(newEmail);
  }
  return (
    <IonCard className={props.isSmall ? "smallContact" : ""}>
      <IonCardHeader>
        <IonCardTitle style={{ fontSize: "28px", textAlign: "center" }}>
          <IonText color='primary'>Contact</IonText>
        </IonCardTitle>
        <IonCardSubtitle style={{ fontSize: "25px", textAlign: "center" }}>
          <IonText color='secondary'>Your email address will not be published. Required fields are marked *</IonText>
        </IonCardSubtitle>
      </IonCardHeader>

      <IonCardContent color='primary'>
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
            Subject *
          </IonLabel>
          <IonInput required value={sub} onIonChange={(e) => setsub(e.detail.value!)}></IonInput>
        </IonItem>

        <IonItem lines='none'>
          <IonLabel style={{ fontSize: "20px", padding: "15px" }} position='stacked'>
            Message *
          </IonLabel>
          <IonTextarea required rows={5} autoGrow maxlength={1000} value={msg} onIonChange={(e) => setmsg(e.detail.value!)}></IonTextarea>
        </IonItem>
        <br />
        <br />
        <IonButton onClick={() => submit()} expand='full' shape='round'>
          Send
        </IonButton>
      </IonCardContent>
    </IonCard>
  );
}

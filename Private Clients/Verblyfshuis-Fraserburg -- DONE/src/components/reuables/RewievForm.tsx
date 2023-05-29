import { useState } from "react";
import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonIcon, IonInput, IonItem, IonLabel, IonRange, IonText, IonTextarea } from "@ionic/react";
import { star, starHalfOutline } from "ionicons/icons";
import { ReviewEmail } from "../../models/User_models";

export default function RewievForm(props: { callback: (review: any) => void; isSmall?: boolean }) {
  const [email, setemail] = useState<string>("");
  const [name, setname] = useState<string>("");
  const [cell, setcell] = useState<string>("");
  const [msg, setmsg] = useState<string>("");
  const [rangeValue, setRangeValue] = useState<{
    lower: number;
    upper: number;
  }>({ lower: 0, upper: 0 });

  function submit() {
    const newReview: ReviewEmail = {
      cell: cell,
      email: email,
      msg: `comment :${msg}, stars: ${rangeValue} out of 5`,
      name: name,
      sub: "Review of Verblijfshuis"
    };

    props.callback(newReview);
  }
  return (
    <IonCard color='none' className={props.isSmall ? "smallContact" : ""}>
      <IonCardHeader>
        <IonCardTitle style={{ fontSize: "28px", textAlign: "center" }}>
          <IonText color='primary'>Your Review</IonText>
        </IonCardTitle>
        <IonCardSubtitle style={{ fontSize: "25px", textAlign: "center" }}>
          <IonText color='secondary'>Your email address will not be published. Required fields are marked *</IonText>
        </IonCardSubtitle>
      </IonCardHeader>

      <IonCardContent color='primary'>
        <IonItem lines='none'>
          <IonLabel style={{ fontSize: "20px", padding: "15px" }} position='stacked'>
            Comment *
          </IonLabel>
          <IonTextarea required rows={5} autoGrow maxlength={1000} value={msg} onIonChange={(e) => setmsg(e.detail.value!)}></IonTextarea>
        </IonItem>

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
            Website *
          </IonLabel>
          <IonInput required value={cell} onIonChange={(e) => setcell(e.detail.value!)}></IonInput>
        </IonItem>

        <IonItem>
          <IonLabel style={{ fontSize: "20px", padding: "15px" }} position='stacked'>
            Rate us by dragging the slider below: *
          </IonLabel>
          <IonRange min={1} max={5} step={1} pin snaps ticks onIonChange={(e) => setRangeValue(e.detail.value as any)}>
            <IonIcon size='small' slot='start' icon={starHalfOutline} />
            <IonIcon size='large' slot='end' icon={star} />
          </IonRange>
        </IonItem>

        <br />
        <br />
        <IonButton onClick={() => submit()} expand='full' shape='round'>
          Submit review
        </IonButton>
      </IonCardContent>
    </IonCard>
  );
}

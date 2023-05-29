import { IonButton, IonDatetime, IonIcon, IonInput, IonItem, IonLabel, IonPopover, IonSelect, IonSelectOption } from "@ionic/react";
import { calendar, calendarOutline } from "ionicons/icons";
import React, { useState } from "react";
import { iUpdateProfile } from "../../models/Basic";
import moment from "moment";

interface iProps {
  onSub: (update: iUpdateProfile) => void;
  default: iUpdateProfile;
}

export default function AddEditProfile(props: iProps) {
  const [name, setname] = useState(props.default.name);
  const [email, setemail] = useState(props.default.email);
  const [dob, setdob] = useState(moment(new Date()).format("DD-MM-YYYY"));
  const [cell, setcell] = useState(props.default.cell);
  const [id, setid] = useState(props.default.id);
  const [gender, setgender] = useState(props.default.gender);

  function doSub() {
    console.log(">>>", name, email, dob, cell, id, gender);
    let send: iUpdateProfile = {
      birthday: dob,
      cell,
      email,
      gender,
      id,
      name
    };

    props.onSub(send);
  }

  return (
    <>
      <IonItem lines='none'>
        <IonLabel position='stacked'>NAME *</IonLabel>
        <IonInput value={name} type='text' onIonChange={(e) => setname(e.detail.value!)} minlength={1} maxlength={150} required />
      </IonItem>

      <IonItem lines='none'>
        <IonLabel position='stacked'>EMAIL *</IonLabel>
        <IonInput disabled value={email} type='text' onIonChange={(e) => setemail(e.detail.value!)} minlength={1} maxlength={150} required />
      </IonItem>

      <IonItem lines='none'>
        <IonLabel position='stacked'>BIRTHDAY *</IonLabel>
        <IonButton fill='clear' id='open-dob'>
          <p style={{ fontSize: "18px" }}> {dob} </p>
          <IonIcon style={{ margin: "5px", fontSize: "18px" }} icon={calendarOutline} />
        </IonButton>

        <IonPopover trigger='open-dob' showBackdrop={false} backdropDismiss={true}>
          <IonDatetime presentation='date' onIonChange={(ev) => setdob(moment(ev.detail.value).format("DD-MM-YYYY"))} />
        </IonPopover>
      </IonItem>

      <IonItem lines='none'>
        <IonLabel position='stacked'>PHONE NUMBER *</IonLabel>
        <IonInput value={cell} type='text' onIonChange={(e) => setcell(e.detail.value!)} minlength={1} maxlength={150} required />
      </IonItem>

      <IonItem lines='none'>
        <IonLabel position='stacked'>ID *</IonLabel>
        <IonInput value={id} type='text' onIonChange={(e) => setid(e.detail.value!)} minlength={1} maxlength={150} required />
      </IonItem>

      <IonItem lines='none'>
        <IonLabel position='stacked'>GENDER *</IonLabel>
        <IonSelect value={gender} onIonChange={(e) => setgender(e.detail.value)}>
          <IonSelectOption value='Female'>Female</IonSelectOption>
          <IonSelectOption value='Gender-Fluid'>Gender-Fluid</IonSelectOption>
          <IonSelectOption value='Male'>Male</IonSelectOption>
          <IonSelectOption value='Other'>Other</IonSelectOption>
        </IonSelect>
      </IonItem>

      <IonButton fill='outline' onClick={() => doSub()}>
        Save
      </IonButton>
    </>
  );
}

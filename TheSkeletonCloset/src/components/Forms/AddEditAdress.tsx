import React, { useState } from "react";
import { IonButton, IonInput, IonItem, IonLabel, IonSelect, IonSelectOption } from "@ionic/react";
import { iAdress, ProvinceList } from "../../models/Basic";

interface iProps {
  default: iAdress;
  onSub: (update: iAdress) => void;
}

export default function AddEditAdress(props: iProps) {
  const [street, setstreet] = useState(props.default.street);
  const [number, setnumber] = useState(props.default.number);
  const [suburb, setsuburb] = useState(props.default.suburb);
  const [city, setcity] = useState(props.default.city);
  const [postalCode, setpostalCode] = useState(props.default.postalCode);
  const [province, setprovince] = useState(props.default.province);

  function doSub() {
    console.log(">>>", street, number, suburb, city, postalCode, province);
    let send: iAdress = {
      street,
      number,
      suburb,
      city,
      postalCode,
      province,
      country: "South Africa",
      isDefault: true
    };

    props.onSub(send);
  }

  let s = "Complex / Building Name / Unit Number";
  let p = "Province";
  return (
    <>
      <IonItem lines='none'>
        <IonLabel position='stacked'>STREET *</IonLabel>
        <IonInput value={street} type='text' onIonChange={(e) => setstreet(e.detail.value!)} minlength={1} maxlength={150} required />
      </IonItem>

      <IonItem lines='none'>
        <IonLabel position='stacked'>{s.toUpperCase()} *</IonLabel>
        <IonInput value={number} type='text' onIonChange={(e) => setnumber(e.detail.value!)} minlength={1} maxlength={150} required />
      </IonItem>

      <IonItem lines='none'>
        <IonLabel position='stacked'>SUBURB *</IonLabel>
        <IonInput value={suburb} type='text' onIonChange={(e) => setsuburb(e.detail.value!)} minlength={1} maxlength={150} required />
      </IonItem>

      <IonItem lines='none'>
        <IonLabel position='stacked'>CITY *</IonLabel>
        <IonInput value={city} type='text' onIonChange={(e) => setcity(e.detail.value!)} minlength={1} maxlength={150} required />
      </IonItem>

      <IonItem lines='none'>
        <IonLabel position='stacked'>POSTAL CODE *</IonLabel>
        <IonInput value={postalCode} type='text' onIonChange={(e) => setpostalCode(e.detail.value!)} minlength={1} maxlength={150} required />
      </IonItem>

      <IonItem lines='none'>
        <IonLabel position='stacked'>{p.toUpperCase()} *</IonLabel>
        <IonSelect value={province} onIonChange={(e) => setprovince(e.detail.value)}>
          {ProvinceList.map((prov, index) => (
            <IonSelectOption key={index} value={prov}>
              {prov}
            </IonSelectOption>
          ))}
        </IonSelect>
      </IonItem>

      <IonButton fill='outline' onClick={() => doSub()}>
        Save
      </IonButton>
    </>
  );
}

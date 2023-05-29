import { IonItem, IonLabel, IonThumbnail } from "@ionic/react";
import React from "react";
import { PLACEHOLDER } from "../../constants/AppBasedd";
import { iCart } from "../../models/Products";

export default function CartContent(props: { arr: iCart[] }) {
  return (
    <>
      {props.arr.map((item, index) => {
        let use = item.img && item.img.length > 0 ? item.img : PLACEHOLDER;
        return (
          <IonItem key={index}>
            <IonThumbnail style={{ marginRight: "15px" }}>
              <img src={use} style={{ height: "50px", width: "auto" }} />
            </IonThumbnail>
            <IonLabel class='ion-text-wrap'>{item.name}</IonLabel>
            <IonLabel class='ion-text-wrap'>{item.price}</IonLabel>
            <IonLabel class='ion-text-wrap'>{item.prodCount}</IonLabel>
          </IonItem>
        );
      })}
    </>
  );
}

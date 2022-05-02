import React from "react";
import { IonBackButton, IonButtons, IonHeader, IonTitle, IonToolbar } from "@ionic/react";
import NavButtons from "./NavButton";
import TopBarButtons from "./TopBarButtons";
import LOGO from "../../images/logoNew.png";
import LOGO2 from "../../images/logoPretty.png";
import PageHeaderComponent from "./PageHeaderComponent";

export default function HeaderComponent(props: { title: string; showBanner: boolean }) {
  return (
    <IonHeader>
      <IonToolbar
        style={{
          "--background": "rgba(35,11,79,0.3)"
        }}>
        <IonButtons slot='start'>
          <IonBackButton color='tertiary' defaultHref='/' />
        </IonButtons>
        <IonButtons slot='end'>
          <TopBarButtons />
        </IonButtons>
      </IonToolbar>

      {props.showBanner && (
        <IonToolbar
          style={{
            "--background": "rgba(35,11,79,0.20)"
          }}>
          <img style={{ width: "50%", display: "inline-block", maxHeight: "350px", maxWidth: "350px" }} src={LOGO} />
          <img style={{ width: "50%", display: "inline-block", maxHeight: "350px", maxWidth: "350px" }} src={LOGO2} />
          <IonButtons style={{ flexDirection: "column" }}>
            <NavButtons />
          </IonButtons>
        </IonToolbar>
      )}

      <PageHeaderComponent header={props.title} />
    </IonHeader>
  );
}

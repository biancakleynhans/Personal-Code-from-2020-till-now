import { IonHeader, IonToolbar } from "@ionic/react";
import NavButtons from "./NavButton";
import TopBarButtons from "./TopBarButtons";

import BAN1 from "../../assets/images/actual/Banner1.jpg";

// props: { title: string; showBanner: boolean }
export default function HeaderComponent() {
  return (
    <IonHeader translucent={true} className={"hero_header"} style={{ backgroundImage: `url(${BAN1})` }}>
      <IonToolbar style={{ "--background": "transparent", "--ion-color-base": "transparent !important", paddingLeft: "10%", paddingRight: "10%" }}>
        <TopBarButtons />
      </IonToolbar>

      <IonToolbar style={{ "--background": "transparent", "--ion-color-base": "transparent !important", paddingLeft: "10%", paddingRight: "10%", height: "250px" }}>
        <NavButtons />
      </IonToolbar>
    </IonHeader>
  );
}

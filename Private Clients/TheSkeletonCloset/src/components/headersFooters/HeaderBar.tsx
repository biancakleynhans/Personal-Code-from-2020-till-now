import { IonHeader, IonToolbar } from "@ionic/react";

import NavBar from "./NavBar";

export default function HeaderBar() {
  return (
    <IonHeader>
      <IonToolbar>
        <NavBar />
      </IonToolbar>
    </IonHeader>
  );
}

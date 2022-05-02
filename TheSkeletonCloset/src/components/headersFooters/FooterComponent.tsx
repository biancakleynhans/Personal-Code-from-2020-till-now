import React, { useEffect } from "react";
import { IonButton, IonButtons, IonFooter, IonIcon, IonLabel, IonToolbar } from "@ionic/react";
import { logoFacebook, logoInstagram, logoTiktok, logoWhatsapp } from "ionicons/icons";

export default function FooterComponent() {
  const [mQuery, setMQuery] = React.useState<any>({
    matches: window.innerWidth > 768 ? true : false
  });

  useEffect(() => {
    let mediaQuery = window.matchMedia("(min-width: 768px)");
    mediaQuery.addListener(setMQuery);
    return () => mediaQuery.removeListener(setMQuery);
  }, []);

  return (
    <>
      {mQuery && !mQuery.matches ? (
        <IonFooter>
          <IonToolbar>
            <IonLabel>
              Site designed and developed by Coffee Coder <br /> © All Rights Reserved.
            </IonLabel>
          </IonToolbar>
        </IonFooter>
      ) : (
        <IonFooter>
          <IonToolbar>
            <IonLabel slot='start'>Site designed and developed by Coffee Coder © All Rights Reserved.</IonLabel>
            <IonButtons slot='end'>
              <IonButton onClick={() => window.open("https://www.facebook.com/TheSkeletonClosetZA/", "_blank")} color='dark' fill='clear'>
                <IonIcon color='light' slot='icon-only' icon={logoFacebook} />
              </IonButton>
              <IonButton onClick={() => window.open("https://wa.me/message/5UPBQDEJXTD5C1", "_blank")} color='dark' fill='clear'>
                <IonIcon color='light' slot='icon-only' icon={logoWhatsapp} />
              </IonButton>
              <IonButton onClick={() => window.open("https://vm.tiktok.com/ZMLmV6ePA/", "_blank")} color='dark' fill='clear'>
                <IonIcon color='light' slot='icon-only' icon={logoTiktok} />
              </IonButton>
              <IonButton onClick={() => window.open("https://www.instagram.com/the_skeleton_closet_za/", "_blank")} color='dark' fill='clear'>
                <IonIcon color='light' slot='icon-only' icon={logoInstagram} />
              </IonButton>
            </IonButtons>
          </IonToolbar>
        </IonFooter>
      )}
    </>
  );
}

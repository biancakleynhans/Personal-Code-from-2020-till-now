import React, { useEffect } from "react";
import { IonButton, IonCol, IonFooter, IonGrid, IonIcon, IonLabel, IonRow, IonToolbar } from "@ionic/react";
import { logoFacebook, logoInstagram, logoTiktok, logoWhatsapp } from "ionicons/icons";
import { AllRoutePaths } from "../../routes/Allroutes";

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
          <IonToolbar
            style={{
              "--background": "rgba(35,11,79,0.3)"
            }}>
            <IonLabel>
              WebfusionOnline © All Rights Reserved. <br /> Site design by Coffee Coder
            </IonLabel>
          </IonToolbar>
        </IonFooter>
      ) : (
        <IonFooter>
          <IonToolbar>
            <IonGrid>
              <IonRow>
                <IonCol>
                  <IonButton color='dark' fill='clear' href={AllRoutePaths.CONTACT}>
                    CONTACT US
                  </IonButton>
                </IonCol>
                <IonCol>
                  <IonButton color='dark' fill='clear' href={AllRoutePaths.PRODUCTS}>
                    PRODUCTS
                  </IonButton>
                </IonCol>
                <IonCol>
                  <IonButton color='dark' fill='clear' href={AllRoutePaths.FAQ}>
                    FAQ
                  </IonButton>
                </IonCol>
                <IonCol>
                  <IonButton color='dark' fill='clear' href={AllRoutePaths.ABOUT}>
                    ABOUT
                  </IonButton>
                </IonCol>
              </IonRow>
              <IonRow>
                <IonCol>
                  <IonButton color='dark' fill='clear'>
                    CUSTOM ORDERS
                  </IonButton>
                </IonCol>

                <IonCol>
                  <IonButton color='dark' fill='clear'>
                    +27 62 460 5017
                  </IonButton>
                </IonCol>
                <IonCol>
                  <IonButton color='dark' fill='clear'>
                    webfusiononline265@gmail.com
                  </IonButton>
                </IonCol>
              </IonRow>

              <IonRow>
                <IonCol>
                  <IonButton onClick={() => window.open("https://www.facebook.com/Webfusiononline", "_blank")} color='dark' fill='clear'>
                    <IonIcon slot='icon-only' icon={logoFacebook} />
                  </IonButton>
                  <IonButton onClick={() => window.open("https://wa.me/c/27624605017", "_blank")} color='dark' fill='clear'>
                    <IonIcon slot='icon-only' icon={logoWhatsapp} />
                  </IonButton>
                  <IonButton onClick={() => window.open("https://www.tiktok.com/@webfusiononline1?lang=en", "_blank")} color='dark' fill='clear'>
                    <IonIcon slot='icon-only' icon={logoTiktok} />
                  </IonButton>
                  <IonButton onClick={() => window.open("https://www.instagram.com/webfusion_online/", "_blank")} color='dark' fill='clear'>
                    <IonIcon slot='icon-only' icon={logoInstagram} />
                  </IonButton>
                </IonCol>
              </IonRow>
              <IonRow>
                <IonCol>
                  <IonToolbar
                    style={{
                      "--background": "rgba(35,11,79,0.3)"
                    }}>
                    <IonLabel>WebfusionOnline © All Rights Reserved. Site design by Coffee Coder</IonLabel>
                  </IonToolbar>
                </IonCol>
              </IonRow>
            </IonGrid>
          </IonToolbar>
        </IonFooter>
      )}
    </>
  );
}

import React, { useEffect, useState } from "react";
import { IonButton, IonLabel } from "@ionic/react";
import { useAuth } from "../../firebase/FirebaseAuthContext";
import { AllRoutePaths } from "../../routes/Allroutes";

export default function TopBarButtons() {
  const [mQuery, setMQuery] = useState<any>({
    matches: window.innerWidth > 768 ? true : false
  });

  useEffect(() => {
    let mediaQuery = window.matchMedia("(min-width: 768px)");
    mediaQuery.addListener(setMQuery);
    return () => mediaQuery.removeListener(setMQuery);
  }, []);

  // MediaQueryListEvent { isTrusted: true, media: "(min-width: 768px)", matches: true ...}
  //   console.log(mQuery.matches);

  const { currentUser, logout } = useAuth();

  return (
    <>
      {mQuery && !mQuery.matches ? (
        <>
          {currentUser == null ? (
            <>
              <IonButton href={AllRoutePaths.SIGN_IN} color='tertiary' fill='clear'>
                <IonLabel color='secondary'>Sign In</IonLabel>
              </IonButton>

              <IonButton href={AllRoutePaths.SIGN_UP} color='primary' fill='solid' expand='block'>
                <IonLabel style={{ color: "white" }}>Sign Up</IonLabel>
              </IonButton>
            </>
          ) : (
            <>
              <IonButton href={AllRoutePaths.ACCOUNT} color='primary' fill='clear' expand='block'>
                <IonLabel> {currentUser.displayName}</IonLabel>
              </IonButton>
              <IonButton onClick={() => logout()} color='primary' fill='clear' expand='block'>
                Sign Out
              </IonButton>
            </>
          )}
        </>
      ) : (
        <>
          <>
            {currentUser == null ? (
              <>
                <IonButton href={AllRoutePaths.SIGN_IN} color='tertiary' fill='clear'>
                  <IonLabel color='secondary'>Sign In</IonLabel>
                </IonButton>

                <IonButton href={AllRoutePaths.SIGN_UP} color='primary' fill='solid' expand='block'>
                  <IonLabel style={{ color: "white" }}>Sign Up</IonLabel>
                </IonButton>
              </>
            ) : (
              <>
                <IonButton href={AllRoutePaths.ACCOUNT} color='primary' fill='clear' expand='block'>
                  <IonLabel> {currentUser.displayName}</IonLabel>
                </IonButton>
                <IonButton onClick={() => logout()} color='primary' fill='clear' expand='block'>
                  Sign Out
                </IonButton>
              </>
            )}
          </>
        </>
      )}
    </>
  );
}

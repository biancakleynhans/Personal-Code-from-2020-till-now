import React, { useEffect } from "react";
import { IonButton, IonLabel, IonMenuButton } from "@ionic/react";
import { useAuth } from "../../firebase/FirebaseAuthContext";
import { AllRoutesObj, MenuItems } from "../../routes/AllRoutes";

export default function NavButtons() {
  const { currentUser, logout } = useAuth();

  const [mQuery, setMQuery] = React.useState<any>({
    matches: window.innerWidth > 768 ? true : false
  });

  useEffect(() => {
    let mediaQuery = window.matchMedia("(min-width: 768px)");
    mediaQuery.addListener(setMQuery);
    return () => mediaQuery.removeListener(setMQuery);
  }, []);

  return (
    <div>
      {mQuery && !mQuery.matches ? (
        <IonMenuButton />
      ) : (
        <>
          {MenuItems.map((p) => {
            return (
              <IonButton key={p.title} routerLink={p.path}>
                <IonLabel slot='start'>{p.title}</IonLabel>
              </IonButton>
            );
          })}

          {currentUser !== null && currentUser.role === "admin" && (
            <IonButton key={AllRoutesObj.admin.dash.title} routerLink={AllRoutesObj.admin.dash.path} color='secondary'>
              <IonLabel>{AllRoutesObj.admin.dash.title}</IonLabel>
            </IonButton>
          )}

          {currentUser === null ? (
            <>
              <IonButton routerLink={AllRoutesObj.auth.signIn.path} color='tertiary' fill='clear'>
                <IonLabel color='secondary'>Sign In</IonLabel>
              </IonButton>
            </>
          ) : (
            <>
              <IonButton routerLink={AllRoutesObj.user.dash.path} color='primary' fill='clear'>
                <IonLabel> {currentUser.displayName}</IonLabel>
              </IonButton>

              <IonButton routerLink={AllRoutesObj.user.cart.path} color='primary' fill='clear'>
                <IonLabel>Cart</IonLabel>
              </IonButton>

              <IonButton onClick={() => logout()} color='primary' fill='clear'>
                <IonLabel>Sign Out</IonLabel>
              </IonButton>
            </>
          )}
        </>
      )}
    </div>
  );
}

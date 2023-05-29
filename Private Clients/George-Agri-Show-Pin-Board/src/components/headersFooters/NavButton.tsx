import React, { useEffect, useState } from "react";
import { IonButton, IonMenuButton } from "@ionic/react";
import { useAuth } from "../../firebase/FirebaseContextAuth";
import { AdminMenu, AllRoutePaths, menuItems } from "../../routes/Allroutes";

export default function NavButtons() {
  const { currentUser } = useAuth();

  const [mQuery, setMQuery] = useState<any>({
    matches: window.innerWidth > 880 ? true : false
  });

  useEffect(() => {
    let mediaQuery = window.matchMedia("(min-width: 880px)");
    mediaQuery.addListener(setMQuery);
    return () => mediaQuery.removeListener(setMQuery);
  }, []);

  return (
    <>
      {mQuery && !mQuery.matches ? (
        <IonMenuButton color='dark' slot='end' />
      ) : (
        <>
          {menuItems.map((p, index) => {
            return (
              <IonButton key={`${index}${p.title}`} routerLink={p.path} fill={"clear"} slot='end' color='dark'>
                {p.title}
              </IonButton>
            );
          })}

          {currentUser !== null && currentUser.displayName.length > 0 ? (
            <IonButton routerLink={AllRoutePaths.DASH_USER} fill={"clear"} slot='end' color='dark'>
              {currentUser.displayName}
            </IonButton>
          ) : (
            <IonButton routerLink={AllRoutePaths.SIGN_IN} fill={"clear"} slot='end' color='dark'>
              Sign In
            </IonButton>
          )}

          {currentUser !== null &&
            (currentUser.role == "admin" || currentUser.role == "super") &&
            AdminMenu.map((p, index) => (
              <IonButton key={`${index}${p.title}`} routerLink={p.path} fill='clear' slot='end' color='dark'>
                {p.title}
              </IonButton>
            ))}
        </>
      )}
    </>
  );
}

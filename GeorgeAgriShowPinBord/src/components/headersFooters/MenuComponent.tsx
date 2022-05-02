import React, { useEffect } from "react";
import { IonContent, IonItem, IonLabel, IonList, IonMenu, IonMenuToggle } from "@ionic/react";
import { AdminMenu, AllRoutePaths, menuItems } from "../../routes/Allroutes";
import { useAuth } from "../../firebase/FirebaseContextAuth";

export default function MenuComponent() {
  const { currentUser } = useAuth();

  useEffect(() => {}, [currentUser]);
  return (
    <IonMenu side='start' contentId='main' swipeGesture={true}>
      <IonContent>
        <IonList>
          {menuItems
            .filter((route) => !!route.path)
            .map((p, index) => (
              <IonMenuToggle key={index} autoHide={true}>
                <IonItem button routerLink={p.path} routerDirection='forward'>
                  <IonLabel>{p.title}</IonLabel>
                </IonItem>
              </IonMenuToggle>
            ))}

          {currentUser !== null && currentUser.displayName.length > 0 ? (
            <IonMenuToggle autoHide={true}>
              <IonItem button routerLink={AllRoutePaths.DASH_USER} routerDirection='forward'>
                <IonLabel>{currentUser?.displayName?.length > 0 ? currentUser.displayName : currentUser.email}</IonLabel>
              </IonItem>
            </IonMenuToggle>
          ) : (
            <IonMenuToggle autoHide={true}>
              <IonItem button routerLink={AllRoutePaths.SIGN_IN} routerDirection='forward'>
                <IonLabel>Sign In</IonLabel>
              </IonItem>
            </IonMenuToggle>
          )}

          {currentUser !== null &&
            (currentUser.role == "admin" || currentUser?.role == "super") &&
            AdminMenu.filter((route) => !!route.path).map((p) => {
              return (
                <IonMenuToggle key={p.title} autoHide={true}>
                  <IonItem button routerLink={p.path} routerDirection='forward'>
                    <IonLabel>{p.title}</IonLabel>
                  </IonItem>
                </IonMenuToggle>
              );
            })}
        </IonList>
      </IonContent>
    </IonMenu>
  );
}

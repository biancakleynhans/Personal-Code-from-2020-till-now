import { IonContent, IonItem, IonLabel, IonList, IonMenu, IonMenuToggle } from "@ionic/react";
import { useEffect } from "react";
import { useAuth } from "../../hooks/AuthHook";
import { AdminRoutes, ClientRoutes, ProductRoutes } from "../../routes/Routes";

export default function Menu() {
  const { currentUser } = useAuth();
  useEffect(() => {}, [currentUser]);

  return (
    <IonMenu side='start' contentId='main'>
      <IonContent fullscreen>
        <IonList>
          {ProductRoutes.filter((route: any) => !!route.path).map(
            (p: any) =>
              p.show && (
                <IonMenuToggle key={p.name} autoHide={true}>
                  <IonItem button routerLink={p.path} routerDirection='forward'>
                    <IonLabel>{p.name}</IonLabel>
                  </IonItem>
                </IonMenuToggle>
              )
          )}

          {currentUser !== null &&
            (currentUser.role === "user" || currentUser.role === "super") &&
            ClientRoutes.filter((route: any) => !!route.path).map(
              (p: any) =>
                p.show && (
                  <IonMenuToggle key={p.name} autoHide={true}>
                    <IonItem button routerLink={p.path} routerDirection='forward'>
                      <IonLabel>{p.name}</IonLabel>
                    </IonItem>
                  </IonMenuToggle>
                )
            )}

          {currentUser !== null &&
            (currentUser.role === "admin" || currentUser.role === "super") &&
            AdminRoutes.filter((route: any) => !!route.path).map(
              (p) =>
                p.show && (
                  <IonMenuToggle key={p.name} autoHide={true}>
                    <IonItem button routerLink={p.path} routerDirection='forward'>
                      <IonLabel>{p.name}</IonLabel>
                    </IonItem>
                  </IonMenuToggle>
                )
            )}
        </IonList>
      </IonContent>
    </IonMenu>
  );
}

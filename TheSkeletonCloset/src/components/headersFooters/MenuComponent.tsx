import { IonContent, IonItem, IonLabel, IonList, IonMenu, IonMenuToggle } from "@ionic/react";
import { AdminMenu, MenuItems } from "../../routes/AllRoutes";
import { useAuth } from "../../firebase/FirebaseAuthContext";

// TODO optimize and clean
export default function MenuComponent() {
  const { currentUser } = useAuth();
  return (
    <IonMenu side='start' contentId='main'>
      <IonContent>
        <IonList>
          {MenuItems.filter((route) => !!route.path).map((p) => (
            <IonMenuToggle key={p.title} autoHide={true}>
              <IonItem button routerLink={p.path} routerDirection='forward'>
                <IonLabel>{p.title}</IonLabel>
              </IonItem>
            </IonMenuToggle>
          ))}

          {currentUser !== null &&
            currentUser.role === "admin" &&
            AdminMenu.filter((route) => !!route.path).map((p) => (
              <IonMenuToggle key={p.title} autoHide={true}>
                <IonItem button routerLink={p.path} routerDirection='forward'>
                  <IonLabel>{p.title}</IonLabel>
                </IonItem>
              </IonMenuToggle>
            ))}
        </IonList>
      </IonContent>
    </IonMenu>
  );
}

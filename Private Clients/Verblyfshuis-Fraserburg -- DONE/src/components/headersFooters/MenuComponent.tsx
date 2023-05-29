import { IonContent, IonItem, IonLabel, IonList, IonMenu, IonMenuToggle } from "@ionic/react";
import { AdminMenu, menuItems } from "../../routes/Allroutes";
import { useAuth } from "../../services/firebase/FirebaseAuthContext";

export default function MenuComponent() {
  const { currentUser } = useAuth();
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

          {currentUser !== null &&
            currentUser.role == "admin" &&
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

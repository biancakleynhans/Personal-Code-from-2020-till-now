import React from "react";
import { IonContent, IonIcon, IonItem, IonLabel, IonList, IonMenu, IonMenuToggle } from "@ionic/react";
import { cartOutline, settingsOutline, homeOutline, mailOutline } from "ionicons/icons";
import { AllRoutePaths } from "../../routes/Allroutes";
import { useAuth } from "../../firebase/FirebaseAuthContext";

export const menuItems = [
  { title: "Home", icon: homeOutline, path: AllRoutePaths.HOME },
  { title: "About", icon: "", path: AllRoutePaths.ABOUT },
  { title: "Products", icon: "", path: AllRoutePaths.PRODUCTS },
  { title: "Contact Us", icon: mailOutline, path: AllRoutePaths.CONTACT }
  // { title: "Cart", icon: cartOutline, path: AllRoutePaths.CART }
];

export const AdminMenu = [{ title: "Admin Upload", icon: settingsOutline, path: AllRoutePaths.ADMIN }];

export default function MenuComponent() {
  const { currentUser } = useAuth();
  return (
    <IonMenu side='start' contentId='main'>
      <IonContent>
        <IonList>
          {menuItems
            .filter((route) => !!route.path)
            .map((p) => (
              <IonMenuToggle key={p.title} autoHide={true}>
                <IonItem button routerLink={p.path} routerDirection='forward'>
                  {/* {p.icon.length > 0 && <IonIcon slot='start' icon={p.icon} />} */}
                  <IonLabel>{p.title}</IonLabel>
                </IonItem>
              </IonMenuToggle>
            ))}

          {currentUser !== null &&
            currentUser.role == "admin" &&
            AdminMenu.filter((route) => !!route.path).map((p) => (
              <IonMenuToggle key={p.title} autoHide={true}>
                <IonItem button routerLink={p.path} routerDirection='forward'>
                  {/* {p.icon.length > 0 && <IonIcon slot='start' icon={p.icon} />} */}
                  <IonLabel>{p.title}</IonLabel>
                </IonItem>
              </IonMenuToggle>
            ))}
        </IonList>
      </IonContent>
    </IonMenu>
  );
}

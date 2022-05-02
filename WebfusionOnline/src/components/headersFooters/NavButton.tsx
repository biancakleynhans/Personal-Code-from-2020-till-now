import { IonButton, IonIcon, IonLabel, IonMenuButton } from "@ionic/react";
import React, { useEffect } from "react";
import { useAuth } from "../../firebase/FirebaseAuthContext";
import { AdminMenu, menuItems } from "./MenuComponent";

export default function NavButtons() {
  const { currentUser } = useAuth();

  const [mQuery, setMQuery] = React.useState<any>({
    matches: window.innerWidth > 768 ? true : false
  });

  useEffect(() => {
    let mediaQuery = window.matchMedia("(min-width: 768px)");
    mediaQuery.addListener(setMQuery);
    return () => mediaQuery.removeListener(setMQuery);
  }, []);

  // MediaQueryListEvent { isTrusted: true, media: "(min-width: 768px)", matches: true ...}
  // console.log(mQuery.matches);

  return (
    <div>
      {mQuery && !mQuery.matches ? (
        <IonMenuButton />
      ) : (
        <>
          {menuItems.map((p) => {
            return (
              <IonButton key={p.title} routerLink={p.path}>
                {p.icon == "" ? (
                  <IonLabel style={{ color: "#d12a86", fontSize: "20px" }} slot='start'>
                    {p.title}
                  </IonLabel>
                ) : (
                  <IonIcon style={{ color: "#d12a86", fontSize: "20px" }} slot='end' icon={p.icon} />
                )}
              </IonButton>
            );
          })}

          {currentUser !== null &&
            currentUser.role == "admin" &&
            AdminMenu.map((p) => (
              <IonButton key={p.title} routerLink={p.path}>
                {p.icon == "" ? (
                  <IonLabel style={{ color: "#d12a86", fontSize: "20px" }} slot='start'>
                    {p.title}
                  </IonLabel>
                ) : (
                  <IonIcon style={{ color: "#d12a86", fontSize: "20px" }} slot='end' icon={p.icon} />
                )}
              </IonButton>
            ))}
        </>
      )}
    </div>
  );
}

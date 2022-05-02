import React, { useEffect, useState } from "react";
import { IonButton, IonMenuButton } from "@ionic/react";
import { useAuth } from "../../services/firebase/FirebaseAuthContext";
import { AdminMenu, AllRoutePaths, menuItems } from "../../routes/Allroutes";

export default function NavButtons() {
  const { currentUser } = useAuth();
  const [showAbout, setshowAbout] = useState<boolean>(false);

  useEffect(() => {}, [currentUser]);

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
        <IonMenuButton color='light' slot='end' />
      ) : (
        <>
          {/* REBUILT DROPDOWN FOR HOMKE FOR ABOUT BTN */}
          {menuItems.map((p, index) => {
            // console.log("??", p.title);
            if (p.title === "Home") {
              return (
                <div key={`${index}div key`} style={{ float: "right" }}>
                  <IonButton
                    fill='clear'
                    color='light'
                    key={`${p.title}Remake`}
                    onMouseEnter={() => {
                      setshowAbout(!showAbout);
                    }}
                    routerLink={AllRoutePaths.HOME}>
                    Home
                  </IonButton>
                  <br key={`${index} key`} />
                  {showAbout && (
                    <>
                      <IonButton key={`${p.title}Remake`} fill='clear' color='light' routerLink={AllRoutePaths.ABOUT}>
                        About
                      </IonButton>
                      <br key={`${index} key`} />
                      {currentUser !== null ? (
                        <IonButton key={`${index}${p.title}`} fill='clear' color='light' routerLink={AllRoutePaths.ACCOUNT}>
                          {currentUser.displayName}
                        </IonButton>
                      ) : (
                        <IonButton key={`${index}${p.title}`} fill='clear' color='light' routerLink={AllRoutePaths.SIGN_IN}>
                          Sign In
                        </IonButton>
                      )}
                    </>
                  )}
                </div>
              );
            } else if (p.title === "About") {
              return <React.Fragment key={`${index}div key`} />;
            } else if (p.title === "") {
              return <React.Fragment key={`${index}div key`} />;
            } else if (p.title === "Sign in") {
              return <React.Fragment key={`${index}div key`} />;
            } else {
              return (
                <IonButton key={`${index}${p.title}`} routerLink={p.path} fill={p.title !== "Book now" ? "clear" : "solid"} slot='end' color='light'>
                  {p.title}
                </IonButton>
              );
            }
          })}

          {currentUser !== null &&
            currentUser.role == "admin" &&
            AdminMenu.map((p, index) => (
              <IonButton key={`${index}${p.title}`} routerLink={p.path} fill='clear' slot='end' color='light'>
                {p.title}
              </IonButton>
            ))}
        </>
      )}
    </>
  );
}

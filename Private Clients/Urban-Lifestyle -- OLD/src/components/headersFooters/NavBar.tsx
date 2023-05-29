import React, { useEffect, useState } from 'react';
import { IonButton, IonButtons, IonIcon, IonLabel, IonMenuButton } from '@ionic/react';
import { useAuth } from '../../hooks/AuthHook';
import { LogoutAction } from '../../firebase/FirebaseAuth';
import { AdminRoutes, AuthRoutes, ClientRoutes, ProductRoutes, RoutesObj } from '../../routes/Routes';
import { CartPopUpHooked } from '../../hooks/CartPopUpHooked';
import { LOGO } from '../../constants/AppBasedd';
import { constructOutline, personOutline } from 'ionicons/icons';

export default function NavBar() {
  const [mQuery, setMQuery] = useState({
    matches: window.innerWidth > 640 ? true : false,
  });

  const { currentUser } = useAuth();

  useEffect(() => {
    let mediaQuery = window.matchMedia('(min-width: 640px)');
    mediaQuery.addListener(setMQuery);
    return () => mediaQuery.removeListener(setMQuery);
  }, []);

  useEffect(() => {}, [currentUser]);

  function displayBig() {
    return (
      <>
        <IonButtons slot='start'>
          <IonButton routerLink={RoutesObj.basic.home.path} style={{ height: '100px', width: 'auto' }}>
            <img src={LOGO} style={{ height: '80px', width: 'auto' }} />
          </IonButton>
        </IonButtons>

        <IonButtons slot='end'>
          {(currentUser?.role === 'admin' || currentUser?.role === 'super') &&
            AdminRoutes.map(
              (e: any, i) =>
                e.show && (
                  <IonButton key={i} routerLink={e.path} color='tertiary' fill='clear'>
                    {e.name}
                  </IonButton>
                )
            )}

          {ProductRoutes.map(
            (e: any, i) =>
              e.show && (
                <IonButton key={i} routerLink={e.path} color='tertiary' fill='clear'>
                  {e.name}
                </IonButton>
              )
          )}

          {currentUser !== null &&
            ClientRoutes.map(
              (e: any, i) =>
                e.show && (
                  <IonButton key={i} routerLink={e.path} color='tertiary' fill='clear'>
                    {e.name}
                  </IonButton>
                )
            )}

          {/* CART */}
          {currentUser !== null && <CartPopUpHooked />}

          {currentUser === null &&
            AuthRoutes.map(
              (e, i) =>
                e.show && (
                  <IonButton key={i} routerLink={e.path} color='tertiary' fill='clear'>
                    {e.name}
                  </IonButton>
                )
            )}

          {currentUser !== null && (
            <IonButton onClick={() => LogoutAction()} color='secondary' fill='clear'>
              <IonLabel>Sign Out</IonLabel>
            </IonButton>
          )}
        </IonButtons>
      </>
    );
  }

  function displaySmall() {
    return (
      <IonButtons slot='start'>
        <IonMenuButton color='secondary' />

        <IonButton routerLink={RoutesObj.basic.home.path} style={{ height: '60px', width: 'auto' }}>
          <img src={LOGO} style={{ height: '50px', width: 'auto' }} />
        </IonButton>

        {currentUser === null && (
          <IonButton routerLink={RoutesObj.auth.signIn.path} color='tertiary' fill='clear'>
            <IonIcon slot='icon-only' icon={personOutline} />
          </IonButton>
        )}

        {currentUser !== null && (currentUser.role === 'admin' || currentUser.role === 'super') && (
          <IonButton routerLink={RoutesObj.admin.dashboard.path} color='tertiary' fill='clear'>
            <IonIcon slot='icon-only' icon={constructOutline} />
          </IonButton>
        )}

        {currentUser !== null && (currentUser.role === 'user' || currentUser.role === 'super') && (
          <IonButton routerLink={RoutesObj.client.profile.path} color='tertiary' fill='clear'>
            <IonIcon slot='icon-only' icon={personOutline} />
          </IonButton>
        )}

        {currentUser !== null && <CartPopUpHooked />}
      </IonButtons>
    );
  }

  return <>{mQuery && mQuery.matches ? displayBig() : displaySmall()}</>;
}

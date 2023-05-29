import React, { useEffect } from 'react';
import { IonCol, IonFooter, IonGrid, IonItem, IonLabel, IonListHeader, IonRow, IonTitle, IonToolbar } from '@ionic/react';
import { COMPANY_DETAILS } from '../../models/User_models';
import LOGO from '../../assets/images/logos/LOGO.png';
import { SocialBtns } from '../reuables/StaticsBtns';

const base_footer = (
  <IonToolbar color='primary'>
    <IonGrid>
      <IonRow>
        <IonCol></IonCol>
        <IonCol style={{ float: 'right' }}>
          <IonLabel class='ion-text-wrap'>
            Reserved by Webfusiononline PTY Ltd. &reg; <br /> Designed and Developed by Coffee Coder
          </IonLabel>
        </IonCol>
        <IonCol style={{ float: 'right' }}>{SocialBtns}</IonCol>
        <IonCol></IonCol>
      </IonRow>
    </IonGrid>
  </IonToolbar>
);

const timesOpen = (
  <IonCol>
    <IonListHeader>
      <IonTitle color='primary' style={{ fontSize: '25px' }}>
        Support Hours
      </IonTitle>
    </IonListHeader>

    <IonItem color='medium' lines='none'>
      <IonLabel>Monday</IonLabel>
      <IonLabel>08:00 - 18:00</IonLabel>
    </IonItem>

    <IonItem color='medium' lines='none'>
      <IonLabel>Tuesday</IonLabel>
      <IonLabel>08:00 - 18:00</IonLabel>
    </IonItem>

    <IonItem color='medium' lines='none'>
      <IonLabel>Wednessday</IonLabel>
      <IonLabel>08:00 - 18:00</IonLabel>
    </IonItem>

    <IonItem color='medium' lines='none'>
      <IonLabel>Thursday</IonLabel>
      <IonLabel>08:00 - 18:00</IonLabel>
    </IonItem>

    <IonItem color='medium' lines='none'>
      <IonLabel>Friday</IonLabel>
      <IonLabel>08:00 - 18:00</IonLabel>
    </IonItem>
  </IonCol>
);

const lastLine = (
  <IonCol>
    <IonItem color='medium' lines='none'>
      <img style={{ maxWidth: '200px', maxHeight: '200px' }} src={LOGO} alt='broken logo' />
    </IonItem>

    <IonItem color='medium' lines='none'>
      <IonLabel>{COMPANY_DETAILS.cel}</IonLabel>
    </IonItem>

    {/* <IonItem color='medium' lines='none'>
      <IonLabel>{COMPANY_DETAILS.tel}</IonLabel>
    </IonItem> */}

    <IonItem color='medium' lines='none'>
      <IonLabel> {COMPANY_DETAILS.email}</IonLabel>
    </IonItem>
  </IonCol>
);

export default function FooterComponent() {
  const [mQuery, setMQuery] = React.useState<any>({
    matches: window.innerWidth > 768 ? true : false,
  });

  useEffect(() => {
    let mediaQuery = window.matchMedia('(min-width: 768px)');
    mediaQuery.addListener(setMQuery);
    return () => mediaQuery.removeListener(setMQuery);
  }, []);

  return (
    <>
      {mQuery && !mQuery.matches ? (
        <IonFooter>{base_footer}</IonFooter>
      ) : (
        <IonFooter>
          <IonToolbar color='medium' style={{ paddingLeft: '10%', paddingRight: '10%' }}>
            <IonGrid>
              <IonRow>
                <IonCol></IonCol>
                {lastLine}
                {timesOpen}
                <IonCol></IonCol>
              </IonRow>
            </IonGrid>
          </IonToolbar>
          {base_footer}
        </IonFooter>
      )}
    </>
  );
}

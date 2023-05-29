import { useEffect, useState } from 'react';
import { IonItem, IonLabel } from '@ionic/react';
import { COMPANY_DETAILS } from '../../models/User_models';
import { SocialBtns } from '../reuables/StaticsBtns';

export default function TopBarButtons() {
  const [mQuery, setMQuery] = useState<any>({
    matches: window.innerWidth > 880 ? true : false,
  });

  useEffect(() => {
    let mediaQuery = window.matchMedia('(min-width: 880px)');
    mediaQuery.addListener(setMQuery);
    return () => mediaQuery.removeListener(setMQuery);
  }, []);

  return (
    <>
      {mQuery && !mQuery.matches ? (
        <>
          <IonItem className='top_bar' lines='none'>
            <IonLabel color='light' class='ion-text-wrap'>
              {COMPANY_DETAILS.cel}
            </IonLabel>
            <IonLabel color='light' class='ion-text-wrap'>
              {COMPANY_DETAILS.email}
            </IonLabel>
          </IonItem>
          <IonItem className='top_bar' lines='none'>
            {SocialBtns}
          </IonItem>
        </>
      ) : (
        <IonItem className='top_bar' lines='none'>
          <IonLabel color='light' class='ion-text-wrap'>
            {COMPANY_DETAILS.cel}
          </IonLabel>
          <IonLabel color='light' class='ion-text-wrap'>
            {COMPANY_DETAILS.email}
          </IonLabel>
          {SocialBtns}
        </IonItem>
      )}
    </>
  );
}

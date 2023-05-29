import React, { useEffect } from 'react';
import { IonCol, IonFooter, IonGrid, IonLabel, IonRow, IonToolbar } from '@ionic/react';

const base_footer = (
  <IonToolbar color='medium'>
    <IonGrid>
      <IonRow>
        <IonCol></IonCol>
        <IonCol>
          <IonLabel>Reserved by Webfusiononline PTY Ltd. &reg; Designed by Coffee Coder</IonLabel>
        </IonCol>
        <IonCol></IonCol>
      </IonRow>
    </IonGrid>
  </IonToolbar>
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
        <IonFooter collapse='fade' className='ion-no-border'>
          {base_footer}
        </IonFooter>
      ) : (
        <IonFooter collapse='fade' className='ion-no-border'>
          {base_footer}
        </IonFooter>
      )}
    </>
  );
}

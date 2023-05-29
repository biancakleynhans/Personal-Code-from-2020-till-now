import { IonButton, IonIcon } from '@ionic/react';
import { logoFacebook, logoWhatsapp } from 'ionicons/icons';
import SLEEP from '../../assets/images/logos/lekkeslaap.svg';
import { COMPANY_DETAILS } from '../../models/User_models';

export const SocialBtns = (
  <>
    <IonButton onClick={() => window.open('https://www.facebook.com/Verblijf-Huis-101695555373800/', '_blank')} color='light' fill='clear'>
      <IonIcon style={{ color: '#4267B2' }} slot='icon-only' icon={logoFacebook} />
    </IonButton>
    <IonButton onClick={() => window.open(`https://wa.me/${COMPANY_DETAILS.tel}`, '_blank')} color='light' fill='clear'>
      <IonIcon style={{ color: '#25D366' }} slot='icon-only' icon={logoWhatsapp} />
    </IonButton>

    <IonButton onClick={() => window.open('https://www.lekkeslaap.co.za/akkommodasie-in/fraserburg', '_blank')} color='light' fill='clear'>
      <IonIcon style={{ fontSize: '76px' }} slot='icon-only' src={SLEEP} />
    </IonButton>
  </>
);

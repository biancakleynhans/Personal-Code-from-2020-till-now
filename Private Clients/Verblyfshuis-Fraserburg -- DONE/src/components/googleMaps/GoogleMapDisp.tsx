import GoogleMapReact from 'google-map-react';
import { LOCPIN } from './LocPin';
import { IonButton, IonIcon } from '@ionic/react';
import { locationOutline } from 'ionicons/icons';

const Marker = () => (
  <div>
    <IonButton href='https://goo.gl/maps/SBaTrjmcRVsbLoAAA' fill='clear'>
      <IonIcon size='large' color='primary' icon={locationOutline} />
      Verblyfhuis
    </IonButton>
  </div>
);

export default function GoogleMapDisp() {
  return (
    <div style={{ height: '400px', width: '100%' }}>
      <GoogleMapReact defaultZoom={10} defaultCenter={LOCPIN} center={LOCPIN} bootstrapURLKeys={{ key: 'AIzaSyBbZIhfPO9HHUqOTkDzvzmXN0Y9j5Gso4E', language: 'en' }}>
        <Marker />
      </GoogleMapReact>
    </div>
  );
}

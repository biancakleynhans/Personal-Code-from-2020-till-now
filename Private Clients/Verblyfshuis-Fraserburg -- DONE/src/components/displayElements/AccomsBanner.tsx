import { IonButton, IonCol, IonGrid, IonRow, IonToolbar } from '@ionic/react';
import { RoomType } from '../../models/Site_models';
import ROOM1 from '../../assets/images/actual/MainBedroom.png';
import ROOM2 from '../../assets/images/actual/SpareBedroom.jpg';
import ROOM3 from '../../assets/images/actual/kitchen.png';
import ROOM4 from '../../assets/images/actual/Room8.jpg';
import SingleCardDisplay from '../reuables/CardDisplay';
import { AllRoutePaths } from '../../routes/Allroutes';

const Rooms: RoomType[] = [
  { img: ROOM1, name: 'Main Bedroom', desc: 'this is a desc', price: 'One night R400' },
  { img: ROOM2, name: 'Second Bedroom', desc: 'this is a desc', price: 'One night R400' },
  { img: ROOM3, name: 'Open plan kitchen and lounge', desc: 'this is a desc', price: 'One night R400' },
  { img: ROOM4, name: 'Bathrooms', desc: 'this is a desc', price: 'One night R400' },
];

export default function AccomsBanner() {
  return (
    <IonToolbar style={{ '--background': 'transparent', '--ion-color-base': 'transparent !important', paddingLeft: '10%', paddingRight: '10%' }}>
      <br />
      <IonGrid>
        <IonRow>
          {Rooms.map((room, index) => {
            //
            return <IonCol key={index}>{SingleCardDisplay(room)}</IonCol>;
          })}
        </IonRow>

        {/* <IonRow>
          <IonCol></IonCol>
          <IonCol>
            <IonButton color='primary' className='BigBtn' size='large' shape='round' routerLink={AllRoutePaths.BOOK}>
              BOOK NOW
            </IonButton>
          </IonCol>
          <IonCol></IonCol>
        </IonRow> */}
      </IonGrid>
      <br />
      <br />
      <br />
    </IonToolbar>
  );
}

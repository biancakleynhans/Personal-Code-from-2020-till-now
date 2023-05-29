import { IonCard, IonCardHeader, IonCardTitle } from "@ionic/react";
import { ActivType, RoomType } from "../../models/Site_models";

export default function SingleCardDisplay(room: RoomType | ActivType) {
  const type = typeof room;
  console.log("???", type);
  return (
    <IonCard color='none' className='designCardContainer' routerLink='/gallery'>
      <IonCard color='none' style={{ backgroundImage: `url(${room.img})` }} className='designCard'></IonCard>
      <IonCard color='light' className='designCardCOntent'>
        <IonCardHeader color='tertiary'>
          <IonCardTitle>{room.name}</IonCardTitle>
        </IonCardHeader>
      </IonCard>
    </IonCard>
  );
}

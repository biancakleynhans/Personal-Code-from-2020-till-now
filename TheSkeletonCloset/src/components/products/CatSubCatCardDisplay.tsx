import { IonCard, IonCardHeader, IonCardTitle } from "@ionic/react";

interface iProps {
  cat: string;
  route: string;
  img: string;
}

export default function CatSubCatCardDisplay(props: iProps) {
  return (
    <IonCard color='light' routerLink={props.route}>
      <IonCard color='none' style={{ backgroundImage: `url(${props.img})` }} className='designCard' />
      <IonCardHeader>
        <IonCardTitle>{props.cat}</IonCardTitle>
      </IonCardHeader>
    </IonCard>
  );
}

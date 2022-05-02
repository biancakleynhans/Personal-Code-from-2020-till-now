import { IonCard, IonCardHeader, IonCardTitle } from "@ionic/react";
import { ImgsObj } from "../../assets/images/ImageExport";

interface iProps {
  cat: string;
  route: string;
}

export default function CatSubCatCardDisplay(props: iProps) {
  let use = ImgsObj[props.cat] !== undefined ? ImgsObj[props.cat] : "";
  return (
    <IonCard color='light' routerLink={props.route}>
      <IonCard color='none' style={{ backgroundImage: `url(${use})` }} className='designCard' />
      <IonCardHeader>
        <IonCardTitle>{props.cat}</IonCardTitle>
      </IonCardHeader>
    </IonCard>
  );
}

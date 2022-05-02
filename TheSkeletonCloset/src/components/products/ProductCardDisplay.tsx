import { IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle } from "@ionic/react";
import { iProduct } from "../../models/Product_models";

interface iProps {
  product: iProduct;
  route: string;
}

export default function ProductCardDisplay(props: iProps) {
  let use = props.product.images[0] !== undefined ? props.product.images[0] : "";
  return (
    <IonCard color='light' routerLink={props.route}>
      <IonCard color='none' style={{ backgroundImage: `url(${use})` }} className='designCard' />
      <IonCardHeader>
        <IonCardTitle>{props.product.title}</IonCardTitle>
        <IonCardSubtitle>R {props.product.price}</IonCardSubtitle>
      </IonCardHeader>
    </IonCard>
  );
}

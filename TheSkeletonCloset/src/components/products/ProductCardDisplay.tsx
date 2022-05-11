import { IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle } from "@ionic/react";
import { PLACEHOLDER } from "../../constants/AppBasedd";
import { iProduct } from "../../models/Products";

interface iProps {
  product: iProduct;
  route: string;
}

export default function ProductCardDisplay(props: iProps) {
  let use = props.product.images !== undefined && props.product.images !== undefined ? props.product.images[0] : PLACEHOLDER;
  return (
    <IonCard color='light' routerLink={props.route}>
      <IonCard color='none' style={{ backgroundImage: `url(${use})` }} className='designCard' />
      <IonCardHeader>
        <IonCardTitle>{props.product.title}</IonCardTitle>
        <IonCardSubtitle>R {props.product.priceSell}</IonCardSubtitle>
      </IonCardHeader>
    </IonCard>
  );
}

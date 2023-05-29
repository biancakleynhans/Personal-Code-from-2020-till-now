import { IonCard, IonCardContent, IonCardHeader, IonCardTitle } from "@ionic/react";
import InvoiceDownload from "../../../components/reusable/InvoiceDownload";
import { iInfoBase } from "../../../models/Basic";
import { iCart } from "../../../models/Products";

interface iProps {
  cart: iCart[];
  client: iInfoBase;
  goBack: () => void;
}

export default function Checkout(props: iProps) {
  return (
    <IonCard>
      <IonCardHeader>
        <IonCardTitle> CHECKING OUT...</IonCardTitle>
      </IonCardHeader>
      <IonCardContent>
        <InvoiceDownload OnCheckout={() => {}} cartData={props.cart} client={props.client} goBack={props.goBack} />
      </IonCardContent>
    </IonCard>
  );
}

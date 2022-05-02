import { Component } from "react";
import { IonContent, IonPage } from "@ionic/react";
import HeaderComponent from "../../components/headersFooters/HeaderComponent";
import FooterComponent from "../../components/headersFooters/FooterComponent";

export class Cart extends Component {
  render() {
    return (
      <IonPage>
        <IonContent>
          <HeaderComponent title={"Cart"} />
          <FooterComponent />
        </IonContent>
      </IonPage>
    );
  }
}

export default Cart;

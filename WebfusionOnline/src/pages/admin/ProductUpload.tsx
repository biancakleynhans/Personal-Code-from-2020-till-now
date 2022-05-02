import { IonButton, IonCard, IonCardContent, IonCardHeader, IonContent, IonPage } from "@ionic/react";
import React from "react";
import HeaderComponent from "../../components/headersFooters/HeaderComponent";
import PrettyProductUpload from "../../components/upload/PrettyProductUpload";
import PrintProductUpload from "../../components/upload/PrintProductUpload";
import WebProductUpload from "../../components/upload/WebProductUpload";

interface iState {
  currSide: "web" | "pretty" | "print" | "none";
}

export default class ProductUpload extends React.Component<any, iState> {
  constructor(props: any) {
    super(props);
    this.state = {
      currSide: "none"
    };
  }

  render() {
    return (
      <IonPage>
        <IonContent>
          <HeaderComponent title={"Product upload manually"} showBanner={false} />

          <IonCard>
            <IonCardHeader>Please Select the divion you would like to upload products for</IonCardHeader>
            <IonCardContent>
              <IonButton onClick={() => this.setState({ currSide: "web" })}>WebFusion </IonButton>
              <IonButton onClick={() => this.setState({ currSide: "pretty" })}>Pretty Things</IonButton>
              <IonButton onClick={() => this.setState({ currSide: "print" })}>Printintrest</IonButton>
            </IonCardContent>
          </IonCard>

          {this.state.currSide === "web" && <WebProductUpload />}
          {this.state.currSide === "pretty" && <PrettyProductUpload />}
          {this.state.currSide === "print" && <PrintProductUpload />}
        </IonContent>
      </IonPage>
    );
  }
}

import React, { Component } from "react";
import { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonImg } from "@ionic/react";

interface iProps {
  img: any;
  title: string;
  desc?: String;
  url: string;
  price?: string;
}

export class ProductDisplaySingle extends Component<iProps, any> {
  render() {
    return (
      <IonCard
        button={true}
        href={this.props.url}
        style={{
          "--background": "rgba(35,11,79,0.08)"
        }}>
        <IonCardContent>
          <IonImg alt='broken' src={this.props.img} />
        </IonCardContent>
        <IonCardHeader>
          <IonCardTitle>{this.props.title.toUpperCase()}</IonCardTitle>
          {this.props.price && <IonCardSubtitle>{`R ${this.props.price}`}</IonCardSubtitle>}
          {this.props.desc && <IonCardSubtitle>{this.props.desc}</IonCardSubtitle>}
        </IonCardHeader>
      </IonCard>
    );
  }
}

export default ProductDisplaySingle;

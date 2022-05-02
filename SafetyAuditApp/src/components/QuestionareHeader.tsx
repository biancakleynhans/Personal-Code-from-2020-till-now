import { IonHeader, IonToolbar } from "@ionic/react";
import React, { Component } from "react";

interface iProps {
  title: string;
  isComplete: boolean;
  count: number;
  total: number;
}
interface iState {}

export class QuestionareHeader extends Component<iProps, iState> {
  render() {
    return (
      <IonHeader className='ion-no-border'>
        <IonToolbar style={{ padding: "15px" }}>
          <span className='wrap-text'>{this.props.title.toUpperCase()}</span>
          <br />
          <br />
          {!this.props.isComplete && (
            <span className='wrap-text'>
              {this.props.count} of {this.props.total} questions completed
            </span>
          )}
        </IonToolbar>
      </IonHeader>
    );
  }
}

export default QuestionareHeader;

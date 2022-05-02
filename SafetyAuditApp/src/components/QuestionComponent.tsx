import React, { Component } from "react";
import { IonButton, IonHeader, IonItem, IonLabel, IonModal, IonRadio, IonRadioGroup, IonTextarea, IonToolbar } from "@ionic/react";
import ImageCaptureComponent from "./ImageCaptureComponent";
import { Answer } from "../models/Questionare_models";
import { UserPhoto } from "../hooks/UseCamera";

interface iProps {
  question: string;
  answers: (ans: Answer) => void;
}
interface iState {
  selectedValue: "N/A" | "OK" | "NOT OK" | string;
  showAction: boolean;
  showImg: boolean;
  actionText: string;
  imagesUploaded: UserPhoto[];
}

export class QuestionComponent extends Component<iProps, iState> {
  constructor(props: any) {
    super(props);

    this.state = {
      selectedValue: "N/A",
      showAction: false,
      actionText: "",
      showImg: false,
      imagesUploaded: []
    };
  }

  setSelected(answer: string) {
    console.log("Set Selected", answer);
    this.setState({ selectedValue: answer });
    this.props.answers({ Actions: this.state.actionText, images: this.state.imagesUploaded, score: answer });
  }

  setAction() {
    this.setState({ showAction: !this.state.showAction });
    let currText = this.state.actionText;
    let newText = currText ? this.state.actionText : `${currText}, ${this.state.actionText}`;
    console.log("new", newText);
    this.setState({ actionText: newText });
    this.props.answers({ Actions: newText, images: this.state.imagesUploaded, score: this.state.selectedValue });
  }

  setTextAction(e: string) {
    this.setState({ actionText: e });
  }

  setImage() {
    this.setState({ showImg: !this.state.showImg });
  }

  startImage() {
    this.setState({ showImg: !this.state.showImg });
  }

  getAllImages(photos: any) {
    console.log("I am the call back", photos);
    this.props.answers({ Actions: this.state.actionText, images: photos, score: this.state.selectedValue });
    this.setState({ showImg: !this.state.showImg });
  }

  render() {
    return (
      <>
        <IonRadioGroup value={this.state.selectedValue} onIonChange={(e) => this.setSelected(e.detail.value)}>
          <IonItem lines='none'>
            <IonLabel slot='start' class='ion-text-wrap'>
              {this.props.question}
            </IonLabel>
            <IonRadio style={{ "--color": "#2dd36f" }} color='success' slot='end' value='OK' />
            <IonRadio style={{ "--color": "#eb445a" }} color='danger' slot='end' value='NOT OK' />
            <IonRadio style={{ "--color": "#5260ff" }} slot='end' value='N/A' />
          </IonItem>
        </IonRadioGroup>

        {this.state.showAction ? (
          <IonModal isOpen={this.state.showAction} showBackdrop>
            <IonHeader>
              <IonToolbar>
                <span className='wrap-text'>Please record all relevent actions needed as well as any comments and concerns </span>
              </IonToolbar>
            </IonHeader>

            <IonTextarea rows={15} debounce={300} placeholder='Enter more information here...' value={this.state.actionText} onIonChange={(e) => this.setTextAction(e.detail.value!)} />

            <IonButton onClick={() => this.setAction()}>Save Action</IonButton>
          </IonModal>
        ) : (
          <IonItem lines='none'>
            <IonButton
              onClick={() => {
                this.setState({ showAction: !this.state.showAction });
              }}>
              Add Action
            </IonButton>
          </IonItem>
        )}

        {this.state.showImg ? (
          <IonModal isOpen={this.state.showImg} showBackdrop>
            <ImageCaptureComponent callback={(photos: any) => this.getAllImages(photos)} />
            <IonButton
              onClick={() => {
                this.setState({ showImg: !this.state.showImg });
              }}>
              Close
            </IonButton>
          </IonModal>
        ) : (
          <IonItem lines='none'>
            <IonButton onClick={() => this.startImage()}>Add Image</IonButton>
          </IonItem>
        )}
      </>
    );
  }
}

export default QuestionComponent;

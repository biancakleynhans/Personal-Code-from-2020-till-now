import { IonButton, IonCol, IonContent, IonGrid, IonInput, IonItem, IonLabel, IonListHeader, IonPage, IonRadio, IonRadioGroup, IonRow } from "@ionic/react";
import React, { Component } from "react";
import HeaderComponent from "../components/HeaderComponent";
import { TypesOfUsers } from "../models/Inspector_models";

interface iProps {}
interface iState {
  email: string;
  pass: string;
  accType: string;
  compName: string;
  compAdr: string;
  compType: string;
}

export class RegisterPage extends Component<any, iState> {
  constructor(props: any) {
    super(props);
    this.state = {
      email: "",
      pass: "",
      accType: "Employee",
      compAdr: "",
      compName: "",
      compType: ""
    };
  }
  setPass(e: string) {
    this.setState({ pass: e });
  }

  setMail(e: string) {
    this.setState({ email: e });
  }

  setSelected(e: string) {
    this.setState({ accType: e });
  }

  setCompName(e: string) {
    this.setState({ compName: e });
  }
  setCompAdress(e: string) {
    this.setState({ compAdr: e });
  }
  setCompType(e: string) {
    this.setState({ compType: e });
  }

  register() {
    console.log("FIRE BASE CALL TO register");
  }

  render() {
    const floatStacked = window.innerWidth > 700 ? "fixed" : "floating";
    return (
      <IonPage>
        <HeaderComponent title='Register' />
        <IonContent fullscreen>
          <IonGrid>
            {/* User name */}
            <IonRow>
              <IonCol size='12'>
                <IonItem>
                  <IonLabel position={floatStacked} class='ion-text-wrap'>
                    Email:{" "}
                  </IonLabel>
                  <IonInput type='email' required value={this.state.email} onIonChange={(e) => this.setMail(e.detail.value!)} />
                </IonItem>
              </IonCol>
            </IonRow>

            {/* Password */}
            <IonRow>
              <IonCol size='12'>
                <IonItem>
                  <IonLabel position={floatStacked} class='ion-text-wrap'>
                    Password:{" "}
                  </IonLabel>
                  <IonInput type='password' required value={this.state.pass} onIonChange={(e) => this.setPass(e.detail.value!)} />
                </IonItem>
              </IonCol>
            </IonRow>

            {/* What type of registation */}
            <IonRow>
              <IonCol>
                <IonItem>
                  <IonLabel class='ion-text-wrap'>Account Type:</IonLabel>
                  <IonLabel class='ion-text-wrap' color='success'>
                    {this.state.accType}
                  </IonLabel>
                </IonItem>
                <IonRadioGroup value={this.state.accType} onIonChange={(e) => this.setSelected(e.detail.value)}>
                  {TypesOfUsers.map((type, index) => {
                    return (
                      <IonItem lines='none' key={index}>
                        <IonLabel class='ion-text-wrap' slot='start'>
                          {type}
                        </IonLabel>
                        <IonRadio slot='end' value={type} />
                      </IonItem>
                    );
                  })}
                </IonRadioGroup>
              </IonCol>
            </IonRow>

            {/* Company details  */}
            {this.state.accType === "Company" && (
              <>
                {/* Company name */}
                <IonRow>
                  <IonCol size='12'>
                    <IonItem>
                      <IonLabel position={floatStacked} class='ion-text-wrap'>
                        Company Name:{" "}
                      </IonLabel>
                      <IonInput type='text' required value={this.state.compName} onIonChange={(e) => this.setCompName(e.detail.value!)} />
                    </IonItem>
                  </IonCol>
                </IonRow>

                {/* Company adress */}
                <IonRow>
                  <IonCol size='12'>
                    <IonItem>
                      <IonLabel position={floatStacked} class='ion-text-wrap'>
                        Company Adress:{" "}
                      </IonLabel>
                      <IonInput type='text' required value={this.state.compAdr} onIonChange={(e) => this.setCompAdress(e.detail.value!)} />
                    </IonItem>
                  </IonCol>
                </IonRow>

                {/* Company type */}
                <IonRow>
                  <IonCol size='12'>
                    <IonItem>
                      <IonLabel position={floatStacked} class='ion-text-wrap'>
                        Company type:{" "}
                      </IonLabel>
                      <IonInput type='text' required value={this.state.compType} onIonChange={(e) => this.setCompType(e.detail.value!)} />
                    </IonItem>
                  </IonCol>
                </IonRow>
              </>
            )}

            <IonRow>
              <IonCol size='12'>
                <IonButton onClick={() => this.register()}>Register Now</IonButton>
              </IonCol>
            </IonRow>

            {/* Login in with google */}

            {/* Login with cellphone */}
          </IonGrid>
        </IonContent>
      </IonPage>
    );
  }
}

export default RegisterPage;

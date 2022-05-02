import { IonButton, IonCol, IonContent, IonGrid, IonInput, IonItem, IonLabel, IonPage, IonRow } from "@ionic/react";
import React, { Component } from "react";
import HeaderComponent from "../components/HeaderComponent";

interface iProps {}
interface iState {
  email: string;
  pass: string;
}

export class LoginPage extends Component<any, iState> {
  constructor(props: any) {
    super(props);
    this.state = {
      email: "",
      pass: ""
    };
  }
  setPass(e: string) {
    this.setState({ pass: e });
  }

  setMail(e: string) {
    this.setState({ email: e });
  }

  login() {
    console.log("FIRE BASE CALL TO LOGIN");
  }

  render() {
    return (
      <IonPage>
        <HeaderComponent title='Login' />
        <IonContent fullscreen>
          <IonGrid>
            {/* User name */}
            <IonRow>
              <IonCol size='12'>
                <IonItem>
                  <IonLabel>Email: </IonLabel>
                  <IonInput required value={this.state.email} onIonChange={(e) => this.setMail(e.detail.value!)} />
                </IonItem>
              </IonCol>
            </IonRow>

            {/* Password */}
            <IonRow>
              <IonCol size='12'>
                <IonItem>
                  <IonLabel>Password: </IonLabel>
                  <IonInput required value={this.state.pass} onIonChange={(e) => this.setPass(e.detail.value!)} />
                </IonItem>
              </IonCol>
            </IonRow>

            <IonRow>
              <IonCol size='12'>
                <IonButton onClick={() => this.login()}>Login Now</IonButton>
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

export default LoginPage;

import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonCol, IonContent, IonGrid, IonHeader, IonLabel, IonPage, IonRow, IonToolbar } from "@ionic/react";
import React, { Component } from "react";

export class HomePage extends Component {
  render() {
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonLabel>HOME PAGE</IonLabel>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <IonGrid>
            <IonRow>
              <IonCol size='6'>
                <IonCard>
                  <IonCardHeader>
                    <IonCardTitle>MONTHLY REPORT PAGE</IonCardTitle>
                  </IonCardHeader>
                  <IonCardContent>
                    <IonButton href='/monthly'>GO NOW</IonButton>
                  </IonCardContent>
                </IonCard>
              </IonCol>

              <IonCol size='6'>
                <IonCard>
                  <IonCardHeader>
                    <IonCardTitle> ERROR REPORT GENERATOR</IonCardTitle>
                  </IonCardHeader>
                  <IonCardContent>
                    <IonButton href='/errorReport'>GO NOW</IonButton>
                  </IonCardContent>
                </IonCard>
              </IonCol>
            </IonRow>

            <IonRow>
              <IonCol size='6'>
                <IonCard>
                  <IonCardHeader>
                    <IonCardTitle>Salary Scedule Form Generator Per person</IonCardTitle>
                  </IonCardHeader>
                  <IonCardContent>
                    <IonButton href='/perPerson'>GO NOW</IonButton>
                  </IonCardContent>
                </IonCard>
              </IonCol>

              <IonCol size='6'>
                <IonCard>
                  <IonCardHeader>
                    <IonCardTitle>Salary Scedule Form to Digital UI19 Converter</IonCardTitle>
                  </IonCardHeader>
                  <IonCardContent>
                    <IonButton href='/'>GO NOW</IonButton>
                  </IonCardContent>
                </IonCard>
              </IonCol>
            </IonRow>
          </IonGrid>
        </IonContent>
      </IonPage>
    );
  }
}

export default HomePage;

import React, { useEffect, useState } from "react";
import { IonButton, IonCard, IonCardHeader, IonCardTitle, IonContent, IonGrid, IonPage, IonRow, IonText } from "@ionic/react";
import { useAuth } from "../../services/firebase/FirebaseAuthContext";
import HeaderComponent from "../../components/headersFooters/HeaderComponent";
import { RetrieveUserBooking } from "../../services/firebase/FirebaseFireStoreCRUD";
import { iBooking } from "../../models/User_models";
import BookingDisplay from "../../components/bookingSystem/BookingDisplay";
import { AllRoutePaths } from "../../routes/Allroutes";
import FooterComponent from "../../components/headersFooters/FooterComponent";

export default function Dashbord() {
  const [bookingsArr, setbookingsArr] = useState<{}[]>([]);
  const { currentUser } = useAuth();

  useEffect(() => {
    //Get All Bookings for this user
    if (currentUser !== null && currentUser.uid.length > 0) {
      RetrieveUserBooking(currentUser.uid).then((res) => {
        if (res.client.length > 0) {
          setbookingsArr(res.client);
        }
      });
    }
  }, [currentUser]);

  useEffect(() => {}, [bookingsArr]);

  return (
    <IonPage>
      <IonContent fullscreen={true}>
        <HeaderComponent />

        <IonGrid>
          <IonRow>
            <IonCard color='primary' style={{ width: "100%" }}>
              <IonCardHeader>
                <IonCardTitle style={{ fontSize: "28px", textAlign: "center", textColor: "white" }}>
                  <IonText color='light'>All bookings made</IonText>
                </IonCardTitle>
              </IonCardHeader>
            </IonCard>
          </IonRow>
          {currentUser !== null ? (
            <IonRow>
              {bookingsArr.map((entry: any, index: number) => {
                return BookingDisplay(index, Object.values(entry)[0] as iBooking, Object.keys(entry)[0], false);
              })}
            </IonRow>
          ) : (
            <IonRow>
              <IonButton routerLink={AllRoutePaths.SIGN_IN}>Sign in to see your information </IonButton>
            </IonRow>
          )}
        </IonGrid>
        <FooterComponent />
      </IonContent>
    </IonPage>
  );
}

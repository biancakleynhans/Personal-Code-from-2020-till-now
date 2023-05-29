import { useEffect, useState } from "react";
import { IonCard, IonCardHeader, IonCardTitle, IonCol, IonContent, IonGrid, IonPage, IonRow, IonText } from "@ionic/react";
import { useAuth } from "../../services/firebase/FirebaseAuthContext";
import { RetrieveUserBooking, RetrieveUserReviews } from "../../services/firebase/FirebaseFireStoreCRUD";
import HeaderComponent from "../../components/headersFooters/HeaderComponent";
import { iBooking } from "../../models/User_models";
import BookingDisplay from "../../components/bookingSystem/BookingDisplay";
import FooterComponent from "../../components/headersFooters/FooterComponent";

export default function AdminDashboard() {
  const [bookingsArr, setbookingsArr] = useState<any[]>([]);
  const [reviewsArr, setReviewsArr] = useState<any[]>([]);
  const { currentUser } = useAuth();

  useEffect(() => {
    //Get All Bookings for this user
    if (currentUser !== null && currentUser.uid.length > 0) {
      RetrieveUserBooking("").then((res) => {
        console.log("res", res);
        if (res.admin.length > 0) {
          setbookingsArr(res.admin);
        }
      });

      RetrieveUserReviews().then((res) => {
        console.log("res", res);
        if (res.length > 0) {
          setReviewsArr(res);
        }
      });
    }
  }, [currentUser]);

  return (
    <IonPage>
      <IonContent fullscreen={true}>
        <HeaderComponent />

        <IonGrid>
          {/* BOOKINGS */}
          <IonRow>
            <IonCol>
              <IonCard color='primary' style={{ width: "100%" }}>
                <IonCardHeader>
                  <IonCardTitle style={{ fontSize: "28px", textAlign: "center", textColor: "white" }}>
                    <IonText color='light'>Current Bookings</IonText>
                  </IonCardTitle>
                </IonCardHeader>
              </IonCard>
            </IonCol>
          </IonRow>
          <IonRow>
            {bookingsArr.map((entry: iBooking, index: number) => {
              return BookingDisplay(index, Object.values(entry)[0] as iBooking, Object.keys(entry)[0], true);
            })}
          </IonRow>

          {/* REVIEWS */}
          <IonRow>
            <IonCol>
              <IonCard color='primary' style={{ width: "100%" }}>
                <IonCardHeader>
                  <IonCardTitle style={{ fontSize: "28px", textAlign: "center", textColor: "white" }}>
                    <IonText color='light'>Current Reviews</IonText>
                  </IonCardTitle>
                </IonCardHeader>
              </IonCard>
            </IonCol>
          </IonRow>
          <IonRow>
            {reviewsArr.map((entry: iBooking, index: number) => {
              return BookingDisplay(index, entry, `${index}`, true);
            })}
          </IonRow>
        </IonGrid>
        <FooterComponent />
      </IonContent>
    </IonPage>
  );
}

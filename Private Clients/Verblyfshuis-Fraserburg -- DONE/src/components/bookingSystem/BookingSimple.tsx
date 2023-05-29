import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonCol,
  IonDatetime,
  IonGrid,
  IonIcon,
  IonInput,
  IonItem,
  IonLabel,
  IonModal,
  IonPopover,
  IonRow,
  IonText
} from "@ionic/react";
import { useEffect, useState } from "react";
import moment from "moment";
import { calendar } from "ionicons/icons";
import { useAuth } from "../../services/firebase/FirebaseAuthContext";
import { AllRoutePaths } from "../../routes/Allroutes";
import { iBooking } from "../../models/User_models";
import { SendBookingsEmail } from "../../services/firebase/FirebaseFunctionCalls";
import { RetrieveUserBooking, SaveBookingToDB } from "../../services/firebase/FirebaseFireStoreCRUD";
import InvoiceDownload from "./InvoiceDownload";
import { ConvertDaysToNumbersInfo } from "../../services/utils/Utilities";

function formatDate(value: string) {
  return moment(value).format("DD-MM-YYYY");
}

export default function BookingSimple() {
  const [typeOf, setTypeOf] = useState<string>("");
  const [count, setCount] = useState<string>("0");
  const [email, setemail] = useState<string>("");
  const [cell, setcell] = useState<string>("");
  const [name, setname] = useState<string>("");
  const [startDate, setStartDate] = useState<string>(moment(new Date()).format("DD-MM-YYYY"));
  const [endDate, setEndDate] = useState<string>(moment(new Date()).format("DD-MM-YYYY"));
  const [isLogedIn, setIsLogedIn] = useState(false);
  const [isB, setIsB] = useState<boolean>(false);
  const [isBusyWithBooking, setisBusyWithBooking] = useState<boolean>(false);
  const [finalBooking, setfinalBooking] = useState<iBooking>({} as iBooking);

  const { currentUser } = useAuth();

  useEffect(() => {
    // ls of booking form being filled in
    let ls = window.localStorage.getItem("book");
    if (ls !== null) {
      let p = JSON.parse(ls);
      setCount(p.count);
      setTypeOf(p.ty.toString());
      setEndDate(p.end);
      setStartDate(p.start);
    }
  }, []);

  useEffect(() => {
    if (!isB) {
      // Prev bookings Get All Bookings for this user
      if (currentUser !== null && currentUser.uid.length > 0) {
        RetrieveUserBooking(currentUser.uid).then((res) => {
          console.log("res", res);
          if (res.client.length > 0) {
            setIsB(true);
          }
        });
      }
    }
  }, [currentUser]);

  function doStartDay(e: any) {
    setStartDate(formatDate(e.detail.value!));
  }

  function doEndDay(e: any) {
    setEndDate(formatDate(e.detail.value!));
  }

  function doBooking() {
    if (currentUser != undefined && currentUser.uid.length > 0) {
      let n = currentUser.displayName && currentUser.displayName.length > 0 ? currentUser.displayName : name;
      let ans = ConvertDaysToNumbersInfo(startDate, endDate, count);

      let final: iBooking = {
        name: n,
        email: currentUser.email && currentUser.email.length > 0 ? currentUser.email : email,
        cell: currentUser.cell && currentUser.cell.length > 0 ? currentUser.cell : cell,
        startDate: startDate ? startDate : "",
        endDate: endDate ? endDate : "",
        guestCount: count ? count : "0",
        typeOfBooking: typeOf ? typeOf : "",
        payed: false,
        ref: `${currentUser.displayName} ${startDate}`,
        uid: currentUser.uid ? currentUser.uid : "",
        inv: "",
        pop: "",
        totalcost: !isNaN(ans.gT) ? `${ans.gT}` : "0"
      };

      console.log("?FINAL?", final);
      setfinalBooking(final);
      setisBusyWithBooking(true);

      if (isBusyWithBooking) {
        // Do serverside booking email send
        SendBookingsEmail(final)
          .then((res) => {
            console.log("??? Sent ", res);
            window.alert("Your booking has been sent for approval. We will contact you shortly ");
          })
          .catch((err) => {
            console.log("??? error ", err);
            window.alert("Your booking could not be sent please try again");
            window.location.reload();
          });

        SaveBookingToDB(final)
          .then(() => {
            setCount("0");
            setEndDate("");
            setTypeOf("");
            setStartDate("");
            setIsLogedIn(false);
            setfinalBooking({} as iBooking);
            setisBusyWithBooking(false);
            window.localStorage.removeItem("book");
          })
          .catch((err) => {
            console.log("??? error ", err);
            window.alert("Your booking could not be sent please try again");
            window.location.reload();
          });
      }
    } else {
      console.log("log in  please", currentUser);
      let book = {
        start: startDate ? startDate : "",
        end: endDate ? endDate : "",
        count: count ? count : "0",
        ty: typeOf ? typeOf : ""
      };
      window.localStorage.setItem("book", JSON.stringify(book));
      setIsLogedIn(true);
    }
  }

  let nC = currentUser?.displayName.length === 0 ? (name.length == 0 ? true : false) : false;
  let eC = currentUser?.email.length === 0 ? (email.length == 0 ? true : false) : false;
  let cC = currentUser?.cell.length === 0 ? (cell.length == 0 ? true : false) : false;
  let dist = typeOf.length === 0 || count === "0" || startDate.length === 0 || endDate.length === 0 || nC || eC || cC;
  return (
    <>
      {isBusyWithBooking ? (
        <IonCard>
          <IonCardHeader>
            <IonCardTitle style={{ fontSize: "2rem", textAlign: "center" }}>
              <IonText color='primary'> Booking Completed</IonText>
            </IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <IonGrid>
              <IonRow>
                <IonCol></IonCol>
                <IonCol>
                  <InvoiceDownload data={finalBooking} />
                </IonCol>
                <IonCol></IonCol>
              </IonRow>
            </IonGrid>
          </IonCardContent>
        </IonCard>
      ) : (
        <IonCard>
          <IonCardHeader>
            <IonCardTitle style={{ fontSize: "2rem", textAlign: "center" }}>
              <IonText color='primary'> Book your getaway now</IonText>
            </IonCardTitle>
            <IonCardSubtitle style={{ fontSize: "1.5rem", textAlign: "center" }}>
              {/* Your email address will not be published.  */}
              <IonText color='secondary'>Required fields are marked *</IonText>
            </IonCardSubtitle>
          </IonCardHeader>
          <IonCardContent>
            <IonGrid>
              {/* Reason */}
              <IonRow>
                <IonCol>
                  <IonItem>
                    <IonLabel color='primary'>Reson for Booking</IonLabel>
                    <IonInput type='text' placeholder='Holiday' value={typeOf} onIonChange={(e) => setTypeOf(e.detail.value!)} />
                  </IonItem>
                </IonCol>
              </IonRow>

              {/* START & END */}
              <IonRow>
                <IonCol>
                  <IonItem button={true} id='open-date-input-start'>
                    <IonLabel>{startDate}</IonLabel>
                    <IonIcon color='primary' icon={calendar} />
                    <IonPopover trigger='open-date-input-start' showBackdrop={false}>
                      <IonDatetime presentation='date' onIonChange={(e) => doStartDay(e)} />
                    </IonPopover>
                  </IonItem>
                </IonCol>

                <IonCol>
                  <IonItem button={true} id='open-date-input-end'>
                    <IonLabel>{endDate}</IonLabel>
                    <IonIcon color='primary' icon={calendar} />
                    <IonPopover trigger='open-date-input-end' showBackdrop={false}>
                      <IonDatetime presentation='date' onIonChange={(e) => doEndDay(e)} />
                    </IonPopover>
                  </IonItem>
                </IonCol>

                {/* COUNT */}
                <IonCol>
                  <IonItem>
                    <IonLabel color='primary'>Amount of Guests</IonLabel>
                    <IonInput placeholder='0' type='text' value={count} onIonChange={(e) => setCount(e.detail.value!)} />
                  </IonItem>
                </IonCol>
              </IonRow>

              {/* email */}
              {currentUser?.email.length === 0 && (
                <IonRow>
                  <IonCol>
                    <IonItem>
                      <IonLabel color='primary'>Email</IonLabel>
                      <IonInput type='text' placeholder='john@gmail.com' value={email} onIonChange={(e) => setemail(e.detail.value!)} />
                    </IonItem>
                  </IonCol>
                </IonRow>
              )}
              {/* cell */}
              {currentUser?.cell.length === 0 && (
                <IonRow>
                  <IonCol>
                    <IonItem>
                      <IonLabel color='primary'>Cell</IonLabel>
                      <IonInput type='text' placeholder='0000000000' value={cell} onIonChange={(e) => setcell(e.detail.value!)} />
                    </IonItem>
                  </IonCol>
                </IonRow>
              )}
              {/* name */}
              {currentUser?.displayName.length === 0 && (
                <IonRow>
                  <IonCol>
                    <IonItem>
                      <IonLabel color='primary'>Name</IonLabel>
                      <IonInput type='text' placeholder='John Doe' value={name} onIonChange={(e) => setname(e.detail.value!)} />
                    </IonItem>
                  </IonCol>
                </IonRow>
              )}
              <IonRow>
                <IonCol>
                  <IonButton onClick={() => doBooking()} expand='full' disabled={dist}>
                    BOOK
                  </IonButton>
                </IonCol>
              </IonRow>
            </IonGrid>
          </IonCardContent>
        </IonCard>
      )}

      {currentUser !== null && (
        <IonButton routerLink={AllRoutePaths.ACCOUNT} expand='full'>
          Check All Bookings made
        </IonButton>
      )}
      {/* Login for more of the users info as well as saving the booking to the db */}
      <IonModal color='primary' isOpen={isLogedIn} showBackdrop={true} backdropDismiss={true} className='modal'>
        <IonCard className='modal' color='secondary'>
          <IonCardContent>
            <IonLabel>Please register or log in to book with us thank you </IonLabel>
            <IonButton color='tertiary' routerLink={AllRoutePaths.SIGN_IN} onClick={() => setIsLogedIn(false)}>
              Go to login
            </IonButton>
          </IonCardContent>
        </IonCard>
      </IonModal>
    </>
  );
}

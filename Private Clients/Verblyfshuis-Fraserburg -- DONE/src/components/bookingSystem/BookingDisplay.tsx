import { IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCol, IonLabel } from "@ionic/react";
import { iBooking } from "../../models/User_models";
import InvoiceDownload from "./InvoiceDownload";
import PopUpload from "./PopUpload";

export default function BookingDisplay(keyVal: number, entry: iBooking, entryID: string, isAdmin: boolean) {
  return (
    <IonCol key={keyVal}>
      <IonCard style={{ textAlign: "center" }}>
        <IonCardHeader>
          <IonCardTitle color='primary'>{entry.typeOfBooking}</IonCardTitle>
          {isAdmin && <IonCardTitle color='primary'>Name: {entry.name}</IonCardTitle>}
          {isAdmin && <IonCardTitle color='primary'>Email: {entry.email}</IonCardTitle>}
          {isAdmin && <IonCardTitle color='primary'>Cell: {entry.cell}</IonCardTitle>}

          <IonCardSubtitle>
            <IonLabel class="class='ion-text-wrap">Start Date: {entry.startDate}</IonLabel>
          </IonCardSubtitle>
          <IonCardSubtitle>
            <IonLabel class="class='ion-text-wrap">End Date: {entry.endDate}</IonLabel>
          </IonCardSubtitle>
          <IonCardSubtitle>
            <IonLabel class="class='ion-text-wrap">Guest count: {entry.guestCount}</IonLabel>
          </IonCardSubtitle>

          <IonCardSubtitle>
            <IonLabel class="class='ion-text-wrap">Toatal cost : {entry.totalcost}</IonLabel> <br />
          </IonCardSubtitle>

          <IonCardSubtitle>
            <IonLabel class="class='ion-text-wrap">Ref and invoice : {entry.ref}</IonLabel> <br />
            <InvoiceDownload data={entry} isCheck />
          </IonCardSubtitle>

          <IonCardSubtitle>
            <IonLabel class="class='ion-text-wrap">Proof of payment: {entry.payed.toString()}</IonLabel> <br />
            <PopUpload entry={entry} entryID={entryID} admin={isAdmin} />
          </IonCardSubtitle>
        </IonCardHeader>
      </IonCard>
    </IonCol>
  );
}

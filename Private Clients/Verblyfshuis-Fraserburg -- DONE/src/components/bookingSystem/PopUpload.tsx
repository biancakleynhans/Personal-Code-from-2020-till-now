import { IonButton } from "@ionic/react";
import { iBooking } from "../../models/User_models";
import { UploadPOPAndGetUrl } from "../../services/firebase/FirebaseStorageCRUD";
import { AddPOPToBookingAndUpdate } from "../../services/firebase/FirebaseFireStoreCRUD";
import { saveAs } from "file-saver";

interface iProps {
  entry: iBooking;
  entryID: string;
  admin: boolean;
}

export default function PopUpload(props: iProps) {
  function handleUploadPOP(e: any) {
    // e.preventDefault();
    let f = e.target.files[0];
    console.log("??? f upload ", f);
    if (f) {
      var fr = new FileReader();
      fr.onloadend = async () => {
        // console.log("???? f ???", f);
        // Upload fiel get Url t save
        let stringUrl = await UploadPOPAndGetUrl(f);
        // console.log("?? string url", stringUrl);

        // Update the user profile
        let update: iBooking = props.entry;
        console.log("Update before", props.entryID, props.entry);

        update.pop = stringUrl;
        update.payed = true;
        console.log("Update after", update);

        AddPOPToBookingAndUpdate(update, props.entryID)
          .then((res) => {
            window.alert("Proof of payment uploaded");
          })
          .catch((err) => {
            window.alert("Proof of payment could not be uploaded");
          });
      };
      fr.readAsText(f);
    }
  }

  function downloadPOP() {
    console.log("Download");
    saveAs(props.entry.pop, props.entry.ref);
  }

  return (
    <>
      {props.admin ? (
        <>
          <IonButton onClick={() => downloadPOP()} expand='full'>
            View and Download proof of payment
          </IonButton>
        </>
      ) : (
        <>
          <input type='file' id='file-upload' accept='*.pdf' style={{ display: "none" }} onChange={(e) => handleUploadPOP(e)} />
          <IonButton expand='full' onClick={() => (document as any).getElementById("file-upload").click()}>
            Upload Proof of payment
          </IonButton>
        </>
      )}
    </>
  );
}

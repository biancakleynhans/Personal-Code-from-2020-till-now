import { IonButton } from "@ionic/react";
import { saveAs } from "file-saver";
import moment from "moment";
import { useState } from "react";
import { addPaymentToOrder } from "../../firebase/FirebaseFirestore";
import { UploadPOPAndGetUrl } from "../../firebase/FirebaseStorage";
import { iInfoBase } from "../../models/Basic";
import { iOrder } from "../../models/Products";
import Loader from "./Loader";

interface iProps {
  order: iOrder;
  orderIndex: number;
  client: iInfoBase;
  admin: boolean;
}

export default function PopUpload(props: iProps) {
  const [loading, setloading] = useState<boolean>(false);
  const [msg, setmsg] = useState<string>("Uploading PoP...");
  function handleUploadPOP(e: any) {
    // e.preventDefault();
    let f = e.target.files[0];

    if (f) {
      var fr = new FileReader();

      fr.onloadend = async () => {
        // Upload file get Url to save
        setloading(true);
        await UploadPOPAndGetUrl(f)
          .then((url) => {
            console.log("?? string url", url);

            // Update the user profile
            let update: iOrder = props.order;
            console.log("before Update: ", props.client.uid, props.orderIndex, props.order);

            update.pop = url;
            update.isPaid = true;
            update.ordertracking.paymentDate = moment(new Date()).format("DD/MM/YYYY HH:mm");

            let old = props.client.orders;
            old[props.orderIndex] = update;

            console.log("after Update ", old);

            addPaymentToOrder(props.client.uid, old)
              .then((res) => {
                window.alert("Proof of payment uploaded");
              })
              .catch((err) => {
                console.log("Proof of payment could not be uploaded", err);
              });
          })
          .catch((err) => {
            console.log("err in uploading pop", err);
          });
      };
      fr.readAsText(f);
    }
  }

  function downloadPOP() {
    console.log("Download");
    let title = props.client.name.length > 0 ? props.client.name : props.client.email;
    saveAs(props.order.pop, title);
  }

  return (
    <>
      {props.admin ? (
        <>
          <IonButton onClick={() => downloadPOP()} fill='outline'>
            View and Download proof of payment
          </IonButton>
        </>
      ) : (
        <>
          <input type='file' id='file-upload' accept='*.pdf' style={{ display: "none" }} onChange={(e) => handleUploadPOP(e)} />

          <IonButton color='light' fill='clear' onClick={() => (document as any).getElementById("file-upload").click()}>
            Upload <br /> Proof of payment
          </IonButton>
        </>
      )}

      {loading && <Loader txt={msg} />}
    </>
  );
}

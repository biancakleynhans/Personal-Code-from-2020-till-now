import { IonCard } from "@ionic/react";
import { useState } from "react";
import Loader from "../../components/reusable/Loader";
import OcrReader from "../../components/reusable/OCR_Reader";
import { AddMultipleNewProducts } from "../../firebase/FirebaseAdmin";
import { iProduct } from "../../models/Products";

export default function ProductsImage() {
  const [loading, setloading] = useState<boolean>(false);

  function fromImage(inv: iProduct[]) {
    console.log("Done from images: ", inv);
    AddMultipleNewProducts(inv)
      .then(() => {
        window.alert("sucsessfull added products");
        setloading(false);
        //   window.location.reload()
      })
      .catch(() => {
        window.alert("Error in adding products");
        setloading(false);
        //   window.location.reload()
      });
  }
  return (
    <IonCard>
      <OcrReader onFinalise={(inv) => fromImage(inv)} />
      {loading && <Loader />}
    </IonCard>
  );
}

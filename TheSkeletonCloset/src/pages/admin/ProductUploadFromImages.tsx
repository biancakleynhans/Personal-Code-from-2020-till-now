import { IonCol, IonContent, IonGrid, IonLabel, IonPage, IonRow } from "@ionic/react";
import HeaderComponent from "../../components/headersFooters/HeaderComponent";
import OcrReader from "../../components/imageToText/OcrReader";
import { useData } from "../../firebase/FirebaseDataContext";
import { iProduct } from "../../models/Product_models";

export default function ProductUploadFromImages() {
  const { CreateNewProduct } = useData();

  function saveProductsToDB(data: iProduct[]) {
    console.log("DONE NOW SAVE TO DB", data);
    data.map((prod) => {
      CreateNewProduct(prod);
      window.alert(`Added ${prod.title}`);
    });
  }

  return (
    <IonPage>
      <IonContent>
        <HeaderComponent title='Product Upload From Image(s)' />
        <IonGrid>
          <IonRow>
            <IonCol></IonCol>
            <IonCol>
              <IonLabel class='ion-text-wrap' color='primary' style={{ fontSize: "30px" }}>
                Please ensure text is plain and that the text is written in a straight line
              </IonLabel>
            </IonCol>
            <IonCol></IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <OcrReader
                onFinalise={(data: iProduct[]) => {
                  saveProductsToDB(data);
                }}
              />
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
}

import React, { useState } from "react";
import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCol, IonGrid, IonImg, IonInput, IonItem, IonLabel, IonRow } from "@ionic/react";
import { WebProduct } from "../../models/Product_models";
import { SaveBatchedDataToDB, SaveSingleDataToDB } from "../../firebase/FirebaseFireStoreCRUD";

// Name: string;
// Desc: string;
// DesignFee: string;
// Price_per_unit: string;
// ImageFiles: any[];
// extras: any[];

export default function PrintProductUpload() {
  const [prodName, setProdName] = useState<string>("");
  const [prodDesc, setProdDesc] = useState<string>("");
  const [df, setDf] = useState<string>("");
  const [priceSingle, setpriceSingle] = useState<string>("");
  const [extra, setExtra] = useState<string>("");
  const [pictures, setPictures] = useState<{ data: any; url: "" }[]>([]);
  const [batch, setbatch] = useState<boolean>(false);
  const [batchData, setbatchData] = useState<WebProduct[]>([]);

  function resetSate() {
    setDf("");
    setExtra("");
    setPictures([]);
    setProdDesc("");
    setProdName("");
    setbatch(false);
    setbatchData([]);
    setpriceSingle("");
  }

  function submitForm() {
    let currProd: WebProduct = {
      Desc: prodDesc,
      DesignFee: df,
      ImageFiles: pictures,
      Name: prodName,
      Price_per_unit: priceSingle,
      extras: extra.split(",")
    };

    console.log("VALUES AT SUBMIT", batch, batchData, currProd);
    // gonna do batched or single saves data traffic in the end

    if (batch) {
      let new_batch = batchData;
      new_batch.push(currProd);
      setbatchData(new_batch);
    } else {
      // add single item to db
      SaveSingleDataToDB("print", currProd).then((re) => {
        console.log("RE", re);
        resetSate();
        window.alert(`The upload was ${re}`);
      });
    }
  }

  function sendBatchedData() {
    // Add to batch transaction to db
    SaveBatchedDataToDB("print", batchData).then((re) => {
      console.log("RE", re);
      resetSate();
      window.alert(`The upload was ${re}`);
    });
  }

  function handle_upload(e: any) {
    e.preventDefault();
    let tempArr: any[] = [];

    [...e.target.files].forEach((file) => {
      // console.log("file >>> ", file);
      tempArr.push({
        data: file,
        url: URL.createObjectURL(file)
      });
    });

    // console.log("pictures >> ", tempArr);
    setPictures(tempArr);
  }

  function removeImageFromArr(index: number) {
    let newArr = pictures;
    setPictures([]);
    newArr.splice(index, 1);
    setPictures(newArr);
  }

  return (
    <IonCard>
      <IonCardHeader>Would you like to batch tranctions or single items at a time</IonCardHeader>
      <IonCardSubtitle>
        <IonButton color={batch ? "primary" : "light"} onClick={() => setbatch(true)}>
          Batched
        </IonButton>
        <IonButton color={batch ? "light" : "primary"} onClick={() => setbatch(false)}>
          Single
        </IonButton>
      </IonCardSubtitle>
      <IonCardContent>
        {/* NAME */}
        <IonItem lines='none'>
          <IonLabel style={{ fontSize: "22.5px", padding: "11.5px" }} position='stacked'>
            Product name *
          </IonLabel>
          <IonInput value={prodName} type='text' onIonChange={(e) => setProdName(e.detail.value!)} minlength={1} maxlength={150} required />
        </IonItem>

        {/* DESC */}
        <IonItem lines='none'>
          <IonLabel style={{ fontSize: "22.5px", padding: "11.5px" }} position='stacked'>
            Product description *
          </IonLabel>
          <IonInput value={prodDesc} type='text' onIonChange={(e) => setProdDesc(e.detail.value!)} minlength={1} maxlength={450} required />
        </IonItem>

        {/* DESIGN * */}
        <IonItem lines='none'>
          <IonLabel style={{ fontSize: "22.5px", padding: "11.5px" }} position='stacked'>
            Design Fee *
          </IonLabel>
          <IonInput value={df} type='text' onIonChange={(e) => setDf(e.detail.value!)} minlength={1} maxlength={10} required />
        </IonItem>

        {/* Price * */}
        <IonItem lines='none'>
          <IonLabel style={{ fontSize: "22.5px", padding: "11.5px" }} position='stacked'>
            Price per Single Unit *
          </IonLabel>
          <IonInput value={priceSingle} type='text' onIonChange={(e) => setpriceSingle(e.detail.value!)} minlength={1} maxlength={10} required />
        </IonItem>

        {/* EXTRA * */}
        <IonItem lines='none'>
          <IonLabel style={{ fontSize: "22.5px", padding: "11.5px" }} position='stacked'>
            Possible extras (Please write all options separated by comma (,), if none leave empty )
          </IonLabel>
          <IonInput value={extra} type='text' onIonChange={(e) => setExtra(e.detail.value!)} minlength={1} maxlength={450} required />
        </IonItem>

        {/* IMAGES  */}
        <input type='file' multiple id='file-upload' accept='*.png, *.jpg, *.jpeg' style={{ display: "none" }} onChange={(e) => handle_upload(e)} />
        <IonItem>
          <IonLabel class='ion-text-wrap'>Image(s)</IonLabel>
          <IonButton color='secondary' onClick={() => (document as any).getElementById("file-upload").click()}>
            Choose image(s)
          </IonButton>
        </IonItem>
        {pictures.length > 0 && (
          <IonGrid>
            <IonRow>
              {pictures.map((data, index) => {
                return (
                  <IonCol size='2' key={index}>
                    <IonCard>
                      <IonCardContent>
                        <IonImg src={data.url} alt='broken' style={{ height: "150px", width: "150px" }} />
                        <IonButton color='tertiary' onClick={() => removeImageFromArr(index)}>
                          Remove
                        </IonButton>
                      </IonCardContent>
                    </IonCard>
                  </IonCol>
                );
              })}
            </IonRow>
          </IonGrid>
        )}

        <br />

        <IonButton onClick={() => submitForm()}>{batch ? "Add to batch" : "Upload"}</IonButton>
        <br />
        {batch && batchData.length > 2 ? <IonButton onClick={() => sendBatchedData()}>Upload batch data</IonButton> : <></>}
      </IonCardContent>
    </IonCard>
  );
}

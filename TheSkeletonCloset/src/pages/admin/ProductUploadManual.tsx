import { useState } from "react";
import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCol,
  IonContent,
  IonGrid,
  IonImg,
  IonInput,
  IonItem,
  IonLabel,
  IonPage,
  IonRow,
  IonSelect,
  IonSelectOption
} from "@ionic/react";
import HeaderComponent from "../../components/headersFooters/HeaderComponent";
import FooterComponent from "../../components/headersFooters/FooterComponent";
import { CatsDrop, iProduct, SubCatsDrop } from "../../models/Product_models";
import { useData } from "../../firebase/FirebaseDataContext";

// id: string;                  // title: string;     // desc: string;                // size: string;
// color: string;               // price: number;     // discountPercentage: number;  // stock: number;
// images: string[];            // category: string;  // subcategory: string;         // rating: number;
// brand: "Skeleton in the closet";

export default function ProductUploadManual() {
  const [name, setname] = useState<string>("");
  const [desc, setdesc] = useState<string>("");
  const [size, setsize] = useState<string>("");
  const [color, setcolor] = useState<string>("");
  const [price, setprice] = useState<number>(0.0);
  const [quant, setquant] = useState<number>(1);
  const [cat, setcat] = useState<string>("");
  const [subCat, setsubCat] = useState<string>("");
  const [imgArr, setimgArr] = useState<{ data: any; url: "" }[]>([]);

  const [batch, setbatch] = useState<boolean>(false);
  const [batchData, setbatchData] = useState<any[]>([]);

  const { CreateNewProduct } = useData();

  function resetSate() {
    setname("");
    setdesc("");
    setsize("");
    setcolor("");
    setprice(0.0);
    setquant(1);
    setcat("");
    setsubCat("");
    setimgArr([]);
  }

  function submitForm() {
    let currProd: iProduct = {
      title: name,
      desc: desc,
      size: size,
      color: color,
      price: price,
      stock: quant,
      images: [],
      category: cat,
      subcategory: subCat,
      brand: "Skeleton in the closet",
      discountPercentage: 1,
      id: "",
      rating: 5
    };
    console.log("VALUES AT SUBMIT: ", currProd); // batch, batchData,

    // gonna do batched or single saves data traffic in the end
    if (batch) {
      let new_batch = batchData;
      new_batch.push(currProd);
      setbatchData(new_batch);
      resetSate();
    } else {
      // Add single item to db
      //   SaveSingleDataToDB("print", currProd).then((re) => {
      //     console.log("RE", re);
      //     resetSate();
      // setbatch(false);
      // setbatchData([]);
      //     window.alert(`The upload was ${re}`);
      //   });
    }
  }

  function sendBatchedData() {
    batchData.forEach((prod, index) => {
      CreateNewProduct(prod);
      window.alert(`Added ${prod.title}`);

      if (index + 1 == batchData.length) {
        // run clean up
        resetSate();
        setbatch(false);
        setbatchData([]);
      }
    });
  }

  // IMAGES for PRODUCT
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
    setimgArr(tempArr);
  }

  function removeImageFromArr(index: number) {
    let newArr = imgArr;
    setimgArr([]);
    newArr.splice(index, 1);
    setimgArr(newArr);
  }

  return (
    <IonPage>
      <IonContent>
        <HeaderComponent title='Manual product upload page' />
        <IonGrid>
          <IonRow>
            <IonCol></IonCol>
            <IonCol>
              {" "}
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
                    <IonLabel style={{ fontSize: "20px", padding: "10px" }} position='stacked'>
                      Product name *
                    </IonLabel>
                    <IonInput value={name} type='text' onIonChange={(e) => setname(e.detail.value!)} minlength={1} maxlength={150} required />
                  </IonItem>

                  {/* DESC */}
                  <IonItem lines='none'>
                    <IonLabel style={{ fontSize: "20px", padding: "10px" }} position='stacked'>
                      Product description *
                    </IonLabel>
                    <IonInput value={desc} type='text' onIonChange={(e) => setdesc(e.detail.value!)} minlength={1} maxlength={450} required />
                  </IonItem>

                  {/* Color */}
                  <IonItem lines='none'>
                    <IonLabel style={{ fontSize: "20px", padding: "10px" }} position='stacked'>
                      Colors* <br /> Please write all options separated by comma (,)
                    </IonLabel>
                    <IonInput value={color} type='text' onIonChange={(e) => setcolor(e.detail.value!)} minlength={1} maxlength={450} required />
                  </IonItem>

                  {/* SIZE */}
                  <IonItem lines='none'>
                    <IonLabel style={{ fontSize: "20px", padding: "10px" }} position='stacked'>
                      Sizes * <br /> Please write all options separated by comma (,)
                    </IonLabel>
                    <IonInput value={size} type='text' onIonChange={(e) => setsize(e.detail.value!)} minlength={1} maxlength={450} required />
                  </IonItem>

                  {/* Price */}
                  <IonItem lines='none'>
                    <IonLabel style={{ fontSize: "20px", padding: "10px" }} position='stacked'>
                      Price per unit *
                    </IonLabel>
                    <IonInput value={price} type='number' onIonChange={(e) => setprice(Number(e.detail.value!))} minlength={1} maxlength={10} required />
                  </IonItem>

                  {/* Quantity */}
                  <IonItem lines='none'>
                    <IonLabel style={{ fontSize: "20px", padding: "10px" }} position='stacked'>
                      Quantity of product available *
                    </IonLabel>
                    <IonInput value={quant} type='number' onIonChange={(e) => setquant(Number(e.detail.value!))} minlength={1} maxlength={10} required />
                  </IonItem>

                  {/* Cat */}
                  <IonItem lines='none'>
                    <IonLabel class='ion-text-wrap' style={{ fontSize: "20px", padding: "10px" }} position='stacked'>
                      Main Catagory*
                    </IonLabel>
                    <IonSelect value={cat} onIonChange={(e) => setcat(e.detail.value)}>
                      {CatsDrop.map((entry, index) => (
                        <IonSelectOption key={`CAT${index}`} value={entry}>
                          {entry}
                        </IonSelectOption>
                      ))}
                    </IonSelect>
                  </IonItem>

                  {/* SubCat */}
                  <IonItem lines='none'>
                    <IonLabel class='ion-text-wrap' style={{ fontSize: "20px", padding: "10px" }} position='stacked'>
                      Sub Catagory*
                    </IonLabel>
                    <IonSelect value={subCat} onIonChange={(e) => setsubCat(e.detail.value)}>
                      {SubCatsDrop.map((entry, index) => (
                        <IonSelectOption key={`SUBCAT${index}`} value={entry}>
                          {entry}
                        </IonSelectOption>
                      ))}
                    </IonSelect>
                  </IonItem>

                  {/* IMAGES  */}
                  <input type='file' multiple id='file-upload' accept='*.png, *.jpg, *.jpeg' style={{ display: "none" }} onChange={(e) => handle_upload(e)} />
                  <IonItem>
                    <IonLabel class='ion-text-wrap' style={{ fontSize: "20px", padding: "10px" }}>
                      Image(s)
                    </IonLabel>
                    <IonButton color='secondary' onClick={() => (document as any).getElementById("file-upload").click()}>
                      Choose image(s)
                    </IonButton>
                  </IonItem>
                  {imgArr.length > 0 && (
                    <IonGrid>
                      <IonRow>
                        {imgArr.map((data, index) => {
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
            </IonCol>
            <IonCol></IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
}

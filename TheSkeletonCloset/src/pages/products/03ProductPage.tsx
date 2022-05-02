import { IonButton, IonCard, IonCardContent, IonCardSubtitle, IonCardTitle, IonCol, IonContent, IonGrid, IonItem, IonLabel, IonPage, IonRow } from "@ionic/react";
import { useEffect, useState } from "react";
import FooterComponent from "../../components/headersFooters/FooterComponent";
import HeaderComponent from "../../components/headersFooters/HeaderComponent";
import { useData } from "../../firebase/FirebaseDataContext";
import { iProduct } from "../../models/Product_models";

// THE SINGLE PRODUCT WANTED TO VIEW THIS IS WHERE ADD TO CART WILL COME INTO PLAY
// PATH:  "/inv/:cat/:subCat/:product"

export default function ProductPage() {
  const { Inventory } = useData();
  const [currProduct, setcurrProduct] = useState<iProduct>({} as iProduct);

  function setUp() {
    let path = window.location.pathname;
    let pathSplit = path.split("/");
    let cat = pathSplit[pathSplit.length - 3];
    let subcat = pathSplit[pathSplit.length - 2];
    let prod = pathSplit[pathSplit.length - 1];

    console.log("CAT: ", cat, "SUBCAT:", subcat, "PROD:", prod);

    if (
      Inventory !== undefined &&
      Inventory !== null &&
      Inventory[cat] !== undefined &&
      Inventory[cat][subcat] !== undefined &&
      Inventory[cat][subcat].products !== undefined &&
      Inventory[cat][subcat].products[prod] !== undefined
    ) {
      console.log("yaps subcat => Inventory", Inventory[cat][subcat].products[prod]);
      setcurrProduct(Inventory[cat][subcat].products[prod]);
    }
  }

  useEffect(() => {
    setUp();
  }, []);

  useEffect(() => {
    setUp();
  }, [window.location.pathname]);

  useEffect(() => {
    setUp();
  }, [Inventory]);

  return (
    <IonPage>
      <IonContent>
        <HeaderComponent title='' />

        <IonGrid style={{ fontSize: "23.5px" }}>
          <IonRow></IonRow>
          <IonRow class='ion-align-items-center'>
            {/*  Image */}
            <IonCol class='ion-align-self-center'>
              {currProduct.images !== undefined && currProduct.images.length > 0 ? (
                currProduct.images.map((img, index) => {
                  return <IonCard key={index} color='none' style={{ backgroundImage: `url(${img})` }} className='Card' />;
                })
              ) : (
                <></>
              )}
            </IonCol>

            {/* ProductDesc */}
            <IonCol class='ion-align-self-center'>
              <IonCard color='none'>
                <IonCardTitle style={{ fontSize: "28px" }}>{currProduct.title}</IonCardTitle>
                <IonCardTitle style={{ fontSize: "28px" }}>{currProduct.brand}</IonCardTitle>
                <IonCardSubtitle style={{ fontSize: "25px" }}>R {currProduct.price}</IonCardSubtitle>
                <IonCardContent>
                  <IonItem color='none' lines='none'>
                    <IonLabel class='ion-text-wrap'>Description: {currProduct.desc}</IonLabel>
                  </IonItem>

                  <IonItem color='none' lines='none'>
                    <IonLabel class='ion-text-wrap'>Color: {currProduct.color}</IonLabel>
                  </IonItem>

                  <IonItem color='none' lines='none'>
                    <IonLabel class='ion-text-wrap'>Size: {currProduct.size}</IonLabel>
                  </IonItem>

                  <IonItem color='none' lines='none'>
                    <IonLabel class='ion-text-wrap'>Quantity: 1</IonLabel>
                  </IonItem>

                  <br />
                  <br />
                  <IonLabel>Availability: Only {currProduct.stock} item(s) left. Bag it now!</IonLabel>
                  <br />
                  <IonButton color='primary'>Add to cart now</IonButton>
                </IonCardContent>
              </IonCard>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
      <FooterComponent />
    </IonPage>
  );
}

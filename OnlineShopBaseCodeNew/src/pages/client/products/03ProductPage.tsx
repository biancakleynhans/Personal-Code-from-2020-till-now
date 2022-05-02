import { IonButton, IonCard, IonCardContent, IonCardTitle, IonCol, IonContent, IonGrid, IonIcon, IonItem, IonLabel, IonPage, IonRow } from "@ionic/react";
import { addCircleOutline, removeCircleOutline } from "ionicons/icons";
import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import FooterBar from "../../../components/headersFooters/FooterBar";
import HeaderBar from "../../../components/headersFooters/HeaderBar";
import { PLACEHOLDER } from "../../../constants/AppBasedd";
import { addToUserCart } from "../../../firebase/FirebaseFirestore";
import { useData } from "../../../hooks/AdminDataHook";
import { useAuth } from "../../../hooks/AuthHook";
import { iCart, iProduct } from "../../../models/Products";

// THE SINGLE PRODUCT WANTED TO VIEW THIS IS WHERE ADD TO CART WILL COME INTO PLAY
// PATH:  "/inv/:cat/:subCat/:product"

export default function ProductPage() {
  const { inventory } = useData();
  const { currentUser } = useAuth();

  const loc = useLocation();

  const [currProduct, setcurrProduct] = useState<null | iProduct>(null);
  const [count, setcount] = useState<number>(1);

  function setUp() {
    let path = loc.pathname.split("/");
    let cat = path[path.length - 3];
    let subcat = path[path.length - 2];
    let prod = path[path.length - 1];

    if (inventory) {
      Object.keys(inventory).forEach((key) => {
        if (inventory[key].id === prod) {
          console.log("prod", inventory[key]);
          setcurrProduct(inventory[key]);
        }
      });
    }
  }

  useEffect(() => {
    setUp();
  }, [loc.pathname, inventory]);

  function add() {
    let total = count;
    if (currProduct && count + 1 <= currProduct.stock) {
      // console.log("adding...", total, total + 1);
      setcount(total + 1);
    }
  }

  function remove() {
    let total = count;
    if (count - 1 >= 1) {
      setcount(total - 1);
    }
  }

  function addToCart() {
    console.log("ADD: ", count, " OF ", currProduct);
    if (currProduct && currentUser) {
      let temp: iCart = {
        prodCount: count,
        prodId: currProduct.id,
        img: currProduct.images && currProduct.images[0] ? currProduct.images[0] : "",
        name: currProduct.title,
        price: currProduct.priceSell
      };

      console.log("temp", temp);

      if (currentUser.cart && currentUser.cart.length > 0) {
        let c: iCart[] = [...currentUser.cart];
        c.push(temp);
        addToUserCart(currentUser.uid, c)
          .then(() => {
            window.alert("Added item to cart");
          })
          .catch((err) => {
            window.alert("Error in adding product to cart");
          });
      } else {
        let c: iCart[] = [];
        c.push(temp);
        addToUserCart(currentUser.uid, c)
          .then(() => {
            window.alert("Added item to cart");
          })
          .catch((err) => {
            window.alert("Error in adding product to cart");
          });
      }
    }
  }

  return (
    <IonPage>
      <HeaderBar />
      <IonContent fullscreen>
        {currProduct && (
          <IonGrid style={{ fontSize: "23.5px" }}>
            <IonRow class='ion-align-items-center'>
              {/*  Image */}
              <IonCol class='ion-align-self-center'>
                {currProduct.images && currProduct.images[0] ? (
                  <IonCard color='none' style={{ backgroundImage: `url(${currProduct.images[0]})` }} className='Card' />
                ) : (
                  <IonCard color='none' style={{ backgroundImage: `url(${PLACEHOLDER})` }} className='Card' />
                )}
              </IonCol>

              {/* ProductDesc */}
              <IonCol class='ion-align-self-center'>
                <IonCard color='none'>
                  <IonCardTitle>{currProduct.title.toUpperCase()}</IonCardTitle>

                  <IonCardContent>
                    <IonItem color='none' lines='none'>
                      <IonLabel class='ion-text-wrap'>Brand: {currProduct.brand}</IonLabel>
                    </IonItem>
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
                      <IonLabel class='ion-text-wrap'>Price: {currProduct.priceSell}</IonLabel>
                    </IonItem>

                    {currProduct.stock > 0 ? (
                      <>
                        <IonItem color='none' lines='none'>
                          <IonButton fill='clear' onClick={() => add()}>
                            <IonIcon slot='icon-only' icon={addCircleOutline} />
                          </IonButton>
                          <IonLabel class='ion-text-wrap'>Quantity: {count}</IonLabel>
                          <IonButton fill='clear' onClick={() => remove()}>
                            <IonIcon slot='icon-only' icon={removeCircleOutline} />
                          </IonButton>
                        </IonItem>

                        <IonLabel color='danger'>Availability: Only {currProduct.stock} item(s) left. Bag it now!</IonLabel>
                        <br />

                        <IonItem color='none' lines='none'>
                          <IonLabel color='tertiary' class='ion-text-wrap'>
                            Total: {currProduct.priceSell * count}
                          </IonLabel>
                        </IonItem>

                        <IonButton fill='outline' color='primary' onClick={() => addToCart()}>
                          Add to cart now
                        </IonButton>
                      </>
                    ) : (
                      <>
                        <br />
                        <br />

                        <br />
                        <IonButton fill='outline' disabled color='danger'>
                          sold Out
                        </IonButton>
                      </>
                    )}
                  </IonCardContent>
                </IonCard>
              </IonCol>
            </IonRow>
          </IonGrid>
        )}
      </IonContent>
      <FooterBar />
    </IonPage>
  );
}

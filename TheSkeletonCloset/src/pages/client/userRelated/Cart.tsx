import React, { useEffect, useState } from "react";
import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonCol, IonContent, IonGrid, IonItem, IonLabel, IonList, IonPage, IonRow, IonThumbnail } from "@ionic/react";
import FooterBar from "../../../components/headersFooters/FooterBar";
import HeaderBar from "../../../components/headersFooters/HeaderBar";
import PageHeader from "../../../components/headersFooters/PageHeader";
import { useAuth } from "../../../hooks/AuthHook";
import CartContent from "../../../components/reusable/CartContent";
import Loader from "../../../components/reusable/Loader";
import Checkout from "./Checkout";
import CheckIfAvailable from "../../../components/reusable/CheckIfAvailable";
import { useData } from "../../../hooks/AdminDataHook";
import { iCart } from "../../../models/Products";
import { addToUserCart } from "../../../firebase/FirebaseFirestore";
import { iInfoBase } from "../../../models/Basic";

export default function Cart() {
  const { currentUser } = useAuth();
  const { inventory } = useData();

  const [subtotal, setsubtotal] = useState<number>(0.0);
  const [total, settotal] = useState<number>(0.0);
  const [deliveryCost, setdeliveryCost] = useState<number>(50.0);
  const [checkingOut, setcheckingOut] = useState<boolean>(false);

  const [CART, setCART] = useState<iCart[]>([]);

  const [mQuery, setMQuery] = useState({
    matches: window.innerWidth > 768 ? true : false
  });

  useEffect(() => {
    let mediaQuery = window.matchMedia("(min-width: 768px)");
    mediaQuery.addListener(setMQuery);
    return () => mediaQuery.removeListener(setMQuery);
  }, []);

  useEffect(() => {
    cartSetUp();
  }, []);

  useEffect(() => {
    cartSetUp();
  }, [currentUser?.cart, inventory]);

  function cartSetUp() {
    if (currentUser && currentUser.cart) {
      let temp = 0.0;
      let cleanded = CheckIfAvailable({ cart: currentUser.cart, inventory: inventory !== null ? Object.values(inventory) : [] });

      if (cleanded.length !== currentUser.cart.length) {
        window.alert("ONe or more items in your cart is no longer available");
        addToUserCart(currentUser.uid, cleanded)
          .then(() => {
            setCART(cleanded);
            cleanded.forEach((c) => {
              temp = temp + c.price;
              // console.log("??", temp);
              setsubtotal(temp);
              settotal(temp + deliveryCost);
            });
          })
          .catch((err) => {
            console.log("error in updating cart", err);
          });
      } else {
        setCART(cleanded);
        cleanded.forEach((c) => {
          temp = temp + c.price;
          // console.log("??", temp);
          setsubtotal(temp);
          settotal(temp + deliveryCost);
        });
      }
    }
  }

  return (
    <IonPage>
      <HeaderBar />
      <IonContent fullscreen>
        <PageHeader header='Cart' />
        {CART ? (
          <IonGrid>
            {!checkingOut && (
              <IonRow className='ion-align-items-center'>
                <IonCol>
                  <IonList>
                    {/* <IonItem>
                      <IonButton slot='end' color='warning' fill='outline' onClick={() => {}}>
                        Edit
                      </IonButton>
                    </IonItem> */}

                    <IonItem>
                      <IonThumbnail style={{ marginRight: "15px" }}></IonThumbnail>
                      <IonLabel style={{ textAlign: "center" }} color='medium'>
                        Name
                      </IonLabel>
                      <IonLabel style={{ textAlign: "center" }} color='medium'>
                        Price
                      </IonLabel>
                      <IonLabel style={{ textAlign: "center" }} color='medium'>
                        Quantity
                      </IonLabel>
                    </IonItem>

                    {CART && <CartContent arr={CART} />}
                  </IonList>
                </IonCol>
                <IonCol size={mQuery && mQuery.matches ? "4" : "12"}>
                  <IonCard>
                    <IonCardHeader>
                      <IonCardTitle>Your order</IonCardTitle>
                    </IonCardHeader>
                    <IonCardContent>
                      <IonGrid>
                        <IonRow>
                          <IonCol>{CART.length} Item(s)</IonCol>
                          <IonCol>R {subtotal} </IonCol>
                        </IonRow>

                        <IonRow>
                          <IonCol>Delivery cost</IonCol>
                          <IonCol>R {deliveryCost}</IonCol>
                        </IonRow>

                        <IonRow>
                          <IonCol>Total</IonCol>
                          <IonCol>R {total}</IonCol>
                        </IonRow>

                        {/* <IonRow>
                          <IonCol>Coupon</IonCol>
                        </IonRow> */}

                        <IonRow>
                          <IonCol>
                            <IonButton disabled={checkingOut} fill='outline' color='success' onClick={() => setcheckingOut(true)}>
                              Check out now
                            </IonButton>
                          </IonCol>
                        </IonRow>
                      </IonGrid>
                    </IonCardContent>
                  </IonCard>
                </IonCol>
              </IonRow>
            )}

            {/* CHECK OUT SECTION  */}
            {checkingOut && (
              <IonRow>
                <IonCol>
                  <Checkout cart={CART} client={currentUser !== null ? currentUser : ({} as iInfoBase)} goBack={() => setcheckingOut(false)} />
                </IonCol>
              </IonRow>
            )}
          </IonGrid>
        ) : (
          <Loader txt='Loading...' />
        )}
      </IonContent>
      <FooterBar />
    </IonPage>
  );
}

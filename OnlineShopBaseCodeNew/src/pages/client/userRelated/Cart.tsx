import React, { useEffect, useState } from "react";
import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonCol, IonContent, IonGrid, IonItem, IonLabel, IonList, IonPage, IonRow, IonThumbnail } from "@ionic/react";
import FooterBar from "../../../components/headersFooters/FooterBar";
import HeaderBar from "../../../components/headersFooters/HeaderBar";
import PageHeader from "../../../components/headersFooters/PageHeader";
import { useAuth } from "../../../hooks/AuthHook";
import CartContent from "../../../components/reusable/CartContent";
import Loader from "../../../components/reusable/Loader";
import Checkout from "./Checkout";

export default function Cart() {
  const { currentUser } = useAuth();

  const [subtotal, setsubtotal] = useState<number>(0.0);
  const [total, settotal] = useState<number>(0.0);
  const [deliveryCost, setdeliveryCost] = useState<number>(50.0);
  const [checkingOut, setcheckingOut] = useState<boolean>(false);

  const [mQuery, setMQuery] = useState({
    matches: window.innerWidth > 768 ? true : false
  });

  useEffect(() => {
    let mediaQuery = window.matchMedia("(min-width: 768px)");
    mediaQuery.addListener(setMQuery);
    return () => mediaQuery.removeListener(setMQuery);
  }, []);

  useEffect(() => {
    if (currentUser && currentUser.cart) {
      let temp = 0.0;

      currentUser.cart.forEach((c) => {
        temp = temp + c.price;
        // console.log("??", temp);
        setsubtotal(temp);
        settotal(temp + deliveryCost);
      });
    }
  }, [currentUser?.cart]);

  return (
    <IonPage>
      <HeaderBar />
      <IonContent fullscreen>
        <PageHeader header='Cart' />
        {currentUser && currentUser.cart ? (
          <IonGrid>
            {!checkingOut && (
              <IonRow className='ion-align-items-center'>
                <IonCol>
                  <IonList>
                    <IonItem>
                      <IonButton slot='end' color='warning' fill='outline' onClick={() => {}}>
                        Edit
                      </IonButton>
                    </IonItem>

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

                    {currentUser && currentUser.cart && <CartContent arr={currentUser.cart} />}
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
                          <IonCol>{currentUser.cart.length} Item(s)</IonCol>
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

                        <IonRow>
                          <IonCol>Coupon</IonCol>
                        </IonRow>

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
                  <Checkout cart={currentUser.cart} client={currentUser} goBack={() => setcheckingOut(false)} />
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

import { IonButton, IonDatetime, IonIcon, IonItem, IonLabel, IonPopover } from "@ionic/react";
import { calendar } from "ionicons/icons";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { addDatesToOrder } from "../../firebase/FirebaseFirestore";
import { useAuth } from "../../hooks/AuthHook";
import { colorCoder } from "../../layout/ColorCoders";
import Grided from "../../layout/Grided";
import { iOrder } from "../../models/Products";

export default function Orders() {
  const [loading, setloading] = useState(true);
  const [showDetails, setshowDetails] = useState<boolean[][]>([]);

  const [packedOpen, setpackedOpen] = useState<boolean>(false);
  const [shippedOpen, setshippedOpen] = useState<boolean>(false);
  const [delivedOpen, setdelivedOpen] = useState<boolean>(false);

  const { AllUsers } = useAuth();

  useEffect(() => {
    let arr: boolean[][] = [];

    if (AllUsers) {
      AllUsers.forEach((x, i) => {
        console.log(i, " > ", x.orders);
        arr.push([]);

        x.orders.forEach((o, i) => {
          console.log("??", arr[i]);
          arr[i].push(false);
        });
      });
      setshowDetails(arr);
      setloading(false);
    }
  }, [AllUsers]);

  function displayOne() {
    return <></>;
  }

  function showNow(indexUser: number, indexOrder: number) {
    let change = [...showDetails];
    // console.log(">>>", change[indexUser][indexOrder]);
    change[indexUser][indexOrder] = !change[indexUser][indexOrder];
    setshowDetails(change);
  }

  function handleDATE(ev: any, uid: string, oI: number, uI: number, type: "orderPackedDate" | "shippingDate" | "deliveryDate") {
    let d = moment(new Date(ev.detail.value));
    let datum = d.format("DD/MM/YYYY HH:mm");
    console.log("EV PACKED", ev.detail.value, datum);

    setpackedOpen(false);
    setdelivedOpen(false);
    setshippedOpen(false);

    // make data
    if (AllUsers) {
      let updatedOrders: iOrder[] = [];
      console.log("??", AllUsers);

      AllUsers.forEach((u, i) => {
        if (i === uI) {
          updatedOrders = [...u.orders];
          u.orders.forEach((o, ii) => {
            if (ii === oI) {
              console.log("found the one", updatedOrders[oI], u.orders[oI]);

              if (type === "orderPackedDate") {
                updatedOrders[oI].ordertracking.orderPackedDate = datum;
              }

              if (type === "deliveryDate") {
                updatedOrders[oI].ordertracking.deliveryDate = datum;
              }

              if (type === "shippingDate") {
                updatedOrders[oI].ordertracking.shippingDate = datum;
              }

              // Server call
              addDatesToOrder(uid, updatedOrders)
                .then(() => {})
                .catch((err) => {
                  console.log("error", err);
                });
            }
          });
        }
      });
    }
  }

  function displayOrder(order: iOrder, name: string, iU: number, iO: number, c: string, uid: string) {
    return (
      <>
        <IonButton fill='clear' color={c} onClick={() => showNow(iU, iO)}>
          {name}
        </IonButton>
        <br />

        <IonItem lines='full'>
          <IonLabel color={c} class='ion-text-wrap'>
            Order placed on: {order.ordertracking.orderDate}
          </IonLabel>
        </IonItem>
        <br />

        <IonItem lines='full'>
          <IonLabel color={c} class='ion-text-wrap'>
            {order.isPaid ? "Paid on: " : "Waiting on payment"} {order.isPaid && <>{order.ordertracking.paymentDate}</>}
          </IonLabel>
        </IonItem>
        <br />

        <IonItem lines='full'>
          <IonLabel color={c} class='ion-text-wrap'>
            Packed on: {order.ordertracking.orderPackedDate}
          </IonLabel>
          {order.ordertracking.orderPackedDate.length === 0 && (
            <div key='orderPackedDate'>
              <IonButton
                color={c}
                fill='clear'
                onClick={() => {
                  setpackedOpen(!packedOpen);
                }}>
                <IonIcon slot='icon-only' icon={calendar} />
              </IonButton>
              <IonPopover showBackdrop={true} isOpen={packedOpen}>
                <IonDatetime presentation='date' onIonChange={(ev) => handleDATE(ev, uid, iO, iU, "orderPackedDate")} />
              </IonPopover>
            </div>
          )}
        </IonItem>
        <br />

        <IonItem lines='full'>
          <IonLabel color={c} class='ion-text-wrap'>
            Shipped on:{order.ordertracking.shippingDate}
          </IonLabel>
          {order.ordertracking.shippingDate.length === 0 && (
            <div key='shippingDate'>
              <IonButton
                color={c}
                fill='clear'
                onClick={() => {
                  setshippedOpen(!shippedOpen);
                }}>
                <IonIcon slot='icon-only' icon={calendar} />
              </IonButton>
              <IonPopover showBackdrop={true} isOpen={shippedOpen}>
                <IonDatetime presentation='date' onIonChange={(ev) => handleDATE(ev, uid, iO, iU, "shippingDate")} />
              </IonPopover>
            </div>
          )}
        </IonItem>
        <br />

        <IonItem lines='full'>
          <IonLabel color={c} class='ion-text-wrap'>
            Delivery due on: {order.ordertracking.deliveryDate}
          </IonLabel>
          {order.ordertracking.deliveryDate.length === 0 && (
            <div key='deliveryDate'>
              <IonButton
                color={c}
                fill='clear'
                onClick={() => {
                  setdelivedOpen(!delivedOpen);
                }}>
                <IonIcon slot='icon-only' icon={calendar} />
              </IonButton>
              <IonPopover showBackdrop={true} isOpen={delivedOpen}>
                <IonDatetime presentation='date' onIonChange={(ev) => handleDATE(ev, uid, iO, iU, "deliveryDate")} />
              </IonPopover>
            </div>
          )}
        </IonItem>
        <br />

        <IonItem color={c}>
          <IonLabel class='ion-text-wrap'>PRODUCTS ORDERED:</IonLabel>
        </IonItem>

        {order.products.map((prod, inx) => (
          <IonItem key={inx} color={c}>
            <IonLabel class='ion-text-wrap'>
              {prod.prodCount} of {prod.name}
            </IonLabel>
          </IonItem>
        ))}
      </>
    );
  }

  function displayListOfOrders() {
    return (
      <>
        {AllUsers &&
          AllUsers.map(
            (user, indexUser) =>
              user.orders &&
              user.orders.length > 0 && (
                <React.Fragment key={indexUser}>
                  {user.orders.map((order, indexOrder) => {
                    // console.log("working??", showDetails[indexUser][indexOrder]);
                    let c = colorCoder(order.isPaid, order.ordertracking.orderPackedDate, order.ordertracking.shippingDate, order.ordertracking.deliveryDate);
                    return (
                      <React.Fragment key={indexOrder}>
                        {showDetails && showDetails[indexUser] && showDetails[indexUser][indexOrder] ? (
                          displayOrder(order, user.name, indexUser, indexUser, c, user.uid)
                        ) : (
                          <IonButton fill='clear' color={c} onClick={() => showNow(indexUser, indexOrder)}>
                            {user.name} {order.ordertracking.orderDate}
                          </IonButton>
                        )}
                      </React.Fragment>
                    );
                  })}
                </React.Fragment>
              )
          )}
      </>
    );
  }
  return <Grided addingJsx={displayOne()} displayEditList={displayListOfOrders()} header='All Orders' loading={loading} />;
}

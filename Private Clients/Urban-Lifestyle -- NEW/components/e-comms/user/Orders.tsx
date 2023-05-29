import React, { useEffect, useState } from 'react';

interface iProps {
  // curr: iInfoBase;
}

export default function Orders(props: iProps) {
  // const [showDetails, setshowDetails] = useState<boolean[]>([]);

  // useEffect(() => {
  //   let arr: boolean[] = [];
  //   props.curr.orders.forEach((x) => arr.push(false));
  //   setshowDetails(arr);
  // }, [props.curr.orders]);

  // function showNow(index: number) {
  //   let change = [...showDetails];
  //   change[index] = !change[index];
  //   setshowDetails(change);
  // }

  return (
    <>
      {/* {props.curr && props.curr.orders ? (
        <IonList>
          <IonLabel class='ion-text-wrap'>ALL ORDERS: </IonLabel>
          <br />
          {colorMarker()}
          <p>Click on button to view details</p>
          {props.curr.orders.map((order, index) => {
            let c = colorCoder(order.isPaid, order.ordertracking.orderPackedDate, order.ordertracking.shippingDate, order.ordertracking.deliveryDate);

            return (
              <>
                {!showDetails[index] ? (
                  <IonItemDivider sticky={true} color={c}>
                    <IonButton style={{ color: "black", height: "auto" }} fill='clear' onClick={() => showNow(index)}>
                      <IonLabel class='ion-text-wrap'>Order placed on: {order.ordertracking.orderDate}</IonLabel>
                    </IonButton>
                  </IonItemDivider>
                ) : (
                  <>
                    <IonItemDivider sticky={true} color={c}>
                      <IonButton style={{ color: "black", height: "auto" }} fill='clear' onClick={() => showNow(index)}>
                        <IonLabel class='ion-text-wrap'>Order placed on: {order.ordertracking.orderDate}</IonLabel>
                      </IonButton>
                    </IonItemDivider>

                    <IonItem lines='none' color={c}>
                      <IonLabel class='ion-text-wrap'>
                        {order.isPaid ? "Paid on :" : "Waiting on payment"} {order.isPaid && <>{order.ordertracking.paymentDate}</>}
                      </IonLabel>

                      {!order.isPaid && <PopUpload admin={false} order={order} orderIndex={index} client={props.curr} />}
                    </IonItem>

                    {order.ordertracking.orderPackedDate.length > 0 && (
                      <IonItem lines='none' color={c}>
                        <IonLabel class='ion-text-wrap'>{order.ordertracking.orderPackedDate}</IonLabel>
                      </IonItem>
                    )}

                    {order.ordertracking.shippingDate.length > 0 && (
                      <IonItem lines='none' color={c}>
                        <IonLabel class='ion-text-wrap'>{order.ordertracking.shippingDate}</IonLabel>
                      </IonItem>
                    )}

                    {order.ordertracking.deliveryDate.length > 0 && (
                      <IonItem lines='none' color={c}>
                        <IonLabel class='ion-text-wrap'>{order.ordertracking.deliveryDate}</IonLabel>
                      </IonItem>
                    )}

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
                )}
              </>
            );
          })}
        </IonList>
      ) : (
      )} */}
      <>No Orders Yet</>
    </>
  );
}

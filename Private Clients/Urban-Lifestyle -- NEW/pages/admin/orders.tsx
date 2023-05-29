import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { iOrder } from '../../models/Products';
import { colorCoder } from '../../utils/ColorCoders';

export default function OrdersPage() {
  const [loading, setloading] = useState(true);
  const [showDetails, setshowDetails] = useState<boolean[][]>([]);

  const [packedOpen, setpackedOpen] = useState<boolean>(false);
  const [shippedOpen, setshippedOpen] = useState<boolean>(false);
  const [delivedOpen, setdelivedOpen] = useState<boolean>(false);

  const { users } = useAuth();

  useEffect(() => {
    let arr: boolean[][] = [];

    if (users) {
      users.forEach((x, i) => {
        // console.log(i, ' > ', x.orders);
        arr.push([]);

        if (x.orders && x.orders.length > 0) {
          x.orders.forEach((o, i) => {
            // console.log('??', arr[i]);
            arr[i].push(false);
          });
        }
      });
      setshowDetails(arr);
      setloading(false);
    }
  }, [users]);

  function displayOne() {
    return <></>;
  }

  function showNow(indexUser: number, indexOrder: number) {
    let change = [...showDetails];
    // console.log(">>>", change[indexUser][indexOrder]);
    change[indexUser][indexOrder] = !change[indexUser][indexOrder];
    setshowDetails(change);
  }

  function handleDATE(ev: any, uid: string, oI: number, uI: number, type: 'orderPackedDate' | 'shippingDate' | 'deliveryDate') {
    let d = moment(new Date(ev.detail.value));
    let datum = d.format('DD/MM/YYYY HH:mm');
    // console.log('EV PACKED', ev.detail.value, datum);

    setpackedOpen(false);
    setdelivedOpen(false);
    setshippedOpen(false);

    // make data
    if (users) {
      let updatedOrders: iOrder[] = [];
      // console.log('??', users);

      users.forEach((u, i) => {
        if (i === uI) {
          updatedOrders = [...u.orders];
          u.orders.forEach((o, ii) => {
            if (ii === oI) {
              // console.log('found the one', updatedOrders[oI], u.orders[oI]);

              if (type === 'orderPackedDate') {
                updatedOrders[oI].ordertracking.orderPackedDate = datum;
              }

              if (type === 'deliveryDate') {
                updatedOrders[oI].ordertracking.deliveryDate = datum;
              }

              if (type === 'shippingDate') {
                updatedOrders[oI].ordertracking.shippingDate = datum;
              }

              // Server call
              // addDatesToOrder(uid, updatedOrders)
              //   .then(() => {})
              //   .catch((err) => {
              //     console.log('error', err);
              //   });
            }
          });
        }
      });
    }
  }

  function displayOrder(order: iOrder, name: string, iU: number, iO: number, c: string, uid: string) {
    return (
      <>
        <button color={c} onClick={() => showNow(iU, iO)}>
          {name}
        </button>
        <br />

        <div>
          <label color={c}>Order placed on: {order.ordertracking.orderDate}</label>
        </div>
        <br />

        <div>
          <label color={c}>
            {order.isPaid ? 'Paid on: ' : 'Waiting on payment'} {order.isPaid && <>{order.ordertracking.paymentDate}</>}
          </label>
        </div>
        <br />

        <div>
          <label color={c}>Packed on: {order.ordertracking.orderPackedDate}</label>
          {order.ordertracking.orderPackedDate.length === 0 && (
            <div key='orderPackedDate'>
              <button
                color={c}
                onClick={() => {
                  setpackedOpen(!packedOpen);
                }}
              >
                {/* <IonIcon slot='icon-only' icon={calendar} /> */}
              </button>
              {/* <IonPopover showBackdrop={true} isOpen={packedOpen}>
                <IonDatetime presentation='date' onIonChange={(ev) => handleDATE(ev, uid, iO, iU, 'orderPackedDate')} />
              </IonPopover> */}
            </div>
          )}
        </div>
        <br />

        <div>
          <label color={c}>Shipped on:{order.ordertracking.shippingDate}</label>
          {order.ordertracking.shippingDate.length === 0 && (
            <div key='shippingDate'>
              <button
                color={c}
                onClick={() => {
                  setshippedOpen(!shippedOpen);
                }}
              >
                {/* <IonIcon slot='icon-only' icon={calendar} /> */}
              </button>
              {/* <IonPopover showBackdrop={true} isOpen={shippedOpen}>
                <IonDatetime presentation='date' onIonChange={(ev) => handleDATE(ev, uid, iO, iU, 'shippingDate')} />
              </IonPopover> */}
            </div>
          )}
        </div>
        <br />

        <div>
          <label color={c}>Delivery due on: {order.ordertracking.deliveryDate}</label>
          {order.ordertracking.deliveryDate.length === 0 && (
            <div key='deliveryDate'>
              <button
                color={c}
                onClick={() => {
                  setdelivedOpen(!delivedOpen);
                }}
              >
                {/* <IonIcon slot='icon-only' icon={calendar} /> */}
              </button>
              {/* <IonPopover showBackdrop={true} isOpen={delivedOpen}>
                <IonDatetime presentation='date' onIonChange={(ev) => handleDATE(ev, uid, iO, iU, 'deliveryDate')} />
              </IonPopover> */}
            </div>
          )}
        </div>
        <br />

        <div color={c}>
          <label>PRODUCTS ORDERED:</label>
        </div>

        {order.products.map((prod, inx) => (
          <div key={inx} color={c}>
            <label>
              {prod.prodCount} of {prod.name}
            </label>
          </div>
        ))}
      </>
    );
  }

  function displayListOfOrders() {
    return (
      <>
        {users &&
          users.map(
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
                          displayOrder(order, user.fn, indexUser, indexUser, c, user.uid)
                        ) : (
                          <button color={c} onClick={() => showNow(indexUser, indexOrder)}>
                            {user.fn} {order.ordertracking.orderDate}
                          </button>
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

  return <div>All orders placed by customers track trace send page</div>;
}

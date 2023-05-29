import { IonButton, IonCardContent } from "@ionic/react";
import moment from "moment";
import React, { useEffect, useRef, useState } from "react";
import { useHistory } from "react-router";
import { useReactToPrint } from "react-to-print";
import { BANKING_DETAILS, COMPANY_NAME, LOGO } from "../../constants/AppBasedd";
import { cartToOrder } from "../../firebase/FirebaseFirestore";
import { iInfoBase } from "../../models/Basic";
import { iCart, iOrder } from "../../models/Products";
import { RoutesObj } from "../../routes/Routes";
import "../../theme/Invoice.css";
import Loader from "./Loader";

interface iProps {
  cartData: iCart[];
  client: iInfoBase;
  OnCheckout: () => void;
  goBack: () => void;
  //   isCheck?: boolean;
}

function CreateInvoice(preview: boolean, ref: React.MutableRefObject<any>, client: iInfoBase, cart: iCart[], payRef: string, shipCost: number, isSmall: boolean, logo: string = LOGO) {
  let grandTotal = 0;

  cart.forEach((item) => {
    grandTotal = grandTotal + item.prodCount * item.price;
    console.log("???", grandTotal, grandTotal + item.prodCount * item.price);
  });

  return (
    <div style={{ display: preview ? "block" : "none" }}>
      <div id='Content' ref={ref}>
        <table>
          <caption>Invoice</caption>
          <thead>
            {/* LOGO IMAGE LEFT */}
            <tr>
              <th scope='col'>
                <div style={{ width: "293px", height: "193px" }}>
                  <img src={logo} style={{ width: "inherit", height: "inherit", objectFit: "scale-down", objectPosition: "left bottom" }} />
                </div>
                <br />
                <br />
                <br />
                <br />
              </th>
            </tr>

            {/* PAYMENT INFO SECTION RIGHT */}
            <tr>
              <th scope='col'>
                Invoice for: <br />
                {client.name?.length > 0 ? client.name : client.email} <br />
                <br />
                <br />
                <br />
              </th>

              <th scope='col'>
                Payment ref: <br />
                {payRef} <br />
                <br />
                <br />
                <br />
              </th>

              <th scope='col'>
                Payment Details: <br />
                {BANKING_DETAILS.accName} <br />
                {BANKING_DETAILS.bankName} <br />
                {BANKING_DETAILS.acc} <br />
                {BANKING_DETAILS.type} <br />
              </th>

              <th scope='col'>
                Due Date: <br />
                By {moment(new Date()).add(7, "days").format("DD/MM/YYYY")} <br />
                <br />
                <br />
                <br />
              </th>
            </tr>

            {/* PRODUCTS HEARDER */}
            <tr>
              <th scope='col'>Product Name</th>
              <th scope='col'>Qty</th>
              <th scope='col'>Unit price</th>
              <th scope='col'>Total price</th>
            </tr>

            <br />
          </thead>
          <tbody>
            {cart.map((item, index) => {
              return (
                <tr key={index}>
                  <td data-label='Name: '>{item.name}</td>
                  <td data-label='Quantity: '>{item.prodCount}</td>
                  <td data-label='Unit Price: '>{item.price}</td>
                  <td data-label='subtotal: '>{item.price * item.prodCount}</td>
                </tr>
              );
            })}

            <tr>
              {isSmall && (
                <>
                  <td></td>
                  <td></td>
                </>
              )}
              <th style={{ color: "var(--ion-color-warning)" }} data-label='Subtotal: '>
                Subtotal: {grandTotal}
              </th>
              {isSmall && (
                <>
                  <td></td>
                  <td></td>
                </>
              )}
            </tr>
            <tr>
              {isSmall && (
                <>
                  <td></td>
                  <td></td>
                </>
              )}
              <th style={{ color: "var(--ion-color-warning)" }} data-label='Shipping: '>
                Shipping: {shipCost}
              </th>
              {isSmall && (
                <>
                  <td></td>
                  <td></td>
                </>
              )}
            </tr>
            <tr>
              {isSmall && (
                <>
                  <td></td>
                  <td></td>
                </>
              )}

              <th style={{ color: "var(--ion-color-success)" }} data-label='Total Cost: '>
                Total Cost: {grandTotal + shipCost}
              </th>
              {isSmall && (
                <>
                  <td></td>
                  <td></td>
                </>
              )}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default function InvoiceDownload(props: iProps) {
  const ref = useRef(null);
  const hist = useHistory();
  const [preview, setpreview] = useState<boolean>(true);
  const [loading, setloading] = useState<boolean>(false);

  const [mQuery, setMQuery] = useState({
    matches: window.innerWidth > 768 ? true : false
  });

  useEffect(() => {
    let mediaQuery = window.matchMedia("(min-width: 768px)");
    mediaQuery.addListener(setMQuery);
    return () => mediaQuery.removeListener(setMQuery);
  }, []);

  const print = useReactToPrint({
    documentTitle: `Invoice for ${COMPANY_NAME}.pdf`,
    copyStyles: false, // bug when using true did work no longer works
    content: () => ref.current
  });

  function approve() {
    let con = window.confirm(
      "Are you sure you want to process your order and complete to payment screen this will. By acepting you agree to process payment with 7 days Please use your refrence on your invoice as payment refrence once you upload your proof of payment order will be placed sucessfully and shipping status and tracking will become available."
    );

    if (con) {
      if (props.client.uid) {
        setloading(true);
        console.log("confirmed");
        let newOrder: iOrder = {
          ordertracking: {
            delivered: false,
            paymentDate: "",
            deliveryDate: "",
            notes: "",
            orderDate: moment(new Date()).format("DD/MM/YY HH:mm"),
            orderPackedDate: "",
            shippingDate: "",
            trackingNr: ""
          },
          products: props.cartData,
          isPaid: false,
          inv: "",
          pop: ""
        };

        let old: iOrder[] = [...props.client.orders];
        old.push(newOrder);
        console.log("OLD", old);

        print();
        cartToOrder(props.client.uid, props.cartData, old.reverse())
          .then(() => {
            setloading(false);
            hist.push(RoutesObj.client.profile.path);
          })
          .catch((err) => console.log("ERROR", err));
      }
    } else {
      console.log("process stopped");
      setpreview(!preview);
      if (preview) {
        props.goBack();
      }
    }
  }

  return (
    <>
      {loading ? (
        <Loader txt='Please wait while processing your order...' />
      ) : (
        <IonCardContent>
          <IonButton
            fill='outline'
            color='success'
            onClick={() => {
              setpreview(!preview);
              if (preview) {
                props.goBack();
              }
            }}>
            Preview Invoice
          </IonButton>
          <br />
          {/* INVOICE GOES HERE */}
          {CreateInvoice(preview, ref, props.client, props.cartData, `${props.client.name.length > 0 ? props.client.name : "YOUR NAME"} `, 50.0, mQuery.matches)}
          <br />
          <IonButton fill='outline' color='success' onClick={() => approve()}>
            Accept Invoice and Print
          </IonButton>
        </IonCardContent>
      )}
    </>
  );
}

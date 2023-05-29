import React, { useRef, useState } from "react";
import { IonButton } from "@ionic/react";
import { useReactToPrint } from "react-to-print";
import "../../theme/Invoice.css";
import LOGO from "../../assets/images/logos/LOGO.png";
import { iBooking } from "../../models/User_models";
import { ConvertDaysToNumbersInfo } from "../../services/utils/Utilities";

const blank = (
  <tr style={{ height: "20px" }}>
    <th id='790763898R10' style={{ height: "20px" }} className='row-headers-background'>
      <div className='row-header-wrapper' style={{ lineHeight: "20px" }} />
    </th>
    <td className='s0'></td>
    <td className='s4'></td>
    <td className='s4'></td>
    <td className='s4'></td>
    <td className='s9'></td>
    <td className='s4'></td>
    <td className='s4'></td>
  </tr>
);

interface iProps {
  data: iBooking;
  isCheck?: boolean;
}

export default function InvoiceDownload(props: iProps) {
  const ref = useRef(null);
  const [preview, setpreview] = useState<boolean>(false);

  const print = useReactToPrint({
    documentTitle: `Invoice for ${props?.data?.name}.pdf`,
    copyStyles: true,
    content: () => {
      return ref.current;
    }
  });

  function descContent(guestTotal: number) {
    let arr: JSX.Element[] = [];
    if (props !== undefined && props.data !== undefined) {
      let ans = ConvertDaysToNumbersInfo(props.data.startDate, props.data.endDate, props.data.guestCount);

      for (let i = 0; i < guestTotal; i++) {
        arr.push(
          <tr style={{ height: "39px" }}>
            <th id='790763898R11' style={{ height: "39px" }} className='row-headers-background'>
              <div className='row-header-wrapper' style={{ lineHeight: "39px" }} />
            </th>
            <td className='s0'></td>
            <td className='s11' dir='ltr' colSpan={3}>
              Booking from {props.data.startDate} till {props.data.endDate}
            </td>
            <td className='s12' dir='ltr'>
              {ans.dT} days
            </td>
            <td className='s12' dir='ltr'>
              R 449
            </td>
            <td className='s12' dir='ltr'>
              R {ans.pT}
            </td>
          </tr>
        );
      }

      arr.push(blank);
      arr.push(blank);

      /* TOTAL */
      arr.push(
        <tr style={{ height: "25px" }}>
          <th id='790763898R19' style={{ height: "25px" }} className='row-headers-background'>
            <div className='row-header-wrapper' style={{ lineHeight: "25px" }} />
          </th>
          <td className='s6'></td>
          <td className='s26'></td>
          <td className='s23'></td>
          <td className='s23'></td>
          <td className='s23'></td>
          <td className='s28' dir='ltr' style={{ fontSize: "22px" }}>
            Total: <br /> R {ans.gT}
          </td>
          <td className='s29' dir='ltr'></td>
        </tr>
      );
    }

    return arr;
  }

  return (
    <>
      <IonButton
        expand='full'
        onClick={() => {
          setpreview(!preview);
        }}>
        {props.isCheck ? "Preview Invoice" : "Preview and approve Invoice"}
      </IonButton>
      <IonButton expand='full' onClick={print}>
        Print Invoice
      </IonButton>
      <div style={{ display: preview ? "block" : "none" }}>
        <div id='Content' ref={ref} className='ritz grid-container' dir='ltr'>
          <table className='waffle no-grid' cellSpacing='0' cellPadding='0'>
            <thead>
              <tr>
                <th></th>
                <th style={{ width: "48px", background: "white", border: "none" }} />
                <th style={{ width: "136px", background: "white", border: "none" }} />
                <th style={{ width: "131px", background: "white", border: "none" }} />
                <th style={{ width: "90px", background: "white", border: "none" }} />
                <th style={{ width: "223px", background: "white", border: "none" }} />
                <th style={{ width: "104px", background: "white", border: "none" }} />
                <th style={{ width: "188px", background: "white", border: "none" }} />
              </tr>
            </thead>

            <tbody>
              <tr style={{ height: "25px" }}>
                <th></th>
                <td></td>
                <td className='s1' dir='ltr' colSpan={4} style={{ fontSize: " 40px" }}>
                  Invoice
                </td>
                <td className='s2' colSpan={2} rowSpan={3}>
                  <div style={{ width: "293px", height: "193px" }}>
                    <img src={LOGO} style={{ width: "inherit", height: "inherit", objectFit: "scale-down", objectPosition: "left bottom" }} />
                  </div>
                </td>
              </tr>
              <tr style={{ height: "23px" }}>
                <th id='790763898R1' style={{ height: "23px" }} className='row-headers-background'>
                  <div className='row-header-wrapper' style={{ lineHeight: "23px" }} />
                </th>
                <td className='s0'></td>
                <td className='s3' dir='ltr' colSpan={2}></td>
                <td className='s4'></td>
                <td className='s4'></td>
              </tr>
              <tr style={{ height: "143px" }}>
                <th id='790763898R2' style={{ height: "143px" }} className='row-headers-background'>
                  <div className='row-header-wrapper' style={{ lineHeight: "143px" }} />
                </th>
                <td className='s0'></td>
                <td className='s5' dir='ltr' colSpan={2}></td>
                <td className='s6' colSpan={2}></td>
              </tr>
              <tr style={{ height: "85px" }}>
                <th id='790763898R3' style={{ height: "85px" }} className='row-headers-background'>
                  <div className='row-header-wrapper' style={{ lineHeight: "85px" }} />
                </th>
                <td className='s7'></td>
                <td className='s8' dir='ltr'></td>
                <td className='s8' dir='ltr'></td>
                <td className='s8' dir='ltr'></td>
                <td className='s8' dir='ltr'></td>
                <td className='s8' dir='ltr'></td>
                <td className='s8' dir='ltr'></td>
              </tr>

              {/* INVOICE INFO */}
              <tr style={{ height: "23px" }}>
                <th id='790763898R4' style={{ height: "23px" }} className='row-headers-background'>
                  <div className='row-header-wrapper' style={{ lineHeight: "23px" }} />
                </th>
                <td className='s7'></td>
                <td className='s8' dir='ltr' colSpan={2} style={{ fontSize: "20px" }}>
                  Invoice for: <br /> {props?.data?.name}
                </td>
                <td className='s8' dir='ltr' colSpan={2} style={{ fontSize: "20px" }}>
                  Payable to: <br />
                  Verblyfhuis-Fraserburg
                </td>
                <td className='s8' dir='ltr' colSpan={2} style={{ fontSize: "20px" }}>
                  Invoice refrence: <br /> {props?.data?.ref}
                </td>
              </tr>

              {blank}

              {/* DUE DATE */}
              <tr style={{ height: "23px" }}>
                <th id='790763898R7' style={{ height: "23px" }} className='row-headers-background'>
                  <div className='row-header-wrapper' style={{ lineHeight: "23px" }} />
                </th>
                <td className='s0'></td>
                <td className='s9' dir='ltr' colSpan={2}></td>
                <td className='s8' dir='ltr' colSpan={2}></td>
                <td className='s8' dir='ltr' colSpan={2} style={{ fontSize: "20px" }}>
                  Due date: Before {props?.data?.startDate}
                </td>
              </tr>
              {blank}
              {blank}
              {blank}
              {blank}
              {/* HEARDER FOR CONTENT  */}
              <tr style={{ height: "39px" }}>
                <th id='790763898R11' style={{ height: "39px" }} className='row-headers-background'>
                  <div className='row-header-wrapper' style={{ lineHeight: "39px" }} />
                </th>
                <td className='s0'></td>
                <td className='s11' dir='ltr' colSpan={3} style={{ fontSize: "24px" }}>
                  Description
                </td>
                <td className='s12' dir='ltr' style={{ fontSize: "24px" }}>
                  Qty
                </td>
                <td className='s12' dir='ltr' style={{ fontSize: "24px" }}>
                  Unit price
                </td>
                <td className='s12' dir='ltr' style={{ fontSize: "24px" }}>
                  Total price
                </td>
              </tr>
              {blank}

              {descContent(Number(props.data.guestCount)).map((ele, index) => {
                return <React.Fragment key={index}>{ele}</React.Fragment>;
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

import React, { useState } from "react";
import { IonButton, IonCard, IonCardContent, IonLabel } from "@ionic/react";
import { iProduct } from "../../models/Products";
import UploadBtn from "../../components/reusable/UploadBtn";
import * as Excel from "exceljs/dist/exceljs.min.js";
import { TEMP_LINK } from "../../constants/AppBasedd";
import Loader from "../../components/reusable/Loader";
import { AddMultipleNewProducts } from "../../firebase/FirebaseAdmin";

export async function handleUpload_Stock(files: File[]) {
  return await Promise.all(
    files.map((f) => {
      return new Promise<iProduct[]>((resolve, reject) => {
        // console.log("???", f);
        const wb = new Excel.Workbook();
        const reader = new FileReader();
        const rABS = !!reader.readAsBinaryString;

        let finalArr: iProduct[] = [];

        reader.onload = (e) => {
          if (e.target) {
            const buffer = reader.result;
            wb.xlsx
              .load(buffer)
              .then((workbook: any) => {
                var ws = workbook.worksheets[0];
                //   console.log("WS: ", ws);

                ws.eachRow({ includeEmpty: false }, function (row: any, rowNumber: number) {
                  let r: any[] = row.values;
                  if (rowNumber > 7) {
                    //   console.log("Row ", rowNumber, "data: ");

                    let newProd: iProduct = {
                      id: "",
                      title: r[1],
                      desc: r[2],
                      size: r[3],
                      color: r[4],
                      priceRaw: r[5],
                      priceSell: r[8],
                      markupPercentage: r[6],
                      discountPercentage: r[7],
                      stock: r[9],
                      images: [],
                      category: r[11],
                      subcategory: r[12],
                      rating: 5,
                      brand: r[10]
                    };

                    finalArr.push(newProd);
                  }
                });
                resolve(finalArr);
              })
              .catch((err: any) => {
                reject(`There was an error readung the excel file ${JSON.stringify(err)}`);
              });
          } else {
            reject("reader does not work");
          }
        };

        if (rABS) reader.readAsBinaryString(f);
        else reader.readAsArrayBuffer(f);
      });
    })
  );
}

export default function ProductUploadFile() {
  const str = "and use this excel sheet for stock upload via file";
  const [loading, setloading] = useState(false);
  const [txt, settxt] = useState<string>("");

  function handle_upload(e: any) {
    e.preventDefault();
    setloading(true);
    settxt("Scanning files...");
    if (e.target.files) {
      //   console.log("E:", e);
      var AllFiles: any[] = [];
      [...e.target.files].map((file) => AllFiles.push(file));
      //   console.log("all files", AllFiles);

      if (AllFiles.length > 0) {
        settxt("Processing files ....");
        handleUpload_Stock(AllFiles).then((res) => {
          let single: iProduct[] = [];
          res.forEach((r) => (single = [...single, ...r]));
          //   console.log("COMPLETED: ", res, ">>", single);

          settxt("Conecting to server to upload new products ....");
          AddMultipleNewProducts(single)
            .then(() => {
              window.alert("sucsessfull added products");
              setloading(false);
              //   window.location.reload()
            })
            .catch(() => {
              window.alert("Error in adding products");
              setloading(false);
              //   window.location.reload()
            });
        });
      }
    }
  }

  return (
    <IonCard>
      <IonCardContent>
        <IonButton color='danger' fill='clear' onClick={() => window.open(TEMP_LINK, "_blank")}>
          Please click here to download
        </IonButton>
        <br />
        <IonLabel class='ion-text-wrap' color='danger'>
          {str.toUpperCase()}
        </IonLabel>
        <br />
        <UploadBtn type='file' upload={(e) => handle_upload(e)} />
      </IonCardContent>
      {loading && <Loader txt={txt} />}
    </IonCard>
  );
}

import React, { useState, useEffect } from 'react';
import { iProduct } from '../../../models/Products';
import * as Excel from 'exceljs/dist/exceljs.min.js';
import CardContainer from '../../shared/reusable/CardContainer';
import UploadComponent from '../../shared/reusable/UploadComponent';
import { TEMP_LINK } from '../../../constants/AppConstants';
import AddProductManual from './AddProductManual';
import moment from 'moment';

interface iProps {
  handleComplete: (products: iProduct) => void;
}

async function handleUpload_Stock(files: File[]) {
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
                      id: '',
                      name: r[1] ? r[1] : '',
                      desc: r[2] ? r[2] : '',
                      size: r[3] ? r[3] : '',
                      color: r[4] ? r[4] : '',
                      priceRaw: r[5] ? r[5] : '',
                      markupPercentage: r[6] ? r[6] : '',
                      discountPercentage: r[7] ? r[7] : '',
                      priceSell: r[8] ? r[8] : '',
                      stock: r[9] ? r[9] : '',
                      images: [],
                      category: r[11] ? r[11] : '',
                      subcategory: r[12] ? r[12] : '',
                      rating: 0,
                      brand: r[10] ? r[10] : '',
                      dateCreated: new Date(),
                      isOnSale: false,
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
            reject('reader does not work');
          }
        };

        if (rABS) reader.readAsBinaryString(f);
        else reader.readAsArrayBuffer(f);
      });
    })
  );
}

export default function AddProductFromFile(props: iProps) {
  const { handleComplete } = props;

  const [loading, setloading] = useState(false);
  const [txt, settxt] = useState<string>('');
  const [allProducts, setallProducts] = useState<iProduct[]>([]);
  const [finalArr, setfinalArr] = useState<iProduct[]>([]);
  const [showComplete, setshowComplete] = useState(false);

  useEffect(() => {}, [finalArr]);

  function handle_upload(e: any) {
    setloading(true);
    settxt('Scanning files...');
    if (e) {
      //   console.log("E:", e);
      var AllFiles: any[] = [];
      [...e].map((file) => AllFiles.push(file));
      //   console.log("all files", AllFiles);

      if (AllFiles.length > 0) {
        settxt('Please check all products and add images where needed ');
        handleUpload_Stock(AllFiles).then((res) => {
          let single: iProduct[] = [];
          res.forEach((r) => (single = [...single, ...r]));
          //   console.log('COMPLETED: ', res, '>>', single);
          setallProducts(single);
        });
      }
    }
  }

  function returnedProduct(prod: iProduct) {
    let clone = finalArr;
    clone.push(prod);
    setfinalArr(clone);

    if (clone.length === allProducts.length) {
      setshowComplete(true);
    }
  }

  function completeFinal() {
    setloading(true);
    settxt('Saving new products to database please wait');
    Promise.all(
      finalArr.map((prod) => {
        return new Promise<void>((resolve, reject) => {
          handleComplete(prod);
          settxt('Saved');
          resolve();
        });
      })
    ).then(() => {
      setloading(false);
      setshowComplete(false);
    });
  }

  return (
    <CardContainer isDark={true} width='w-full' title subtitle>
      <div>
        <button className='w-full text-lg font-serif text-center text-red-500 font-semibold my-2' onClick={() => window.open(TEMP_LINK, '_blank')}>
          Please click here to download the Upload template
        </button>

        <UploadComponent labelText='Upload Stock list now' handleChange={(e) => handle_upload(e)} />

        {loading && <div>{txt}</div>}
      </div>
      {/* Display all products */}
      {allProducts.map((prod, index) => (
        <AddProductManual
          key={index}
          defaultObject={prod}
          type='uploadAdd'
          onCreateSingle={() => {}}
          onUpdate={() => {}}
          loading={loading}
          closeOnComplete={() => {}}
          handleFromFile={(prod: iProduct) => returnedProduct(prod)}
        />
      ))}

      {showComplete && (
        <button onClick={() => completeFinal()} className='rounded border-2 p-2 my-4 w-[80%] mx-10 text-center'>
          Save to products to database
        </button>
      )}
    </CardContainer>
  );
}

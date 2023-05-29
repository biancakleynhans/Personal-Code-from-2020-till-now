import { useEffect, useState } from "react";
import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonInput, IonItem, IonLabel, IonSelect, IonSelectOption } from "@ionic/react";
import { useData } from "../../hooks/AdminDataHook";
import { iProduct, iProductCreator } from "../../models/Products";
import ImagesDisplay from "../../components/reusable/ImagesDisplay";
import { AddMultipleNewProducts, AddNewProduct, UpdateProduct } from "../../firebase/FirebaseAdmin";
import { stringToImgArr } from "../../utils/Helpers";
import { ImageArr, UploadImagesAndGetUrl } from "../../firebase/FirebaseStorage";
import Loader from "../../components/reusable/Loader";
import UploadBtn from "../../components/reusable/UploadBtn";

interface iProps {
  type: "add" | "edit";
  default: iProduct;
}

export default function ProductUploadManual(props: iProps) {
  const { categories, subcategories, brands } = useData();

  const [name, setname] = useState<string>(props.default.title);
  const [desc, setdesc] = useState<string>(props.default.desc);
  const [size, setsize] = useState<string>(props.default.size);
  const [color, setcolor] = useState<string>(props.default.color);

  const [priceRaw, setpriceRaw] = useState<number>(props.default.priceRaw);
  const [priceSell, setpriceSell] = useState<number>(props.default.priceSell);
  const [markupPercentige, setmarkupPercentige] = useState<number>(props.default.markupPercentage);
  const [discountPercentige, setdiscountPercentige] = useState<number>(props.default.discountPercentage);

  const [quant, setquant] = useState<number>(props.default.stock);
  const [cat, setcat] = useState<string>(props.default.category);
  const [subCat, setsubCat] = useState<string>(props.default.subcategory);
  const [brand, setbrand] = useState<string>(props.default.brand);
  const [imgArr, setimgArr] = useState<ImageArr[]>(stringToImgArr(props.default.images));

  const [batch, setbatch] = useState<boolean>(false);
  const [batchData, setbatchData] = useState<iProductCreator[]>([]);

  const [loading, setloading] = useState<boolean>(false);

  useEffect(() => {
    if (categories && subcategories && brands) {
      console.log("Setting up...", Object.keys(categories), Object.keys(subcategories), Object.keys(brands));
    }
  }, [categories, subcategories, brands]);

  useEffect(() => {
    var calc = (parseFloat(priceRaw.toString()) * parseFloat(markupPercentige.toString())) / 100;
    let total = priceRaw + calc;
    // console.log("sell price:", total, " : ", markupPercentige, calc, priceRaw);
    setpriceSell(total);
  }, [markupPercentige, priceRaw]);

  function resetSate() {
    setname("");
    setdesc("");
    setsize("");
    setcolor("");
    setquant(0);
    setcat("");
    setsubCat("");
    setimgArr([]);
    setdiscountPercentige(0);
    setmarkupPercentige(0);
    setpriceRaw(0.0);
    setpriceSell(0.0);
  }

  function submitForm() {
    let currProd: iProductCreator = {
      title: name,
      desc: desc,
      size: size,
      color: color,
      images: imgArr,
      category: cat,
      subcategory: subCat,
      brand: brand,
      id: props.default.id,
      rating: 5,
      priceRaw: priceRaw,
      priceSell: priceSell,
      markupPercentage: markupPercentige,
      discountPercentage: discountPercentige,
      stock: quant
    };

    console.log("Batched:", batch, "new product: ", currProd, imgArr);

    // batched upload so add new product
    if (batch) {
      let new_batch = [...batchData];
      new_batch.push(currProd);
      console.log("Batched Data:", new_batch, batchData);
      setbatchData(new_batch);
      resetSate();
    }
    // single product upload
    else {
      if (props.type === "add") {
        setloading(true);
        // Upload images first
        UploadImagesAndGetUrl(imgArr)
          .then((imgs) => {
            console.log("Imgs", imgs);
            let temp: iProduct = {
              brand: currProd.brand,
              category: currProd.category,
              color: currProd.color,
              desc: currProd.desc,
              discountPercentage: currProd.discountPercentage,
              id: currProd.id,
              images: imgs,
              markupPercentage: currProd.markupPercentage,
              priceRaw: currProd.priceRaw,
              priceSell: currProd.priceSell,
              rating: currProd.rating,
              size: currProd.size,
              stock: currProd.stock,
              subcategory: currProd.subcategory,
              title: currProd.title
            };
            AddNewProduct(temp)
              .then(() => {
                setloading(false);
                window.alert("sucsessfull added product");
                resetSate();
              })
              .catch(() => {
                setloading(false);
                resetSate();
                window.alert("Error in adding product");
              });
          })
          .catch((err) => {
            setloading(false);
            console.log("ERROR IMG UPLOAD", err);
          });
      } else {
        console.log("EDITING...");
        setloading(true);
        let newUpload = [];
        let old: string[] = [];

        let t = currProd.images.filter((e) => e.data.size === 0);
        old = t.map((e) => e.url);
        newUpload = currProd.images.filter((e) => e.data.size > 0);
        console.log("old", old, "new", newUpload);

        if (newUpload.length > 0) {
          //   // Upload images first
          UploadImagesAndGetUrl(newUpload)
            .then((imgs) => {
              console.log("Imgs", imgs);
              let temp: iProduct = {
                brand: currProd.brand,
                category: currProd.category,
                color: currProd.color,
                desc: currProd.desc,
                discountPercentage: currProd.discountPercentage,
                id: currProd.id,
                images: [...old, ...imgs],
                markupPercentage: currProd.markupPercentage,
                priceRaw: currProd.priceRaw,
                priceSell: currProd.priceSell,
                rating: currProd.rating,
                size: currProd.size,
                stock: currProd.stock,
                subcategory: currProd.subcategory,
                title: currProd.title
              };

              console.log("temp", temp);
              UpdateProduct(temp)
                .then(() => {
                  setloading(false);
                  window.alert("sucsessfull edited this product");
                  resetSate();
                })
                .catch(() => {
                  resetSate();
                  setloading(false);
                  window.alert("Error in editing this product");
                });
            })
            .catch((err) => {
              setloading(false);
              console.log("ERROR IMG UPLOAD", err);
            });
        } else {
          let temp: iProduct = {
            brand: currProd.brand,
            category: currProd.category,
            color: currProd.color,
            desc: currProd.desc,
            discountPercentage: currProd.discountPercentage,
            id: currProd.id,
            images: [...old],
            markupPercentage: currProd.markupPercentage,
            priceRaw: currProd.priceRaw,
            priceSell: currProd.priceSell,
            rating: currProd.rating,
            size: currProd.size,
            stock: currProd.stock,
            subcategory: currProd.subcategory,
            title: currProd.title
          };

          console.log("temp", temp);
          UpdateProduct(temp)
            .then(() => {
              setloading(false);
              window.alert("sucsessfull edited this product");
              resetSate();
            })
            .catch(() => {
              resetSate();
              setloading(false);
              window.alert("Error in editing this product");
            });
        }
      }
    }
  }

  function sendBatchedData() {
    setloading(true);
    // Upload images first
    Promise.all(
      batchData.map((prod) => {
        return new Promise<iProduct>((resolve, reject) => {
          UploadImagesAndGetUrl(prod.images)
            .then((imgs) => {
              let temp: iProduct = {
                brand: prod.brand,
                category: prod.category,
                color: prod.color,
                desc: prod.desc,
                discountPercentage: prod.discountPercentage,
                id: prod.id,
                images: imgs,
                markupPercentage: prod.markupPercentage,
                priceRaw: prod.priceRaw,
                priceSell: prod.priceSell,
                rating: prod.rating,
                size: prod.size,
                stock: prod.stock,
                subcategory: prod.subcategory,
                title: prod.title
              };
              resolve(temp);
            })
            .catch((err) => {
              console.log("ERROR IMG UPLOAD", err);
              setloading(false);
              reject(err);
            });
        });
      })
    )
      .then((products) => {
        console.log("Uploaded", products);
        AddMultipleNewProducts(products)
          .then(() => {
            resetSate();
            window.alert("sucsessfull added products");
          })
          .catch(() => {
            resetSate();
            window.alert("Error in adding products");
          });
      })
      .catch((err) => {
        console.log("ERROR", err);
      });
  }

  // IMAGES for PRODUCT
  function handle_upload(e: any) {
    e.preventDefault();
    let tempArr: any[] = [];

    [...e.target.files].forEach((file) => {
      tempArr.push({
        data: file,
        url: URL.createObjectURL(file)
      });
    });
    // console.log("pictures >> ", tempArr);
    setimgArr([...imgArr, ...tempArr]);
  }

  function removeImageFromArr(index: number) {
    let tempArr: any[] = [];

    [...imgArr].forEach((entry, i) => {
      if (index !== i) {
        tempArr.push(entry);
      }
    });
    // console.log("pictures >> ", tempArr);
    setimgArr(tempArr);
  }

  return (
    <IonCard>
      {props.type === "add" && (
        <>
          <IonCardHeader>Would you like to batch tranctions or single items at a time</IonCardHeader>
          <IonCardSubtitle>
            <IonButton fill={batch ? "outline" : "clear"} onClick={() => setbatch(true)}>
              Batched
            </IonButton>
            <IonButton fill={!batch ? "outline" : "clear"} onClick={() => setbatch(false)}>
              Single
            </IonButton>
          </IonCardSubtitle>
        </>
      )}
      <IonCardContent>
        {/* NAME */}
        <IonItem lines='none'>
          <IonLabel class='ion-text-wrap' position='stacked'>
            Product name *
          </IonLabel>
          <IonInput value={name} type='text' onIonChange={(e) => setname(e.detail.value!)} minlength={1} maxlength={150} required />
        </IonItem>

        {/* DESC */}
        <IonItem lines='none'>
          <IonLabel class='ion-text-wrap' position='stacked'>
            Product description *
          </IonLabel>
          <IonInput value={desc} type='text' onIonChange={(e) => setdesc(e.detail.value!)} minlength={1} maxlength={450} required />
        </IonItem>

        {/* Color */}
        <IonItem lines='none'>
          <IonLabel class='ion-text-wrap' position='stacked'>
            Colors * Please write all options separated by comma (,)
          </IonLabel>
          <IonInput value={color} type='text' onIonChange={(e) => setcolor(e.detail.value!)} minlength={1} maxlength={450} required />
        </IonItem>

        {/* SIZE */}
        <IonItem lines='none'>
          <IonLabel class='ion-text-wrap' position='stacked'>
            Sizes * Please write all options separated by comma (,)
          </IonLabel>
          <IonInput value={size} type='text' onIonChange={(e) => setsize(e.detail.value!)} minlength={1} maxlength={450} required />
        </IonItem>

        {/* Price Markup*/}
        <IonItem lines='none'>
          <IonLabel class='ion-text-wrap' position='stacked'>
            Markup Percentige (Added to cost price of Product)*
          </IonLabel>
          <IonInput value={markupPercentige} type='number' onIonChange={(e) => setmarkupPercentige(Number(e.detail.value!))} min={0} max={100} required />
        </IonItem>

        {/* Price Discount*/}
        <IonItem lines='none'>
          <IonLabel class='ion-text-wrap' position='stacked'>
            Discount Percentige * (When on sale calulated on total item price) *
          </IonLabel>
          <IonInput value={discountPercentige} type='number' onIonChange={(e) => setdiscountPercentige(Number(e.detail.value!))} min={0} max={100} required />
        </IonItem>

        {/* Price Raw*/}
        <IonItem lines='none'>
          <IonLabel class='ion-text-wrap' position='stacked'>
            Cost price per unit *
          </IonLabel>
          <IonInput value={priceRaw} type='number' onIonChange={(e) => setpriceRaw(Number(e.detail.value!))} minlength={1} maxlength={10} required />
        </IonItem>

        {/* Price Sell*/}
        <IonItem lines='none'>
          <IonLabel class='ion-text-wrap' position='stacked'>
            Selling price per unit * (Auto calulated but can be adjusted)
          </IonLabel>
          <IonInput value={priceSell} type='number' onIonChange={(e) => setpriceSell(Number(e.detail.value!))} minlength={1} maxlength={10} required />
        </IonItem>

        {/* Quantity */}
        <IonItem lines='none'>
          <IonLabel class='ion-text-wrap' position='stacked'>
            Quantity of product available *
          </IonLabel>
          <IonInput value={quant} type='number' onIonChange={(e) => setquant(Number(e.detail.value!))} minlength={1} maxlength={10} required />
        </IonItem>

        {/* Cat */}
        <IonItem lines='none'>
          <IonLabel class='ion-text-wrap'>Category *</IonLabel>
          <IonSelect value={cat} onIonChange={(e) => setcat(e.detail.value)}>
            {categories &&
              Object.keys(categories).map((entry, index) => (
                <IonSelectOption key={`CAT${index}`} value={entry}>
                  {entry}
                </IonSelectOption>
              ))}
          </IonSelect>
        </IonItem>

        {/* SubCat */}
        <IonItem lines='none'>
          <IonLabel class='ion-text-wrap'>Subcategory *</IonLabel>
          <IonSelect value={subCat} onIonChange={(e) => setsubCat(e.detail.value)}>
            {subcategories &&
              Object.keys(subcategories).map((entry, index) => (
                <IonSelectOption key={`SUBCAT${index}`} value={entry}>
                  {entry}
                </IonSelectOption>
              ))}
          </IonSelect>
        </IonItem>

        {/* Brand */}
        <IonItem lines='none'>
          <IonLabel class='ion-text-wrap'>Brand *</IonLabel>
          <IonSelect value={brand} onIonChange={(e) => setbrand(e.detail.value)}>
            {brands &&
              Object.keys(brands).map((entry, index) => (
                <IonSelectOption key={`Brand${index}`} value={entry}>
                  {entry}
                </IonSelectOption>
              ))}
          </IonSelect>
        </IonItem>

        {/* IMAGES  */}
        <UploadBtn type='image' upload={(e) => handle_upload(e)} />
        {imgArr.length > 0 && <ImagesDisplay remove={(index: number) => removeImageFromArr(index)} imgArr={imgArr} />}

        <br />

        <IonButton fill='outline' onClick={() => submitForm()}>
          {batch ? "Add to batch" : "Upload"}
        </IonButton>

        {batch && batchData.length > 0 && (
          <IonButton fill='outline' onClick={() => sendBatchedData()}>
            Upload batch data
          </IonButton>
        )}
      </IonCardContent>

      {loading && <Loader />}
    </IonCard>
  );
}

import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCol, IonGrid, IonItem, IonLabel, IonRow } from "@ionic/react";
import { useState } from "react";
import { createWorker } from "tesseract.js";
import { UploadImagesAndGetUrl } from "../../firebase/FirebaseStorageCRUD";
import { CatSubCatObj, ColorsArr, iProduct } from "../../models/Product_models";

function getCleanText(text: string) {
  return text
    .split("\n")
    .join(" ")
    .split('"')
    .join(" ")
    .split(" ")
    .filter((l) => l.length > 0);
}

function getCatSubCat(text: string) {
  let final = { cat: "", subCat: "" };
  // string.match(/eek/gi)
  Object.keys(CatSubCatObj).map((key) => {
    // console.log("??", text, key);

    // Main Cat on the outside
    if (text.match(key)) {
      // console.log("We have a main Cat", key);
      final.cat = key;

      Object.values(CatSubCatObj[key]).map((subcat) => {
        if (text.match(subcat)) {
          // console.log("Sub cat", subcat, key, text);
          final.subCat = subcat;
        }
      });
    }
    // Use SubCat to determine the cat and then get sub cat sommer
    else {
      Object.values(CatSubCatObj[key]).map((subcat) => {
        if (text.match(subcat)) {
          // console.log("Sub cat", subcat, key, text);
          final.cat = key;
          final.subCat = subcat;
        }
      });
    }
  });
  return final;
}

function getColor(text: string) {
  let final = "";
  ColorsArr.forEach((color: string) => {
    if (text.match(color)) {
      final = color;
    }
    if (text === "Engraved") {
      final = "Silver";
    }
    if (text === "Halo") {
      final = "Halo";
    }
  });
  return final;
}

function getInfoFromStringArr(arrToUse: string[]) {
  // var string = "Welcome to GEEKS for geeks!";
  // var result = string.match(/eek/gi)
  //
  let final = { cat: "", subcat: "", name: "", des: "", price: 0.0, color: "" };

  arrToUse.map((word: string) => {
    // Check for price
    let wTn = Number(word.replace("R", ""));

    if (!isNaN(wTn)) {
      // console.log("we have a price: ", !isNaN(wTn), wTn);
      final.price = wTn;
    } else {
      // Check for cat and sub cat
      let f = getCatSubCat(word);
      final.cat = f.cat;
      final.subcat = f.subCat;

      // Check for color
      let c = getColor(word);
      // console.log("F", f, "C", c);
      if (c.length > 0) {
        final.color = final.color.length > 0 ? `${final.color}, ${c}, ` : `${c}`;
      }
    }
    // Check for name and description
    final.des = `${final.des} ${isNaN(wTn) ? word : ""}`;
    final.name = `${final.name} ${isNaN(wTn) ? word : ""}`;
  });

  return final;
}

// OCR Statuses
const STATUSES = {
  IDLE: "",
  FAILED: "Failed to perform OCR",
  PENDING: "Processing...",
  SUCCEEDED: "Completed"
};

interface iProps {
  onFinalise: (inv: iProduct[]) => void;
}

export default function OcrReader(props: iProps) {
  const [selectedImages, setSelectedImages] = useState<any>(null);
  const [ocrState, setOcrState] = useState<string>(STATUSES.IDLE);
  const [progress, setProgress] = useState(0);
  const [products, setProducts] = useState<iProduct[]>([]);

  const worker = createWorker({
    logger: (m) => {
      // console.log("Logger in create worker", m);
      setProgress(m.progress * 100);
    }
  });

  // Process image with OCR
  async function readImageOCR(img: any): Promise<iProduct> {
    let newProduct: iProduct = {
      brand: "Skeleton in the closet",
      size: "One size fits all",
      discountPercentage: 0,
      id: "",
      stock: 1,
      rating: 5,
      // determine from image
      images: [],
      category: "",
      subcategory: "",
      title: "",
      desc: "",
      color: "",
      price: 0.0
    };

    try {
      await worker.load();
      // Set the language to recognize
      await worker.loadLanguage("eng");
      await worker.initialize("eng");
      await worker
        .recognize(img)
        .then((res) => {
          // console.log("?? RES ??", res.data);

          let rawSplit = getCleanText(res.data.text);
          let processed = getInfoFromStringArr(rawSplit);

          // console.log("???", rawSplit);
          // console.log("PROCESSED: ", processed);
          newProduct.category = processed.cat;
          newProduct.subcategory = processed.subcat;
          newProduct.title = processed.name;
          newProduct.desc = processed.des;
          newProduct.color = processed.color;
          newProduct.price = processed.price;

          // console.log("PRODUCT FROM IMAGE: ", newProduct);
          Promise.resolve(newProduct);
        })
        .catch((err) => {
          console.log("Error occured in reading image", err);
        });

      // await worker.terminate();
    } catch (err) {
      Promise.resolve(newProduct);
      setOcrState(STATUSES.FAILED);
      console.log("Error occured in reading image catch clause", err);
    }

    return Promise.resolve(newProduct);
  }

  // function to map over and complete returns the products array
  async function getTextFromImages() {
    let arr: iProduct[] = [];

    for (let i = 0; i < selectedImages.length; i++) {
      setOcrState(STATUSES.PENDING);
      let imgArr: string[] = [];
      console.log(i, "IMAGE:", selectedImages[i], selectedImages[i].name);

      // await UploadImagesAndGetUrl([{ data: selectedImages[i], url: "" }]).then((arr) => {
      //   imgArr = arr;
      //   return imgArr;
      // });

      await readImageOCR(selectedImages[i]).then((prod) => {
        // console.log("Returned here", prod, imgArr);
        prod.images = imgArr;
        arr.push(prod);
        Promise.resolve(arr);
      });
    }
    return Promise.resolve(arr);
  }

  // Main container function for the mapping and getting products
  function runProcessing() {
    getTextFromImages().then((prods) => {
      // console.log("PRODS", prods);
      setProducts(prods);
      setOcrState(STATUSES.SUCCEEDED);
    });
  }

  // Executed when "Use another image" is selected
  function handleRemoveClicked() {
    setSelectedImages(null);
    setOcrState(STATUSES.IDLE);
    setProducts([]);
    setProgress(0);
  }

  // Handles the getting of all images
  function handle_upload(e: any) {
    setSelectedImages([...e.target.files]);
  }

  // Preview display of all images uploaded
  function displayUploadedImg(imgs: any[]) {
    // console.log("???", imgUrl, imgs);
    // <img className='imgDisp' src={URL.createObjectURL(img)} alt='scanned file' />
    if (selectedImages !== null) {
      return (
        <IonGrid>
          <IonRow>
            {imgs.map((img, index) => {
              return (
                <IonCol key={index}>
                  <img src={URL.createObjectURL(img)} alt='scanned file' />
                </IonCol>
              );
            })}
          </IonRow>
        </IonGrid>
      );
    } else {
      return <></>;
    }
  }

  // Display Product created from the image and allow user to edit if needed
  function displayFinalProduct(prod: iProduct) {
    return (
      <IonCard>
        <IonCardHeader>
          <IonCardTitle>{prod.title}</IonCardTitle>
          <IonCardSubtitle>{prod.desc}</IonCardSubtitle>
        </IonCardHeader>
        <IonCardContent>
          <IonGrid>
            <IonRow>
              {prod.images.map((img, index) => (
                <IonCol key={index}>
                  <img style={{ height: "200px", width: "200px" }} src={img} alt='broken' />
                </IonCol>
              ))}
            </IonRow>

            <IonRow>
              <IonCol>
                <IonLabel>
                  Catagory: <br /> {prod.category}
                </IonLabel>
              </IonCol>
              <IonCol>
                <IonLabel>
                  Sub Catagory: <br /> {prod.subcategory}
                </IonLabel>
              </IonCol>
              <IonCol>
                <IonLabel>
                  Price: <br /> {prod.price}
                </IonLabel>
              </IonCol>
              <IonCol>
                <IonLabel>
                  Color: <br /> {prod.color}
                </IonLabel>
              </IonCol>
              <IonCol>
                <IonLabel>
                  Size: <br /> {prod.size}
                </IonLabel>
              </IonCol>
              <IonCol>
                <IonLabel>
                  Quantity: <br /> {prod.stock}
                </IonLabel>
              </IonCol>
            </IonRow>
          </IonGrid>
        </IonCardContent>
      </IonCard>
    );
  }

  function complete() {
    props.onFinalise(products);
    handleRemoveClicked();
  }

  return (
    <>
      <IonGrid>
        {/* UPLOAD IMAGE BTN */}
        <IonRow>
          <IonCol></IonCol>
          <IonCol>
            <input type='file' multiple id='file-upload' accept='*.png, *.jpg, *.jpeg' style={{ display: "none" }} onChange={(e) => handle_upload(e)} />

            <IonLabel class='ion-text-wrap' style={{ fontSize: "18px" }}>
              Supported formats:bmp, jpg, png, pbm
            </IonLabel>

            <IonItem lines='none'>
              <IonLabel class='ion-text-wrap' style={{ fontSize: "20px", padding: "10px" }}>
                Image(s)
              </IonLabel>
              <IonButton color='secondary' onClick={() => (document as any).getElementById("file-upload").click()}>
                Choose image(s)
              </IonButton>
            </IonItem>
          </IonCol>
          <IonCol></IonCol>
        </IonRow>

        {/* PREVIEW OF FILE */}
        <IonRow>
          <IonCol>
            {displayUploadedImg(selectedImages)}

            <IonLabel class='ion-text-wrap'>Toal amount of images to process: {selectedImages != null ? selectedImages.length : 0}</IonLabel>
            <br />
            <IonLabel class='ion-text-wrap'>State: {ocrState}</IonLabel>
            <br />
            <IonLabel class='ion-text-wrap'> Progress : {progress.toFixed(1)}</IonLabel>
          </IonCol>
        </IonRow>

        {/* Process uploaded inmages */}
        <IonRow>
          <IonCol></IonCol>
          <IonCol>
            {selectedImages !== null && (
              <>
                <IonButton color='success' onClick={() => runProcessing()}>
                  Get Product info from image(s)
                </IonButton>
                <IonButton color='danger' disabled={ocrState === STATUSES.PENDING} onClick={() => handleRemoveClicked()}>
                  Reset and use diffrent image(s)
                </IonButton>
              </>
            )}
          </IonCol>
          <IonCol></IonCol>
        </IonRow>

        {/* TEXT DISPLAY */}
        <IonRow>
          <IonCol>
            <h1>Products Created: </h1>
          </IonCol>
        </IonRow>

        {/* Display Products when completed */}
        {products && products.length > 0 ? (
          <>
            <IonRow>
              {products && products.length > 0 ? (
                products.map((prod, index) => {
                  return <IonCol key={index}>{displayFinalProduct(prod)}</IonCol>;
                })
              ) : (
                <></>
              )}
            </IonRow>

            <IonRow>
              <IonCol>
                <IonButton onClick={() => complete()}>Add all products to database </IonButton>
              </IonCol>
            </IonRow>
          </>
        ) : (
          <></>
        )}
      </IonGrid>
    </>
  );
}

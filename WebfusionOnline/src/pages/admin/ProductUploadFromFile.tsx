import React from "react";
import { IonButton, IonCard, IonCardContent, IonContent, IonItem, IonLabel, IonPage } from "@ionic/react";
import { PrettyProduct, PrintProduct, ProductListPretty, ProductListPrint, ProductListWeb, WebProduct } from "../../models/Product_models";
import HeaderComponent from "../../components/headersFooters/HeaderComponent";

//TODO: THIS IS THE OLD VERSION WILL NEED TO CHANGE WHEN I KNOW HOW EACH TSV FILE WILL BE LOOKING

async function tsv_print(e: any) {
  var AllFiles: any[] = [];
  var allDtata: ProductListPrint = {};

  [...e.target.files].map((file) => AllFiles.push(file));
  // console.log('all files', AllFiles);

  await Promise.all(
    AllFiles.map((f) => {
      return new Promise<ProductListPrint>((resolve, reject) => {
        if (f) {
          var fr = new FileReader();
          fr.onloadend = () => {
            if (typeof fr.result == "string") {
              var str: string = fr.result || "";
              var byline = str.split("\r");

              byline.forEach((line) => {
                const newLine = line.trim().split("\t");
                // console.log("NEW LINE", newLine);

                if (newLine[0].length > 0 && newLine[0] !== "Product Name") {
                  // console.log("NL", newLine);

                  if (allDtata[newLine[0]] === undefined) {
                    allDtata[newLine[0]] = [];
                  } else {
                    Object.keys(allDtata).map((key) => {
                      if (key == newLine[0]) {
                        let newItem: PrintProduct = {
                          Name: newLine[0],
                          Desc: "",
                          Sides: [newLine[1]],
                          Color: [newLine[2]],
                          Processing: [newLine[3]],
                          DesignFee: newLine[4],
                          HardProof: newLine[5],
                          PaperMaterial: [newLine[6]],
                          Size: [newLine[7]],
                          Price_per_unit: newLine[8] !== undefined ? newLine[8] : " ",
                          ImageFiles: [],
                          extras: []
                        };

                        if (newLine.length > 15) {
                          // console.log("More than 14 ", newLine);
                        }
                        allDtata[newLine[0]].push(newItem);
                      }
                    });
                  }
                }
              });

              // console.log("NP", allDtata);
              resolve(allDtata);
              //   console.log("resolve", resolve, "reject", reject);
            }
          };
          fr.readAsText(f);
        }
      });
    })
  );
  return Promise.resolve(allDtata);
}

async function tsv_pretty(e: any) {
  var AllFiles: any[] = [];
  var allDtata: ProductListPretty = {};

  [...e.target.files].map((file) => AllFiles.push(file));
  // console.log('all files', AllFiles);

  await Promise.all(
    AllFiles.map((f) => {
      return new Promise<ProductListPretty>((resolve, reject) => {
        if (f) {
          var fr = new FileReader();
          fr.onloadend = () => {
            if (typeof fr.result == "string") {
              var str: string = fr.result || "";
              var byline = str.split("\r");

              byline.forEach((line) => {
                const newLine = line.trim().split("\t");
                // console.log("NEW LINE", newLine);

                if (newLine[0].length > 0 && newLine[0] !== "Product Name") {
                  // console.log("NL", newLine);

                  if (allDtata[newLine[0]] === undefined) {
                    allDtata[newLine[0]] = [];
                  } else {
                    Object.keys(allDtata).map((key) => {
                      if (key == newLine[0]) {
                        let newItem: PrettyProduct = {
                          Name: newLine[0],
                          Desc: "",
                          DesignFee: newLine[4],
                          HardProof: newLine[5],
                          PaperMaterial: [newLine[6]],
                          Size: [newLine[7]],
                          Price_per_unit: newLine[8] !== undefined ? newLine[8] : " ",
                          ImageFiles: [],
                          extras: []
                        };

                        if (newLine.length > 15) {
                          // console.log("More than 14 ", newLine);
                        }
                        allDtata[newLine[0]].push(newItem);
                      }
                    });
                  }
                }
              });

              // console.log("NP", allDtata);
              resolve(allDtata);
              //   console.log("resolve", resolve, "reject", reject);
            }
          };
          fr.readAsText(f);
        }
      });
    })
  );
  return Promise.resolve(allDtata);
}

async function tsv_web(e: any) {
  var AllFiles: any[] = [];
  var allDtata: ProductListWeb = {};

  [...e.target.files].map((file) => AllFiles.push(file));
  // console.log('all files', AllFiles);

  await Promise.all(
    AllFiles.map((f) => {
      return new Promise<ProductListWeb>((resolve, reject) => {
        if (f) {
          var fr = new FileReader();
          fr.onloadend = () => {
            if (typeof fr.result == "string") {
              var str: string = fr.result || "";
              var byline = str.split("\r");

              byline.forEach((line) => {
                const newLine = line.trim().split("\t");
                // console.log("NEW LINE", newLine);

                if (newLine[0].length > 0 && newLine[0] !== "Product Name") {
                  // console.log("NL", newLine);

                  if (allDtata[newLine[0]] === undefined) {
                    allDtata[newLine[0]] = [];
                  } else {
                    Object.keys(allDtata).map((key) => {
                      if (key == newLine[0]) {
                        let newItem: WebProduct = {
                          Name: newLine[0],
                          Desc: "",
                          DesignFee: newLine[4],
                          Price_per_unit: newLine[8] !== undefined ? newLine[8] : " ",
                          ImageFiles: [],
                          extras: []
                        };

                        if (newLine.length > 15) {
                          // console.log("More than 14 ", newLine);
                        }
                        allDtata[newLine[0]].push(newItem);
                      }
                    });
                  }
                }
              });

              // console.log("NP", allDtata);
              resolve(allDtata);
              //   console.log("resolve", resolve, "reject", reject);
            }
          };
          fr.readAsText(f);
        }
      });
    })
  );
  return Promise.resolve(allDtata);
}

export default function ProductUploadFromFile() {
  function handle_upload(e: any, type: "web" | "pretty" | "print") {
    e.preventDefault();

    if (type === "web") {
      tsv_web(e)
        .then((done) => {
          console.log("done", done);
          // window.alert("Completed loading new products");
          // Firebase:
        })
        .catch((error) => {
          console.error("ERROR IN UPLOAD", error);
          window.alert("An error has occured");
        })
        .finally(() => {});
    }
    //
    else if (type === "pretty") {
      tsv_pretty(e)
        .then((done) => {
          console.log("done", done);
          // window.alert("Completed loading new products");
          // Firebase:
        })
        .catch((error) => {
          console.error("ERROR IN UPLOAD", error);
          window.alert("An error has occured");
        })
        .finally(() => {});
    }
    //
    else if (type === "print") {
      tsv_print(e)
        .then((done) => {
          console.log("done", done);
          // window.alert("Completed loading new products");
          // Firebase:
        })
        .catch((error) => {
          console.error("ERROR IN UPLOAD", error);
          window.alert("An error has occured");
        })
        .finally(() => {});
    }
  }

  return (
    <IonPage>
      <IonContent>
        <HeaderComponent title={"Product Upload From File"} showBanner={false} />

        <IonCard>
          <IonCardContent>
            <input type='file' id='file-upload' accept='*.tsv' style={{ display: "none" }} onChange={(e) => handle_upload(e, "web")} />
            <input type='file' id='file-upload2' accept='*.tsv' style={{ display: "none" }} onChange={(e) => handle_upload(e, "pretty")} />
            <input type='file' id='file-upload3' accept='*.tsv' style={{ display: "none" }} onChange={(e) => handle_upload(e, "print")} />

            <IonItem>
              <IonLabel class='ion-text-wrap'>Products List in .tsv Format for Webfusion: </IonLabel>
              <IonButton color='secondary' size='large' onClick={() => (document as any).getElementById("file-upload").click()}>
                Upload
              </IonButton>
            </IonItem>

            <IonItem>
              <IonLabel class='ion-text-wrap'>Products List in .tsv Format for Pretty things: </IonLabel>
              <IonButton color='secondary' size='large' onClick={() => (document as any).getElementById("file-upload2").click()}>
                Upload
              </IonButton>
            </IonItem>

            <IonItem>
              <IonLabel class='ion-text-wrap'>Products List in .tsv Format for Printintrest: </IonLabel>
              <IonButton color='secondary' size='large' onClick={() => (document as any).getElementById("file-upload3").click()}>
                Upload
              </IonButton>
            </IonItem>
          </IonCardContent>
        </IonCard>
      </IonContent>
    </IonPage>
  );
}

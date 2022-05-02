import { FIREBASE_FIRESTORE } from "./FirebaseConfig";
import { collection, addDoc } from "firebase/firestore";
import { PrettyProduct, PrintProduct, WebProduct } from "../models/Product_models";
import { UploadImagesAndGetUrl } from "./FirebaseStorageCRUD";

const PrettyThings = "PrettyThings";
const WebFusion = "WebFusion";
const Printresting = "Printresting";

const PrettyDB = collection(FIREBASE_FIRESTORE, PrettyThings);
const PrintDB = collection(FIREBASE_FIRESTORE, Printresting);
const WebDB = collection(FIREBASE_FIRESTORE, WebFusion);

export async function SaveBatchedDataToDB(type: "web" | "pretty" | "print", data: PrintProduct[] | PrettyProduct[] | WebProduct[]) {
  let complete = "";
  const curr = type === "pretty" ? PrettyDB : type === "print" ? PrintDB : WebDB;

  await Promise.all(
    data.map((entry: PrintProduct | PrettyProduct | WebProduct) => {
      return new Promise<string>((resolve, reject) => {
        UploadImagesAndGetUrl(entry.ImageFiles).then(async (arr) => {
          // console.log("Back here", arr);
          entry.ImageFiles = arr;
          console.log("???", entry);

          await addDoc(curr, entry)
            .then((res) => {
              console.log("RES", res);
              complete = "Sucsess";
              resolve(complete);
            })
            .catch((err) => {
              console.log("ERROR", err);
              complete = "Error";
              resolve(complete);
            });
        });
      });
    })
  );
  return Promise.resolve(complete);
}

export async function SaveSingleDataToDB(type: "web" | "pretty" | "print", data: PrintProduct | PrettyProduct | WebProduct) {
  let complete = "";
  const curr = type === "pretty" ? PrettyDB : type === "print" ? PrintDB : WebDB;

  return new Promise<string>((resolve, reject) => {
    UploadImagesAndGetUrl(data.ImageFiles).then(async (arr) => {
      // console.log("Back here", arr);
      data.ImageFiles = arr;
      console.log("???", data);

      await addDoc(curr, data)
        .then((res) => {
          console.log("RES", res);
          complete = "Sucsess";
          resolve(complete);
        })
        .catch((err) => {
          console.log("ERROR", err);
          complete = "Error";
          resolve(complete);
        });
    });
  });
}

import { FIREBASE_STORAGE } from "./FirebaseConfig";
import { ImageArr } from "../models/Product_models";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

export async function UploadImagesAndGetUrl(images: ImageArr[]) {
  let UrlArr: string[] = [];
  await Promise.all(
    images.map((entry) => {
      return new Promise<string[]>((resolve, reject) => {
        let storageRef = ref(FIREBASE_STORAGE, `${entry.data.name}`);
        // 'file' comes from the Blob or File API
        uploadBytes(storageRef, entry.data).then((snapshot) => {
          //   console.log("Uploaded a blob or file!", snapshot.ref);
          //   Upload completed successfully, now we can get the download URL
          getDownloadURL(snapshot.ref).then((downloadURL) => {
            // console.log("File available at", downloadURL);
            UrlArr.push(downloadURL);
            // console.log("???? ARR", UrlArr);
            resolve(UrlArr);
          });
        });
      });
    })
  );
  return Promise.resolve(UrlArr);
}

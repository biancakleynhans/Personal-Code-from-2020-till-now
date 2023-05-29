import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { FIREBASE_STORAGE } from './ConfigSetup';

export async function UploadImageFileAndGetUrl(files: File[]): Promise<string[]> {
  let UrlArr: string[] = [];
  await Promise.all(
    files.map((entry) => {
      return new Promise<string[]>((resolve, reject) => {
        let storageRef = ref(FIREBASE_STORAGE, `${entry.name}`);
        const uploadTask = uploadBytesResumable(storageRef, entry);
        // Register three observers:
        // 1. 'state_changed' observer, called any time the state changes
        // 2. Error observer, called on failure
        // 3. Completion observer, called on successful completion
        uploadTask.on(
          'state_changed',
          (snapshot) => {
            // Observe state change events such as progress, pause, and resume
            // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            // console.log('Upload is ' + progress + '% done');
            // url = "Upload is " + progress + "% done";
            switch (snapshot.state) {
              case 'paused':
                // console.log('Upload is paused');
                break;
              case 'running':
                // console.log('Upload is running');
                break;
            }
          },
          (error) => {
            // Handle unsuccessful uploads
            reject(`Error occured in upload: ${error}`);
          },
          () => {
            // Handle successful uploads on complete
            // For instance, get the download URL: https://firebasestorage.googleapis.com/...
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              // console.log('File available at', downloadURL);
              UrlArr.push(downloadURL);
              resolve(UrlArr);
            });
          }
        );
      });
    })
  );
  return Promise.resolve(UrlArr);
}

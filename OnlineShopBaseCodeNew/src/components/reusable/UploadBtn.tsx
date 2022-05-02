import { IonButton, IonItem, IonLabel } from "@ionic/react";
import React from "react";

interface iProps {
  upload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type: "image" | "file";
}

export default function UploadBtn(props: iProps) {
  return (
    <>
      <input
        type='file'
        multiple
        id='file-upload'
        accept='*.png, *.jpg, *.jpeg, *.xlxs, *.pdf'
        style={{ display: "none" }}
        onChange={(e) => {
          props.upload(e);
        }}
      />

      {/* <IonLabel class='ion-text-wrap'>{props.type.toUpperCase()}(S)</IonLabel> */}
      <br />
      <IonButton fill='outline' color='secondary' onClick={() => (document as any).getElementById("file-upload").click()}>
        Choose {props.type}(s)
      </IonButton>
    </>
  );
}

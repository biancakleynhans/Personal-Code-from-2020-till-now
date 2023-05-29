import { IonButton, IonItem, IonLabel } from '@ionic/react';
import React from 'react';

interface iProps {
  upload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type: 'image' | 'file';
  isMulti: boolean;
}

export default function UploadBtn(props: iProps) {
  return (
    <>
      <input
        type='file'
        multiple={props.isMulti}
        id='file-upload'
        accept='*.xlxs'
        style={{ display: 'none' }}
        onChange={(e) => {
          props.upload(e);
        }}
      />
      <br />
      <IonButton fill='outline' color='secondary' onClick={() => (document as any).getElementById('file-upload').click()}>
        Choose {props.type}(s)
      </IonButton>
    </>
  );
}

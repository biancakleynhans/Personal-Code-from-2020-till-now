import React, { useState } from "react";
import { IonImg, IonActionSheet, IonButton, IonModal } from "@ionic/react";
import { trash, close } from "ionicons/icons";
import { usePhotoGallery, UserPhoto } from "../hooks/UseCamera";

interface Props {
  callback: (image: UserPhoto | undefined, main: string, indexOfQ: number, indexOfImg: number) => void;
  image: UserPhoto;
  main: string;
  indexOfQ: number;
  indexOfImg: number;
}

const ImageRemoveFromListComponent: React.FC<Props> = (props) => {
  const { deletePhoto } = usePhotoGallery();
  const [photoToDelete, setPhotoToDelete] = useState<UserPhoto>();

  return (
    <>
      <IonModal isOpen={true}>
        <IonImg
          style={{ maxHeight: "350px", maxWdith: "350px", minHeight: "220px", minWdith: "220px", margin: "auto" }}
          onClick={() => setPhotoToDelete(props.image)}
          src={props.image.webviewPath}
        />
        <IonButton onClick={() => props.callback(undefined, props.main, props.indexOfQ, props.indexOfImg)}>Close Modal</IonButton>
      </IonModal>

      <IonActionSheet
        isOpen={!!photoToDelete}
        buttons={[
          {
            text: "Delete",
            role: "destructive",
            icon: trash,
            handler: () => {
              if (photoToDelete) {
                deletePhoto(photoToDelete);
                setPhotoToDelete(undefined);
                props.callback(photoToDelete, props.main, props.indexOfQ, props.indexOfImg);
              }
            }
          },
          {
            text: "Cancel",
            icon: close,
            role: "cancel"
          }
        ]}
        onDidDismiss={() => {
          setPhotoToDelete(undefined);
          props.callback(undefined, props.main, props.indexOfQ, props.indexOfImg);
        }}
      />
    </>
  );
};

export default ImageRemoveFromListComponent;

import React, { useState } from "react";
import { IonIcon, IonGrid, IonRow, IonCol, IonImg, IonActionSheet, IonButton, IonLabel } from "@ionic/react";
import { camera, trash, close } from "ionicons/icons";
import { usePhotoGallery, UserPhoto } from "../hooks/UseCamera";

interface Props {
  callback: (value: any) => void;
}

const ImageCaptureComponent: React.FC<Props> = (props) => {
  const { deletePhoto, photos, takePhoto } = usePhotoGallery();
  const [photoToDelete, setPhotoToDelete] = useState<UserPhoto>();

  return (
    <>
      <IonGrid>
        <IonRow>
          {photos.map((photo, index) => (
            <IonCol key={index}>
              <IonImg
                style={{ maxHeight: "350px", maxWdith: "350px", minHeight: "220px", minWdith: "220px", margin: "auto" }}
                onClick={() => setPhotoToDelete(photo)}
                src={photo.webviewPath}
              />
            </IonCol>
          ))}
        </IonRow>
      </IonGrid>

      <IonButton onClick={() => takePhoto()}>
        <IonIcon icon={camera}></IonIcon>
      </IonButton>

      <IonButton onClick={() => props.callback(photos)}>
        <IonLabel>Done</IonLabel>
      </IonButton>

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
              }
            }
          },
          {
            text: "Cancel",
            icon: close,
            role: "cancel"
          }
        ]}
        onDidDismiss={() => setPhotoToDelete(undefined)}
      />
    </>
  );
};

export default ImageCaptureComponent;

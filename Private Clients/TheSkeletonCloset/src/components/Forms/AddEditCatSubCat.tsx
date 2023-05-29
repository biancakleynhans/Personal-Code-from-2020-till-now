import { IonButton, IonCard, IonCardContent, IonCol, IonGrid, IonInput, IonItem, IonLabel, IonRow } from "@ionic/react";
import { useEffect, useState } from "react";
import { ImageArr } from "../../firebase/FirebaseStorage";
import { iCatSubCat } from "../../models/CatsSubCats";
import ImagesDisplay from "../reusable/ImagesDisplay";
import UploadBtn from "../reusable/UploadBtn";

interface iProps {
  type: "add" | "edit";
  catSubCat: "category" | "subcategory" | "brand";
  default: iCatSubCat;
  onAdd: (cat: iCatSubCat) => void;
  onUpdate: (cat: iCatSubCat) => void;
  onDelete: (id: string) => void;
}

export default function AddEditCatSubCat(props: iProps) {
  const [imgArr, setimgArr] = useState<ImageArr[]>(props.default.images);
  const [name, setname] = useState<string>(props.default.name);

  useEffect(() => {}, [imgArr.length]);

  // IMAGES
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
      <IonCardContent>
        <IonLabel class='ion-text-wrap'>
          {props.type.toUpperCase()} {props.catSubCat.toUpperCase()}
        </IonLabel>
        {/* Name */}
        <IonItem lines='none'>
          <IonLabel position='stacked'>{props.catSubCat.toUpperCase()} NAME *</IonLabel>
          <IonInput value={name} type='text' onIonChange={(e) => setname(e.detail.value!)} minlength={1} maxlength={150} required />
        </IonItem>
        {/* IMAGES  */}
        <UploadBtn type='image' upload={(e) => handle_upload(e)} />

        {imgArr.length > 0 && <ImagesDisplay remove={(index: number) => removeImageFromArr(index)} imgArr={imgArr} />}

        {props.type === "add" && (
          <IonButton
            fill='outline'
            disabled={name.length < 4 || imgArr.length === 0 ? true : false}
            onClick={() => {
              props.onAdd({ name, images: imgArr });
            }}>
            {props.type.toUpperCase()} {props.catSubCat.toUpperCase()}
          </IonButton>
        )}

        {props.type === "edit" && (
          <IonButton
            fill='outline'
            disabled={name.length < 4 || imgArr.length === 0 ? true : false}
            onClick={() => {
              props.onUpdate({ name, images: imgArr });
            }}>
            {props.type.toUpperCase()} {props.catSubCat.toUpperCase()}
          </IonButton>
        )}
      </IonCardContent>
    </IonCard>
  );
}

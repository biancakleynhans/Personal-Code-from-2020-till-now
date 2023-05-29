import { IonButton, IonCard, IonCardContent, IonCardHeader, IonLabel } from "@ionic/react";
import React, { useState } from "react";
import { iProduct } from "../../models/Products";
import ProductUploadFile from "../../pages/admin/002ProductsFile";
import ProductsImage from "../../pages/admin/002ProductsImage";
import ProductUploadManual from "../../pages/admin/002ProductsManual";

interface iProps {
  type: "add" | "edit";
}

const defaultProd: iProduct = {
  id: "",
  title: "",
  desc: "",
  size: "",
  color: "",
  priceRaw: 0,
  priceSell: 0,
  markupPercentage: 0,
  discountPercentage: 0,
  stock: 0,
  images: [],
  category: "",
  subcategory: "",
  rating: 0,
  brand: "Skeleton in the closet"
};

export default function AddEditProduct(props: iProps) {
  const [selected, setselected] = useState<"none" | "manual" | "file" | "image">("none");
  return (
    <IonCard>
      {props.type === "add" && (
        <IonCardHeader>
          <IonLabel class='ion-text-wrap'>{props.type.toUpperCase()} PRODUCT</IonLabel>
          <br />
          <IonButton
            onClick={() => {
              setselected("manual");
            }}
            fill={selected === "manual" ? "outline" : "clear"}>
            Manual
          </IonButton>
          <br />
          <IonButton
            onClick={() => {
              setselected("file");
            }}
            fill={selected === "file" ? "outline" : "clear"}>
            From File
          </IonButton>
          <br />
          <IonButton
            onClick={() => {
              setselected("image");
            }}
            fill={selected === "image" ? "outline" : "clear"}>
            From image
          </IonButton>
          <br />
        </IonCardHeader>
      )}

      {selected === "manual" && <ProductUploadManual default={defaultProd} type='add' />}
      {selected === "file" && <ProductUploadFile />}
      {selected === "image" && <ProductsImage />}
    </IonCard>
  );
}

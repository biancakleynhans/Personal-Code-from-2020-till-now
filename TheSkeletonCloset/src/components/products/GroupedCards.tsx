import { IonCol, IonGrid, IonRow } from "@ionic/react";
import { useEffect, useState } from "react";
import CategoryBar from "../headersFooters/CategoryBar";
import CatSubCatCardDisplay from "./CatSubCatCardDisplay";
import ProductCardDisplay from "./ProductCardDisplay";

interface iProps {
  route: string;
  arrToDisplay: any[];
  title: string;
  prodOrCat: "cat" | "prod";
}

export default function GroupedCards(props: iProps) {
  const [col, setcol] = useState<"3" | "4" | "6" | "12">("4");

  function handleLayoutChange() {
    if (window.innerWidth < 500) {
      setcol("12");
    }
    if (col === "3") {
      setcol("4");
    }
    if (col === "4") {
      setcol("6");
    }
    if (col === "6") {
      setcol("3");
    }
  }

  useEffect(() => {
    if (window.innerWidth < 500) {
      setcol("12");
    }
    if (window.innerWidth > 500) {
      setcol("3");
    }
  }, [window.innerWidth]);

  useEffect(() => {}, [col]);

  return (
    <IonGrid>
      <IonRow>
        <CategoryBar col={col} title={props.title} layoutCb={() => handleLayoutChange()} />
      </IonRow>

      <IonRow>
        {props.prodOrCat === "cat" &&
          props.arrToDisplay.map((key, index) => {
            return (
              <IonCol size={col} key={index}>
                <CatSubCatCardDisplay cat={key} route={`${props.route}${key}`} />
              </IonCol>
            );
          })}

        {props.prodOrCat === "prod" &&
          props.arrToDisplay.map((prod, index) => {
            return (
              <IonCol size={col} key={index}>
                <ProductCardDisplay key={index} product={prod} route={`${props.route}${prod.id}`} />
              </IonCol>
            );
          })}
      </IonRow>
    </IonGrid>
  );
}

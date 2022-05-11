import { IonContent, IonPage } from "@ionic/react";
import { useEffect, useState } from "react";
import FooterBar from "../../../components/headersFooters/FooterBar";
import HeaderBar from "../../../components/headersFooters/HeaderBar";
import GroupedCards from "../../../components/products/GroupedCards";
import { useData } from "../../../hooks/AdminDataHook";
import { RoutesObj } from "../../../routes/Routes";

// CONTAINS MAIN CATAGORIES
// PATH: "/inventory/:cat"

export default function CategoriesPage() {
  const { categories } = useData();

  const r = RoutesObj.products.cat.path.replace(":cat", "");

  useEffect(() => {}, [categories]);

  return (
    <IonPage>
      <HeaderBar />
      <IonContent fullscreen>
        <GroupedCards arrToDisplay={categories ? Object.values(categories) : []} route={r} title='Categories' prodOrCat='cat' />
      </IonContent>
      <FooterBar />
    </IonPage>
  );
}

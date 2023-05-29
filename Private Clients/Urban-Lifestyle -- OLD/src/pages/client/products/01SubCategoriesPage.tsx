import { IonContent, IonGrid, IonPage } from "@ionic/react";
import { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router";
import FooterBar from "../../../components/headersFooters/FooterBar";
import HeaderBar from "../../../components/headersFooters/HeaderBar";
import GroupedCards from "../../../components/products/GroupedCards";
import { useData } from "../../../hooks/AdminDataHook";
import { RoutesObj } from "../../../routes/Routes";

// CONTAINS SUB CATAGORIES
// PATH : "/invent/:cat"  invent/Accesories

export default function SubCategoriesPage() {
  const { subcategories } = useData();
  const loc = useLocation();
  const [CurrCat, setCurrCat] = useState("");

  function setUp() {
    let path = loc.pathname.split("/");
    let cat = path[path.length - 1];

    setCurrCat(cat);
    // console.log("path", path, cat);
  }

  useEffect(() => {
    setUp();
  }, [loc.pathname, subcategories]);

  const r = RoutesObj.products.subCat.path.replace(":cat", CurrCat).replace(":subCat", "");

  return (
    <IonPage>
      <HeaderBar />
      <IonContent fullscreen>
        <GroupedCards arrToDisplay={subcategories ? Object.values(subcategories) : []} route={r} title={CurrCat} prodOrCat='cat' />
      </IonContent>
      <FooterBar />
    </IonPage>
  );
}

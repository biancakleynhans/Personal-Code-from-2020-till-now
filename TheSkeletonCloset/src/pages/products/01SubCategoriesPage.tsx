import { IonContent, IonGrid, IonPage } from "@ionic/react";
import { useEffect, useState } from "react";
import FooterComponent from "../../components/headersFooters/FooterComponent";
import HeaderComponent from "../../components/headersFooters/HeaderComponent";
import GroupedCards from "../../components/products/GroupedCards";
import { useData } from "../../firebase/FirebaseDataContext";
import { AllRoutesObj } from "../../routes/AllRoutes";

// CONTAINS SUB CATAGORIES
// PATH : "/invent/:cat"  invent/Accesories

export default function SubCategoriesPage() {
  const { Inventory } = useData();
  const [CurrCat, setCurrCat] = useState("");
  const [arr, setarr] = useState<string[]>([]);

  function setUp() {
    let pathSplit = window.location.pathname.split("/");
    let cat = pathSplit[pathSplit.length - 1];

    setCurrCat(cat);

    console.log("CAT: ", cat);
    console.log(" Inventory", Inventory[cat]);

    if (Inventory !== undefined && Inventory !== null && Inventory[cat] !== undefined) {
      console.log("Yaps");

      setarr(Object.keys(Inventory[cat]));
    }
  }

  useEffect(() => {
    setUp();
  }, []);

  useEffect(() => {
    setUp();
  }, [window.location.pathname]);

  useEffect(() => {
    setUp();
  }, [Inventory]);

  const r = AllRoutesObj.products.subCat.path.replace(":cat", CurrCat).replace(":subCat", "");

  return (
    <IonPage>
      <IonContent>
        <HeaderComponent title='' />
        <GroupedCards arrToDisplay={arr} route={r} title={CurrCat} prodOrCat='cat' />
      </IonContent>
      <FooterComponent />
    </IonPage>
  );
}

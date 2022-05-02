import { IonContent, IonGrid, IonPage, IonRow } from "@ionic/react";
import { useEffect, useState } from "react";
import FooterComponent from "../../components/headersFooters/FooterComponent";
import HeaderComponent from "../../components/headersFooters/HeaderComponent";
import GroupedCards from "../../components/products/GroupedCards";
import ProductCardDisplay from "../../components/products/ProductCardDisplay";
import { useData } from "../../firebase/FirebaseDataContext";
import { iProduct } from "../../models/Product_models";
import { AllRoutesObj } from "../../routes/AllRoutes";

// CONTAINS PRODUCTS OF A SUB CATAGORY
// PATH "/inv/:cat/:subCat"

export default function AllProductsPage() {
  const { Inventory } = useData();
  const [CurrCat, setCurrCat] = useState("");
  const [CurrSubCat, setSubCurrCat] = useState("");
  const [arr, setarr] = useState<iProduct[]>([]);

  function setUp() {
    let path = window.location.pathname;
    let pathSplit = path.split("/");
    let cat = pathSplit[pathSplit.length - 2];
    let subcat = pathSplit[pathSplit.length - 1];

    setCurrCat(cat);
    setSubCurrCat(subcat);
    console.log("CAT: ", cat, "SUBCAT:", subcat);

    if (Inventory !== undefined && Inventory !== null && Inventory[cat] !== undefined && Inventory[cat][subcat] !== undefined && Inventory[cat][subcat].products !== undefined) {
      console.log("yaps subcat => Inventory", Inventory[cat][subcat].products);
      setarr(Object.values(Inventory[cat][subcat].products));
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

  const r = AllRoutesObj.products.product.path.replace(":cat", CurrCat).replace(":subCat", CurrSubCat).replace(":product", "");

  return (
    <IonPage>
      <IonContent>
        <HeaderComponent title={CurrSubCat} />
        <GroupedCards arrToDisplay={arr} route={r} title='' prodOrCat='prod' />
      </IonContent>
      <FooterComponent />
    </IonPage>
  );
}

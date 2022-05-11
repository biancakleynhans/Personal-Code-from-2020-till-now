import { IonContent, IonPage } from "@ionic/react";
import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import FooterBar from "../../../components/headersFooters/FooterBar";
import HeaderBar from "../../../components/headersFooters/HeaderBar";
import GroupedCards from "../../../components/products/GroupedCards";
import { useData } from "../../../hooks/AdminDataHook";
import { iProduct } from "../../../models/Products";
import { RoutesObj } from "../../../routes/Routes";

// CONTAINS PRODUCTS OF A SUB CATAGORY
// PATH "/inv/:cat/:subCat"

export default function AllProductsPage() {
  const { inventory } = useData();
  const loc = useLocation();

  const [CurrCat, setCurrCat] = useState("");
  const [CurrSubCat, setSubCurrCat] = useState("");
  const [dispArr, setdispArr] = useState<iProduct[]>([]);

  function setUp() {
    let path = loc.pathname.split("/");
    let cat = path[path.length - 2];
    let subcat = path[path.length - 1];

    // console.log("path", path, cat, subcat, inventory);
    setCurrCat(cat);
    setSubCurrCat(subcat);

    if (inventory) {
      let arr: iProduct[] = [];
      Object.keys(inventory).forEach((key) => {
        if (inventory[key].category === cat && inventory[key].subcategory === subcat) {
          arr.push(inventory[key]);
        }
      });

      // console.log("arr", arr);
      setdispArr(arr);
    }
  }

  useEffect(() => {
    setUp();
  }, [loc.pathname, inventory]);

  const r = RoutesObj.products.product.path.replace(":cat", CurrCat).replace(":subCat", CurrSubCat).replace(":product", "");

  return (
    <IonPage>
      <HeaderBar />
      <IonContent fullscreen>
        <GroupedCards arrToDisplay={dispArr} route={r} title='' prodOrCat='prod' />
      </IonContent>
      <FooterBar />
    </IonPage>
  );
}

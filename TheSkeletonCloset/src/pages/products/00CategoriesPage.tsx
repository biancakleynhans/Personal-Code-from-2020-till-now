import { IonButton, IonCol, IonContent, IonGrid, IonHeader, IonPage, IonRow, IonToolbar } from "@ionic/react";
import HeaderComponent from "../../components/headersFooters/HeaderComponent";
import FooterComponent from "../../components/headersFooters/FooterComponent";
import { useData } from "../../firebase/FirebaseDataContext";
import { useEffect, useState } from "react";
import CatSubCatCardDisplay from "../../components/products/CatSubCatCardDisplay";
import { AllRoutesObj } from "../../routes/AllRoutes";
import { ImgsObj } from "../../assets/images/ImageExport";
import GroupedCards from "../../components/products/GroupedCards";

// CONTAINS MAIN CATAGORIES
// PATH: "/inventory/:cat"

export default function CategoriesPage() {
  const { Inventory } = useData();
  const [arr, setarr] = useState<string[]>([]);

  const r = AllRoutesObj.products.cat.path.replace(":cat", "");

  function setUp() {
    // console.log(" Inventory", Inventory, Object.keys(Inventory), ImgsObj["Accesories"]);
    if (Inventory !== undefined && Inventory !== null) {
      setarr(Object.keys(Inventory));
    }
  }

  useEffect(() => {
    setUp();
  }, [Inventory]);

  return (
    <IonPage>
      <IonContent>
        <HeaderComponent title='' />
        <GroupedCards arrToDisplay={arr} route={r} title='Categories' prodOrCat='cat' />
      </IonContent>
      <FooterComponent />
    </IonPage>
  );
}

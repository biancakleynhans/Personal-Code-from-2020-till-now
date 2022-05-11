import { IonContent, IonPage } from "@ionic/react";
import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { useData } from "../../hooks/AdminDataHook";
import { iProduct } from "../../models/Products";
import { RoutesObj } from "../../routes/Routes";
import FooterBar from "../headersFooters/FooterBar";
import HeaderBar from "../headersFooters/HeaderBar";
import GroupedCards from "./GroupedCards";

export default function AllProductsToDisplay() {
  const { inventory } = useData();
  const loc = useLocation();
  const [inv, setinv] = useState<iProduct[]>([]);
  const [routes, setroutes] = useState<string[]>([]);

  function setUp() {
    let arr: string[] = [];
    if (inv) {
      setinv(inv);
      inv.forEach((x) => {
        arr.push(`/inv/${x.category}/${x.subcategory}/`);
      });
      setroutes(arr);
    }
  }

  useEffect(() => {
    setUp();
  }, []);

  const r = "/inv/:cat/:subCat/";

  return (
    <IonPage>
      <HeaderBar />
      <IonContent fullscreen>
        <GroupedCards arrToDisplay={inv} route={""} title={""} prodOrCat='prod' routes={routes} />
      </IonContent>
      <FooterBar />
    </IonPage>
  );
}

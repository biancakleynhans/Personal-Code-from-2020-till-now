import { IonContent, IonPage } from "@ionic/react";
import { useEffect } from "react";
import FooterBar from "../../components/headersFooters/FooterBar";
import HeaderBar from "../../components/headersFooters/HeaderBar";
import PageHeader from "../../components/headersFooters/PageHeader";
import AllProductsToDisplay from "../../components/products/AllProductsToDisplay";
import { useData } from "../../hooks/AdminDataHook";

export default function AppBaseHome() {
  const {} = useData();

  useEffect(() => {}, []);

  return (
    <IonPage>
      <HeaderBar />
      <IonContent fullscreen>
        <PageHeader header='Welcom to the Skeleton Closet' />
        <AllProductsToDisplay />
      </IonContent>
      <FooterBar />
    </IonPage>
  );
}

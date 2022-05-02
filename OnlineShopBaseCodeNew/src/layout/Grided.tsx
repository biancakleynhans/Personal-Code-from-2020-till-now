import { useEffect, useState } from "react";
import { IonCol, IonContent, IonGrid, IonList, IonPage, IonRow } from "@ionic/react";
import HeaderBar from "../components/headersFooters/HeaderBar";
import PageHeader from "../components/headersFooters/PageHeader";
import Loader from "../components/reusable/Loader";

interface iProps {
  header: string;
  addingJsx: JSX.Element;
  displayEditList: JSX.Element;
  loading: boolean;
}

export default function Grided(props: iProps) {
  const [mQuery, setMQuery] = useState({
    matches: window.innerWidth > 768 ? true : false
  });

  useEffect(() => {
    let mediaQuery = window.matchMedia("(min-width: 768px)");
    mediaQuery.addListener(setMQuery);
    return () => mediaQuery.removeListener(setMQuery);
  }, []);

  return (
    <IonPage>
      <HeaderBar />
      <IonContent fullscreen>
        <PageHeader header={props.header} />
        <IonGrid>
          {/* Adding */}
          <IonRow>
            {mQuery && mQuery.matches && <IonCol></IonCol>}
            <IonCol size={mQuery && mQuery.matches ? "4" : "12"}>{props.addingJsx}</IonCol>
            {mQuery && mQuery.matches && <IonCol></IonCol>}
          </IonRow>
          <IonRow>
            {mQuery && mQuery.matches && <IonCol></IonCol>}
            <IonCol size={mQuery && mQuery.matches ? "4" : "12"}>
              <IonList inset lines='full'>
                {props.displayEditList}
              </IonList>
            </IonCol>
            {mQuery && mQuery.matches && <IonCol></IonCol>}
          </IonRow>
        </IonGrid>
        {props.loading && <Loader />}
      </IonContent>
    </IonPage>
  );
}

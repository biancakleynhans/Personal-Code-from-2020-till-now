import { IonBackButton, IonButtons, IonHeader, IonToolbar } from "@ionic/react";
import NavButtons from "./NavButton";
import PageHeaderComponent from "./PageHeaderComponent";

export default function HeaderComponent(props: { title: string }) {
  return (
    <IonHeader>
      <IonToolbar>
        <IonButtons slot='start'>
          <IonBackButton color='primary' defaultHref='/' />
        </IonButtons>
        <IonButtons slot='end'>
          <NavButtons />
        </IonButtons>
      </IonToolbar>

      {props.title.length > 0 && <PageHeaderComponent header={props.title} />}
    </IonHeader>
  );
}

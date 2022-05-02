import { IonCol, IonButton } from "@ionic/react";
import { menuItems } from "../../routes/Allroutes";

const content: { title: string; icon: string; path: string }[] = menuItems;

export default function HomeGaleryBar(props: { index: number }) {
  return (
    <IonCol class='ion-align-self-center' className='btnBanner'>
      <h3 style={{ color: "var(--ion-color-light)", textAlign: "center" }}>Welcome to Verblyfhuis-Fraserburg</h3>
      <br />
      <p style={{ color: "var(--ion-color-light)", textAlign: "center" }}>Let your senses be your guide. </p>
      <br />
      <IonButton routerLink={content[props.index].path} shape='round' color='light'>
        {content[props.index].title}
      </IonButton>
    </IonCol>
  );
}

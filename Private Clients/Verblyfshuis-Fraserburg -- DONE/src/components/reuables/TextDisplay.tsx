import { IonLabel, IonTitle } from "@ionic/react";

export default function TextDisplay(props: { text: string; title?: string; subtitle?: string }) {
  return (
    <>
      {props.title !== undefined && (
        <IonTitle>
          <IonLabel color='primary' class='ion-text-wrap' style={{ fontSize: "38px" }}>
            {props.title}
          </IonLabel>
        </IonTitle>
      )}

      {props.subtitle !== undefined && <IonLabel color='secondary'>{props.subtitle}</IonLabel>}
      <br />
      {props.text.split(".").map((line, index) => {
        return (
          <>
            <br />
            <IonLabel key={index} class="class='ion-text-wrap">
              {line}.
              <br />
            </IonLabel>
          </>
        );
      })}
      <br />
    </>
  );
}

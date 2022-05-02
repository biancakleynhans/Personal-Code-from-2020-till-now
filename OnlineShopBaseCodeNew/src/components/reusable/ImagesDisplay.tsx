import { IonButton, IonCard, IonCardContent, IonCol, IonGrid, IonRow } from "@ionic/react";
import { ImageArr } from "../../firebase/FirebaseStorage";

interface iProps {
  imgArr: ImageArr[];
  remove: (index: number) => void;
}

export default function ImagesDisplay(props: iProps) {
  return (
    <IonGrid>
      <IonRow>
        {props.imgArr.map((data, index) => {
          return (
            <IonCol key={index}>
              <IonCard>
                <IonCardContent>
                  <img src={data.url} alt='broken' style={{ height: "150px", width: "150px" }} />
                  <br />
                  <IonButton
                    fill='outline'
                    color='tertiary'
                    onClick={() => {
                      props.remove(index);
                    }}>
                    Remove
                  </IonButton>
                </IonCardContent>
              </IonCard>
            </IonCol>
          );
        })}
      </IonRow>
    </IonGrid>
  );
}

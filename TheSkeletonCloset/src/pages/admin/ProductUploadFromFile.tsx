import { IonContent, IonPage } from "@ionic/react";
import HeaderComponent from "../../components/headersFooters/HeaderComponent";

export default function ProductUploadFromFile() {
  // function handle_upload(e: any) {
  //   // e.preventDefault();
  //   console.log("handle upload files: ", e);
  // }

  return (
    <IonPage>
      <IonContent>
        <HeaderComponent title={"Product Upload From File"} />

        {/* <IonCard>
          <IonCardContent>
            <input type='file' id='file-upload' accept='*.tsv' style={{ display: "none" }} onChange={(e) => handle_upload(e)} />

            <IonItem>
              <IonLabel class='ion-text-wrap'>Products List in .tsv Format: </IonLabel>
              <IonButton color='secondary' size='large' onClick={() => (document as any).getElementById("file-upload").click()}>
                Upload
              </IonButton>
            </IonItem>
          </IonCardContent>
        </IonCard> */}
      </IonContent>
    </IonPage>
  );
}

import { IonIcon, IonItem, IonLabel } from "@ionic/react";
import { iTaskContentEntry } from "../../models/TaskModels";
import { cloudDownloadOutline } from "ionicons/icons";
import { isArrayOfStrings } from "../../utils/Utilities";
import { saveAs } from "file-saver";

function runDownloadFile(file: string, fName: string) {
  saveAs(file, fName);
}

export default function DisplayFileDownload(type: "fileUrlsUser" | "fileUrlsAdmin", data: iTaskContentEntry[], color: string) {
  let links: JSX.Element[] = [];
  data.map((entry) => {
    // console.log("ENTRY", Object.values(entry));
    Object.values(entry).map((line) => {
      // console.log("LINE", line);
      line.map((val, index) => {
        console.log("VAL", val);
        if (val.type === type) {
          if (isArrayOfStrings(val.content)) {
            val.content.map((v) => {
              console.log("V", v);
              let v1 = v.replace("https://firebasestorage.googleapis.com/v0/b/george-agri-show.appspot.com/o/", "").replaceAll("%20", " ").replaceAll("%26", " ");
              let vName = v1.slice(0, v1.indexOf("?alt"));
              links.push(
                <IonItem
                  key={index}
                  color={color}
                  lines='full'
                  button
                  onClick={() => {
                    runDownloadFile(v, vName);
                  }}>
                  <IonLabel class='ion-text-wrap' slot='start'>
                    {vName}
                  </IonLabel>
                  <IonIcon color='primary' size='large' slot='end' icon={cloudDownloadOutline} />
                </IonItem>
              );
            });
          }
        }
      });
    });
  });

  return <>{links.map((i) => i)}</>;
}

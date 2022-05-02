import { IonButton, IonCheckbox, IonCol, IonIcon, IonItem, IonLabel, IonList, IonListHeader, IonRow, IonSpinner, IonTextarea } from "@ionic/react";
import { cloudUploadOutline } from "ionicons/icons";
import { Fragment, useEffect, useState } from "react";
import { UploadImageFileAndGetUrl } from "../../firebase/FirebaseStorageCRUD";
import { iTask, iTaskContentEntry } from "../../models/TaskModels";

interface iProps {
  complete: string[]; //"upload file" | "check box" | "text response" ;
  textRes: string;
  userUID: string;
  onFinal: (restask: iTask) => void;
  color: string;
}

export default function TaskUserFeedBack(props: iProps) {
  const [loading, setloading] = useState<boolean>(false);
  const [loadingText, setloadingText] = useState<string>("");
  const [loadingTextError, setloadingTextError] = useState<string>("");
  const [checked, setChecked] = useState<boolean>(false);
  const [textres, settextres] = useState<string>(props.textRes);
  const [urls, seturls] = useState<string[]>([]);

  useEffect(() => {
    console.log("???????", props.textRes);
    settextres(props.textRes);
  }, [props.textRes]);

  // FUNTIONS
  async function handleUploadFiles(e: any) {
    setloading(true);
    // Multiple
    let files = [...e.target.files];
    setloadingText("Uploading... ");
    await UploadImageFileAndGetUrl(files)
      .then((stringUrls) => {
        console.log("???? STRING URL ????", stringUrls);
        seturls(stringUrls);
        setloadingText("Completed");
        setloadingTextError("");
      })
      .catch((err) => {
        setloadingText("ERROR: ");
        setloadingTextError(err);
        seturls([]);
        setloading(false);
      })
      .finally(() => {
        setloading(false);
        setloadingText("");
        setloadingTextError("");
      });
  }

  function onComplete(urls: string[], check: boolean) {
    let id = props.userUID;
    let final: iTaskContentEntry[] = [];
    let comp: { type: string; content: string[] | string }[] = [];

    comp.push({ type: "fileUrlsUser", content: urls });
    comp.push({ type: "checkBox", content: `${check}` });
    comp.push({ type: "textRes", content: textres });

    let f: iTaskContentEntry = { [id]: comp };
    final.push(f);

    let res: iTask = {
      content: final
    } as iTask;

    props.onFinal(res);
  }

  // displays
  function displayFileUpload() {
    return (
      <>
        <input type='file' id='file-upload' multiple={true} style={{ display: "none" }} onChange={(e) => handleUploadFiles(e)} />
        <IonItem color={props.color} lines='full' button onClick={() => (document as any).getElementById("file-upload").click()}>
          <IonLabel slot='start'> Upload Documents</IonLabel>
          <IonIcon color='primary' size='large' slot='end' icon={cloudUploadOutline} />
        </IonItem>
      </>
    );
  }

  function displayCheck() {
    return (
      <IonItem color={props.color} lines='full'>
        <IonLabel>Completed task</IonLabel>
        <IonCheckbox checked={checked} onIonChange={(e) => setChecked(e.detail.checked)} />
      </IonItem>
    );
  }

  function displayText() {
    return (
      <IonItem color={props.color} lines='full'>
        <IonLabel position='floating'>Text response</IonLabel>
        <IonTextarea autoGrow placeholder={props.textRes} value={textres} onIonChange={(e) => settextres(e.detail.value!)} />
      </IonItem>
    );
  }

  return (
    <IonRow>
      <IonCol>
        {props.complete.map((type, index) => {
          if (type === "upload file") {
            return (
              <Fragment key={index}>
                {displayFileUpload()}
                <br />
                {loading ? (
                  <IonLabel slot='end' color='warning' style={{ fontSize: "20px" }}>
                    <IonSpinner slot='start' color='warning' name='bubbles' /> Progress: {loadingText.length > 0 && loadingText} {loadingTextError.length > 0 && loadingTextError}
                  </IonLabel>
                ) : (
                  <> {loadingText.length > 0 && loadingText} </>
                )}
              </Fragment>
            );
          }
          if (type === "check box") {
            return <Fragment key={index}>{displayCheck()}</Fragment>;
          }
          if (type === "text response") {
            return <Fragment key={index}>{displayText()}</Fragment>;
          }
        })}

        <IonButton disabled={loading} expand='full' onClick={() => onComplete(urls, checked)}>
          Send feedback
        </IonButton>
      </IonCol>
    </IonRow>
  );
}

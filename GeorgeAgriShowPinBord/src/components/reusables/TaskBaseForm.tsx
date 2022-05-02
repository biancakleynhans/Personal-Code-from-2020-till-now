import { useState } from "react";
import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonDatetime,
  IonIcon,
  IonInput,
  IonItem,
  IonLabel,
  IonPopover,
  IonSelect,
  IonSelectOption,
  IonSpinner,
  IonText,
  IonTextarea
} from "@ionic/react";
import { calendarOutline, cloudUploadOutline } from "ionicons/icons";
import { formatDate } from "../../utils/Utilities";
import { compArr, iTask, iTaskContentEntry } from "../../models/TaskModels";
import { Base_User } from "../../models/UserModels";
import { UploadImageFileAndGetUrl } from "../../firebase/FirebaseStorageCRUD";
import { useAuth } from "../../firebase/FirebaseContextAuth";

interface iProps {
  users: Base_User[];
  type: "create" | "edit";
  defaultTask: iTask;
  onCreate?: (newTask: iTask) => void;
  onUpdate?: (newTask: iTask) => void;
}

export default function TaskBaseForm(props: iProps) {
  const [nameTask, setNameTask] = useState<string>(props.defaultTask.name);
  const [descTask, setdescTask] = useState<string>(props.defaultTask.desc);
  const [compTask, setcompTask] = useState<string[]>(props.defaultTask.completeBy);
  const [startDate, setStartDate] = useState<string>(props.defaultTask.startDate);
  const [endDate, setEndDate] = useState<string>(props.defaultTask.endDate);
  const [users, setUsers] = useState<string[]>(props.defaultTask.users);
  const [companyTask, setcompanyTask] = useState<"GAS" | "JAKALS">(props.defaultTask.company);

  const [urls, seturls] = useState<string[]>([]);
  const [loading, setloading] = useState<boolean>(false);
  const [loadingText, setloadingText] = useState<string>("");
  const [loadingTextError, setloadingTextError] = useState<string>("");

  const { currentUser } = useAuth();

  // File upload admin
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

  // displays
  function displayFileUpload() {
    return (
      <>
        <input type='file' id='file-upload' multiple={true} style={{ display: "none" }} onChange={(e) => handleUploadFiles(e)} />
        <IonItem lines='full' button onClick={() => (document as any).getElementById("file-upload").click()}>
          <IonLabel slot='start'> Upload Documents</IonLabel>
          <IonIcon color='primary' size='large' slot='end' icon={cloudUploadOutline} />
        </IonItem>
      </>
    );
  }

  function resetState() {
    setNameTask("");
    setdescTask("");
    setcompTask(["check box"]);
    setStartDate(props.defaultTask.startDate);
    setEndDate(props.defaultTask.endDate);
    setUsers([]);
    setloading(false);
    setloadingText("");
    setloadingTextError("");
  }

  function runSub() {
    if (currentUser) {
      let final: iTaskContentEntry[] = [...props.defaultTask.content];
      let comp: { type: string; content: string[] | string }[] = [];
      comp.push({ type: "fileUrlsAdmin", content: urls });
      let f: iTaskContentEntry = { [currentUser ? currentUser.uid : ""]: comp };
      final.push(f);

      let sub: iTask = {
        completeBy: compTask,
        desc: descTask,
        startDate: startDate,
        endDate: endDate,
        name: nameTask,
        users: users,
        content: final,
        progress: "pending",
        company: companyTask,
        id: props.defaultTask.id,
        creator: {
          name: currentUser ? currentUser.displayName : "",
          token: currentUser ? currentUser.fmcToken : ""
        }
      };

      if (props.type === "create" && props.onCreate) {
        props.onCreate(sub);
        resetState();
      }
      if (props.type === "edit" && props.onUpdate) {
        props.onUpdate(sub);
        resetState();
      }
    }
  }

  return (
    <IonCard>
      <IonCardHeader>
        <IonCardTitle style={{ textAlign: "center", fontSize: "1.4rem" }}>
          <IonText color={props.type === "create" ? "primary" : "secondary"}>{props.type === "create" ? " Create a new task" : "Edit task"}</IonText>
        </IonCardTitle>
      </IonCardHeader>
      <IonCardContent>
        {/* Name of task */}
        <IonItem>
          <IonLabel position='floating' class='ion-text-wrap'>
            Name of task:
          </IonLabel>
          <IonInput
            type='text'
            required={true}
            maxlength={150}
            minlength={5}
            value={nameTask}
            onIonChange={(e) => {
              setNameTask(e.detail.value!);
            }}
          />
        </IonItem>

        {/* Task desc */}
        <IonItem>
          <IonLabel position='floating' class='ion-text-wrap'>
            Description of task:
          </IonLabel>
          <IonTextarea
            autoGrow={true}
            required={true}
            maxlength={550}
            minlength={5}
            value={descTask}
            onIonChange={(e) => {
              setdescTask(e.detail.value!);
            }}
          />
        </IonItem>

        {/* Start Date */}
        <IonItem button={true} id='open-date-input-start'>
          <IonLabel class='ion-text-wrap'>Start date: {startDate}</IonLabel>
          <IonIcon color={props.type === "create" ? "primary" : "secondary"} icon={calendarOutline} />
          <IonPopover trigger='open-date-input-start' showBackdrop={false}>
            <IonDatetime presentation='date' onIonChange={(e) => setStartDate(formatDate(e.detail.value!))} />
          </IonPopover>
        </IonItem>

        {/* End Date */}
        <IonItem button={true} id='open-date-input-end'>
          <IonLabel class='ion-text-wrap'>End date: {endDate}</IonLabel>
          <IonIcon color={props.type === "create" ? "primary" : "secondary"} icon={calendarOutline} />
          <IonPopover trigger='open-date-input-end' showBackdrop={false}>
            <IonDatetime presentation='date' onIonChange={(e) => setEndDate(formatDate(e.detail.value!))} />
          </IonPopover>
        </IonItem>

        {/* Comapany assigned??? */}
        <IonItem>
          <IonLabel class='ion-text-wrap'>Company assigned: </IonLabel>
          <IonSelect value={companyTask} placeholder='GAS' onIonChange={(e) => setcompanyTask(e.detail.value)}>
            <IonSelectOption value='GAS'>George Agri Show (GAS)</IonSelectOption>
            <IonSelectOption value='JAKALS'>JAKALS</IonSelectOption>
          </IonSelect>
        </IonItem>

        {/* Completed by doing what action??? */}
        <IonItem>
          <IonLabel class='ion-text-wrap'>How to complete task: </IonLabel>
          <IonSelect multiple value={compTask} placeholder='Select One' onIonChange={(e) => setcompTask(e.detail.value)}>
            {compArr.map((ent, index) => (
              <IonSelectOption key={index} value={ent}>
                {ent}
              </IonSelectOption>
            ))}
          </IonSelect>
        </IonItem>

        {/* Users assigned??? */}
        <IonItem>
          <IonLabel class='ion-text-wrap'>Users assigned: </IonLabel>
          <IonSelect multiple value={users} placeholder='Select One' onIonChange={(e) => setUsers(e.detail.value)}>
            {props.users.map((user, index) => (
              <IonSelectOption key={index} value={user.uid}>
                {user.displayName}
              </IonSelectOption>
            ))}
          </IonSelect>
        </IonItem>

        {/* Admin files uploaded */}
        {displayFileUpload()}
        <br />
        {loading ? (
          <IonLabel slot='end' color='warning' style={{ fontSize: "20px" }}>
            <IonSpinner slot='start' color='warning' name='bubbles' /> Progress: {loadingText.length > 0 && loadingText} {loadingTextError.length > 0 && loadingTextError}
          </IonLabel>
        ) : (
          <> {loadingText.length > 0 && loadingText} </>
        )}

        <IonButton
          disabled={loading}
          expand='full'
          color={props.type === "create" ? "primary" : "secondary"}
          onClick={() => {
            runSub();
          }}>
          {props.type === "create" ? " Create now" : "Update now"}
        </IonButton>
      </IonCardContent>
    </IonCard>
  );
}

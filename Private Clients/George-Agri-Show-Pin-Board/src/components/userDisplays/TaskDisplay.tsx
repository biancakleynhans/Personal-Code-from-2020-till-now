import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonCol,
  IonGrid,
  IonIcon,
  IonItem,
  IonLabel,
  IonRow,
  IonSelect,
  IonSelectOption
} from "@ionic/react";
import { pencil } from "ionicons/icons";
import { useEffect, useState } from "react";
import { iTask } from "../../models/TaskModels";
import { setColor } from "../../utils/Utilities";
import TaskUserFeedBack from "./TaskUserFeedBack";
import DisplayFileDownload from "../reusables/DowloadList";

interface iProps {
  data: iTask;
  userUID: string;
  cbContent: (resTask: iTask, id: string) => void;
}

export default function TaskDisplay(props: iProps) {
  const [prog, setprog] = useState<"pending" | "started" | "in progress" | "completed" | "overdue">(props.data.progress);
  const [showUP, setshowUP] = useState(false);
  const [text, settext] = useState("");
  const [cardColor, setcardColor] = useState(setColor(props.data.progress));
  const [showTaskContent, setshowTaskContent] = useState<boolean>(false);

  useEffect(() => {
    setcardColor(setColor(props.data.progress));
    // console.log("TASK DISPLAY PROPS", props);
    props.data.content.map((val) => {
      // console.log("?? VAL??", val, val[props.userUID]);
      if (val[props.userUID] !== undefined) {
        val[props.userUID].map((ent) => {
          if (ent.type === "textRes") {
            // console.log("???", ent);
            settext(ent.content.toString());
          }
        });
      }
    });
  }, [props.data.progress, props.data.content]);

  function progUpdate(e: "started" | "in progress" | "completed") {
    setprog(e);
    setshowUP(false);
    setcardColor(setColor(e));
  }

  function displayProgUpdate() {
    return (
      <IonRow style={{ textAlign: "center" }}>
        <IonCol>
          <IonItem color={cardColor} lines='none'>
            <IonSelect value={prog} placeholder='Please select option' onIonChange={(e) => progUpdate(e.detail.value)}>
              <IonSelectOption value='started'>Started</IonSelectOption>
              <IonSelectOption value='in progress'>In progress</IonSelectOption>
              <IonSelectOption value='completed'>Completed</IonSelectOption>
            </IonSelect>
          </IonItem>
        </IonCol>
      </IonRow>
    );
  }

  function runFinal(res: iTask) {
    setcardColor(setColor(props.data.progress));
    console.log("RUN FINAL:", props.data, res);

    let final: iTask = {
      name: props.data.name,
      startDate: props.data.startDate,
      endDate: props.data.endDate,
      desc: props.data.desc,
      progress: prog,
      completeBy: props.data.completeBy,
      users: props.data.users,
      content: res.content,
      company: props.data.company,
      id: props.data.id,
      creator: {
        name: props.data ? props.data.creator.name : "",
        token: props.data ? props.data.creator.token : ""
      }
    };

    console.log("FINAL:", final);
    props.cbContent(final, props.data.id);
  }

  return (
    <IonCard color={cardColor}>
      <IonCardHeader>
        <IonCardTitle class='ion-text-wrap' style={{ fontSize: "20px", textAlign: "center" }}>
          {props.data.name.toUpperCase()}
        </IonCardTitle>
        <IonCardSubtitle class='ion-text-wrap' style={{ fontSize: "18px", textAlign: "center" }}>
          {props.data.desc}
        </IonCardSubtitle>
      </IonCardHeader>
      {showTaskContent && (
        <IonCardContent>
          <IonGrid>
            {/* DATES */}
            <IonRow>
              <IonCol>
                <IonLabel class='ion-text-wrap' style={{ fontSize: "20px" }}>
                  Started on:
                </IonLabel>
                <br />
                <IonLabel class='ion-text-wrap'>{props.data.startDate}</IonLabel>
              </IonCol>
              <IonCol>
                <IonLabel class='ion-text-wrap' style={{ fontSize: "20px" }}>
                  Complete by:
                </IonLabel>
                <br />
                <IonLabel class='ion-text-wrap'>{props.data.endDate}</IonLabel>
              </IonCol>
            </IonRow>

            {/* PROGRESS */}
            <IonRow style={{ textAlign: "center" }}>
              <IonCol>
                <IonItem lines='none' button onClick={() => setshowUP(!showUP)}>
                  <IonLabel class='ion-text-wrap' style={{ fontSize: "20px" }}>
                    Progress:
                  </IonLabel>
                  {/* {props.data.progress} */}
                  <IonLabel class='ion-text-wrap'>{prog.toUpperCase()}</IonLabel>
                  <IonIcon icon={pencil} color={showUP ? "primary" : "dark"} />
                </IonItem>
              </IonCol>
            </IonRow>

            {showUP && displayProgUpdate()}

            {/* COMPLETE */}
            <IonRow style={{ textAlign: "center" }}>
              <IonCol>
                <IonLabel class='ion-text-wrap' style={{ fontSize: "20px" }}>
                  Complete task by:
                </IonLabel>
                <br />
                <IonLabel class='ion-text-wrap'>{props.data.completeBy.toString()}</IonLabel>
              </IonCol>
            </IonRow>

            {/* Admin uploaded files  */}
            <IonRow style={{ textAlign: "center" }}>
              <IonCol>
                <IonLabel class='ion-text-wrap' style={{ fontSize: "20px" }}>
                  Admin uploaded files:
                </IonLabel>
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol>{DisplayFileDownload("fileUrlsAdmin", props.data.content, cardColor)}</IonCol>
            </IonRow>
            <br />
            <br />
            <TaskUserFeedBack complete={props.data.completeBy} userUID={props.userUID} textRes={text} onFinal={(res) => runFinal(res)} color={cardColor} />
          </IonGrid>
        </IonCardContent>
      )}

      <IonButton color='medium' expand='full' onClick={() => setshowTaskContent(!showTaskContent)}>
        {`${showTaskContent ? "Hide" : "Show"}`} Task content
      </IonButton>
    </IonCard>
  );
}

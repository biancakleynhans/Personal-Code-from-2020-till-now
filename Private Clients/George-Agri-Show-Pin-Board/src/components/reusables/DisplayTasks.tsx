import { useState } from "react";
import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCol, IonGrid, IonIcon, IonLabel, IonRow } from "@ionic/react";
import { iTask } from "../../models/TaskModels";
import { pencilOutline, person, trashBinOutline } from "ionicons/icons";
import { useAuth } from "../../firebase/FirebaseContextAuth";
import { setColor } from "../../utils/Utilities";
import DisplayFileDownload from "./DowloadList";

interface iProps {
  task: iTask;
  updateComp: JSX.Element;
  onDelete: (task: iTask, id: string) => void;
}

export default function DisplayTasks(props: iProps) {
  const [editTask, seteditTask] = useState<boolean>(false);
  const [deleteTask, setdeleteTask] = useState<boolean>(false);
  const [showTaskContent, setshowTaskContent] = useState<boolean>(false);
  const [taskColor, settaskColor] = useState<string>(setColor(props.task.progress));

  const { RetrieveAllUsersFromDB } = useAuth();

  function displayUsers(users: string[]) {
    let elemArr: JSX.Element[] = [];
    users.map((userUID, index) => {
      RetrieveAllUsersFromDB.map((user) => {
        if (userUID === user.uid) {
          elemArr.push(
            <IonCol key={index}>
              <IonIcon icon={person} />
              <IonLabel>{user.displayName}</IonLabel>
            </IonCol>
          );
        }
      });
    });

    return <IonRow>{elemArr.map((elem) => elem)}</IonRow>;
  }

  function displayContent() {
    return (
      <IonCard style={{ textAlign: "center" }}>
        <IonCardHeader>
          <IonCardTitle style={{ color: "var(--ion-color-primary)", fontSize: "1.5rem" }}>{props.task.name}</IonCardTitle>
          <IonCardSubtitle>{props.task.desc}</IonCardSubtitle>
          <IonCardSubtitle>Completed by: {props.task.completeBy}</IonCardSubtitle>
        </IonCardHeader>
        <IonCardContent>
          <IonGrid>
            <IonRow>
              <IonCol>
                <IonLabel color='secondary'>Start Date</IonLabel> <br />
                <IonLabel>{props.task.startDate}</IonLabel>
              </IonCol>
              <IonCol>
                <IonLabel color='secondary'>End Date</IonLabel> <br />
                <IonLabel>{props.task.endDate}</IonLabel>
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol>
                <IonLabel color='secondary' style={{ fontSize: "1.5rem" }}>
                  Users assigned:
                </IonLabel>
              </IonCol>
            </IonRow>
            {displayUsers(props.task.users)}

            <IonRow>
              <IonCol>{DisplayFileDownload("fileUrlsUser", props.task.content, taskColor)}</IonCol>
            </IonRow>
          </IonGrid>
        </IonCardContent>
      </IonCard>
    );
  }

  function editbtn() {
    seteditTask(!editTask);
    settaskColor(!editTask ? "warning" : "light");
  }

  function deletebtn() {
    seteditTask(false);
    let con = window.confirm("Are you sure you want to delete this task??");
    if (con) {
      settaskColor("danger");
      // setdeleteTask(true);
      // window.location.reload();
      props.onDelete(props.task, props.task.id);
    } else {
      settaskColor("light");
    }
  }

  return (
    <IonCard color={taskColor} key={props.task.id}>
      {!showTaskContent && (
        <IonCardHeader>
          <IonCardTitle class='ion-text-wrap' style={{ fontSize: "20px", textAlign: "center" }}>
            {props.task.name.toUpperCase()}
          </IonCardTitle>
          <IonCardSubtitle class='ion-text-wrap' style={{ fontSize: "18px", textAlign: "center" }}>
            {props.task.desc}
          </IonCardSubtitle>
        </IonCardHeader>
      )}
      <IonCardContent>
        <IonGrid>
          {showTaskContent && (
            <>
              {/* EDIT OR VIEW MODE */}
              <IonRow>
                <IonCol>
                  {/* When editing and not editing */}
                  {editTask && props.updateComp}

                  {/* When just displaying */}
                  {!editTask && !deleteTask && displayContent()}
                </IonCol>
              </IonRow>

              {/* Buttons */}
              <IonRow>
                {/* Display edit */}
                <IonCol>
                  <IonButton expand='full' color='success' onClick={() => editbtn()}>
                    <IonIcon icon={pencilOutline} />
                  </IonButton>
                </IonCol>
                {/* Display delete */}
                <IonCol>
                  <IonButton expand='full' color='danger' onClick={() => deletebtn()}>
                    <IonIcon icon={trashBinOutline} />
                  </IonButton>
                </IonCol>
              </IonRow>
            </>
          )}
          {/* Show/Hide  */}
          <IonRow>
            <IonCol>
              <IonButton color='medium' expand='full' onClick={() => setshowTaskContent(!showTaskContent)}>
                {`${showTaskContent ? "Hide" : "Show"}`} Task content {`${showTaskContent ? "Hide" : "to view or edit task"}`}
              </IonButton>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonCardContent>
    </IonCard>
  );
}

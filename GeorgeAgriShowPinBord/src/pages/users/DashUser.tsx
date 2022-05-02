import React, { useEffect, useState } from "react";
import { IonButton, IonCol, IonContent, IonGrid, IonPage, IonRow, IonTitle } from "@ionic/react";
import { useAuth } from "../../firebase/FirebaseContextAuth";
import { useData } from "../../firebase/FirebaseContextData";
import { UserUpdate } from "../../models/UserModels";
import { iTask } from "../../models/TaskModels";
import HeaderComponent from "../../components/headersFooters/HeaderComponent";
import FooterComponent from "../../components/headersFooters/FooterComponent";
import UserProfileUpdate from "../../components/reusables/UserProfileUpdate";
import TaskDisplay from "../../components/userDisplays/TaskDisplay";
import NotifcationsUser from "./NotifcationsUser";
import { iNewPush, PushNotifyUserTaskUpdate } from "../../firebase/FirebaseFunctionCalls";

function sortTasks() {}

export default function DashUser() {
  const { currentUser, logout, updateUserProfile } = useAuth();
  const { RetrieveAllTasksFromDB, UpdateTask } = useData();

  const [tasks, settasks] = useState<iTask[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [loading, setloading] = useState<boolean>(true);
  const [showProfile, setshowProfile] = useState<boolean>(false);
  const [showNotifitions, setshowNotifitions] = useState<boolean>(false);
  const [showEvents, setshowEvents] = useState<boolean>(false);

  useEffect(() => {
    // console.log("User dash: ", RetrieveAllTasksFromDB);
    if (currentUser !== null) {
      setloading(false);
      if (currentUser.fmcToken === null || currentUser.fmcToken === undefined || currentUser.fmcToken.length === 0) {
        setshowNotifitions(true);
      }
    }
  }, [currentUser]);

  useEffect(() => {
    let arr: iTask[] = [];
    let db = RetrieveAllTasksFromDB;

    if (db !== undefined && db.length > 0 && currentUser !== null) {
      db.forEach((task) => {
        // console.log("TASK", task);
        if (task.users) {
          task.users.forEach((element: string) => {
            if (element === currentUser.uid) {
              // console.log("You have task", task);
              arr.push(task);
            }
          });
        }
      });
      // console.log("ARR", arr);
      setTotal(db.length);
      settasks(arr);
    }
  }, [RetrieveAllTasksFromDB]);

  useEffect(() => {
    let arr: iTask[] = [];
    let db = RetrieveAllTasksFromDB;

    if (db.length !== total && currentUser !== null) {
      console.log("some thing changed so lets reflect that ");
      db.forEach((task) => {
        // console.log("TASK", task);
        if (task.users) {
          task.users.forEach((element: string) => {
            if (element === currentUser.uid) {
              // console.log("You have task", task);
              arr.push(task);
            }
          });
        }
      });
      // console.log("ARR", arr);
      setTotal(db.length);
      settasks(arr);
    }
  }, [tasks]);

  function runUpdate(newUser: UserUpdate) {
    if (currentUser !== null) {
      let newData: UserUpdate = {
        fn: newUser.fn,
        ln: newUser.ln,
        cell: newUser.cell,
        email: currentUser?.email,
        profileImg: currentUser?.profileUrl,
        addr: newUser.addr,
        company: currentUser.company,
        fmcToken: currentUser.fmcToken
      };

      updateUserProfile(currentUser?.uid, currentUser, newData)
        .then((res) => {
          console.log("sucsess", res);
          window.alert("Profile updated sucesfully");
          window.location.reload();
        })
        .catch((err) => {
          console.log("err", err);
        });
    }
  }

  function submitUserFeedBack(resTask: iTask, id: string) {
    console.log("CALLBACK: ", id, resTask);
    UpdateTask(resTask, id)
      .then((res) => {
        console.log("Updated task with your input", res);
        // window.alert("Sent your input");
        let push: iNewPush = {
          users: [{ name: "Task creator", token: resTask.creator.token }],
          task: { desc: resTask.desc, name: resTask.name }
        };

        // Send push notification to users assigned
        PushNotifyUserTaskUpdate(push)
          .then((res) => {
            console.log("Res PUSH", res);
            window.alert("Updated task with your input");
            // window.location.reload();
          })
          .catch((err) => {
            console.log("Error while sending push notify", err);
          });
      })
      .catch(() => {
        window.alert("Task could not be updated with your input");
      });
  }

  return (
    <IonPage>
      <HeaderComponent title='Dashboard' />
      <IonContent>
        {!loading ? (
          <IonGrid>
            <IonRow>
              {/* Buttons */}
              <IonCol>
                <IonButton
                  color='medium'
                  expand='full'
                  onClick={() => {
                    setshowProfile(!showProfile);
                  }}>
                  {showProfile ? "Hide" : "Show"} profile
                </IonButton>
                <br />
                <IonButton
                  color='medium'
                  expand='full'
                  onClick={() => {
                    setshowNotifitions(!showNotifitions);
                  }}>
                  {showNotifitions ? "Hide" : "Show"} Notification
                </IonButton>
                <br />

                <IonButton
                  color='medium'
                  expand='full'
                  onClick={() => {
                    setshowEvents(!showEvents);
                  }}>
                  {showEvents ? "Hide" : "Show"} Events
                </IonButton>

                <br />
                <IonButton
                  expand='full'
                  onClick={() => {
                    logout();
                  }}>
                  Log out
                </IonButton>
              </IonCol>

              {/* Actions  */}
              {/* Taskslisted */}
              <IonCol>
                <IonTitle style={{ textAlign: "center", fontSize: "20px" }}>Tasks Active</IonTitle>
                {tasks.map((entry: iTask, index: number) => {
                  // console.log("Task in display: ", entry);
                  return <TaskDisplay key={index} data={entry} userUID={currentUser ? currentUser.uid : ""} cbContent={(resTask) => submitUserFeedBack(resTask, entry.id)} />;
                })}
              </IonCol>

              <IonCol>
                {/* User profile */}
                {showProfile && currentUser !== null && <UserProfileUpdate currentUser={currentUser} callBack={(newUser: UserUpdate) => runUpdate(newUser)} />}

                {/* Notifications */}
                {showNotifitions && <NotifcationsUser />}

                {/* Events */}
                {showEvents && <>EVENTS</>}
              </IonCol>
            </IonRow>
          </IonGrid>
        ) : (
          <>Loading</>
        )}
      </IonContent>

      <FooterComponent />
    </IonPage>
  );
}

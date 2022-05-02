import React, { useEffect, useState } from "react";
import { IonButton, IonCard, IonCol, IonContent, IonGrid, IonHeader, IonLabel, IonPage, IonRow, IonToolbar } from "@ionic/react";
import FooterComponent from "../../components/headersFooters/FooterComponent";
import HeaderComponent from "../../components/headersFooters/HeaderComponent";
import { useAuth } from "../../firebase/FirebaseContextAuth";
import { UserUpdate } from "../../models/UserModels";
import UserProfileUpdate from "../../components/reusables/UserProfileUpdate";
import TasksAdmin from "./TasksAdmin";
import NotifcationsAdmin from "./NotifcationsAdmin";
import ManageUsers from "./ManageUsers";

export default function DashAdmin() {
  const { currentUser, RetrieveAllUsersFromDB, logout, updateUserProfile } = useAuth();
  const [allUsers, setallUsers] = useState<any[]>([]);

  // BUTTONS to control views
  const [showProfile, setshowProfile] = useState<boolean>(false);
  const [showNotifitions, setshowNotifitions] = useState<boolean>(false);
  const [showEvents, setshowEvents] = useState<boolean>(false);
  const [showUsers, setshowUsers] = useState<boolean>(false);
  const [showcreating, setshowCreating] = useState<boolean>(false);

  useEffect(() => {
    // console.log("USERS", RetrieveAllUsersFromDB, "CURRENT", currentUser);
    if (RetrieveAllUsersFromDB !== undefined && RetrieveAllUsersFromDB.length > 0) {
      setallUsers(RetrieveAllUsersFromDB);
    }
  }, [currentUser]);

  /*USER*/
  function UpdateUser(newUser: UserUpdate) {
    if (currentUser !== null) {
      let newData: UserUpdate = {
        fn: newUser.fn,
        ln: newUser.ln,
        cell: newUser.cell,
        email: newUser.email,
        profileImg: currentUser?.profileUrl,
        addr: newUser.addr,
        company: currentUser.company,
        fmcToken: currentUser.fmcToken
      };

      updateUserProfile(currentUser.uid, currentUser, newData)
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

  return (
    <IonPage>
      <HeaderComponent title='Admin Dashboard' />
      <IonContent fullscreen>
        {currentUser !== null ? (
          <IonGrid>
            <IonRow>
              {/* Buttons */}
              <IonCol>
                {/* CREATE TASK BTN */}
                <IonButton
                  color='secondary'
                  expand='full'
                  onClick={() => {
                    setshowCreating(!showcreating);
                  }}>
                  Create new task
                </IonButton>
                <br />
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
                  color='medium'
                  expand='full'
                  onClick={() => {
                    setshowUsers(!showUsers);
                  }}>
                  {showUsers ? "Hide" : "Show"} Manage users
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
              <IonCol className='ion-align-self-center'>
                <IonLabel style={{ fontSize: "28px", display: "flex", justifyContent: "center", alignContent: "center", alignItems: "center", flexWrap: "nowrap" }}>Current tasks</IonLabel>

                <TasksAdmin
                  AllUsers={allUsers}
                  creating={showcreating}
                  setCreating={() => {
                    setshowCreating(!showcreating);
                  }}
                />
              </IonCol>

              <IonCol>
                {/* User profile */}
                {showProfile && <UserProfileUpdate currentUser={currentUser} callBack={(newUser: UserUpdate) => UpdateUser(newUser)} />}

                {/* Notifications */}
                {showNotifitions && <NotifcationsAdmin />}

                {/* Events */}
                {showEvents && <>EVENTS</>}

                {/* MANAGE USERS */}
                {showUsers && <ManageUsers users={allUsers} />}
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

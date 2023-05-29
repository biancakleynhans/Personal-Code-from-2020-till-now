import { IonCard, IonCardContent, IonIcon, IonItem, IonLabel, IonList, IonListHeader, IonSelect, IonSelectOption } from "@ionic/react";
import { buildOutline } from "ionicons/icons";
import { useEffect, useState } from "react";
import { useAuth } from "../../firebase/FirebaseContextAuth";
import { Base_User, UserUpdate } from "../../models/UserModels";

interface iProps {
  users: Base_User[];
}

export default function ManageUsers(props: iProps) {
  const { updateUserProfile } = useAuth();
  const [showEdit, setshowEdit] = useState<boolean[]>([]);
  const [newComp, setnewComp] = useState<"GAS" | "JAKALS" | "BOTH" | string>("GAS");

  useEffect(() => {
    let arr: boolean[] = [];
    for (let i = 0; i < props.users.length; i++) {
      arr.push(false);
    }
  }, [props.users]);

  function showHide(index: number, oldComp: "GAS" | "JAKALS" | "BOTH" | string) {
    let copy = [...showEdit];
    copy[index] = !copy[index];
    setshowEdit(copy);
    setnewComp(oldComp);
  }

  function updateUserComp(e: "GAS" | "JAKALS" | "BOTH" | string, user: Base_User, index: number) {
    setnewComp(e);
    // run user update
    let newData: UserUpdate = {
      fn: user.fn,
      ln: user.ln,
      cell: user.cell,
      email: user.email,
      profileImg: user.profileUrl,
      addr: user.adress,
      company: e,
      fmcToken: user.fmcToken
    };

    updateUserProfile(user.uid, user, newData)
      .then(() => {
        showHide(index, e);
        console.log("sucsess updating company");
        window.alert("Profile updated sucesfully");
        window.location.reload();
      })
      .catch((err) => {
        console.log("ERROR", err);
      });
  }

  function EditUserAsAdmin(user: Base_User, index: number) {
    return (
      <IonItem lines='none'>
        <IonLabel>Company assigned: </IonLabel>
        <IonSelect value={newComp} onIonChange={(e) => updateUserComp(e.detail.value, user, index)}>
          <IonSelectOption value='GAS'>GAS</IonSelectOption>
          <IonSelectOption value='JAKALS'>JAKALS</IonSelectOption>
          <IonSelectOption value='BOTH'>BOTH</IonSelectOption>
        </IonSelect>
      </IonItem>
    );
  }

  return (
    <IonCard>
      <IonCardContent>
        <IonList inset>
          <IonListHeader>
            <IonLabel color='secondary' style={{ fontSize: "24px", textAlign: "center" }}>
              Manage Users
            </IonLabel>
          </IonListHeader>
          {props.users.map((user, index) => {
            return (
              <>
                <IonItem lines='full' button key={index}>
                  <IonIcon
                    onClick={() => {
                      showHide(index, user.company);
                    }}
                    slot='start'
                    color={showEdit[index] ? "tertiary" : "primary"}
                    icon={buildOutline}
                  />
                  <IonLabel>{user.displayName.toUpperCase()}</IonLabel>
                  <br />
                </IonItem>
                {showEdit[index] && EditUserAsAdmin(user, index)}
              </>
            );
          })}
        </IonList>
      </IonCardContent>
    </IonCard>
  );
}

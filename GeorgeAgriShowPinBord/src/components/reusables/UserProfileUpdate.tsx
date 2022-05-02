import React, { useState } from "react";
import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonIcon, IonInput, IonItem, IonLabel } from "@ionic/react";
import { pencilOutline } from "ionicons/icons";
import { Base_User, UserUpdate } from "../../models/UserModels";

export default function UserProfileUpdate(props: { currentUser: Base_User; callBack: (newUser: UserUpdate) => void }) {
  const [fn, setfn] = useState<string>("");
  const [editfn, setEditfn] = useState<boolean>(false);
  const [ln, setln] = useState<string>("");
  const [editln, setEditln] = useState<boolean>(false);
  const [addr, setaddr] = useState<string>("");
  const [editaddr, setEditaddr] = useState<boolean>(false);
  const [cell, setcell] = useState<string>("");
  const [editcell, setEditcell] = useState<boolean>(false);
  const [email, setemail] = useState<string>("");
  const [editemail, setEditemail] = useState<boolean>(false);

  function displayFN() {
    return (
      <IonItem>
        <IonLabel class='ion-text-wrap'>{props.currentUser !== null && props.currentUser.fn ? props.currentUser.fn : "first name"}</IonLabel>
        <br />
        {editfn && (
          <IonInput
            type='text'
            placeholder='New First Name'
            value={fn}
            onIonChange={(e) => {
              setfn(e.detail.value!);
            }}
          />
        )}
        <br />
        <IonIcon
          color={editfn ? "primary" : "medium"}
          icon={pencilOutline}
          onClick={() => {
            setEditfn(!editfn);
          }}
        />
      </IonItem>
    );
  }

  function displayLN() {
    return (
      <IonItem>
        <IonLabel class='ion-text-wrap'>{props.currentUser !== null && props.currentUser.ln ? props.currentUser.ln : "Last name"}</IonLabel>
        <br />
        {editln && (
          <IonInput
            type='text'
            placeholder='New Last Name'
            value={ln}
            onIonChange={(e) => {
              setln(e.detail.value!);
            }}
          />
        )}
        <br />
        <IonIcon
          color={editln ? "primary" : "medium"}
          icon={pencilOutline}
          onClick={() => {
            setEditln(!editln);
          }}
        />
      </IonItem>
    );
  }

  function displayADDR() {
    return (
      <IonItem>
        <IonLabel class='ion-text-wrap'>{props.currentUser !== null && props.currentUser.adress ? props.currentUser.adress : "Adress"}</IonLabel>
        <br />
        {editaddr && (
          <IonInput
            type='text'
            placeholder='New Adress'
            value={addr}
            onIonChange={(e) => {
              setaddr(e.detail.value!);
            }}
          />
        )}
        <br />
        <IonIcon
          color={editaddr ? "primary" : "medium"}
          icon={pencilOutline}
          onClick={() => {
            setEditaddr(!editaddr);
          }}
        />
      </IonItem>
    );
  }

  function displayCell() {
    return (
      <IonItem>
        <IonLabel class='ion-text-wrap'>{props.currentUser !== null && props.currentUser.cell ? props.currentUser.cell : "Cell"}</IonLabel>
        <br />
        {editcell && (
          <IonInput
            type='text'
            placeholder='New Contact'
            value={cell}
            onIonChange={(e) => {
              setcell(e.detail.value!);
            }}
          />
        )}
        <br />
        <IonIcon
          color={editcell ? "primary" : "medium"}
          icon={pencilOutline}
          onClick={() => {
            setEditcell(!editcell);
          }}
        />
      </IonItem>
    );
  }

  function displayemail() {
    return (
      <IonItem>
        <IonLabel class='ion-text-wrap'>{props.currentUser !== null && props.currentUser.email ? props.currentUser.email : "email"}</IonLabel>
        <br />
        {editemail && (
          <IonInput
            type='text'
            placeholder='New email'
            value={email}
            onIonChange={(e) => {
              setemail(e.detail.value!);
            }}
          />
        )}
        <br />
        <IonIcon
          color={editemail ? "primary" : "medium"}
          icon={pencilOutline}
          onClick={() => {
            setEditemail(!editemail);
          }}
        />
      </IonItem>
    );
  }

  return (
    <IonCard>
      <IonCardHeader>
        <IonCardTitle>{props.currentUser?.displayName}</IonCardTitle>
        <IonCardSubtitle>{props.currentUser?.role}</IonCardSubtitle>
      </IonCardHeader>
      <IonCardContent>
        {/* Name */}
        {displayFN()}
        {/* Surname */}
        {displayLN()}
        {/* Cell */}
        {displayCell()}
        {/* email */}
        {displayemail()}
        {/* Adress */}
        {displayADDR()}

        <IonButton
          color='tertiary'
          expand='full'
          disabled={fn.length == 0 && ln.length === 0 && cell.length === 0 && addr.length === 0 && email.length === 0}
          onClick={() => {
            props.callBack({
              fn,
              ln,
              cell,
              addr,
              email,
              profileImg: props.currentUser.profileUrl,
              company: props.currentUser.company,
              fmcToken: props.currentUser.fmcToken
            });
          }}>
          Update Profile
        </IonButton>
      </IonCardContent>
    </IonCard>
  );
}

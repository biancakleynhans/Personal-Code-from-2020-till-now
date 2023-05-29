// Displays and creates each individual task this will be used to edit the individiual task and update it

import React, { useEffect, useState } from 'react';
import { IonButton, IonCard, IonCardContent, IonIcon, IonInput, IonItem, IonLabel, IonSelect, IonSelectOption, IonTextarea } from '@ionic/react';
import { useAuth } from '../../firebase/FirebaseContextAuth';
import { formatDate } from '../../utils/Utilities';
import { checkmarkDone } from 'ionicons/icons';
import { iAssigned, iCheckTask, STATUS } from '../../models/ChecklistModels';

interface iProps {
  task: iCheckTask;
  type: 'create' | 'edit' | 'user';
  mainIndex: number;
  subtaskName: string;
  subtask_taskIndex: number;
  cb: (mi: number, sn: string, si: number, task: iCheckTask) => void;
}

export default function ChecklistTaskCreator(props: iProps) {
  const { RetrieveAllUsersFromDB } = useAuth();

  const [AllFromDB, setAllFromDB] = useState<iAssigned[]>([]);
  const [allUsersSelected, setallUsersSelected] = useState<iAssigned[]>([]);
  const [note, setnote] = useState<string>('');
  const [name, setname] = useState<string>('');
  const [startDate, setstartDate] = useState<string>('');
  const [endDate, setendDate] = useState<string>('');
  const [status, setstatus] = useState<string>('');

  const [sss, setsss] = useState('');
  const [sse, setsse] = useState('');

  const [isVald_allUsersSelected, setisVald_allUsersSelected] = useState<boolean>(true);
  const [isVald_name, setisVald_name] = useState<boolean>(true);
  const [isVald_startDate, setisVald_startDate] = useState<boolean>(true);
  const [isVald_endDate, setisVald_endDate] = useState<boolean>(true);
  const [isVald_status, setisVald_status] = useState<boolean>(true);

  // // Transforms Db users to correct format
  useEffect(() => {
    let users: iAssigned[] = RetrieveAllUsersFromDB.map((x) => ({ fn: x.fn.trim().toLowerCase(), dn: x.displayName.trim().toLowerCase(), uid: x.uid }));
    setAllFromDB(users);
  }, [RetrieveAllUsersFromDB]);

  // Handles setting the default value of an obj
  useEffect(() => {
    setup();
  }, []);

  // validates on changes
  useEffect(() => {
    validateInput();
    updateMainPoint();
  }, [name, status, startDate, endDate, note, allUsersSelected]);

  // Start setup
  function setup() {
    if (props.task !== undefined) {
      if (typeof props.task.personsAssigned !== 'string') {
        setallUsersSelected(props.task.personsAssigned);
      }

      setname(props.task.name);
      setnote(props.task.notes);
      setstartDate(props.task.startDate);
      setendDate(props.task.endDate);
      setsss(props.task.startDate);
      setsse(props.task.endDate);
      setstatus(props.task.status);
    }
  }

  // validator function
  function validateInput() {
    if (name.length > 0) {
      setisVald_name(true);
    } else {
      setisVald_name(false);
    }

    if (startDate.length > 0) {
      setisVald_startDate(true);
    } else {
      setisVald_startDate(false);
    }

    if (endDate.length > 0) {
      setisVald_endDate(true);
    } else {
      setisVald_endDate(false);
    }

    if (status.length > 0) {
      setisVald_status(true);
    } else {
      setisVald_status(false);
    }

    if (allUsersSelected.length > 0) {
      setisVald_allUsersSelected(true);
    } else {
      setisVald_allUsersSelected(false);
    }
  }

  function handleDate(type: 'start' | 'end') {
    if (type === 'start') {
      setstartDate(formatDate(sss));
    } else {
      setstartDate(formatDate(sse));
    }
  }

  function updateMainPoint() {
    const { mainIndex, subtaskName, subtask_taskIndex } = props;
    console.log('>>>>>', mainIndex, subtaskName, subtask_taskIndex);
    let changedTask: iCheckTask = {
      name: name,
      personsAssigned: allUsersSelected,
      startDate: startDate,
      endDate: endDate,
      notes: note,
      status: status,
    };

    props.cb(mainIndex, subtaskName, subtask_taskIndex, changedTask);
  }

  return (
    <IonCard color='light'>
      <IonCardContent>
        {/* Naam */}
        <IonItem color={isVald_name ? 'light' : 'danger'}>
          <IonLabel position={props.type !== 'user' ? 'stacked' : 'fixed'} class='ion-text-wrap' color='dark'>
            Task:
          </IonLabel>
          <IonLabel slot='end'>{props.type === 'user' && `${name}`}</IonLabel>
          {props.type !== 'user' && <IonInput value={name} onIonChange={(e) => setname(e.detail.value!)} />}
        </IonItem>

        {/* Status */}
        <IonItem color={isVald_status ? 'light' : 'danger'}>
          <IonLabel position='stacked' class='ion-text-wrap' color='dark'>
            Status:
          </IonLabel>
          <IonSelect placeholder={status} onIonChange={(ev) => setstatus(ev.detail.value)} value={status}>
            {STATUS.map((state, index) => (
              <IonSelectOption key={index} value={state}>
                {state}
              </IonSelectOption>
            ))}
          </IonSelect>
        </IonItem>

        {/* Persoon verantwoordelik */}
        <IonItem color={isVald_allUsersSelected ? 'light' : 'danger'}>
          <IonLabel position={props.type !== 'user' ? 'stacked' : 'fixed'} class='ion-text-wrap' color='dark'>
            Person(s) Assigned:
          </IonLabel>

          <IonLabel slot='end'> {props.type === 'user' && `${allUsersSelected.map((x) => x.fn).toString()}`}</IonLabel>

          {props.type !== 'user' && (
            <IonSelect
              placeholder={allUsersSelected.length > 0 ? allUsersSelected.map((x) => x.fn).toString() : 'Please select assigned user(s)'}
              onIonChange={(ev) => setallUsersSelected(ev.detail.value)}
              multiple={true}
              value={allUsersSelected}
            >
              {AllFromDB.map((user, index) => (
                <IonSelectOption key={index} value={user}>
                  {user.fn}
                </IonSelectOption>
              ))}
            </IonSelect>
          )}
        </IonItem>

        {/* Start Date */}
        <IonItem color={isVald_startDate ? 'light' : 'danger'}>
          <IonLabel position='fixed' class='ion-text-wrap'>
            Start date:
          </IonLabel>
          <IonLabel slot='end'>{props.type === 'user' && `${startDate}`}</IonLabel>
          {props.type !== 'user' && (
            <>
              <IonInput value={sss} onIonChange={(e) => setsss(e.detail.value!)} />
              <IonButton color='success' onClick={() => handleDate('start')}>
                <IonIcon icon={checkmarkDone} />
                Done
              </IonButton>
            </>
          )}
        </IonItem>

        {/* End Date */}
        <IonItem color={isVald_endDate ? 'light' : 'danger'}>
          <IonLabel position='fixed' class='ion-text-wrap'>
            End date:
          </IonLabel>
          <IonLabel slot='end'>{props.type === 'user' && `${endDate}`}</IonLabel>

          {props.type !== 'user' && (
            <>
              <IonInput value={sse} onIonChange={(e) => setsse(e.detail.value!)} />
              <IonButton color='success' onClick={() => handleDate('end')}>
                <IonIcon icon={checkmarkDone} />
                Done
              </IonButton>
            </>
          )}
        </IonItem>

        {/* Nota's */}
        <IonItem color='light'>
          <IonLabel position='stacked' class='ion-text-wrap' color='dark'>
            Notes:
          </IonLabel>
          <IonTextarea autoGrow={true} value={note} onIonChange={(e) => setnote(e.detail.value!)} />
        </IonItem>
      </IonCardContent>
    </IonCard>
  );
}

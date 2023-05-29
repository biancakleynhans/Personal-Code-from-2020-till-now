import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonIcon, IonItem, IonLabel } from '@ionic/react';
import { pencilOutline, trashBinOutline } from 'ionicons/icons';
import React, { useEffect, useState } from 'react';
import { iCheckTask } from '../../models/ChecklistModels';
import { setColor } from '../../utils/Utilities';
import ChecklistTaskCreator from './ChecklistTaskCreator';

interface iProps {
  arrLength: number;
  currTask: iCheckTask;
  currTaskIndex: number;

  updateFn: (mainIndex: number, listName: string, taskIndex: number, updatedTask: iCheckTask) => void;
  deleteFn: () => void;
  mainArrIndex: number;
  currListName: string;
}

export default function ChecklistDisplayEditListTasks(props: iProps) {
  const { arrLength, currTask, currTaskIndex, mainArrIndex, currListName } = props;

  const [isTaskClicked, setisTaskClicked] = useState<boolean[]>([]);
  const [updatedTask, setupdatedTask] = useState<iCheckTask>({} as iCheckTask);

  useEffect(() => {
    let arr: boolean[] = [];

    for (let x = 0; x < arrLength; x++) {
      arr.push(false);
    }

    setisTaskClicked(arr);
  }, [arrLength]);

  useEffect(() => {}, [isTaskClicked]);

  function handleClickTask(type: 'edit' | 'delete') {
    if (type === 'edit') {
      console.log('Editing task number ', currTaskIndex);
      let arr: boolean[] = [];

      for (let x = 0; x < arrLength; x++) {
        if (currTaskIndex === x) {
          isTaskClicked[x] ? arr.push(false) : arr.push(true);
        } else {
          arr.push(false);
        }
      }
      setisTaskClicked(arr);
    }

    if (type === 'delete') {
      let con = window.confirm('Are you sure you would like to remove this task from the current checklist ? This cannot be undone ');

      if (con) {
        console.log('Delete this task now', currTask);
      }
    }
  }

  function handleSubmitClick() {
    console.log('done save the updated task now', currTask, '>>>', updatedTask);
    props.updateFn(mainArrIndex, currListName, currTaskIndex, updatedTask);
  }

  function handletaskUpdate(mi: number, sn: string, si: number, task: iCheckTask) {
    // console.log('CB', mi, sn, si, task);
    // console.log('PROPS', mainArrIndex, currListName, currTaskIndex, currTask);
    setupdatedTask(task);
  }

  return (
    <IonCard color={setColor(currTask.status)}>
      {/* TASK INFO */}
      <IonCardHeader>
        <IonCardTitle>{currTask.name}</IonCardTitle>
        <IonCardTitle>{currTask.status}</IonCardTitle>
        <IonCardSubtitle>{typeof currTask.personsAssigned !== 'string' ? currTask.personsAssigned.map((x) => x.fn).toString() : currTask.personsAssigned}</IonCardSubtitle>

        <IonCardSubtitle>
          {currTask.startDate}-{currTask.endDate}
        </IonCardSubtitle>

        <IonLabel class='ion-text-wrap'>{currTask.notes}</IonLabel>
      </IonCardHeader>

      {/* BTNS FOR EDIT & DELETE */}
      <IonCardContent>
        <IonItem lines='none' color={setColor(currTask.status)}>
          <IonButton slot='start' color='warning' onClick={() => handleClickTask('edit')}>
            <IonIcon icon={pencilOutline} />
          </IonButton>
          <IonButton disabled slot='end' color='danger' onClick={() => handleClickTask('delete')}>
            <IonIcon icon={trashBinOutline} />
          </IonButton>
        </IonItem>
      </IonCardContent>

      {/* EDIT MODE */}
      {isTaskClicked[currTaskIndex] && (
        <>
          <ChecklistTaskCreator
            cb={(mi: number, sn: string, si: number, task: iCheckTask) => handletaskUpdate(mi, sn, si, task)}
            mainIndex={mainArrIndex}
            subtaskName={currListName}
            subtask_taskIndex={currTaskIndex}
            task={currTask}
            type='edit'
          />
          <IonButton color='success' expand='full' size='small' shape='round' onClick={() => handleSubmitClick()}>
            Done
          </IonButton>
        </>
      )}
    </IonCard>
  );
}

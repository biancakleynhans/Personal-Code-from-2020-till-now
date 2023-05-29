import React, { useEffect, useState } from 'react';
import { IonIcon, IonItem, IonLabel } from '@ionic/react';
import { iCheckTask } from '../../models/ChecklistModels';
import ChecklistDisplayEditListTasks from './ChecklistDisplayEditListTasks';
import { chevronDown, chevronUp } from 'ionicons/icons';

interface iProps {
  listname: string;
  listTasks: iCheckTask[];
  updateFn: (mainIndex: number, listName: string, taskIndex: number, updatedTask: iCheckTask) => void;
  deleteFn: () => void;
  mainArrIndex: number;
  currListName: string;
}

export default function ChecklistDisplayEditList(props: iProps) {
  const { listname, listTasks } = props;

  const [isClicked, setisClicked] = useState<boolean>(false);

  useEffect(() => {
    // console.log('Props', props);
  }, [listTasks]);

  return (
    <>
      <IonItem color={isClicked ? 'medium' : 'none'} button onClick={() => setisClicked(!isClicked)}>
        <IonLabel slot='start'>{listname}</IonLabel>
        <IonIcon slot='end' icon={isClicked ? chevronUp : chevronDown} />
      </IonItem>

      {isClicked && (
        <>
          {listTasks.map((task, i) => (
            <ChecklistDisplayEditListTasks
              key={i}
              arrLength={listTasks.length}
              currTask={task}
              currTaskIndex={i}
              updateFn={(mainIndex: number, listName: string, taskIndex: number, updatedTask: iCheckTask) => props.updateFn(mainIndex, listName, taskIndex, updatedTask)}
              deleteFn={() => props.deleteFn()}
              mainArrIndex={props.mainArrIndex}
              currListName={props.currListName}
            />
          ))}
        </>
      )}
    </>
  );
}

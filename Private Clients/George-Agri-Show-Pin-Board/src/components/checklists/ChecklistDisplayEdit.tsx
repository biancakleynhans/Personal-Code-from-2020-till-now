import React, { Fragment, useEffect, useState } from 'react';
import { IonIcon, IonItem, IonItemDivider, IonLabel, IonList, IonListHeader } from '@ionic/react';
import { iCheckList, iCheckTask } from '../../models/ChecklistModels';
import ChecklistDisplayEditList from './ChecklistDisplayEditList';
import { chevronDown, chevronUp } from 'ionicons/icons';

interface iProps {
  allchecklists: iCheckList[];
  updateFn: (mainIndex: number, listName: string, taskIndex: number, updatedTask: iCheckTask) => void;
  deleteFn: () => void;
}

export default function ChecklistDisplayEdit(props: iProps) {
  const [isClicked, setisClicked] = useState<boolean[]>([]);

  // Checks for changes
  useEffect(() => {
    let arr: boolean[] = [];
    props.allchecklists.forEach((x) => arr.push(false));

    setisClicked(arr);
  }, [props]);

  function DisplayContent(index: number) {
    let arr: boolean[] = [];

    for (let x = 0; x < isClicked.length; x++) {
      if (index === x) {
        isClicked[x] ? arr.push(false) : arr.push(true);
      } else {
        isClicked[x] === true ? arr.push(true) : arr.push(false);
      }
    }
    setisClicked(arr);
  }

  return (
    <IonList lines='none' inset={true}>
      {/* Header  */}
      <IonListHeader>
        <IonLabel style={{ fontSize: '28px', display: 'flex', justifyContent: 'center', alignContent: 'center', alignItems: 'center', flexWrap: 'wrap' }}>
          Current Checklists
        </IonLabel>
      </IonListHeader>

      {props.allchecklists.map((list, a) => (
        <Fragment key={a}>
          <IonItem color={isClicked[a] ? 'secondary' : 'none'} button onClick={() => DisplayContent(a)}>
            <IonLabel slot='start' style={{ fontSize: '22px', textDecorate: 'underline' }}>
              {list.title}
            </IonLabel>
            <IonIcon slot='end' icon={isClicked[a] ? chevronUp : chevronDown} />
          </IonItem>

          {isClicked[a] &&
            Object.keys(list.list).map((listName, b) => (
              <ChecklistDisplayEditList
                key={b}
                listTasks={list.list[listName]}
                listname={listName}
                updateFn={(mainIndex: number, listName: string, taskIndex: number, updatedTask: iCheckTask) => props.updateFn(mainIndex, listName, taskIndex, updatedTask)}
                deleteFn={() => props.deleteFn()}
                mainArrIndex={a}
                currListName={listName}
              />
            ))}
        </Fragment>
      ))}
    </IonList>
  );
}

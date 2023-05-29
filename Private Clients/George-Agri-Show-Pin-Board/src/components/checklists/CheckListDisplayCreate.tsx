// Container to map over all tasks an display the task create component

import { IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonLabel, IonList, IonListHeader } from '@ionic/react';
import React, { Fragment, useEffect } from 'react';
import { iCheckList, iCheckTask } from '../../models/ChecklistModels';
import ChecklistTaskCreator from './ChecklistTaskCreator';

interface iProps {
  checklists: iCheckList[];
  createCB: (mi: number, sn: string, si: number, task: iCheckTask) => void;
}

export default function CheckListDisplayCreate(props: iProps) {
  // Checks for changes
  useEffect(() => {}, [props]);

  // Displays and creates the subtask containers
  function CreateSubs(sublists: { [k: string]: iCheckTask[] }, mainIndex: number, mainTitle: string): JSX.Element {
    // console.log('>>', sublists, mainIndex, mainTitle);
    return (
      <Fragment>
        {Object.keys(sublists).map((subtaskName, x) => {
          // console.log('SUBTASK', subtaskName, sublists[subtaskName]);

          return (
            <IonCard key={x} color='medium'>
              <IonCardHeader style={{ fontSize: '20px', fontWeight: 'bold', textAlign: 'center', padding: '10px', margin: 'auto' }}>
                <IonCardTitle>
                  <IonLabel class='ion-text-wrap' color='secondary'>
                    {subtaskName.toUpperCase()}
                  </IonLabel>
                </IonCardTitle>
              </IonCardHeader>

              <IonCardContent>
                {sublists[subtaskName].map((task, ii) => {
                  // console.log(ii, 'TASK', task);
                  return (
                    <ChecklistTaskCreator
                      key={ii}
                      task={task}
                      type='create'
                      mainIndex={mainIndex}
                      subtaskName={subtaskName}
                      subtask_taskIndex={ii}
                      cb={(mi: number, sn: string, si: number, task: iCheckTask) => props.createCB(mi, sn, si, task)}
                    />
                  );
                })}
              </IonCardContent>
            </IonCard>
          );
        })}
      </Fragment>
    );
  }

  return (
    <>
      {props.checklists.map((entry, i) => {
        // console.log(i, 'ENTRY', entry.title, entry.list);

        return (
          <IonList key={i}>
            <IonListHeader>
              <IonLabel class='ion-text-wrap' color='primary' style={{ fontSize: '20px', fontWeight: 'bold', textAlign: 'center', padding: '10px', margin: 'auto' }}>
                {entry.title.toUpperCase()}
              </IonLabel>
            </IonListHeader>

            {CreateSubs(entry.list, i, entry.title)}
          </IonList>
        );
      })}
    </>
  );
}

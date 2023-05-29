import { IonButton, IonCard, IonIcon, IonItemDivider, IonLabel, IonList, IonListHeader, setupIonicReact } from '@ionic/react';
import { chevronDown, chevronUp } from 'ionicons/icons';
import React, { useEffect, useState } from 'react';
import { useChecklistData } from '../../firebase/FirebaseContextCheckList';
import { iCheckList, iCheckTask } from '../../models/ChecklistModels';
import ChecklistTaskCreator from './ChecklistTaskCreator';

interface iProps {
  orginalMain: iCheckList;
  mainList: iCheckList;
  mainIndex: number;
}

interface iCheckListUser {
  orginalMain: iCheckList;
  mainIndex: number;
  mainTitle: string;
  subListName: string;
  taskIndexes: number[];
}

export default function ChecklistUserView(props: iProps) {
  const { mainList, mainIndex, orginalMain } = props;
  const { UpdateChecklistUser } = useChecklistData();

  const [cleanmain, setcleanmain] = useState<iCheckListUser>({} as iCheckListUser);
  const [showSubs, setshowSubs] = useState<boolean>(false);
  const [showTasks, setshowTasks] = useState<boolean>(false);

  useEffect(() => {
    setUp();
  }, []);

  useEffect(() => {
    setUp();
  }, [mainList]);

  useEffect(() => {}, [cleanmain]);

  function setUp() {
    // console.log('main', mainList);
    let cleaned: iCheckListUser = {} as iCheckListUser;

    cleaned.orginalMain = mainList;
    cleaned.mainIndex = mainIndex;
    cleaned.mainTitle = mainList.title;

    Object.keys(mainList.list).forEach((listname, i) => {
      let indexes: number[] = [];
      mainList.list[listname].forEach((task, index) => {
        if (task.name) {
          cleaned.subListName = listname;
          //   console.log('>>', listname, task.name, cleaned);
          indexes.push(index);
          //   console.log('This is a task', mainIndex, mainList.title, listname, indexes, cleaned);
          cleaned.taskIndexes = indexes;
        }
      });
    });

    // console.log('CLEANED', cleaned);
    setcleanmain(cleaned);
  }

  function UpdateUserProgress(mi: number, sn: string, si: number, task: iCheckTask) {
    // console.log('UPDATE', mi, sn, si, task);
    let all = cleanmain;
    // console.log(all.orginalMain.list[sn][si], '>>>>', task);
    all.orginalMain.list[sn][si] = task;
    setcleanmain(all);
  }

  function handleSave(sublistName: string) {
    // console.log('save:: ', sublistName);
    let list = cleanmain.orginalMain.list[sublistName];
    UpdateChecklistUser(cleanmain.orginalMain.id, cleanmain.mainIndex, cleanmain.subListName, list);
  }

  return (
    <IonList lines='none' color='light' inset={true}>
      {cleanmain.subListName ? (
        <IonListHeader lines='none' color='medium'>
          <IonLabel>{cleanmain.mainTitle.toUpperCase()}</IonLabel>
          <IonButton onClick={() => setshowSubs(!showSubs)}>
            <IonIcon color='dark' icon={showSubs ? chevronUp : chevronDown} />
          </IonButton>
        </IonListHeader>
      ) : (
        <IonListHeader lines='none' color='medium'>
          <IonLabel>{cleanmain?.mainTitle?.toUpperCase()}</IonLabel>
        </IonListHeader>
      )}

      {cleanmain.subListName && showSubs && (
        <IonItemDivider color='secondary' sticky={true}>
          <IonLabel>{cleanmain.subListName.toUpperCase()}</IonLabel>
          <IonButton slot='end' fill='clear' onClick={() => setshowTasks(!showTasks)}>
            <IonIcon color='dark' icon={showTasks ? chevronUp : chevronDown} />
          </IonButton>
        </IonItemDivider>
      )}

      {cleanmain.subListName &&
        showSubs &&
        showTasks &&
        cleanmain.orginalMain.list[cleanmain.subListName].map((task, index) => {
          return (
            <>
              {cleanmain.taskIndexes.map((id) => {
                if (id === index) {
                  return (
                    <IonCard key={id} color='medium'>
                      <ChecklistTaskCreator
                        cb={(mi: number, sn: string, si: number, task: iCheckTask) => {
                          UpdateUserProgress(mi, sn, si, task);
                        }}
                        mainIndex={cleanmain.mainIndex}
                        subtaskName={cleanmain.subListName}
                        subtask_taskIndex={id}
                        task={task}
                        type='user'
                      />

                      <IonButton
                        color='secondary'
                        expand='block'
                        onClick={() => {
                          handleSave(cleanmain.subListName);
                        }}
                      >
                        Save Changes{' '}
                      </IonButton>
                    </IonCard>
                  );
                }
              })}
            </>
          );
        })}
    </IonList>
  );
}

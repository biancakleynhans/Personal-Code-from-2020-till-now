// Base component for creating a checklist

import React, { useState } from 'react';
import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonLabel, IonText } from '@ionic/react';
import * as Excel from 'exceljs/dist/exceljs.min.js';
import UploadBtn from '../reusables/UploadBtn';
import Loader from '../reusables/Loader';
import { useAuth } from '../../firebase/FirebaseContextAuth';
import { Base_User } from '../../models/UserModels';
import CheckListDisplayCreate from './CheckListDisplayCreate';
import moment from 'moment';
import { iAssigned, iCheckList, iCheckTask } from '../../models/ChecklistModels';

interface iProps {
  users: Base_User[];
  firebasFn: (checklist: iCheckList) => void;
}

async function handleUpload(files: File[]): Promise<iCheckList[][]> {
  return await Promise.all(
    files.map((f) => {
      return new Promise<iCheckList[]>((resolve, reject) => {
        // console.log('???', f);
        const wb = new Excel.Workbook();
        const reader = new FileReader();
        const rABS = !!reader.readAsBinaryString;

        let checklists: iCheckList[] = [];

        reader.onload = (e) => {
          if (e.target) {
            const buffer = reader.result;
            wb.xlsx
              .load(buffer)
              .then((workbook: any) => {
                // Iterate over all sheets each sheet is a seperate checklist that needs to be generated
                workbook.eachSheet(function (ws: any, id: number) {
                  // console.log(id, 'worksheet ', ws.name);
                  let name = ws.name;
                  let currNum = 0;
                  let currCell = '';
                  let checklist: iCheckList = {
                    id: '',
                    list: {},
                    title: name,
                  };

                  // console.log('Checklist', checklist);

                  ws.eachRow({ includeEmpty: false }, function (row: any, index: number) {
                    let r: any[] = [...row.values];
                    let cell = ws.getRow(index).getCell(1);
                    let isHeader = cell.font.bold;

                    if (index > 3) {
                      // CLEAN UP START
                      r.shift();
                      if (r.length < 7) {
                        // console.log('LENGHT', r.length, r);
                        for (let x = 0; x < 7; x++) {
                          if (r[x] === undefined) {
                            r.splice(x, 1, ' ');
                          }
                        }
                        // console.log('LENGHT AFTER', r.length, r);
                      }
                      // console.log('<<>>', r.length, r, cell.value, isHeader);
                      // CLEAN UP END

                      // FORMAT DATA START
                      // Create object instead of an array
                      let temp: iCheckTask = {
                        name: r[0]?.toLowerCase(),
                        personsAssigned: r[1],
                        startDate: r[2] && typeof r[2] === 'string' && r[2].length > 3 ? r[2] : moment(new Date()).format('DD/MM/YY'),
                        endDate: r[3] && typeof r[3] === 'string' && r[3].length > 3 ? r[3] : moment(new Date()).format('DD/MM/YY'),
                        status: r[4] && r[4].length > 0 ? r[4] : 'pending',
                        notes: r[5],
                      };
                      // console.log('??TEMP??', temp.startDate, '<<<', r[2], temp.endDate, '<<<<<', r[3]);

                      // setting data up
                      // console.log('<<>>>', isHeader, name, currCell);
                      if (typeof isHeader === 'boolean' && isHeader === true) {
                        currCell = cell && cell.value && cell.value !== undefined ? cell.value.toLowerCase().trim() : '';

                        checklist = {
                          ...checklist,
                          list: {
                            ...checklist.list,
                            [currCell]: [],
                          },
                        };
                        checklist.list[currCell].push(temp);
                        // console.log('added', checklist.list);
                      } else {
                        // console.log('<<>>>', isHeader, name, currCell, temp.personsAssigned, typeof checklist.list[name]);
                        if (r[1] === undefined || (r[1] !== undefined && r[1].length < 3)) {
                          // console.log('Main person assigned to all', checklist.list[currCell][0].personsAssigned);
                          temp.personsAssigned = checklist.list[currCell][0].personsAssigned;
                        }
                        checklist.list[currCell].push(temp);
                        // console.log('added', checklist.list);
                      }
                      // FORMAT DATA END
                    }
                  });

                  // console.log(id, 'CHECKLIST AT END:', checklist);
                  checklists.push(checklist);
                });

                // console.log('CHECKLISTS ALL', checklists);
                resolve(checklists);
              })
              .catch((err: any) => {
                reject(`There was an error readung the excel file ${JSON.stringify(err)}`);
              });
          } else {
            reject('reader does not work');
          }
        };

        if (rABS) reader.readAsBinaryString(f);
        else reader.readAsArrayBuffer(f);
      });
    })
  );
}

function CreateAssignedUsers(allUsers: Base_User[], list: iCheckList[]): iCheckList[] {
  let users: iAssigned[] = allUsers.map((x) => ({ fn: x.fn.trim().toLowerCase(), dn: x.displayName.trim().toLowerCase(), uid: x.uid }));
  // console.log('users', users, 'tasks', list);

  list.map((entry: iCheckList, a: number) => {
    // console.log(a,'Tasklist', entry.title, entry.list);

    Object.keys(entry.list).map((name: string, b: number) => {
      // console.log(b, 'Check', name, entry.list[name]);

      entry.list[name].map((task: iCheckTask, c: number) => {
        if (typeof task.personsAssigned === 'string' && task.personsAssigned.length > 2) {
          let people: string[] = task.personsAssigned.split('/').map((p) => p.toLowerCase().replaceAll(new RegExp(/\d/g), '').replaceAll(' tel ', '').trim());
          let arrPeople: iAssigned[] = users.filter((u) => people.some((p) => p === u.fn || p === u.dn));
          let clone: string[] = people;
          let missing: iAssigned[] = [];

          // console.log(c, 'task persons', task.personsAssigned, people, arrPeople);
          // Replace strings with objects as all are there
          arrPeople.forEach((a) => clone.splice(people.indexOf(a.fn), 1));
          clone.forEach((c) => missing.push({ fn: c, dn: '', uid: '' }));
          // console.log(c, 'found missing', people, arrPeople, missing);
          task.personsAssigned = [...arrPeople, ...missing];
        }
        // No one was assigned
        else {
          // console.log(c, 'task', task.personsAssigned);
          task.personsAssigned = [];
        }
      });
    });
  });

  // console.log('UPDATED', taskList);
  return list;
}

export default function ChecklistUploader(props: iProps) {
  const str = 'Upload excel sheet to be converted to checklist';
  const str2 = 'Click here to download the template for checklists';

  const { RetrieveAllUsersFromDB } = useAuth();

  const [loading, setloading] = useState(false);
  const [txt, settxt] = useState<string>('');

  const [checklists, setchecklists] = useState<iCheckList[]>([]);
  const [isProcess, setisProcess] = useState(false);

  function handle_upload(e: any) {
    // // e.preventDefault();
    setloading(true);
    settxt('Scanning files...');

    if (e.target.files) {
      //   console.log("E:", e);
      var AllFiles: any[] = [];
      [...e.target.files].map((file) => AllFiles.push(file));
      //   console.log("all files", AllFiles);

      if (AllFiles.length > 0) {
        settxt('Processing files and Generating Checklist');
        // 1.0 Get all the info from the excel sheet into a usable format
        handleUpload(AllFiles)
          .then((res: iCheckList[][]) => {
            settxt('Generating and finalizing checklist');
            // console.log('RES', res);

            let allChecklistsFromFiles: iCheckList[] = [];

            res.forEach((arr, i) => {
              // console.log(i, 'arr', arr);
              let updatedUsers: iCheckList[] = CreateAssignedUsers(RetrieveAllUsersFromDB, arr);
              // console.log(i, 'Updated users', updatedUsers);
              allChecklistsFromFiles = [...allChecklistsFromFiles, ...updatedUsers];
            });

            // console.log('After', allChecklistsFromFiles);
            setchecklists(allChecklistsFromFiles);
            setisProcess(true);
            setloading(false);
          })
          .catch(() => {
            window.alert('Error in reading excel sheet for checklist info, Please try again');
            setloading(false);
            window.location.reload();
          });
      }
    }
  }

  function handleChecklistUpdate(mi: number, sn: string, si: number, newTask: iCheckTask) {
    // console.log('Changes have been made', mi, mt, sn, si, '>>>>>', newTask);
    if (checklists[mi].list[sn][si]) {
      // console.log('>>>', checklists[mi].list[sn][si], '>>>>', newTask);
      let clone = checklists;
      clone[mi].list[sn][si] = newTask;
      setchecklists(clone);
    }
  }

  function handleSubmit() {
    // console.log('handleSubmit:: will submit following data', checklists);
    checklists.forEach((main: iCheckList, i) => {
      // console.log(i, 'main', main);
      props.firebasFn(main);
    });
  }

  return (
    <IonCard>
      {/* Header */}
      <IonCardHeader>
        <IonCardTitle style={{ textAlign: 'center', fontSize: '1.4rem' }}>
          <IonText color='primary'>Create a new checklist for an event</IonText>
        </IonCardTitle>
      </IonCardHeader>

      {/* UPLOAD */}
      {!isProcess && (
        <IonCardContent>
          {/* ADD THE TEMPLATE FILE FOR DOWNLOAD HERE  */}

          {/* Upload excel sheet  */}
          <IonLabel class='ion-text-wrap' color='danger'>
            {str.toUpperCase()}
          </IonLabel>
          <br />
          <UploadBtn isMulti={true} type='file' upload={(e) => handle_upload(e)} />
        </IonCardContent>
      )}

      {/* DISPLAY CHECKLIST HERE  */}
      {isProcess && (
        <>
          <CheckListDisplayCreate checklists={checklists} createCB={(mi: number, sn: string, si: number, task: iCheckTask) => handleChecklistUpdate(mi, sn, si, task)} />
          <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'nowrap', justifyContent: 'center', alignItems: 'center', alignContent: 'center' }}>
            <IonButton color='secondary' size='large' onClick={() => handleSubmit()}>
              Submit, create and save checklist
            </IonButton>
          </div>
        </>
      )}

      {loading && <Loader txt={txt} />}
    </IonCard>
  );
}

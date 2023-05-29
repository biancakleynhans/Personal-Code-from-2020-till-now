import React, { useEffect, useState } from 'react';
import ChecklistDisplayEdit from '../../components/checklists/ChecklistDisplayEdit';
import ChecklistUploader from '../../components/checklists/ChecklistUploader';
import { useChecklistData } from '../../firebase/FirebaseContextCheckList';
import { iCheckList, iCheckTask } from '../../models/ChecklistModels';
import { Base_User } from '../../models/UserModels';

interface iProps {
  AllUsers: Base_User[];
  creating: boolean;
  setCreating: () => void;
}

export default function CheckListAdmin(props: iProps) {
  const { RetrieveAllChecklistsFromDB, CreateNewChecklist, UpdateChecklist } = useChecklistData();

  const [allChecklists, setallChecklists] = useState<iCheckList[]>([]);

  useEffect(() => {
    setallChecklists(RetrieveAllChecklistsFromDB);
  }, [RetrieveAllChecklistsFromDB]);

  useEffect(() => {}, [allChecklists]);

  function Create(checklist: iCheckList) {
    // console.log('Single checklist to save recieved:', checklist);
    CreateNewChecklist(checklist);
  }

  function Edit(mainIndex: number, listName: string, taskIndex: number, updatedTask: iCheckTask) {
    let clone = allChecklists;
    let id = clone[mainIndex].id;
    let list = clone[mainIndex].list;

    clone[mainIndex].list[listName][taskIndex] = updatedTask;

    console.log('ready to call firebase with update', id, list);
    UpdateChecklist(mainIndex, listName, allChecklists[mainIndex].id, list);
  }

  function Delete() {}

  return (
    <>
      {/* CREATE Checklist */}
      {props.creating && <ChecklistUploader users={props.AllUsers} firebasFn={(checklist: iCheckList) => Create(checklist)} />}

      {/* Display All checklists to client */}
      {allChecklists.length > 0 && (
        <ChecklistDisplayEdit
          allchecklists={allChecklists}
          updateFn={(mainIndex: number, listName: string, taskIndex: number, updatedTask: iCheckTask) => Edit(mainIndex, listName, taskIndex, updatedTask)}
          deleteFn={() => Delete()}
        />
      )}
    </>
  );
}

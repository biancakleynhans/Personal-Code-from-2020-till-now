import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { addDoc, collection, deleteDoc, doc, DocumentData, DocumentReference, onSnapshot, query, updateDoc } from 'firebase/firestore';
import { FIREBASE_FIRESTORE } from './FirebaseConfig';
import { iCheckList, iCheckTask } from '../models/ChecklistModels';

interface iProps {
  children: ReactNode;
}

interface iDataContext {
  RetrieveAllChecklistsFromDB: iCheckList[];
  CreateNewChecklist: (checklist: iCheckList) => Promise<DocumentReference<DocumentData>>;
  UpdateChecklist: (mainIndex: number, listName: string, id: string, updatedList: { [k: string]: iCheckTask[] }) => Promise<void>;
  UpdateChecklistUser: (id: string, mainIndex: number, listName: string, tasks: iCheckTask[]) => void;
  DeleteChecklist: (id: string) => Promise<void>;
}

const CHECKLIST_STRING = 'Checklists';
const CHECKLIST_DB = collection(FIREBASE_FIRESTORE, CHECKLIST_STRING);

const ChecklistDataContext = createContext<iDataContext>({} as iDataContext);
export const useChecklistData = () => useContext(ChecklistDataContext);

export default function ChecklistDataContextProvider({ children, ...props }: iProps) {
  const [RetrieveAllChecklistsFromDB, setRetrieveAllChecklistsFromDB] = useState<iCheckList[]>([]);

  useEffect(() => {
    let arr: iCheckList[] = [];
    const q = query(CHECKLIST_DB);
    onSnapshot(q, { includeMetadataChanges: true }, (snapshot) => {
      snapshot.docChanges().map((change) => {
        // console.log('DOC???', change.doc.id, change.doc.data() as iCheckList);
        let t: iCheckList = change.doc.data() as iCheckList;
        t.id = change.doc.id;
        arr.push(t);
        // console.log('? All checklists ?', arr);
        if (RetrieveAllChecklistsFromDB.length === 0) {
          setRetrieveAllChecklistsFromDB(arr);
        }

        if (RetrieveAllChecklistsFromDB.length !== arr.length) {
          if (arr.length > RetrieveAllChecklistsFromDB.length) {
            setRetrieveAllChecklistsFromDB(arr);
          }
        }

        // const source = snapshot.metadata.fromCache ? "local cache" : "server";
        // console.log("All checklists came from " + source);
      });
    });
  }, [RetrieveAllChecklistsFromDB]);

  //   ALL FUNCTIONS GO HERE
  /*Creates the new checklist and saves it to the db*/
  async function CreateNewChecklist(checklist: iCheckList) {
    return await addDoc(CHECKLIST_DB, checklist);
  }

  /*Update checklist and save it to the db*/
  async function UpdateChecklist(mainIndex: number, listName: string, id: string, updatedList: { [k: string]: iCheckTask[] }) {
    let path = `${CHECKLIST_STRING}/${id}`;
    const Ref = doc(FIREBASE_FIRESTORE, path);
    // console.log('Path::', path, updatedList, Ref);

    // firebase
    updateDoc(Ref, { list: updatedList })
      .then(() => {
        // update local copy
        // console.log('Update local');
        let clone = RetrieveAllChecklistsFromDB;
        clone[mainIndex].list = updatedList;
        setRetrieveAllChecklistsFromDB(clone);
      })
      .catch((err) => {
        console.log('error updating firebase at ', path, err);
      });
  }

  /*Update task in checklist and save it to the db*/
  async function UpdateChecklistUser(id: string, mainIndex: number, listName: string, tasks: iCheckTask[]) {
    let path = `${CHECKLIST_STRING}/${id}`;
    const Ref = doc(FIREBASE_FIRESTORE, path);
    console.log('Path::', path, Ref, listName, tasks);

    // firebase
    updateDoc(Ref, { list: { [listName]: tasks } })
      .then(() => {
        console.log('Update local');
        // update local copy
        let clone = RetrieveAllChecklistsFromDB;
        clone[mainIndex].list[listName] = tasks;
        setRetrieveAllChecklistsFromDB(clone);
      })
      .catch((err) => {
        console.log('error updating firebase at ', path, err);
      });
  }

  /*Delete checklist from db*/
  async function DeleteChecklist(id: string) {
    const Ref = doc(FIREBASE_FIRESTORE, CHECKLIST_STRING, id);
    return await deleteDoc(Ref);
  }

  const value = {
    CreateNewChecklist,
    RetrieveAllChecklistsFromDB,
    UpdateChecklist,
    UpdateChecklistUser,
    DeleteChecklist,
  };

  return <ChecklistDataContext.Provider value={value}>{children}</ChecklistDataContext.Provider>;
}

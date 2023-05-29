import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { addDoc, collection, deleteDoc, doc, DocumentData, DocumentReference, onSnapshot, query, updateDoc } from "firebase/firestore";
import { iTask } from "../models/TaskModels";
import { FIREBASE_FIRESTORE } from "./FirebaseConfig";

interface iProps {
  children: ReactNode;
}

interface iDataContext {
  RetrieveAllTasksFromDB: iTask[];
  CreateNewTask: (task: iTask) => Promise<DocumentReference<DocumentData>>;
  UpdateTask: (task: iTask, id: string) => Promise<void>;
  DeleteTask: (id: string) => Promise<void>;
}

const TASKS_STRING = "Tasks";
const TASKS_DB = collection(FIREBASE_FIRESTORE, TASKS_STRING);

const DataContext = createContext<iDataContext>({} as iDataContext);
export const useData = () => useContext(DataContext);

export default function DataContextProvider({ children, ...props }: iProps) {
  const [RetrieveAllTasksFromDB, setRetrieveAllTasksFromDB] = useState<iTask[]>([]);

  useEffect(() => {
    let arr: iTask[] = [];
    const q = query(TASKS_DB);
    onSnapshot(q, { includeMetadataChanges: true }, (snapshot) => {
      snapshot.docChanges().map((change) => {
        // console.log("DOC???", change.doc.id, change.doc.data() as iTask);
        let t: iTask = change.doc.data() as iTask;
        t.id = change.doc.id;
        arr.push(t);
        // console.log("? All tasks ?", arr);

        if (RetrieveAllTasksFromDB.length === 0) {
          setRetrieveAllTasksFromDB(arr);
        }
        if (RetrieveAllTasksFromDB.length !== arr.length) {
          if (arr.length > RetrieveAllTasksFromDB.length) {
            // console.log("wil this work");
            // console.log("arr", arr.length);
            // console.log("RetrieveAllTasksFromDB", RetrieveAllTasksFromDB.length);
            setRetrieveAllTasksFromDB(arr);
          }
        }

        // const source = snapshot.metadata.fromCache ? "local cache" : "server";
        // console.log("All tasks came from " + source);
      });
    });
  }, [RetrieveAllTasksFromDB]);

  //   ALL FUNCTIONS GO HERE
  /*Creates the new task and saves it to the db*/
  async function CreateNewTask(task: iTask) {
    return await addDoc(TASKS_DB, task);
  }

  /*Update task and save it to the db*/
  async function UpdateTask(task: iTask, id: string) {
    const Ref = doc(FIREBASE_FIRESTORE, TASKS_STRING, id);
    return await updateDoc(Ref, {
      name: task.name,
      startDate: task.startDate,
      endDate: task.endDate,
      desc: task.desc,
      progress: task.progress,
      completeBy: task.completeBy,
      users: task.users,
      content: task.content && task.content.length > 0 ? task.content : []
    });
  }

  /*Update task and save it to the db*/
  async function DeleteTask(id: string) {
    const Ref = doc(FIREBASE_FIRESTORE, TASKS_STRING, id);
    return await deleteDoc(Ref);
  }

  const value = {
    CreateNewTask,
    RetrieveAllTasksFromDB,
    UpdateTask,
    DeleteTask
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
}

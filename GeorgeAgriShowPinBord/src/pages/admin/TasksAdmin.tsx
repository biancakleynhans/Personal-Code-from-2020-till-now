import React, { useEffect, useState } from "react";
import TaskBaseForm from "../../components/reusables/TaskBaseForm";
import { iTask } from "../../models/TaskModels";
import { formatDate } from "../../utils/Utilities";
import { Base_User } from "../../models/UserModels";
import DisplayTasks from "../../components/reusables/DisplayTasks";
import { useData } from "../../firebase/FirebaseContextData";
import { PushNotifyNewTask, iNewPush } from "../../firebase/FirebaseFunctionCalls";

interface iProps {
  AllUsers: Base_User[];
  creating: boolean;
  setCreating: () => void;
}

const defaultTask: iTask = {
  completeBy: ["check box"],
  content: [],
  desc: "",
  startDate: formatDate(new Date().toISOString()),
  endDate: formatDate(new Date().toISOString()),
  name: "",
  progress: "pending",
  users: [],
  company: "GAS",
  id: "",
  creator: {
    name: "",
    token: ""
  }
};

export default function TasksAdmin(props: iProps) {
  const { RetrieveAllTasksFromDB, CreateNewTask, UpdateTask, DeleteTask } = useData();
  const [allTasks, setallTasks] = useState<any[]>([]);

  useEffect(() => {
    // console.log("TASKS", RetrieveAllTasksFromDB);
    let db = RetrieveAllTasksFromDB;
    if (db !== undefined && db.length > 0) {
      setallTasks(db);
    }
    if (db.length !== allTasks.length) {
      console.log("some thing changed so lets reflect that ");
      setallTasks(db);
    }
  }, [RetrieveAllTasksFromDB]);

  /*TASKS*/
  function createTask(task: iTask) {
    console.log("final CREATE", task);
    let temp: { token: string; name: string }[] = [];

    task.users.forEach((tU) => {
      props.AllUsers.forEach((Au) => {
        if (tU === Au.uid) {
          console.log("user assigned to this task", Au);
          let n = Au.fn && Au.fn.length > 0 ? Au.fn : Au.displayName && Au.displayName.length > 0 ? Au.displayName : "";
          let t = Au.fmcToken ? Au.fmcToken : "";
          temp.push({ token: t, name: n });
        }
      });
    });

    let push: iNewPush = {
      task: { name: task.name, desc: task.desc },
      users: temp
    };

    // Save to the server
    CreateNewTask(task)
      .then((res) => {
        console.log("Res Task", res);
        window.alert("Added new Task");
        props.setCreating();

        // Send push notification to users assigned
        PushNotifyNewTask(push)
          .then((res) => {
            console.log("Res PUSH", res);
          })
          .catch((err) => {
            console.log("Error while sending push notify", err);
          });
      })
      .catch((err) => {
        window.alert("Error while adding new Task");
        console.log("ERROR", err);
      });
  }

  function editTask(task: iTask, id: string) {
    console.log("final EDIT", task);
    // Save to the server
    UpdateTask(task, id)
      .then((res) => {
        console.log("res", res);
        window.alert("Updated task");
        window.location.reload();
      })
      .catch((err) => {
        window.alert("Error while updating task");
        console.log("Error while updating task", err);
      });
  }

  function deleteTask(task: iTask, id: string) {
    console.log("final DELETE", id, task);
    // DELETE from the server
    DeleteTask(id)
      .then((res) => {
        console.log("res", res);
        window.alert("Deleted task");
        window.location.reload();
      })
      .catch((err) => {
        window.alert("Error while deleting task");
        console.log("Error while deleting task", err);
      });
  }

  return (
    <>
      {/* CREATE TASK */}
      {props.creating && <TaskBaseForm users={props.AllUsers} type='create' defaultTask={defaultTask} onCreate={(task) => createTask(task)} />}

      {/* Display All tasks to client */}
      {allTasks.map((entry: iTask, index) => {
        return (
          <React.Fragment key={index}>
            <DisplayTasks
              task={entry}
              updateComp={<TaskBaseForm users={props.AllUsers} type='edit' defaultTask={entry} onUpdate={(task) => editTask(task, entry.id)} />}
              onDelete={(task, id) => {
                deleteTask(task, id);
              }}
            />
          </React.Fragment>
        );
      })}
    </>
  );
}

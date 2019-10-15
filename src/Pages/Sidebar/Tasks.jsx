/*global chrome*/
//Component implements the ToDo-List
import React, { useState, useEffect } from 'react'
import { Link } from "react-router-dom"
import ToDoTask from '../../Components/ToDoTask';

export default function Tasks(props) {
  const [anyToDoListEnabled, setAnyToDoListEnabled] = useState(false);
  const [tasks, setTasks] = useState(
    [
      /* {
        //Use later to specify task
        id: "1",
        //Name
        title: "Name",
        hidden: false,
        notes: undefined,
        due: "2019-07-26T00:00:00.000Z",
        parent: "The parents id"

      }, */

    ]
  )
  useEffect(() => {
    // Toggle
    // fetchData();
    async function fetchData() {
      //TODO: FIX TODO WITH PROMISE.ALL and similiar

      let tempTasks = [];
      chrome.identity.getAuthToken({ "interactive": false, "scopes": ["https://www.googleapis.com/auth/tasks"] }, (token) => {
        const init = {
          method: 'GET',
          async: true,
          headers: {
            Authorization: 'Bearer ' + token,

            'Content-Type': 'application/json'
          },

          'contentType': 'json'
        };
        let fetches = [];
        props.settings.ToDo.taskLists.map((item) => {
          if (item.enabled) {
            setAnyToDoListEnabled(true);

            const promise = fetch("https://www.googleapis.com/tasks/v1/lists/" + item.id + "/tasks", init)
              .then(response => response.json()) // Transform the data into json
              .then(data => {

                data.items.map(task => {
                  tempTasks.push(task);
                })

              });
            fetches.push(promise);
          }
        });
        Promise.all(fetches).then(() => {
          console.log("Task fetches done", tempTasks);
          setTasks(tempTasks);
        });
      });
    }
  }, [])
  if (!anyToDoListEnabled) {
    return (
      <div className="tasks">
        <h1><Link to="/hideTasks">Tasks ▼</Link></h1>
        Please select the calendars you which to use in the setting to start to use the calendar.
      </div>
    )
  }
  else {
    return (
      <div className="toDo">
        <h1><Link to="/hideTasks">Tasks ▼</Link></h1>
        <div className="tasks">

          <ToDoTask tasks={tasks} />
        </div>
        <button>Add Task</button>
      </div>
    )

  }

}


import React, {useState, useEffect} from 'react'
import {BrowserRouter as Router, Route, Link} from "react-router-dom"
import ToDoTask from './Components/Sidebar/ToDoTask';

export default function Tasks() {

    const[tasks, setTasks] = useState({
        items:[
          {
            //Use later to specify task
            id: "OGc4MlZhZ08wazh1TzB4TA",
            //Name
            title: "Test Event",
            hidden: false,
            notes: undefined,
            due: "2019-07-26T00:00:00.000Z",
            parent: "The parents id"
      
          }
        ]
      })

    return (
        <div className="Tasks">
            <h1><Link to="/hideTasks">Tasks ▼</Link></h1>
            <ToDoTask tasks={tasks}/>
        </div>
    )
}

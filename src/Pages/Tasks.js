/*global chrome*/
import React, {useState, useEffect} from 'react'
import {BrowserRouter as Router, Route, Link} from "react-router-dom"
import ToDoTask from './Components/Sidebar/ToDoTask';

export default function Tasks() {

    const[tasks, setTasks] = useState({
        items:[
          {
            //Use later to specify task
            id: "loading",
            //Name
            title: "Loading",
            hidden: false,
            notes: undefined,
            due: "2019-07-26T00:00:00.000Z",
            parent: "The parents id"
      
          }
        ]
      })
      useEffect(()=>{
        //TODO: Chrome
      //   fetchData();
        async function fetchData(){
            chrome.identity.getAuthToken({"interactive":true},function(token){
              let init = {
                  method: 'GET',
                  async: true,
                  headers: {
                    Authorization: 'Bearer ' + token,
                    
                    'Content-Type': 'application/json'
                  },
                  
                  'contentType': 'json'
                };

            })
            //TODO: Get tasks from google tasks
            
            
        }
    },[])
    return (
        <div className="Tasks">
            <h1><Link to="/hideTasks">Tasks ▼</Link></h1>
            <ToDoTask tasks={tasks}/>
        </div>
    )
}

/*global chrome*/
import React, {useState, useEffect} from 'react'
import {BrowserRouter as Router, Route, Link} from "react-router-dom"
import ToDoTask from './Components/Sidebar/ToDoTask';

export default function Tasks(props) {
  var anyCalenderEnabled = false;
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
          var array =[];
            chrome.identity.getAuthToken({"interactive":false},function(token){
              let init = {
                  method: 'GET',
                  async: true,
                  headers: {
                    Authorization: 'Bearer ' + token,
                    
                    'Content-Type': 'application/json'
                  },
                  
                  'contentType': 'json'
                };
                props.settings.ToDo.taskLists.map((item) => {
                  if(item.enabled){
                    anyCalenderEnabled=true;
                    fetch("https://www.googleapis.com/tasks/v1/lists/"+item.id+"/tasks?showHidden=true", init)
                    .then((response) => response.json()) // Transform the data into json
                    .then(function(data) {
                    console.log(data);
                    data.map((itteration) => {
                      array.push({
                        itteration
                      })
                    })
    
                  })
                  }
                }
                  
                )

            })
            setTasks(array);
            
            
            
            
        }
    },[])
    if(anyCalenderEnabled){
      return (
        <div className="Tasks">
            <h1><Link to="/hideTasks">Tasks ▼</Link></h1>
            <ToDoTask tasks={tasks}/>
        </div>
    )
    }
    else{
      return(
        <div className="Tasks">
        <h1><Link to="/hideTasks">Tasks ▼</Link></h1>
          Please select the calenders you which to use in the setting to start to use the calender. 
      </div>
      )
      
    }
    
}

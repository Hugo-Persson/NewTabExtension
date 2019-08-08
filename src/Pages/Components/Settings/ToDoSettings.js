/* global chrome*/

import React, {useState} from 'react'
import SelectCollection from './SelectCollection';

export default function ToDoSettings(props) {
    const [TaskLists, setTaskLists] = useState(props.settings.ToDo.taskLists)
    function GetTaskLists(){
        chrome.identity.getAuthToken({"interactive": true},function(token){
            let init={
                method: "GET",
                async: true,
                headers:{
                    Authorization: 'Bearer ' + token,
        
                    'Content-Type': 'application/json'
                }
            }
            var TaskListArray =[];
            fetch("https://www.googleapis.com/tasks/v1/users/@me/lists", init)
            .then((response) => response.json())
            .then(function(data){
                console.log(data);
                data.items.map((item) => {
                    TaskListArray.push({
                        name: item.title,
                        id:item.id,
                        enabled:false,
                    })
                })
            })
        })
    }



    //TODO: Later change undefined to the title being what it is in app.jsx
    if(TaskLists[0].id===undefined){
        return (
        
            <div className="toDoSettings">
                <button onClick={GetTaskLists}>Enable Google Tasks</button>
            </div>
        )
    }
    else{
        return(
            <div className="toDoSettings">
                Select TaskLists that you want to include in the sidebar
                <div className="options">
                    
                <SelectCollection collections={TaskLists}/>
                </div>
                
            </div>
        )
    }
}

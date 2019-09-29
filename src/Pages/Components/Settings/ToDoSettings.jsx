/* global chrome*/

import React, { useState } from 'react'
import SelectCollection from './SelectCollection';

export default function ToDoSettings(props) {
    const [taskLists, setTaskLists] = useState(props.settings.ToDo.taskLists)

    function getTaskLists() {
        chrome.identity.getAuthToken({ "interactive": true, "scopes": ["https://www.googleapis.com/auth/tasks"] }, token => {
            const init = {
                method: "GET",
                async: true,
                headers: {
                    Authorization: 'Bearer ' + token,

                    'Content-Type': 'application/json'
                }
            }
            let taskListsTemp = [];
            fetch("https://www.googleapis.com/tasks/v1/users/@me/lists", init)
                .then(response => response.json())
                .then(data => {
                    data.items.map((item) => {
                        taskListsTemp.push({
                            name: item.title,
                            id: item.id,
                            enabled: false,
                        });
                    });
                    setTaskLists(taskListsTemp)
                });
        })
    }

    if (taskLists[0] === undefined) {
        return (

            <div className="toDoSettings">
                <button onClick={getTaskLists}>Enable Google Tasks</button>
            </div>
        )
    }
    else {
        return (
            <div className="toDoSettings">
                Select TaskLists that you want to include in the sidebar
                <div className="options">

                    <SelectCollection collections={taskLists} />
                </div>

            </div>
        )
    }
}

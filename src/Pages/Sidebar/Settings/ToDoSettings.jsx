/* global chrome*/

import React, { useState, useCallback } from 'react'
import SelectCollection from "../../../Components/SelectCollection";

export default function ToDoSettings(props) {
    const [, updateState] = useState();
    const forceUpdate = useCallback(() => updateState({}), []);

    const { settings } = props;

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
                    settings.ToDo.taskLists = taskListsTemp;
                    forceUpdate();

                });
        })
    }

    if (settings.ToDo.taskLists.length === 0) {
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

                    <SelectCollection collections={settings.ToDo.taskLists} />
                </div>

            </div>
        )
    }
}

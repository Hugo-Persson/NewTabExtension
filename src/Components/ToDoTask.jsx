import React, { useState } from 'react'
import Checkbox from './Checkbox';


export default function ToDoTask(props) {
    const [finished, setFinished] = useState(false);

    function Delete(task) {

        props.events.splice((props.events.findIndex((item) => (item === task))), 1);

        props.UpdateApp();
    }
    return props.tasks.map((task) => (
        <div className="task" key={task.id}>

            <Checkbox onCheck={enabled => setFinished(enabled)} />
            <div className={finished ? "fullLine lineThrough" : "lineThrough"}></div>
            <span>{task.title}</span>
            <div className="delete" onClick={() => Delete(task)}>X</div>
        </div>
    ))
}

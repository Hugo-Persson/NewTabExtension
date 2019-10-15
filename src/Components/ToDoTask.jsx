import React from 'react'

export default function ToDoTask(props) {
    function Delete(task) {

        props.events.splice((props.events.findIndex((item) => (item === task))), 1);

        props.UpdateApp();
    }
    return props.tasks.map((task) => (
        <div className="task" key={task.id}>
            <input className="checkBox" id={task.id} type="checkbox" />

            <label htmlFor={task.id} className="checkLabel"><div></div></label>
            <div className="lineThrough"></div>
            <span>{task.title}</span>
            <div className="delete" onClick={() => Delete(task)}>X</div>
        </div>
    ))
}

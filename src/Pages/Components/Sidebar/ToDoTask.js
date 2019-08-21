import React from 'react'

export default function ToDoTask(props) {
    
    return props.tasks.map((task)=>(
        <div className="task">
            <input  id="checkbox" className="checkBox" type="checkbox"/>
            <label htmlFor="checkbox" className="checkLabel"></label>
            <span>{task.title}</span>
        </div>
    ))
}

import React from 'react'

export default function ToDoTask(props) {
    
    return props.tasks.map((task)=>(
        <div className="task">
            <input   className="checkBox" type="checkbox"/>
            <label htmlFor="checkbox" className="checkLabel"><div></div></label>
            <span>{task.title}</span>
        </div>
    ))
}

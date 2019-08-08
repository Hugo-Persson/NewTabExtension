import React from 'react'
import CalenderSettings from './CalenderSettings';
import ToDoSettings from './ToDoSettings';

export default function SideBarSettings(props) {
    
    return (
        <div className="sidebarSettings">
            
            <div className="calenderSettings">
                <h2>Calender</h2>
                
                <CalenderSettings settings={props.settings}/>
            </div>
            <div className="toDoSettings">
                <h2>ToDo</h2>
                <div>
                    <ToDoSettings settings={props.settings}/>
                </div>
            </div>
            
        </div>
    )
}

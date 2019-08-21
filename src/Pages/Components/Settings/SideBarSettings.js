import React from 'react'
import CalendarSettings from './CalendarSettings';
import ToDoSettings from './ToDoSettings';

export default function SideBarSettings(props) {
    
    return (
        <div className="sidebarSettings">
            
            <div className="calendarSettings">
                <h2>calendar</h2>
                
                <CalendarSettings settings={props.settings}/>
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

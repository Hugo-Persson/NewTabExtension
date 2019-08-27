import React from 'react'
import moment from "moment"
export default function Calendar() {
    var weekDays = moment.weekdaysShort();
    return (
        
        <div className="calendar">
            <table>
                <tr>
                    {weekDays.map(day =>(
                        <th>{day}</th>
                    ))}
                </tr>
                
            </table>
            
        </div>
    )
}

import React from 'react'
import moment from "moment"
export default function Calendar() {
    var weekDays = moment.weekdaysShort();
    var days = moment().daysInMonth();
    var firstDay = moment().startOf("month").format("d");
    console.log(firstDay);
    console.log(days);
    var weeks =[];
    var week = [];
    for(let i = 0; i<firstDay;i++){
        week.push("*");
    }
    for(let i = 1; i<=days;i++){
        console.log(i);
        week.push(i);
        console.log((moment("2019-08-"+i,"YYYY-MM-DD HH:mm:ss").format("dddd")));
        if(moment("2019-08-"+i,"YYYY-MM-DD HH:mm:ss").format("dddd")==="Saturday"){
            console.log(week);
            weeks.push(week);
            week=[];
            console.log("PUSHING");
        }
        else if(i===days){
            weeks.push(week);
        }
    }
    console.log(weeks);
    
    return (
        
        <div className="calendar">
            <table>
            <tbody>
                <tr>
                    {weekDays.map(day =>(
                        <th>{day}</th>
                    ))}
                </tr>
                 {
                     weeks.map((n)=>(
                         <tr>
                             {n.map(i=>(
                                 <td>{i}</td>
                             ))}
                         </tr>
                     ))
                 }
            </tbody>
            </table>
            
        </div>
    )
}

import React,{useState} from 'react'
import ReactDOM from"react-dom";
import moment from "moment"
export default function PickDate(props) {
    

    var weekDays = moment.weekdaysShort();
    var days = moment().daysInMonth();
    var firstDay = moment().startOf("month").format("d");
    console.log(firstDay);
    console.log(days);
    
    const [date,setDate] = useState(new Date());
    var weeks =[];
    var week = [];
    for(let i = 0; i<firstDay;i++){
        week.push("");
    }
    for(let i = 1; i<=days;i++){
        console.log(i);
        week.push(i);
        
        if(moment(date.getFullYear()+"-"+(date.getMonth()+1)+"-"+i,"YYYY-MM-DD HH:mm:ss").format("dddd")==="Saturday"){
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



    function ClearClickedClass(e){
        var element = document.getElementsByClassName("clicked");
        console.log(element);
        if(element[0]!=undefined){
            element[0].classList.remove("clicked");
        }
       
        
    }
    function ReturnDates(){
        weeks.map(n=>{
            
            
        })

        function Change(){
            props.onChange(date);
        }
        return(
            
                weeks.map((n)=>(
                    <tr>
                        
                        {
                            n.map(i=>(
                                <td className={i===""?"empty":"day"} onClick={e=>{
                                    ClearClickedClass(e);
                                    e.currentTarget.classList.add("clicked");
                                    date.setDate(i);
                                    Change();
                                }}>{i}</td>
                            ))
                        }
                    </tr>
                ))
            
        )
    }
    return (
        
        <div className="pickDate">
            <h1>{moment(date).format("MMMM")}</h1>
            <button onClick={date.setMonth(moment(date).format("M"))}>Next Month</button>
            <table>
            <tbody>
                <tr>
                    {weekDays.map(day =>(
                        <th>{day}</th>
                    ))}
                </tr>
                 {ReturnDates()}
            </tbody>
            </table>
            
        </div>
    )
}

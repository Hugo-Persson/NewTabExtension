import React,{useState,useEffect} from 'react'
import ReactDOM from"react-dom";
import moment from "moment"
export default function PickDate(props) {
    
    
    var weekDays = moment.weekdaysShort();
    
    
    
    function LoadDates(){
        
        let days = moment(date).daysInMonth();
    let firstDay = moment(date).startOf("month").format("d");
    console.log(firstDay);
    console.log(days);
        weeks=[];
        week=[];
        console.log(date);
        
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
    }
    const [date,setDate] = useState(new Date());
    var weeks =[];
        var week = [];
        LoadDates();

    



    function ClearClickedClass(e){
        let element = document.getElementsByClassName("clicked");
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
                            n.map((i,index)=>(
                                
                                
                                <td style={index===6?{color:"red"}:{}} className={i===""?"empty":"day"} onClick={e=>{
                                    if(i!==""){
                                        ClearClickedClass(e);
                                    e.currentTarget.classList.add("clicked");
                                    date.setDate(i);
                                    Change();
                                    }
                                    
                                }}>{i}</td>
                            ))
                        }
                    </tr>
                ))
            
        )
    }
    return (
        
        <div className="pickDate">
            <div id="dateHeader">
            <button onClick={()=>{
                console.log("Click");
                ClearClickedClass();
                setDate(new Date(date.setMonth(date.getMonth()-1)));
            } }> {"<"}  </button>
            <span id="month">{moment(date).format("MMMM")}</span>
            <span id="year">{moment(date).format("YYYY")}</span>
            <button onClick={()=>{
                console.log("Click");
                ClearClickedClass();
                setDate(new Date(date.setMonth(date.getMonth()+1)));
            } }>></button>
            </div>
            
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

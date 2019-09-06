/* global chrome*/
import React,{useState} from 'react'
import {Link} from "react-router-dom"
import Calendar from './Components/PickDate';
import moment from 'moment'


export default function AddEvent(props) {
    
    const [event] = useState({
        summary:undefined,
        end:{
            date: undefined,
        },
        start:{
            date:undefined,
        }
    });
    const [useTime, setUseTime] = useState(false);
    var calendarID = props.settings.calendar.calendarIDs[0].id;
    function Add(){
        Object.values(event).map(i=>{
            if(i==="object"){
                Object.values(i).map(n=>{
                    if(i===undefined){
                        alert("Please enter all values before submitting");
                        return;
                    }
                })
            }
            else if(i===undefined){
                alert("Please enter all values before submitting");
                return;
            }
        })
        
        console.log(event);
        if(useTime){
            event.start.date=event.start.date.toJSON();
            event.end.date=event.end.date.toJSON();
        }
        else{
            event.start.date=moment(event.start.date).format("YYYY-MM-DD");
            event.end.date.setDate(event.end.date.getDate()+1);
            event.end.date=moment(event.end.date).format("YYYY-MM-DD");
        }
        console.log(event);
        console.log(Object.values(event));
        chrome.identity.getAuthToken({"interactive":false, "scopes": ["https://www.googleapis.com/auth/calendar"]}, token=>{
            

            let init = {
                method: 'POST',
                async: true,
                headers: {
                  Authorization: 'Bearer ' + token,
                  
                  'Content-Type': 'application/json'
                },
                body:JSON.stringify(event),
                
                'contentType': 'json'
              };
              console.log(init);
              fetch("https://www.googleapis.com/calendar/v3/calendars/"+calendarID+"/events", init)
              .then(repsone=>repsone.json())
              .then(data=>{
                  console.log("success");
                  console.log(data);
              });
              
        })

    }
    function Time(){
        console.log(useTime);
        if(useTime){
            /* TODO: Support 12 hour and 24 hour */
            return(
                <React.Fragment>
                    Time:
                <input className="time" type="text" placeholder={moment().hour()+":" + moment().minute()} onBlur={e=>{
                    console.log(event);
                    if(event.start.date===undefined){
                        event.start.date=new Date();
                    }
                    
                    if(moment(e.currentTarget.value,"HH-mm").format("HH")===undefined||moment(e.currentTarget.value,"HH-mm").format("mm")==undefined){
                        alert("Time not valid");
                    }
                    else{
                        event.start.date.setHours(moment(e.currentTarget.value,"HH-mm").format("HH"));
                        event.start.date.setHours(moment(e.currentTarget.value,"HH-mm").format("mm"));

                        event.end.date.setHours(moment(e.currentTarget.value,"HH-mm").format("HH"));
                        event.end.date.setHours(moment(e.currentTarget.value,"HH-mm").format("mm"));
                    }
                    
                }}/>
                </React.Fragment>
                
            )
        }
        else{
            return(
                <button onClick={()=>setUseTime(true)}>Specify time</button>
            )
        }
    }
    return (
        <div className="settings addEvent" key={+ new Date()}>
                    <div className="settingsReturn">
                        <Link to="/">←</Link>
                    </div>
                
                    <div className="settingsHeader">
                    
                    <h1>Add Event</h1>
                    </div>
                
                    <div className="settingsBody">
                        Name: <input type="text" onChange={e=>{
                            if(e===""){
                                event.summary=undefined;
                            }
                            else{
                                event.summary=e.currentTarget.value;
                            }
                        }}/>
                        <br/>
                        <span>Date:</span>
                        
                        <Calendar onChange={date => {
                            console.log("ran");
                            if(useTime){
                                if(event.start.date===undefined){
                                    console.log("CAH");
                                    event.start.date=date;
                                    event.end.date=date;
                                }
                                else{
                                    let hours = event.start.date.getHours();
                                    let minutes = event.start.date.getMinutes();

                                    event.start.date=date;
                                    event.start.date.setHours(hours);
                                    event.start.date.setMinutes(minutes);

                                    event.end.date=date;
                                    event.end.date.setHours(hours);
                                    event.end.date.setMinutes(minutes);
                                }
                                

                            }
                            else{
                                console.log("YAH");
                                event.start.date=date;
                                event.end.date=date;
                                console.log(event);
                            }
                        }}/>
                        <br/>
                        
                        <br/>

                        <span>Which calendar do you want to use</span> 

                        <select>
                            {props.settings.calendar.calendarIDs.map(i =>(
                                <option onClick={e=>calendarID=e.currentTarget.value} value={i.id}>{i.name}</option>
                            ))}
                        </select>
                        
                        {/*will make it possible to add time*/}
                    </div>
                    <div className="saveSettings" onClick={Add}>Add Event</div>
                    
                </div>
    )
}

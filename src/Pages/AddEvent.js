/* global chrome*/
import React,{useState} from 'react'
import {Link} from "react-router-dom"
import Calendar from './Components/PickDate';
import moment from 'moment'


export default function AddEvent(props) {
    var event = {
        summary:undefined,
        end:{
            date: undefined,
        },
        start:{
            date:undefined,
        }
    };
    const [useTime, setUseTime] = useState(false);
    var calendarID;
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
        console.log(Object.values(event));
        /* chrome.identity.getAuthToken({"interactive":false, "scopes": ["https://www.googleapis.com/auth/calendar"]}, token=>{
            

            let init = {
                method: 'POST',
                async: true,
                headers: {
                  Authorization: 'Bearer ' + token,
                  
                  'Content-Type': 'application/json'
                },
                body:{
                    event,
                },
                
                'contentType': 'json'
              };
              
              
        }) */
    }
    function Time(){
        console.log(useTime);
        if(useTime){
            /* TODO: Support 12 hour and 24 hour */
            return(
                <React.Fragment>
                    Time:
                <input className="time" type="text" placeholder={moment().hour()+":" + moment().minute()} />
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
                        
                        <Calendar onChange={date => console.log(date)}/>
                        <br/>
                        {Time()}
                        <br/>

                        <span>Which calendar do you want to use</span> 

                        <select>
                            {props.settings.calendar.calendarIDs.map(i =>(
                                <option value={i.id}>{i.name}</option>
                            ))}
                        </select>
                        
                        {/*will make it possible to add time*/}
                    </div>
                    <div className="saveSettings" onClick={Add}>Add Event</div>
                    
                </div>
    )
}

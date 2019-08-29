/* global chrome*/
import React from 'react'
import {Link} from "react-router-dom"
import Calendar from './Components/PickDate';

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
    var calendarID;
    function Add(){
        chrome.identity.getAuthToken({"interactive":false, "scopes": ["https://www.googleapis.com/auth/calendar"]}, token=>{
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
              
        })
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
                        <span>Which calendar do you want to use</span> 

                        <select>
                            {props.settings.calendar.calendarIDs.map(i =>(
                                <option value={i.id}>{i.name}</option>
                            ))}
                        </select>
                        Add More options
                        {/*will make it possible to add time*/}
                    </div>
                    <div className="saveSettings" onClick={Add}>Add Event</div>
                    
                </div>
    )
}

/*global chrome*/
import React,{useEffect, useState, useRef} from 'react'
import {Route, Link} from "react-router-dom"
import SelectCollection from './SelectCollection';
export default function CalendarSettings(props) {
    const [calendars, setCalendars] = useState(props.settings.calendar.calendarIDs);
    const selectCalendars = useRef(null);
    function GetCalendars(){
        chrome.identity.getAuthToken({"interactive":true, "scopes": "https://www.googleapis.com/auth/calendar"},function(token){
            let init = {
                method: 'GET',
                async: true,
                headers: {
                  Authorization: 'Bearer ' + token,
                  
                  'Content-Type': 'application/json'
                },
                
                'contentType': 'json'
              };
              let calendarArray =[];
              fetch("https://www.googleapis.com/calendar/v3/users/me/calendarList", init)
              .then((response) => response.json()) // Transform the data into json
              .then(function(data){
                  console.log(data);

                  data.items.map((item) =>{
                      calendarArray.push({
                          name: item.summary,
                          id: item.id,
                          enabled: false,
                          
                      })
                  })
                  setCalendars(calendarArray);
              })
        })
    }
    if(calendars[0].id===null){
        return (
        
            <div className="calendarSettings">
                <button onClick={GetCalendars}>Enable Google Calendar</button>
            </div>
        )
    }
    else{
        return(
            <div className="calendarSettings">
                Select calendars that you want to include in the sidebar
                <div className="options">
                <SelectCollection collections={calendars}/>
                </div>
                
            </div>
        )
    }
    
}

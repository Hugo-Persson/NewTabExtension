/* global chrome*/
import React, {useState, useEffect} from 'react'
import {BrowserRouter as Router, Route, Link} from "react-router-dom"

import CalendarEvents from './Components/Sidebar/CalendarEvents';


export default function Calendar(props) {
  var anyCalendarEnabled = false;
  console.log(props.settings.calendar);
  
    const[events, setEvents] = useState([
      {
        summary: "Name",
        location: "Location",
        start:{
          dateTime:"2019-08-13T08:15:00+02:00",
    
        },
        end:{
          dateTime: "2019-08-13T12:30:00+02:00"
        },
        id: "loading"
      },
      ]);
      useEffect(()=>{
          //TODO: Chrome
          console.log("Use effect ran in calender");
          // fetchData();
          async function fetchData(){
              chrome.identity.getAuthToken({"interactive":false, "scopes": ["https://www.googleapis.com/auth/calendar"]},function(token){
                const init = {
                  method: 'GET',
                  async: true,
                  headers: {
                    Authorization: 'Bearer ' + token,
                    
                    'Content-Type': 'application/json'
                  },
                  
                  'contentType': 'json'
                };
                var events =[];
              //Wil go through all calendar and add the events togheter
              console.log(props.settings)
              if(props.settings.calendar.calendarIDs.length!==0){
                console.log("IS THIS THE EEEERRROOOOO")
                props.settings.calendar.calendarIDs.map((item)=>{

                  //TODO: Maybe add settings for params
                  //TODO: Add maxTime that can be configured in the settings
                  if(item.enabled) {
                    anyCalendarEnabled=true;
                    console.log("https://www.googleapis.com/calendar/v3/calendars/"+item.id+"/events?maxResults=5&timeMin="+(new Date()).toJSON());
                    fetch("https://www.googleapis.com/calendar/v3/calendars/"+item.id+"/events?maxResults=5&timeMin="+(new Date()).toJSON(),init)
                  .then((response) => response.json()) // Transform the data into json
                    .then(function(data) {
                      console.log("Fetch successful")
                        console.log(data);
                        data.items.map(value => {events.push(value)});
                        console.log(events);
                        setEvents(events);
                    })

                  }
                
                  
              })
              
              }
            })
              
              
              
          }
           
      },[props.settings])
      
      if(anyCalendarEnabled){
        return(
          <div className="calendar">
            <h1><Link to="/hideCalendar">Calendar ▼</Link></h1>
            Please select the calendars you which to use in the setting to start to use the calendar. 
            
          </div>
        )
      }
      else{
        return (
        
         
          <div className="calendar">
            <div className="fadeOutOverlay">

            </div>
          <h1><Link to="/hideCalendar">Calendar ▼</Link></h1>
          <div className="events">
            {events.map((event)=>(
              <CalendarEvents key={event.id} {...props} event={event} events={events}/>
            ))}
          </div>
          <button>Add Event</button>
            
          </div>
  )
      }
    
}

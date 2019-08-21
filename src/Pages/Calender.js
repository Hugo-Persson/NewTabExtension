/* global chrome*/
import React, {useState, useEffect} from 'react'
import {BrowserRouter as Router, Route, Link} from "react-router-dom"

import CalenderEvents from './Components/Sidebar/CalenderEvents';


export default function Calender(props) {
  var anyCalenderEnabled = false;
  console.log(props.settings.calender.calenderIDs.length);
    const[events, setEvents] = useState([
        {
          summary: "Name",
          location: "Location",
          id: "id",
          organizer:{
            displayName: "Calendar name",
            email: "calendarID",

          },
          start:{
            dateTime:"2019-08-13T08:15:00+02:00",
      
          },
        },
        {
          summary: "Name",
          location: "Location",
          id: "id",
          organizer:{
            displayName: "Calendar name",
            email: "calendarID",

          },
          start:{
            dateTime:"2019-08-13T08:15:00+02:00",
      
          },
        },
        {
          summary: "Name",
          location: "Location",
          id: "id",
          organizer:{
            displayName: "Calendar name",
            email: "calendarID",

          },
          start:{
            dateTime:"2019-08-13T08:15:00+02:00",
      
          },
        },
        {
          summary: "Name",
          location: "Location",
          id: "id",
          organizer:{
            displayName: "Calendar name",
            email: "calendarID",

          },
          start:{
            dateTime:"2019-08-13T08:15:00+02:00",
      
          },
        },
        {
          summary: "Name",
          location: "Location",
          id: "id",
          organizer:{
            displayName: "Calendar name",
            email: "calendarID",

          },
          start:{
            dateTime:"2019-08-13T08:15:00+02:00",
      
          },
        },
        {
          summary: "Name",
          location: "Location",
          id: "id",
          organizer:{
            displayName: "Calendar name",
            email: "calendarID",

          },
          start:{
            dateTime:"2019-08-13T08:15:00+02:00",
      
          },
        },
        {
          summary: "Name",
          location: "Location",
          id: "id",
          organizer:{
            displayName: "Calendar name",
            email: "calendarID",

          },
          start:{
            dateTime:"2019-08-13T08:15:00+02:00",
      
          },
        },
          
        
      ]);
      useEffect(()=>{
          //TODO: Chrome
        //   fetchData();
          async function fetchData(){
              chrome.identity.getAuthToken({"interactive":false, "scopes": "https://www.googleapis.com/auth/calendar"},function(token){
                let init = {
                    method: 'GET',
                    async: true,
                    headers: {
                      Authorization: 'Bearer ' + token,
                      
                      'Content-Type': 'application/json'
                    },
                    
                    'contentType': 'json'
                  };

              })
              var events =[];
              //Wil go through all calender and add the events togheter
              
              if(props.setttings.calender.calenderIDs.length!==0){
                props.settings.calender.calenderIDs.map((item)=>{

                  //TODO: Maybe add settings for params
                  //TODO: Add maxTime that can be configured in the settings
                  if(item.enabled) {
                    anyCalenderEnabled=true;
                    fetch("https://www.googleapis.com/calendar/v3/calendars/"+item.id+"/events?maxResults=5&timeMin:"+(new Date()).toJSON())
                  .then((response) => response.json()) // Transform the data into json
                    .then(function(data) {
                        console.log(data);
                        events.push(data.items);
                    })
                  }
                  
              })
              setEvents({items:events})
              }
              
              
          }
      },[])
      
      if(anyCalenderEnabled){
        return(
          <div className="calender">
            <h1><Link to="/hideCalender">Calender ▼</Link></h1>
            Please select the calenders you which to use in the setting to start to use the calender. 
            
          </div>
        )
      }
      else{
        return (
        
         
          <div className="calender">
          <h1><Link to="/hideCalender">Calender ▼</Link></h1>
          {events.map((event)=>(
            <CalenderEvents {...props} event={event} events={events}/>
          ))}
            
          </div>
  )
      }
    
}

/* global chrome*/
import React, {useState, useEffect} from 'react'
import {BrowserRouter as Router, Route, Link} from "react-router-dom"

import CalenderEvents from './Components/Sidebar/CalenderEvents';


export default function Calender(props) {
  console.log(props.settings.calender.calenderID.length);
    const[events, setEvents] = useState({items:[
        {
          summary: "loading",
          location: "loading",
          start:{
            dateTime:"2019-08-13T08:15:00+02:00",
      
          },
          end:{
            dateTime: "2019-08-13T12:30:00+02:00"
          },
          id: "loading"
        }
      ]});
      useEffect(()=>{
          //TODO: Chrome
        //   fetchData();
          async function fetchData(){
              chrome.identity.getAuthToken({"interactive":true},function(token){
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
              //Wil go through all calender and add the events toghete
              if(props.setttings.calender.calenderID.length!=0){
                props.settings.calender.calenderID.map((item)=>{
                  //TODO: Maybe add settings for params
                  //TODO: Add maxTime that can be configured in the settings
                  fetch("https://www.googleapis.com/calendar/v3/calendars/"+item+"/events?maxResults=5&timeMin:"+(new Date()).toJSON())
                  .then((response) => response.json()) // Transform the data into json
                    .then(function(data) {
                        console.log(data);
                        events.push(data.items);
                    })
              })
              setEvents({items:events})
              }
              
              
          }
      },[])

      if(props.settings.calender.calenderID.length===0){
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
            <CalenderEvents events={events} settings={props.settings}/>
          </div>
  )
      }
    
}

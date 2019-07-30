/* global chrome*/
import React, {useState, useEffect} from 'react'
import {BrowserRouter as Router, Route, Link} from "react-router-dom"

import CalenderEvents from './Components/Sidebar/CalenderEvents';


export default function Calender(props) {
    const[events, setEvents] = useState({items:[
        {
          summary: "Riskettan",
          location: "Ahlbäcks Trafikskola i Halmstad, Brogatan 46, 302 95 Halmstad, Sweden",
          start:{
            dateTime:"2019-08-13T08:15:00+02:00",
      
          },
          end:{
            dateTime: "2019-08-13T12:30:00+02:00"
          },
          id: "6hhjcpb36pgjgb9ocph3cb9k6oqj8bb271i34b9m75gj4dhm68p30dpi6c"
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
              //Wil go through all calender and add the events togheter
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
      },[])


    return (
        
         
            <div className="calender">
            <h1><Link to="/hideCalender">Calender ▼</Link></h1>
              <CalenderEvents events={events} settings={props.settings}/>
            </div>
    )
}

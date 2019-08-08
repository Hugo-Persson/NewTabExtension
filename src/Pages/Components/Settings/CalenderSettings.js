/*global chrome*/
import React,{useEffect, useState, useRef} from 'react'
import {Route, Link} from "react-router-dom"
import SelectCollection from './SelectCollection';
export default function CalenderSettings(props) {
    const [calenders, setCalenders] = useState(props.settings.calender.calenderIDs);
    const selectCalenders = useRef(null);
    function GetCalenders(){
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
              let calenderArray =[];
              fetch("https://www.googleapis.com/calendar/v3/users/me/calendarList", init)
              .then((response) => response.json()) // Transform the data into json
              .then(function(data){
                  console.log(data);

                  data.items.map((item) =>{
                      calenderArray.push({
                          name: item.summary,
                          id: item.id,
                          enabled: false,
                          
                      })
                  })
                  setCalenders(calenderArray);
              })
        })
    }
    if(calenders[0].id===undefined){
        return (
        
            <div className="calenderSettings">
                <button onClick={GetCalenders}>Enable Google Calender</button>
            </div>
        )
    }
    else{
        return(
            <div className="calenderSettings">
                Select calenders that you want to include in the sidebar
                <div className="options">
                <SelectCollection collections={calenders}/>
                </div>
                
            </div>
        )
    }
    
}

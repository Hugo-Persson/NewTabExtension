import React from 'react'

export default function CalenderEvents(props) {
    
    function dateStringFromatter(date){
        var parsedEvent = new Date(date);
        if(props.settings.dateFormat==="automatic"){
            return parsedEvent.toLocaleString(navigator.language);
        }
        else{
            return parsedEvent.toLocaleString(props.settings.dateFormat);
        }
        
        
        
    }
    function locationFormatter(location){
        var index = location.indexOf(",");
        if(index==-1){
            return location;
        }

        return location.substring(0,index);
    }
    return props.events.items.map((event) =>(
        <div className="event">
            <span className="name">{event.summary}</span>
            <br/>
            <span className="date">{dateStringFromatter(event.start.dateTime)}</span>
            <br/>
             <span className="location">{locationFormatter(event.location)}</span>
        </div>
    ))
}

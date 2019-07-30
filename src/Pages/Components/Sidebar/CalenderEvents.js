import React from 'react'

export default function CalenderEvents(props) {
    
    function dateStringFromatter(date){
        var parsedEvent = new Date(date);
        console.log(parsedEvent.toLocaleDateString());
        return parsedEvent.toLocaleString(props.settings)
        
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

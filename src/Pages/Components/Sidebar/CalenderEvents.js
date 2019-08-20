import React,{useState} from 'react'

export default function CalenderEvents(props) {
    
    const [edit, setEdit] = useState(false);
    const {event} = props;
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
    if(edit){
    return(
        <div className="event">
            <div onClick={()=>setEdit(false)} className="hamburgerMenu">X</div>
            <button className="edit">Edit</button>
            <br/>
            <button className="delete">Delete</button>
        </div>
    )
    }
    else{
        return (
            <div className="event">
    
    
                <div className="hamburgerMenu" onClick={()=> setEdit(true)}>
                    <div className="bar1"></div>
                    <div className="bar2"></div>
                    <div className="bar3"></div>
                </div>
                <span className="name">{event.summary}</span>
                <br/>
                <span className="date">{dateStringFromatter(event.start.dateTime)}</span>
                <br/>
                 <span className="location">{locationFormatter(event.location)}</span>
            </div>
        )
    }
    
}

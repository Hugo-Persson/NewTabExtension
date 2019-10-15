/*global chrome*/
import React, { useState } from 'react'

export default function CalendarEvents(props) {

    const [edit, setEdit] = useState(false);
    const { event } = props;
    function dateStringFromatter(date) {
        const parsedEvent = new Date(date);
        if (props.settings.dateFormat === "automatic") {
            return parsedEvent.toLocaleString(navigator.language);
        }
        else {
            return parsedEvent.toLocaleString(props.settings.dateFormat);
        }



    }
    function locationFormatter(location) {
        if (!location) {
            return ("");
        }
        const index = location.indexOf(",");
        if (index == -1) {
            return location;
        }

        return location.substring(0, index);
    }
    function deleteEvent() {
        chrome.identity.getAuthToken({ "interactive": false, "scopes": ["https://www.googleapis.com/auth/calendar"] }, (token) => {
            let init = {
                method: 'DELETE',
                async: true,
                headers: {
                    Authorization: 'Bearer ' + token,

                    'Content-Type': 'application/json'
                },

                'contentType': 'json'
            };
            fetch("https://www.googleapis.com/calendar/v3/calendars/" + event.organizer.email + "/events/" + event.id, init)
                .then(response => response.json())
                .then((data) => {
                    alert("Deleted the event");


                    props.events.splice((props.events.findIndex((item) => (item == event))), 1);

                    props.UpdateApp();
                })
                .catch(error => {
                    alert("Didn't succefully save");
                    console.log(error);

                })

        })

    }
    function editEvent() {

    }
    if (edit) {
        return (
            <div className="event" >
                <div onClick={() => setEdit(false)} className="hamburgerMenu">X</div>
                <button className="edit" onClick={editEvent}>Edit</button>
                <br />
                <button className="deleteEvent" onClick={deleteEvent}>Delete</button>
            </div>
        )
    }

    else {
        return (
            <div className="event" >


                <div className="hamburgerMenu" onClick={() => setEdit(true)}>
                    <div className="bar1"></div>
                    <div className="bar2"></div>
                    <div className="bar3"></div>
                </div>
                <span className="name">{event.summary}</span>
                <br />
                <span className="date">{dateStringFromatter(event.start.dateTime)}</span>
                <br />

                <span className="location">{locationFormatter(event.location)}</span>
            </div>
        )
    }

}

/* global chrome*/
import React, { useState } from 'react'
import { Link } from "react-router-dom"
import moment from 'moment'
import PickDate from '../../Components/PickDate';


export default function AddEvent(props) {

    const [event] = useState({
        summary: undefined,
        end: {
            date: undefined,
        },
        start: {
            date: undefined,
        }
    });
    const [useTime, setUseTime] = useState(false);
    const calendarID = props.settings.calendar.calendarIDs[0].id;
    function addNewEvent() {
        if (!event.summary || !event.end.date || !event.start.date) {
            alert("Please enter all values before submitting");
            return;
        }



        if (useTime) {
            event.start.date = event.start.date.toJSON();
            event.end.date = event.end.date.toJSON();
        }
        else {
            event.start.date = moment(event.start.date).format("YYYY-MM-DD");
            event.end.date.setDate(event.end.date.getDate() + 1);
            event.end.date = moment(event.end.date).format("YYYY-MM-DD");
        }
        chrome.identity.getAuthToken({ "interactive": false, "scopes": ["https://www.googleapis.com/auth/calendar"] }, token => {


            const init = {
                method: 'POST',
                async: true,
                headers: {
                    Authorization: 'Bearer ' + token,

                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(event),

                'contentType': 'json'
            };
            fetch("https://www.googleapis.com/calendar/v3/calendars/" + calendarID + "/events", init)
                .then(repsone => repsone.json())
                .then(data => {
                    alert("Event added");
                })
                .catch(error => {
                    alert("Couldn't add evet, try again later");

                });

        })

    }
    //TODO: Add time component

    function dateChange(date) {
        if (useTime) {
            if (!event.start.date) {
                event.start.date = date;
                event.end.date = date;
            }
            else {
                let hours = event.start.date.getHours();
                let minutes = event.start.date.getMinutes();

                event.start.date = date;
                event.start.date.setHours(hours);
                event.start.date.setMinutes(minutes);

                event.end.date = date;
                event.end.date.setHours(hours);
                event.end.date.setMinutes(minutes);
            }


        }
        else {
            event.start.date = date;
            event.end.date = date;
        }
    }
    return (
        <div className="settings addEvent" key={+ new Date()}>
            <div className="sidebarReturn">
                <Link to="/">←</Link>
            </div>

            <div className="sidebarHeader">

                <h1>Add Event</h1>
            </div>

            <div className="sidebarBody">
                Name: <input type="text" onChange={e => event.summary = e.currentTarget.value} />
                <br />
                <span>Date:</span>

                <PickDate onChange={dateChange} />
                <br />

                <br />

                <span>Which calendar do you want to use</span>

                <select>
                    {props.settings.calendar.calendarIDs.map(i => (
                        <option onClick={e => calendarID = e.currentTarget.value} value={i.id}>{i.name}</option>
                    ))}
                </select>

                {/*will make it possible to add time*/}
            </div>
            <div className="saveSettings" onClick={addNewEvent}>Add Event</div>

        </div>
    )
}

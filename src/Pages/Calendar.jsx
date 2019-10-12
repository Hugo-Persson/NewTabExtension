/* global chrome*/
import React, { useState, useEffect } from 'react'
import { Link } from "react-router-dom"
import CalendarEvents from './Components/Sidebar/CalendarEvents';

export default function Calendar(props) {
  let anyCalendarEnabled = false;
  const [events, setEvents] = useState([{
    summary: "Name",
    location: "Location",
    start: {
      dateTime: "2019-08-13T08:15:00+02:00",

    },
    end: {
      dateTime: "2019-08-13T12:30:00+02:00"
    },
    id: "loading"
  },]);
  useEffect(() => {
    // Toggle
    fetchData();
    async function fetchData() {
      chrome.identity.getAuthToken({ "interactive": false, "scopes": ["https://www.googleapis.com/auth/calendar"] }, (token) => {
        const init = {
          method: 'GET',
          async: true,
          headers: {
            Authorization: 'Bearer ' + token,

            'Content-Type': 'application/json'
          },

          'contentType': 'json'
        };
        let events = [];
        //Wil go through all calendar and add the events togheter
        let fetches = [];
        if (props.settings.calendar.calendarIDs.length !== 0) {
          props.settings.calendar.calendarIDs.map((item) => {

            //TODO: Maybe add settings for params
            //TODO: Add maxTime that can be configured in the settings
            if (item.enabled) {
              anyCalendarEnabled = true;
              fetches.push(
                fetch(`https://www.googleapis.com/calendar/v3/calendars/${item.id}/events?maxResults=5&timeMin=${(new Date()).toJSON()}`, init)
                  .then((response) => response.json()) // Transform the data into json
                  .then((data) => {
                    data.items.map(value => {
                      events.push(value)
                    });
                  })
              );

            }

          })
          // Wait until all promise function in fetches are done and then executes
          Promise.all(fetches)
            .then(() => {
              setEvents(events);
            });
        }
      })

    }

  }, [props.settings /* Will run the useEffect code when props.settings change */])

  function addEvent() {
    props.history.push("/AddEvent");
  }
  if (anyCalendarEnabled) {
    return (
      <div className="calendar">
        <h1 > <Link to="/hideCalendar" > Calendar▼ </Link></h1 >
        Please select the calendars you which to use in the setting to start to use the calendar.
      </div>
    )
  }
  else {
    return (
      <div className="calendar">
        <div className="fadeOutOverlay" >

        </div>
        <h1> <Link to="/hideCalendar" > Calendar▼ </Link></h1>
        <div className="events" > {events.map((event) => (
          <CalendarEvents key={event.id} {...props} event={event} events={events} />))}
        </div>
        <button onClick={addEvent} > Add Event </button>

      </div>

    )
  }

}
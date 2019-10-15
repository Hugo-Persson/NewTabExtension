/*global chrome*/
import React, { useState, useCallback } from 'react'
import SelectCollection from '../../../Components/SelectCollection';

export default function CalendarSettings(props) {

    const { calendarIDs } = props.settings.calendar;

    const [, updateState] = useState();
    const forceUpdate = useCallback(() => updateState({}), []);

    function getCalendars() {
        chrome.identity.getAuthToken({ "interactive": true, "scopes": ["https://www.googleapis.com/auth/calendar"] }, token => {
            const init = {
                method: 'GET',
                async: true,
                headers: {
                    Authorization: 'Bearer ' + token,

                    'Content-Type': 'application/json'
                },

                'contentType': 'json'
            };
            let calendarArray = [];
            fetch("https://www.googleapis.com/calendar/v3/users/me/calendarList", init)
                .then(response => response.json()) // Transform the data into json
                .then(data => {
                    data.items.map(item => {
                        calendarArray.push({
                            name: item.summary,
                            id: item.id,
                            enabled: false,

                        });
                    });

                    props.settings.calendar.calendarIDs = calendarArray;

                    forceUpdate();
                })
        })
    }

    if (calendarIDs.length === 0) {
        return (
            <div className="calendarSettings">
                <button onClick={getCalendars}>Enable Google Calendar</button>
            </div>
        )
    }
    else {
        return (
            <div className="calendarSettings">
                Select the calendars that you want to include in the sidebar
                <div className="options">
                    <SelectCollection collections={calendarIDs} settings={props.settings} />
                </div>

            </div>
        )
    }

}

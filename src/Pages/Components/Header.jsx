/* global chrome */

import React, { useState, useEffect } from 'react'
import axios from "axios"


export default function Header(props) {
    const [weather, setWeather] = useState({ name: "loading", main: { temp: 0 } });


    useEffect(() => {
        function fetchData() {
            if ("geolocation" in navigator) {
                navigator.geolocation.getCurrentPosition(location => {

                    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${location.coords.latitude}&lon=${location.coords.longitude}&appid=182687c0b69f8681a9c697a2ac368d68`)
                        .then(respone => respone.json())
                        .then(data => {
                            setWeather(data);

                        });



                })
            }




        };
        fetchData();

    }, [])
    function weatherFormatter() {
        const celcius = Math.round((weather.main.temp - 273) * 10) / 10
        if (props.settings.units === "metric") {
            return celcius + " °C";
        }
        else {
            return (celcius * 9 + (32 * 5)) / 5 + " °F";
        }
    }
    return (
        <div className="header">
            <h1>Welcome {props.name}</h1>
            <h2>The current weather in {weather.name} is {weatherFormatter()}</h2>

        </div>
    )
}




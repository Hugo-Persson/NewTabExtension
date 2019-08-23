/* global chrome */

import React, {useState, useEffect} from 'react'
import axios from "axios"


 function Header(props) {
     const [weather, setWeather] = useState({data:{name:"loading",main:{temp:0}}});
     
     
     useEffect(() =>{
         const fetchData = async () =>{
             //TODO: Error handeling
             if(props.settings.location.auto){
                if("geolocation" in navigator){
                    navigator.geolocation.getCurrentPosition(async function(location){
                        const result = await axios(
                    
                            "https://api.openweathermap.org/data/2.5/weather?lat="+location.coords.latitude+"&lon="+location.coords.longitude + "&appid=182687c0b69f8681a9c697a2ac368d68"
                        )
                       
                       console.log(result);
                       if(result!=undefined){
                        setWeather(result);
                        props.settings.location.lat=result.data.coord.lat;
                        props.settings.location.lon = result.data.coord.lon;
                        props.settings.location.city = result.data.name;
                        chrome.storage.sync.set({"settings": props.settings});
                       }
                       
                       console.log(weather);
                    })
    
                }
             }
             else{
                 const result = await axios(
                    "https://api.openweathermap.org/data/2.5/weather?lat="+props.settings.location.lat+"&lon="+props.settings.location.lon + "&appid=182687c0b69f8681a9c697a2ac368d68"
                 )
                 if(result!=undefined){
                     setWeather(result);
                     
                 }
             }



            
            
         };
         fetchData();
        
     },[])
      function WeatherFormatter(){
          var celcius= Math.round((weather.data.main.temp-273)*10)/10
          if(props.settings.units==="metric"){
            return celcius + " °C";
          }
          else{
            return (celcius*9 + (32*5))/5 + " °F";
          }
      }
      return(
        <div className="header">
            <h1>Welcome {props.name}</h1>
            <h2>The current weather in {weather.data.name} is {WeatherFormatter()}</h2>
    
        </div>
    )
}

export default Header


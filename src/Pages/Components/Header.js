import React, {useState, useEffect} from 'react'
import axios from "axios"


 function Header(props) {
     const [weather, setWeather] = useState({data:{name:"loading",main:{temp:0}}});
     
     
     useEffect(() =>{
         const fetchData = async () =>{
             //TODO: Switch to using chrome api for the location
            if("geolocation" in navigator){
                navigator.geolocation.getCurrentPosition(async function(location){
                    const result = await axios(
                
                        "https://api.openweathermap.org/data/2.5/weather?lat="+location.coords.latitude+"&lon="+location.coords.longitude + "&appid=182687c0b69f8681a9c697a2ac368d68"
                    )
                   
                   console.log(result);
                   if(result!=undefined){
                    setWeather(result);
                   }
                   
                   console.log(weather);
                })

            }
            
         };
         fetchData();
        
     },[])
      
    return (
        <div>
            <header>
                <h1>Welcome {props.name}</h1>
                <h2>The current weather in {weather.data.name} is {Math.round((weather.data.main.temp-273)*10)/10}</h2>
            </header>
        </div>
    )
}

export default Header


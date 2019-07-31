/*global chrome*/
import React, {useState,useEffect} from 'react'
import "./App.css"
import Header from './Pages/Components/Header';
import MainContent from './Pages/MainContent';
import Sidebar from './Pages/Sidebar';
import {Redirect} from "react-router-dom"
import WinterRoad from "./Wallpapers/WinterRoad.jpg";

export default function App() {
  
  useEffect(()=>{
    async function LoadChromeSettings(){
      chrome.storage.sync.get("settings", function(chromeSettings){
        if(chromeSettings!=undefined){
          setSetting(chromeSettings);
        }
        else{
          chrome.storage.sync.set({"settings": settings});
        }
        
      })
    }

  },[])

const [settings, setSetting] = useState({
  calender:{
    calenderIDs:[
      {
        id:"test",
          enabled: false,
      }
      
    ]
  },
  backgroundImage: WinterRoad,
  defaultRoute: "/settings/sidebar",
  dateFormat: "sv",
  units: "metric",
  location:{
    auto: true,
    city:undefined,
    lat: undefined,
    lon: undefined,
    
  }
  //settings object
})
function UpdateBackground(){
  
document.querySelector("html").style.backgroundImage = "url("+settings.backgroundImage +")"
}
UpdateBackground();
  return (
    
    <React.Fragment>
      
      <Header name="Hugo Persson" settings={settings}/>
      <MainContent settings={settings}/>
      <Sidebar settings={settings} UpdateBackground={UpdateBackground}/>
      
      </React.Fragment>
      
    
  )
}

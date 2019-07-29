/*global chrome*/
import React, {useState,useEffect} from 'react'
import "./App.css"
import Header from './Pages/Components/Header';
import MainContent from './Pages/MainContent';
import Sidebar from './Pages/Sidebar';
import { async } from 'q';
import WinterRoad from "./Wallpapers/WinterRoad.jpg";
import Fire from "./Wallpapers/Fire.jpg";
export default function App() {
  
  useEffect(()=>{
    async function LoadChromeSettings(){
      chrome.storage.sync.get("settings", function(chromeSettings){
        setSetting(chromeSettings);
      })
    }

  },[])

const [settings, setSetting] = useState({
  calender:{
    calenderID:[]
  },
  backgroundImage: WinterRoad,
  defaultRoute: "/",
  //settings object
})
function UpdateBackground(){
  
document.querySelector("html").style.backgroundImage = "url("+settings.backgroundImage+")"
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

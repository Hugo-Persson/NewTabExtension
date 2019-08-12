/*global chrome*/
import React, {useState,useEffect, useCallback} from 'react'
import "./App.css"
import Header from './Pages/Components/Header';
import MainContent from './Pages/MainContent';
import Sidebar from './Pages/Sidebar';
import {Redirect} from "react-router-dom"
import WinterRoad from "./Wallpapers/WinterRoad.jpg";
import {MemoryRouter} from "react-router-dom";
export default function App() {
  const [, updateState] = useState();
  const forceUpdate = useCallback(() => updateState({}), []);

  const [selectedQuickAccessItem, setSelectedQuickAccessItem] = useState({});
  
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
  ToDo:{
    taskLists:[
      {
        name:"TITLE",
        id: null,
        enabled:false,
      },
      

    ]
  },
  calender:{
    calenderIDs:[
      {
        name:"SUMMARY",
        id:null,
          enabled: true,
      },
      
      
    ]
  },
  backgroundImage: WinterRoad,
  defaultRoute: "/settings/sidebar",
  dateFormat: "sv",
  units: "imperial",
  location:{
    auto: true,
    city:undefined,
    lat: undefined,
    lon: undefined,
    
  }
})
function UpdateApp(){
  forceUpdate();

}

const [QuickAccessLinks] = useState([
  {
      name: "1",
      url:"https://www.reddit.com",
      image: "https://api.faviconkit.com/reddit.com/64"
  },
  {
      name: "2",
      url:"https://www.reddit.com",
      image: "https://api.faviconkit.com/reddit.com/64"
  },
  {
      name: "3",
      url:"https://www.reddit.com",
      image: "https://cdn.freebiesupply.com/images/large/2x/facebook-logo-circle-transparent.png"
  },
  {
      name: "4",
      url:"https://www.reddit.com",
      image: "https://api.faviconkit.com/reddit.com/64"
  },
  {
      name: "5",
      url:"https://www.reddit.com",
      image: "https://api.faviconkit.com/reddit.com/64"
  },
  {
      name: "6",
      url:"https://www.reddit.com",
      image: "https://api.faviconkit.com/reddit.com/64"
  },
  {
      name: "7",
      url:"https://www.reddit.com",
      image: "https://api.faviconkit.com/reddit.com/64"
  },
  {
      name: "8",
      url:"https://www.reddit.com",
      image: "https://api.faviconkit.com/reddit.com/64"
  }

  
  
])

 


console.log("Render");
document.querySelector("html").style.backgroundImage = "url("+settings.backgroundImage +")";
  return (
    <MemoryRouter >
      <React.Fragment>
        
        <Header name="Hugo Persson" settings={settings}/>
        <MainContent QuickAccessLinks={QuickAccessLinks} UpdateApp={UpdateApp} settings={settings} selectedQuickAccessItem={selectedQuickAccessItem} asignSelectedQuickAccessItem={(object) => setSelectedQuickAccessItem(object)}/>
        <Sidebar settings={settings} UpdateApp={UpdateApp} QuickAccessLinks={QuickAccessLinks} selectedQuickAccessItem={selectedQuickAccessItem}/>
        
        </React.Fragment>
      </MemoryRouter>
    
  )
}

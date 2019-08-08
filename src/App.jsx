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
        id: undefined,
        enabled:false,
      },
      

    ]
  },
  calender:{
    calenderIDs:[
      {
        name:"SUMMARY",
        id:undefined,
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
function ChangeIndex(object, index){
  var DeepCopy = JSON.parse(JSON.stringify(QuickAccessLinks));
  
  QuickAccessLinks.map((value,itterationIndex,array)=>{
    
    if(itterationIndex>=index){
       array[itterationIndex+1]=DeepCopy[itterationIndex]

    }
  })
  QuickAccessLinks[index] = object;
}
const [QuickAccessLinks] = useState([
  {
      name: "Youtube",
      url:"https://www.reddit.com",
      image: "https://api.faviconkit.com/reddit.com/64"
  },
  {
      name: "Reddit",
      url:"https://www.reddit.com",
      image: "https://api.faviconkit.com/reddit.com/64"
  },
  {
      name: "Reddit",
      url:"https://www.reddit.com",
      image: "https://api.faviconkit.com/reddit.com/64"
  },
  {
      name: "Reddit",
      url:"https://www.reddit.com",
      image: "https://api.faviconkit.com/reddit.com/64"
  },
  {
      name: "Reddit",
      url:"https://www.reddit.com",
      image: "https://api.faviconkit.com/reddit.com/64"
  },
  {
      name: "Reddit",
      url:"https://www.reddit.com",
      image: "https://api.faviconkit.com/reddit.com/64"
  },
  {
      name: "Reddit",
      url:"https://www.reddit.com",
      image: "https://api.faviconkit.com/reddit.com/64"
  },
  {
      name: "Reddit",
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
        <Sidebar settings={settings} UpdateApp={UpdateApp} selectedQuickAccessItem={selectedQuickAccessItem}/>
        
        </React.Fragment>
      </MemoryRouter>
    
  )
}

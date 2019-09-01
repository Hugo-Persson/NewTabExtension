
//"Global CHrome" tells eslint that chrome is a valid variable which later will work when the code is run in chrome
/*global chrome*/
import React, {useState,useEffect, useCallback} from 'react'
import "./App.css"
import Header from './Pages/Components/Header';
import MainContent from './Pages/MainContent';
import Sidebar from './Pages/Sidebar';
import {Redirect} from "react-router-dom"
import WinterRoad from "./Wallpapers/WinterRoad.jpg";
import {MemoryRouter} from "react-router-dom";
import AddButton from "./addButton.png";
export default function App() {

  const [, updateState] = useState();
  const forceUpdate = useCallback(() => updateState({}), []);

  const [selectedQuickAccessItem, setSelectedQuickAccessItem] = useState({});
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
    calendar:{
      calendarIDs:[
        {
          name:"SUMMARY",
          id:null,
            enabled: false,
        },
        {
          name:"SUMMARY",
          id:null,
            enabled: false,
        },
        {
          name:"SUMMARY",
          id:null,
            enabled: false,
        },
        
      ]
    },
    backgroundImage: WinterRoad,
    defaultRoute: "/AddEvent",
    dateFormat: "automatic",
    units: "metric",
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
  
  const [QuickAccessLinks, setQuickAccessLinks ] = useState([
    {
        name: "1",
        url:"https://www.reddit.com",
        image: "https://api.faviconkit.com/reddit.com/64",
        reRender:undefined
    },
    {
        name: "2",
        url:"https://www.reddit.com",
        image: "https://api.faviconkit.com/reddit.com/64",
        reRender:undefined
    },
    {
        name: "3",
        url:"https://www.reddit.com",
        image: "https://cdn.freebiesupply.com/images/large/2x/facebook-logo-circle-transparent.png",
        reRender:undefined
    },
    {
        name: "4",
        url:"https://www.reddit.com",
        image: "https://api.faviconkit.com/reddit.com/64",
        reRender:undefined
    },
    {
        name: "5",
        url:"https://www.reddit.com",
        image: "https://api.faviconkit.com/reddit.com/64",
        reRender:undefined
    },
    {
        name: "6",
        url:"https://www.reddit.com",
        image: "https://api.faviconkit.com/reddit.com/64",
        reRender:undefined
    },
    {
        name: "7",
        url:"https://www.reddit.com",
        image: "https://api.faviconkit.com/reddit.com/64",
        reRender:undefined
        
    },
    {
        name: "8",
        url:"https://www.reddit.com",
        image: "https://api.faviconkit.com/reddit.com/64",
        reRender:undefined
    },
    
    {
      name: "Add Link",
      url:"#",
      image: AddButton,
      reRender:undefined
  }
  
    
    
  ]);
  




  
  useEffect(()=>{
    
    //TODO: Enable
    // Toggle
       LoadChrome();
     function LoadChrome(){
      console.log("Load chrome run");
      chrome.storage.sync.get("settings", function(chromeSettings){
        if(chromeSettings.settings===undefined){
          console.log("First set up");
          chrome.storage.sync.set({"settings": settings},()=>{
            console.log("First set up");
          });
        }
        else{
          
          console.log("ISN*T UNDEFINDE");
          console.log(chromeSettings.settings);
          setSetting(chromeSettings.settings);
        }
        
      })
      chrome.storage.sync.get("QuickAccessLinks", function(data){
        if(data.QuickAccessLinks!=undefined){
          console.log("******");
          
          setQuickAccessLinks(data.QuickAccessLinks);
        }
        else{
          chrome.storage.sync.set({"QuickAccessLinks": QuickAccessLinks});
        }
        
      })
    }
    console.log("Quick");
    console.log(QuickAccessLinks);
    console.log("Sett");
    console.log(settings);
  

  },[])



 


console.log("Render");
document.querySelector("html").style.backgroundImage = "url("+settings.backgroundImage +")";


  return (
    <MemoryRouter >
      <React.Fragment>
        
        <Header name="Hugo Persson" settings={settings}/>
        <MainContent QuickAccessLinks={QuickAccessLinks} UpdateApp={UpdateApp} settings={settings} selectedQuickAccessItem={selectedQuickAccessItem} asignSelectedQuickAccessItem={(object) => setSelectedQuickAccessItem(object)}/>
        <Sidebar settings={settings}  UpdateApp={UpdateApp} QuickAccessLinks={QuickAccessLinks} selectedQuickAccessItem={selectedQuickAccessItem}/>
        
        </React.Fragment>
      </MemoryRouter>
    
  )

  
}

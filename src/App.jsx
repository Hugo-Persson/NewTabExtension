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
  




  
  useEffect(()=>{
    async function LoadChrome(){
      chrome.storage.sync.get("settings", function(chromeSettings){
        if(chromeSettings!=undefined){
          setSetting(chromeSettings);
        }
        else{
          chrome.storage.sync.set({"settings": settings});
        }
        
      })
      chrome.storage.sync.get("QuickAccessLinks", function(data){
        if(data!=undefined){
          setQuickAccessLinks(data);
        }
        else{
          chrome.storage.sync.set({"QuickAccessLinks": QuickAccessLinks});
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
  calendar:{
    calenderIDs:[
      {
        name:"SUMMARY",
        id:null,
          enabled: false,
      },
      
      
    ]
  },
  backgroundImage: WinterRoad,
  defaultRoute: "/",
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

  
  
])

 


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

/*global chrome*/
import React,{useState} from 'react'
import {BrowserRouter as Router, Route, Link} from "react-router-dom"
import Navbar from './Components/Settings/Navbar';
import WinterRoad from "../Wallpapers/WinterRoad.jpg";
import Fire from "../Wallpapers/Fire.jpg";
import AbandonedHouse from "../Wallpapers/AbandonedHouse.jpg";
import Landscape from "../Wallpapers/Landscape.jpg";
import PersonCloseToFire from "../Wallpapers/PersonCloseToFire.jpg";
import Plants from "../Wallpapers/Plants.jpg";


import WinterRoadIcon from "./Components/Settings/WallpaperIcons/WinterRoad.jpg";
import FireIcon from "./Components/Settings/WallpaperIcons/Fire.jpg";
import AbandonedHouseIcon from "./Components/Settings/WallpaperIcons/AbandonedHouse.jpg";
import LandscapeIcon from "./Components/Settings/WallpaperIcons/Landscape.jpg";
import PersonCloseToFireIcon from "./Components/Settings/WallpaperIcons/PersonCloseToFire.jpg";
import PlantsIcon from "./Components/Settings/WallpaperIcons/Plants.jpg";
import GeneralSettings from './Components/Settings/GeneralSettings';
import SideBarSettings from './Components/Settings/SideBarSettings';

export default function Settings(props) {
    const [settings, setSettings] = useState(props.settings);
    SetBackgroundImage.bind(Fire);
    function SetBackgroundImage(){
        settings.backgroundImage=this;
        props.UpdateApp();
        console.log(settings)
    }
    function SaveSettings(){
        chrome.storage.sync.set({"settings": settings},function(){
            alert("Save succesful");
        })
    }
    function SubmitBackgroundImage(element){
        var element = element.currentTarget;
        var file = element.files[0];
        console.log(file);
        var imageType = /image.*/;
        if(file.type.match(imageType)){
            

            var reader = new FileReader();
            reader.onload = function(e){
                
                
                var result = reader.result;
                settings.backgroundImage=result;
                props.UpdateApp();
            }
            reader.readAsDataURL(file);
        }
        else{
            console.log("File type not supported");
        }
    }
    return (
        
            <React.Fragment>
            
                <React.Fragment>
                
                <div className="settings">
                    <div className="settingsReturn">
                        <Link to="/">←</Link>
                    </div>
                
                    <div className="settingsHeader">
                    
                    <h1>Settings</h1>
                    </div>
                
                    <div className="settingsBody">
                        <Route path="/settings/customization" exact render={props => (
                        <div className="customization">
                            <h2>Background image</h2>
                            <div className="availableWallpapers"> 
                                <img src={FireIcon} onClick={SetBackgroundImage.bind(Fire)}/>
                                <img src={WinterRoadIcon} onClick={SetBackgroundImage.bind(WinterRoad)}/>
                                <img src={AbandonedHouseIcon} onClick={SetBackgroundImage.bind(AbandonedHouse)}/>
                                <img src={LandscapeIcon}  onClick={SetBackgroundImage.bind(Landscape)}/>
                                <img src={PersonCloseToFireIcon}  onClick={SetBackgroundImage.bind(PersonCloseToFire)}/>
                                <img src={PlantsIcon}  onClick={SetBackgroundImage.bind(Plants)}/>
        
                            </div>
                            <div className="submitBackgroundImage">
                                <h3>Submit local file as Background image</h3>
                                <input type="file" onChange={SubmitBackgroundImage}/>
                            </div>

                            
        
                        </div>
                        )} />
                        <Route path="/settings/general" exact render={props => (
                        
                            <GeneralSettings settings={settings}/>
                        
                        )} />
                        <Route path="/settings/sidebar" exact render={props => (
                        
                            <SideBarSettings settings={settings}/>
                        
                        )} />
                    </div>
                    <div className="saveSettings" onClick={SaveSettings}>Save Settings</div>
                    <Navbar/>
                </div>
                </React.Fragment>
                
            </React.Fragment>
        
        
    )
}

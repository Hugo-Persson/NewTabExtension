/*global chrome*/
import React, { useState } from 'react'
import { BrowserRouter as Router, Route, Link } from "react-router-dom"
import Navbar from './Components/Settings/Navbar';
//Loading all default wallpapers
import WinterRoad from "../Wallpapers/WinterRoad.jpg";
import Fire from "../Wallpapers/Fire.jpg";
import AbandonedHouse from "../Wallpapers/AbandonedHouse.jpg";
import Landscape from "../Wallpapers/Landscape.jpg";
import PersonCloseToFire from "../Wallpapers/PersonCloseToFire.jpg";
import Plants from "../Wallpapers/Plants.jpg";

//Loading all the default wallpaper icons
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
    setBackgroundImage.bind(Fire);
    function setBackgroundImage(image) {
        settings.backgroundImage = image;
        props.updateApp();

    }
    function saveSettings() {
        chrome.storage.sync.set({ "settings": settings }, function () {
            alert("Save Successful");
        })
    }
    function submitBackgroundImage(e) {
        const element = e.currentTarget;
        const file = element.files[0];
        const imageType = /image.*/;
        if (file.type.match(imageType)) {


            const reader = new FileReader();
            reader.onload = e => {


                const result = reader.result;
                settings.backgroundImage = result;
                props.UpdateApp();
            }
            reader.readAsDataURL(file);
        }
        else {
            alert("File type not supported");
        }
    }
    return (


        <React.Fragment>

            <div className="settings">
                <div className="settingsReturn">
                    <Link to="/">←</Link>
                </div>

                <div className="settingsHeader">

                    <h1>Settings</h1>
                </div>

                <div className="settingsBody">
                    <Route path="/settings/customization" exact render={() => (
                        <div className="customization">
                            <h2>Background image</h2>
                            <div className="availableWallpapers">
                                <img src={FireIcon} onClick={() => setBackgroundImage(Fire)} />
                                <img src={WinterRoadIcon} onClick={() => setBackgroundImage(WinterRoad)} />
                                <img src={AbandonedHouseIcon} onClick={() => setBackgroundImage(AbandonedHouse)} />
                                <img src={LandscapeIcon} onClick={() => setBackgroundImage(Landscape)} />
                                <img src={PersonCloseToFireIcon} onClick={() => setBackgroundImage(PersonCloseToFire)} />
                                <img src={PlantsIcon} onClick={() => setBackgroundImage(Plants)} />

                            </div>
                            <div className="submitBackgroundImage">


                                <input name="file" id="file" className="uploadFile" type="file" onChange={submitBackgroundImage} />
                                <label htmlFor="file" className="uploadFileLabel">Use Local Image</label>
                            </div>



                        </div>
                    )} />
                    <Route path="/settings/general" exact render={() => (

                        <GeneralSettings {...props} />

                    )} />
                    <Route path="/settings/sidebar" exact render={props => (

                        <SideBarSettings settings={settings} />

                    )} />
                </div>
                <div className="saveSettings" onClick={saveSettings}>Save Settings</div>
                <Navbar />
            </div>
        </React.Fragment>




    )
}

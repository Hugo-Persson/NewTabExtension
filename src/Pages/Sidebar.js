
import React, {useState} from 'react'
import {MemoryRouter, Route, Link, Redirect} from "react-router-dom"
import Calender from './Calender';
import Tasks from './Tasks';
import Settings from './Settings';

export default function Sidebar(prop) {

  const [settings, setSettings] = useState(prop.settings);
const [itemFullscreen, setItemFullscreen] = useState(0);



    return (

      <MemoryRouter>
        <Redirect to={settings.defaultRoute}/>
        <Route path="/" exact render={props => (
          <div className="sideBar">
            <Calender settings={settings}/>
            <Tasks settings={settings}/>
            <Link to="/settings/customization" className="settingsButton">⚙</Link>
        </div>
        )} />



        <Route path="/hideCalender" render={props=>(
          <div className="sideBar">
            <h1><Link to="/">Calender ▲</Link></h1>
            
            <Tasks settings={settings}/>
            <Link to="/settings/customization" className="settingsButton">⚙</Link>
        </div>
        )}/>
        <Route path="/hideTasks" render={props=>(
          <div className="sideBar">
            <Calender settings={settings} />
            <h1><Link to="/">Tasks ▲</Link></h1>
            <Link to="/settings/customization" className="settingsButton">⚙</Link>
        </div>
        )}/>
        <Route path="/EventFullScreen" render={props=>(
          <div className="sideBar">
            <Link to="/settings/customization" className="settingsButton">⚙</Link>
            
        </div>
        )}/>
        <Route path="/CalenderFullScreen" render={props=>(
          <div className="sideBar">
            <Calender settings={settings} />
            <h1><Link to="/">Tasks ▲</Link></h1>
            <Link to="/settings/customization" className="settingsButton">⚙</Link>
        </div>
        )}/>
        <Route path="/settings"  render={props=>(
          <div className="sideBar">
            <Settings settings={settings} UpdateBackground={prop.UpdateBackground}/>
        </div>
        )}/>
        
        
        
      </MemoryRouter>
        
    )
}

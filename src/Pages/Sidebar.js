
import React, {useState} from 'react'
import {MemoryRouter, Route, Link, Redirect} from "react-router-dom"
import Calendar from './Calendar';
import Tasks from './Tasks';
import Settings from './Settings';
import EditQuickAccessItem from "./EditQuickAccessItem";
import AddQuickAccessItem from './AddQuickAccessItem';
import AddEvent from './AddEvent';
export default function Sidebar(prop) {

  const {settings} = prop;
const [itemFullscreen, setItemFullscreen] = useState(0);



    return (

      <React.Fragment>
        <Redirect to={settings.defaultRoute}/>
    
        <Route path="/" exact render={({history}) => (
          <div className="sideBar">
            <Calendar {...prop} history={history}/>
            <Tasks settings={settings}/>
            <Link to="/settings/customization" className="settingsButton">⚙</Link>
          </div>
            
        
        )} />



        <Route path="/hideCalendar" render={props=>(
          <div className="sideBar">
            <h1><Link to="/">Calendar ▲</Link></h1>
            
            <Tasks settings={settings}/>
            <Link to="/settings/customization" className="settingsButton">⚙</Link>
        </div>
        )}/>
        <Route path="/hideTasks" render={props=>(
          <div className="sideBar">
            <Calendar settings={settings} />
            <h1><Link to="/">Tasks ▲</Link></h1>
            <Link to="/settings/customization" className="settingsButton">⚙</Link>
        </div>
        )}/>
        <Route path="/EventFullScreen" render={props=>(
          <div className="sideBar">
            <Link to="/settings/customization" className="settingsButton">⚙</Link>
            
        </div>
        )}/>
        <Route path="/CalendarFullScreen" render={props=>(
          <div className="sideBar">
            <calendar settings={settings} />
            <h1><Link to="/">Tasks ▲</Link></h1>
            <Link to="/settings/customization" className="settingsButton">⚙</Link>
        </div>
        )}/>
        <Route path="/settings"  render={props=>(
          <div className="sideBar">
            <Settings settings={settings} UpdateApp={prop.UpdateApp}/>
        </div>
        )}/>
        <Route path="/EditQuickAccessItem"  render={props=>(
          <div className="sideBar">
            <EditQuickAccessItem {...prop}/>
          </div>
          
        )}/>
        <Route path="/AddLink" render={()=>(
          <div className="sideBar">
             <AddQuickAccessItem {...prop}/>
          </div>
        )}/>
        <Route path="/AddEvent" render={()=>(
          <div className="sideBar">
             <AddEvent {...prop}/>
          </div>
        )}/>

        
        
        </React.Fragment>
      
        
    )
}

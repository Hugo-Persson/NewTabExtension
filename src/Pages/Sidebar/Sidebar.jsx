
import React, { useState } from 'react'
import { Route, Link, Redirect } from "react-router-dom"
import Calendar from './Calendar';
import Tasks from './Tasks';
import Settings from './Settings/Settings';
import EditQuickAccessItem from "./EditQuickAccessItem";
import AddQuickAccessItem from './AddQuickAccessItem';
import AddEvent from './AddEvent';
export default function Sidebar(props) {

  const { settings } = props;
  const [itemFullscreen, setItemFullscreen] = useState(0);


  //TODO: fix hiding to be able to hide many and add animation with react-flip-toolkit
  return (

    <div className="sideBar">
      <Route path="/" exact render={({ history }) => (
        <React.Fragment>
          <Calendar {...props} history={history} />
          <Tasks settings={settings} />
          <Link to="/settings/customization" className="settingsButton">⚙</Link>
        </React.Fragment>
      )} />

      <Route path="/hideCalendar" render={() => (
        <React.Fragment>
          <h1><Link to="/">Calendar ▲</Link></h1>
          <Tasks settings={settings} />
          <Link to="/settings/customization" className="settingsButton">⚙</Link>
        </React.Fragment>
      )} />

      <Route path="/hideTasks" render={() => (
        <React.Fragment>
          <Calendar settings={settings} />
          <h1><Link to="/">Tasks ▲</Link></h1>
          <Link to="/settings/customization" className="settingsButton">⚙</Link>
        </React.Fragment>
      )} />


      <Route path="/CalendarFullScreen" render={() => (
        <React.Fragment>
          <Calendar settings={settings} />
          <h1><Link to="/">Tasks ▲</Link></h1>
          <Link to="/settings/customization" className="settingsButton">⚙</Link>
        </React.Fragment>
      )} />

      <Route path="/settings" render={() => <Settings {...props} />} />

      <Route path="/EditQuickAccessItem" render={() => <EditQuickAccessItem {...props} />} />

      <Route path="/AddLink" render={() => <AddQuickAccessItem {...props} />} />

      <Route path="/AddEvent" render={() => <AddEvent {...props} />} />

      <Redirect to={settings.defaultRoute} />
    </div>

  )
}

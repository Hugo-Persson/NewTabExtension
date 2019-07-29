import React from 'react'
import {BrowserRouter as Router, Route, NavLink} from "react-router-dom"


export default function Navbar() {
    return (

        <div className="navbar">
            <NavLink to="/settings/customization"activeClassName="active">Customization </NavLink>
            <NavLink to="/settings/calender" activeClassName="active">Calender</NavLink>
            <NavLink to="/settings/todo" activeClassName="active">ToDo</NavLink>
            <NavLink to="/settings/weather"activeClassName="active">Weather</NavLink>
            
        </div>
    )
}

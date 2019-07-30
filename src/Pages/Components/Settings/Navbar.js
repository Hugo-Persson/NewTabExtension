import React from 'react'
import {BrowserRouter as Router, Route, NavLink} from "react-router-dom"


export default function Navbar() {
    return (

        <div className="navbar">
            <NavLink to="/settings/customization"activeClassName="active">Customization </NavLink>
            <NavLink to="/settings/general" activeClassName="active">General</NavLink>
            <NavLink to="/settings/sidebar" activeClassName="active">Sidebar</NavLink>
            <NavLink to="/settings/other"activeClassName="active">Other</NavLink>
            
        </div>
    )
}

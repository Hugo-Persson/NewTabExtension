/* global chrome */

import React, { useState, useEffect } from 'react'
import { Route, Switch } from "react-router-dom";
import FolderInfo from './FolderInfo';
import Greeting from './Greeting';


export default function Header(props) {
    const [weather, setWeather] = useState({ name: "loading", main: { temp: 0 } });



    return (
        <Switch>
            <Route path="/folder/:index" children={<FolderInfo quickAccessLinks={props.quickAccessLinks} />} />
            <Route path="/" children={<Greeting {...props} />} />
        </Switch>
    )
}




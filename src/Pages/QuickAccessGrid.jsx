import React, { useState, useCallback } from 'react'
import { Switch, useHistory } from "react-router-dom"
import { Flipper, Flipped } from "react-flip-toolkit"
import AddOption from "../Components/AddOptions"
import InsideFolder from "./InsideFolder"
import QuickAccessItem from '../Components/QuickAccessItem'


export default function QuickAccessGrid(props) {

    const { quickAccessLinks } = props;
    //react-flip-toolkit is a library that handle animations for items changing order in a grid.
    // I use two components in this library Flipper and Flipped. 
    // Flipper is the container for all items and Flipped is the container for each individual item
    // When the flipKey changes in flipper the animation gets rendered
    return (
        <Flipper flipKey={quickAccessLinks.map(e => e.name).join("")} className="main">
            {quickAccessLinks.map((link, index) => (

                <Flipped flipId={link.name} key={link.name}>
                    <QuickAccessItem link={link} index={index} />

                </Flipped>

            ))}
            <AddOption />
        </Flipper>
    )
}

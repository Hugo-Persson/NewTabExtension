import React, { useState, useCallback } from 'react'
import { Switch, useHistory } from "react-router-dom"
import { Flipper, Flipped } from "react-flip-toolkit"
import AddOption from "./AddOptions"
import InsideFolder from "../Pages/MainContent/InsideFolder"
import QuickAccessItem from './QuickAccessItem'


export default function QuickAccessGrid(props) {

    const { linkArray } = props;
    //react-flip-toolkit is a library that handle animations for items changing order in a grid.
    // I use two components in this library Flipper and Flipped. 
    // Flipper is the container for all items and Flipped is the container for each individual item
    // When the flipKey changes in flipper the animation gets rendered
    return (
        <Flipper flipKey={linkArray.map(e => e.name).join("")} element={React.Fragment}>
            {linkArray.map((link, index) => (

                <Flipped flipId={link.name} key={link.name}>
                    <QuickAccessItem link={link} index={index} />

                </Flipped>

            ))}
        </Flipper>
    )
}

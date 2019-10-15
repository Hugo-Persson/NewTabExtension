/*global chrome*/
import React, { useState, useCallback } from 'react'
import { Route } from "react-router-dom"
import { Flipper, Flipped } from "react-flip-toolkit"
import AddOption from "../Components/AddOptions"

export default function MainContent(props) {
    const [, updateState] = useState();
    const forceUpdate = useCallback(() => updateState({}), []);
    const ReRender = () => {
        forceUpdate();
    }
    function RightClick(e, history, link) {
        e.preventDefault();
        history.push("/EditQuickAccessItem");
        link.reRender = ReRender;
        props.asignSelectedQuickAccessItem(link);
    }
    //react-flip-toolkit is a library that handle animations for items changing order in a grid.
    // I use two components in this library Flipper and Flipped. 
    // Flipper is the container for all items and Flipped is the container for each individual item
    // When the flipKey changes in flipper the animation gets rendered
    return (
        <Route render={({ history }) => (

            <Flipper flipKey={props.quickAccessLinks.map(e => e.name).join("")} className="main">
                {props.quickAccessLinks.map(link => (

                    <Flipped flipId={link.name} key={link.name}>
                        <a className="quickAccessItem" onClick={e => {
                            if (link.name === "Add Link") {
                                history.push("/AddLink");
                            }
                        }} onContextMenu={(e) => { if (link.name !== "Add Link") { RightClick(e, history, link) } else { e.preventDefault() } }} href={link.url}>
                            <ul>
                                <li><img src={link.image} alt={"Image failed to load"} /></li>
                                <li><span>{link.name}</span></li>
                            </ul>
                        </a>

                    </Flipped>

                ))}
                <AddOption />
            </Flipper>


        )} />
    )
}
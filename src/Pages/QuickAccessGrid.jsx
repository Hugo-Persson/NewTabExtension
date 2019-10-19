import React, { useState, useCallback } from 'react'
import { Switch, useHistory } from "react-router-dom"
import { Flipper, Flipped } from "react-flip-toolkit"
import AddOption from "../Components/AddOptions"
import InsideFolder from "./InsideFolder"


export default function QuickAccessGrid(props) {
    const history = useHistory();


    function RightClick(e, history, link) {
        e.preventDefault();
        history.push("/EditQuickAccessItem");
        link.reRender = ReRender;
        props.asignSelectedQuickAccessItem(link);
    }
    return (
        <Flipper flipKey={props.quickAccessLinks.map(e => e.name).join("")} className="main">
            {props.quickAccessLinks.map((link, index) => (

                <Flipped flipId={link.name} key={link.name}>
                    <a className="quickAccessItem" onClick={e => {
                        if (link.name === "Add Link") {
                            history.push("/AddLink");
                        }
                        else if (link.type === "folder") {
                            history.push("/folder/" + index)
                        }
                    }} onContextMenu={(e) => {
                        if (link.name !== "Add Link" && link.type !== "folder") RightClick(e, history, link)
                        else e.preventDefault()
                    }}


                        href={link.url}>
                        <ul>
                            <li><img src={link.image} alt={"Image failed to load"} /></li>
                            <li><span>{link.name}</span></li>
                        </ul>
                    </a>

                </Flipped>

            ))}
            <AddOption />
        </Flipper>
    )
}

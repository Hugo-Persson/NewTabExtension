
import React, { useState, useCallback } from 'react'
import { Route } from "react-router-dom"
import { Flipper, Flipped } from "react-flip-toolkit"
export default function QuickAccess(props) {
    const [, updateState] = useState();
    const forceUpdate = useCallback(() => updateState({}), []);
    const ReRender = () => {

        forceUpdate();
    }
    function RightClick(e, history, link) {

        e.preventDefault();

        props.UpdateApp();
        history.push("/EditQuickAccessItem");
        link.reRender = ReRender;

        props.asignSelectedQuickAccessItem(link);




    }
    //RETURN ERROR




    return (
        <Route render={({ history }) => (
            <Flipper flipKey={props.QuickAccessLinks.map(e => e.name).join("")} className="main">
                {}
                {props.QuickAccessLinks.map(link => (

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
            </Flipper>
        )} />



    )




}

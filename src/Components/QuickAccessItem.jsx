import React, { useState, useCallback } from 'react'
import { Switch, useHistory } from "react-router-dom"

export default function QuickAccessItem(props) {

    const history = useHistory();
    const { link, index } = props;

    const [, updateState] = useState();
    const forceUpdate = useCallback(() => updateState({}), []);

    function RightClick(e, history, link) {
        e.preventDefault();
        history.push("/EditQuickAccessItem");
        link.reRender = forceUpdate();
        props.asignSelectedQuickAccessItem(link);
    }

    return (
        <React.Fragment>
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
        </React.Fragment>
    )
}

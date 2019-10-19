import React from 'react'
import { useParams } from "react-router-dom";


export default function InsideFolder(props) {
    const { index } = useParams()
    const { quickAccessLinks } = props;
    const folder = quickAccessLinks[index];
    console.log(props);
    return (
        <div id="folder">
            <h1>{folder.name}</h1>
        </div>
    )
}

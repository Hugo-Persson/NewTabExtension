import React, { useState } from 'react'
import { Link } from "react-router-dom";

export default function AddOptions() {

    const [showOptions, setShowOptions] = useState(false);
    function toggleShowOptions() {
        setShowOptions(!showOptions)
    }

    if (showOptions) {
        return (
            <div id="addOptions">

                <Link to="/AddFolder">Add Folder</Link>
                <Link to="/AddLink">Add Link</Link>
                <button onClick={toggleShowOptions}>+</button>
            </div>
        )
    }
    else {
        return (
            <div id="addOptions">
                <button onClick={toggleShowOptions}>+</button>
            </div>
        )
    }

}

import React, { useRef } from 'react'
import Checkbox from '../../Components/Checkbox'
import { Link } from "react-router-dom";


export default function AddFolder(props) {
    const fileUpload = useRef(null);
    function addFolder() { }
    return (
        <div className="settings addEvent" key={+ new Date()}>
            <div className="sidebarReturn">
                <Link to="/">←</Link>
            </div>

            <div className="sidebarHeader"><h1>Add Event</h1></div>

            <div className="sidebarBody">
                <form>
                    Name <input type="text" placeholder="Name" />
                    Position <input type="text" placeholder="Position (default 1)" />
                    <div className="iconSelection">
                        <Checkbox defaultChecked={true} /> <span>Use automatic icon</span>
                        <br />
                        <input type="radio" />
                        <input type="file" id="folderUploadIcon" ref={fileUpload} /> <label for="folderUploadIcon"> <Checkbox onClick={() => fileUpload.click()} /> <span className="noFocus">Use Localfile</span></label>
                    </div>

                </form>
            </div>
            <div className="saveSettings" onClick={addFolder}>Add Folder</div>

        </div>
    )
}

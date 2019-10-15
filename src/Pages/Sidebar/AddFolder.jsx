import React from 'react'

export default function AddFolder() {
    return (
        <div className="settings addEvent" key={+ new Date()}>
            <div className="sidebarReturn">
                <Link to="/">←</Link>
            </div>

            <div className="sidebarHeader"><h1>Add Event</h1></div>

            <div className="sidebarBody">
                <form>
                    Name <input type="text" placeholder="name" />
                    Position <input type="text" placeholder="position" />

                </form>
            </div>
            <div className="saveSettings" onClick={addNewEvent}>Add Folder</div>

        </div>
    )
}

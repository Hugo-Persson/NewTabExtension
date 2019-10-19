import React from 'react'

export default function QuickAccessItem() {
    return (
        <div>
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
        </div>
    )
}

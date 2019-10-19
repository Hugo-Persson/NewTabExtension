import React, { useRef, useState } from 'react'
import { Link } from "react-router-dom";
import FolderIcon from "../../Assets/folder.png"


export default function AddFolder(props) {

    const { uploadImage, fetchImageFromRemoteHost, quickAccessLinks, updateApp } = props;
    const fileUpload = useRef(null);
    const fileUploadRadiobutton = useRef(null);
    const [folder, setFolder] = useState({ position: 0, type: "folder", url: "#", image: FolderIcon, items: [] });

    async function addFolder() {
        if (!folder.name) {
            alert("Please enter name for the folder");
            return;
        }
        console.log(FolderIcon);
        quickAccessLinks.splice(folder.position, 0, folder);
        console.log(quickAccessLinks);
        updateApp();
    }
    async function uploadFile(e) {
        try {
            const image = await uploadImage(e);
            fileUploadRadiobutton.current.checked = true;
            setFolder({ ...folder, image: image })
            console.log(image);


        }
        catch (err) {
            alert(err);
        }

    }
    return (
        <div className="settings addEvent" >
            <div className="sidebarReturn">
                <Link to="/">←</Link>
            </div>

            <div className="sidebarHeader"><h1>Add Folder</h1></div>

            <div className="sidebarBody">
                <form>
                    Name <input type="text" onBlur={e => setFolder({ ...folder, name: e.currentTarget.value })} placeholder="Name" />
                    Position <input type="text" placeholder="Position (default 1)" onChange={e => setFolder({ ...folder, position: e.currentTarget.value })} />
                    <div className="iconSelection">
                        <div>
                            <input defaultChecked onClick={() => setFolder({ ...folder, image: FolderIcon })} name="folderIconOption" type="radio" id="folderAutomaticIcon" />
                            <label htmlFor="folderAutomaticIcon">Use automatic icon</label>
                        </div>

                        <div>
                            <input type="file" onChange={uploadFile} onBlur={() => console.log("blur")} hidden ref={fileUpload} />
                            <input ref={fileUploadRadiobutton} onClick={(e) => {
                                e.preventDefault();
                                fileUpload.current.click()
                            }} name="folderIconOption" type="radio" id="folderUploadIcon" />
                            <label htmlFor="folderUploadIcon"><span>Use Localfile</span></label>

                        </div>
                    </div>

                </form>
            </div>
            <div className="saveSettings" onClick={addFolder}>Add Folder</div>

        </div>
    )
}

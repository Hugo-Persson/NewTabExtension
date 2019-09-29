/*global chrome*/
import React from 'react'
import { Link } from "react-router-dom";

export default function AddQuickAccessItem(props) {

    let obj = {
        name: undefined,
        url: undefined,
        image: undefined,
        reRender: undefined
    }
    let moveToPos = 9;

    function localIcon(e) {
        const file = e.currentTarget.files[0];
        const imageType = /image.*/;
        if (file.type.match(imageType)) {


            const reader = new FileReader();
            reader.onload = function (e) {
                obj.image = reader.result;
            }
            reader.readAsDataURL(file);
        }
        else {
            alert("File type not supported");
        }
    }

    function formatUrl(url) {
        return url.substring(url.indexOf(".") + 1)
    }
    function getAutomaticIcon() {

        const init = {
            method: 'GET',
            mode: 'cors',
            cache: 'default'
        }
        fetch("https://api.faviconkit.com/" + formatUrl(obj.url) + "/64", init)
            .then((res) => res.blob())
            .then(blob => {
                const reader = new FileReader();
                reader.onload = function (e) {
                    const src = "data:image/png;base64," + btoa(reader.result);
                    obj.image = src;
                }
                reader.readAsBinaryString(blob);

            })
            .catch((error) => {
                alert("Getting the icon automaticlly was not successful");
                console.log("Automatic icon error", error);

            });
    }
    function addLink() {
        if (props.QuickAccessLinks.findIndex((element) => (element.name === obj.name)) !== -1) {
            alert("You can not have two linksr with the same name");
        }
        else {
            if (obj.image === undefined) {
                getAutomaticIcon();
            }
            if (moveToPos > props.QuickAccessLinks.length - 2) {
                moveToPos = props.QuickAccessLinks.length - 1;
            }
            if (moveToPos === undefined) {
                moveToPos = 1;
            }
            if (obj.name === undefined || obj.url === undefined) {
                //Maybe add seperate if statements for url and name
                alert("You need to specify url and name");
            }
            props.QuickAccessLinks.splice(moveToPos, 0, obj);
            chrome.storage.sync.set({ "QuickAccessLinks": props.QuickAccessLinks });
            props.UpdateApp();

        }

    }
    function urlInputFormatter(e) {
        const text = e.currentTarget.value;
        let formattedText;
        if (text.substring(0, 7) === "http://" || text.substring(0, 7) === "https://") {
            formattedText = text;
        }
        else if (text.substring(0, 4) === "www.") {
            formattedText = "https://" + text;
        }
        else {
            formattedText = "https://www." + text;
        }
        return formattedText;
    }
    return (
        <div className="settings editQuickAccessItem" key={+ new Date()}>
            <div className="settingsReturn">
                <Link to="/">←</Link>
            </div>

            <div className="settingsHeader">
                <h1>Create Quickaccess link</h1>
            </div>

            <div className="settingsBody">
                Name: <input placeholder="Enter a name for the link" type="text" onChange={(e) => obj.name = e.currentTarget.value} />
                <br />
                Url: <input placeholder="Enter a url for the link" type="text" onChange={(e) => {
                    if (e.currentTarget.value !== undefined) {
                        obj.url = urlInputFormatter(e);
                    }
                }} />
                <br />
                Position: <input placeholder="Enter the position for the item" onChange={(e) => moveToPos = e.currentTarget.value} type="text" />
                <br />

                Icon (Pick one):
                            <br />
                <input name="file" id="file" className="uploadFile" type="file" onChange={(e) => { localIcon(e) }} />
                <label htmlFor="file" className="uploadFileLabel">Upload Local Image</label>

                <br />
                <span className="ImageUrl">Image Url: <input type="text" placeholder="Enter the image url for the image you want to use" onChange={e => obj.image = e.currentTarget.value} /></span>
                <button onClick={getAutomaticIcon}>Automatic Icon</button>

            </div>
            <div className="saveSettings" onClick={addLink}>Add and Save</div>

        </div>
    )
}

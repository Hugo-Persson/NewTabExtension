/*global chrome*/
import React, { useState, useCallback } from 'react'
import { Link, Route } from "react-router-dom";

export default function EditQuickAccessItem(props) {

    /* Force rerender */
    const [, updateState] = useState();
    const forceUpdate = useCallback(() => updateState({}), []);
    const { quickAccessLinks, syncQuickAccessLinks, selectedQuickAccessItem } = props;

    let index = (quickAccessLinks.findIndex((element) => (element === selectedQuickAccessItem)))

    let syncImage;


    function save() {
        const syncItem = getSyncItem();


        let selectedItemDeepCopy = JSON.parse(JSON.stringify(selectedQuickAccessItem));
        if (syncImage === undefined) {
            const originalImage = syncItem.value.image;
            selectedItemDeepCopy.image = originalImage;

        }
        else {
            selectedItemDeepCopy.image = syncImage;
        }

        syncQuickAccessLinks[syncItem.index] = selectedItemDeepCopy;
        // Fix sync 
        chrome.storage.sync.set({ "quickAccessLinks": syncQuickAccessLinks }, () => console.log("Sync successful"));
        chrome.storage.local.set({ "quickAccessLinks": quickAccessLinks }, () => alert("Save Successful"));
        chrome.storage.local.set({ "syncQuickAccessLinks": syncQuickAccessLinks });

    }
    function getSyncItem() {
        let item;
        syncQuickAccessLinks.map((value, index) => {
            if (value.url === selectedQuickAccessItem.url) item = { value: value, index: index };
        });
        console.log(item);
        return item;
    }

    function moveLink(from, to) {
        if (to > from) {
            //Move foward
            quickAccessLinks.splice(to, 0, selectedQuickAccessItem);
            quickAccessLinks.splice(from, 1);
        }
        else {
            //Move backwards
            quickAccessLinks.splice(from, 1);
            quickAccessLinks.splice((to - 1), 0, selectedQuickAccessItem);
        }
        forceUpdate();
        selectedQuickAccessItem.reRender();
    }

    function formatUrl(url) {
        return url.substring(url.indexOf(".") + 1)
    }

    function localIcon(e) {
        const file = e.currentTarget.files[0];
        const imageType = /image.*/;
        if (file.type.match(imageType)) {


            const reader = new FileReader();
            reader.onload = e => {


                const result = reader.result;
                syncImage = "auto";
                selectedQuickAccessItem.image = result;
                selectedQuickAccessItem.reRender();
            }
            reader.readAsDataURL(file);
        }
        else {
            alert("File type not supported");
        }
    }
    function fetchImageFromRemoteHost(url, callback) {
        const init = {
            method: 'GET',
            mode: 'cors',
            cache: 'default'
        }
        fetch(url, init)
            .then((res) => res.blob())
            .then(blob => {
                const reader = new FileReader();
                reader.onload = function (e) {
                    const src = "data:image/png;base64," + btoa(reader.result);
                    callback(src);

                }
                reader.readAsBinaryString(blob);

            })
            .catch(error => {
                alert("Getting the icon automaticlly was not successful");
            });
    }

    function automaticIcon(e) {
        fetchImageFromRemoteHost(`https://api.faviconkit.com/${formatUrl(selectedQuickAccessItem.url)}/64`, src => {
            syncImage = "auto";
            selectedQuickAccessItem.image = src;
            selectedQuickAccessItem.reRender();
        });
    }
    function urlInputFormatter(e) {
        const text = e.currentTarget.value;
        let formattedText;
        if (text.substring(0, 6) === "http://" || text.substring(0, 7) === "https://") {
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
    function deletePrompt(history) {
        history.push("/EditQuickAccessItem/Delete")
    }
    function confirmDeletion(history) {
        quickAccessLinks.splice(index, 1);
        save();
        history.push("/");


    }

    return (
        <React.Fragment>

            <div className="settings editQuickAccessItem" key={+ new Date()}>
                <div className="sidebarReturn">
                    <Link to="/">←</Link>
                </div>

                <div className="sidebarHeader">

                    <h1>Edit {selectedQuickAccessItem.name}</h1>
                </div>

                <div className="sidebarBody">
                    <form>


                        Name: <input placeholder={selectedQuickAccessItem.name} type="text" onChange={(e) => {
                            selectedQuickAccessItem.name = e.currentTarget.value;
                            selectedQuickAccessItem.reRender();
                        }} />
                        <br />
                        Url: <input placeholder={formatUrl(selectedQuickAccessItem.url)} type="text" onChange={(e) => {
                            selectedQuickAccessItem.url = urlInputFormatter(e);
                            selectedQuickAccessItem.reRender();



                        }} />
                        <br />
                        Position: <input placeholder={index + 1} onBlur={(e) => {
                            if (e.currentTarget.value !== "") {
                                moveLink(index, e.currentTarget.value);
                            }
                        }} type="text" />
                        <br />


                        Icon (Pick one):
                            <br />
                        <input name="file" id="file" className="uploadFile" type="file" onChange={(e) => { localIcon(e) }} />
                        <label htmlFor="file" className="uploadFileLabel">Upload Local Image</label>

                        <br />
                        <span className="ImageUrl">Image Url: <input type="text" placeholder="Enter the image url for the image you want to use" onBlur={e => {
                            if (e.currentTarget.value !== undefined) {
                                fetchImageFromRemoteHost(e.currentTarget.value, src => {
                                    syncImage = e.currentTarget.value;
                                    selectedQuickAccessItem.image = src;
                                    selectedQuickAccessItem.reRender();

                                })



                            }
                        }} /></span>

                        <div id="automaticIcon">

                            <button onClick={automaticIcon}>Automatic Icon</button>
                            <br />

                        </div>



                    </form>

                </div>
                <Route exact path="/EditQuickAccessItem" render={({ history }) => (
                    <div className="deleteItem saveSettings" onClick={() => deletePrompt(history)}>Delte Link</div>
                )} />
                <Route path="/EditQuickAccessItem/Delete" render={({ history }) => (
                    <div className="deleteConfirm">
                        <span>Are you sure you want to delete this item permanently</span>
                        <div className="deleteOptions">
                            <div className="no" onClick={() => {
                                history.push("/EditQuickAccessItem")
                            }}>No</div>
                            <div className="yes" onClick={() => confirmDeletion(history)}>Yes</div>
                        </div>
                    </div>
                )} />

                <div className="saveSettings" onClick={save}>Save</div>

            </div>
        </React.Fragment>
    )
}

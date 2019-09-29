/*global chrome*/
import React, { useState, useRef, useEffect, useCallback } from 'react'
import { Link, Route } from "react-router-dom";
export default function EditQuickAccessItem(props) {

    /* Force rerender */
    const [, updateState] = useState();
    const forceUpdate = useCallback(() => updateState({}), []);


    let index = (props.quickAccessLinks.findIndex((element) => (element === props.selectedQuickAccessItem)))
    const formEl = useRef(null);

    function save() {
        chrome.storage.sync.set({ "QuickAccessLinks": props.QuickAccessLinks }, () => alert("Save Successful"));
    }

    function moveLink(from, to) {
        if (to > from) {
            //Move foward
            props.quickAccessLinks.splice(to, 0, props.selectedQuickAccessItem);
            props.quickAccessLinks.splice(from, 1);
        }
        else {
            //Move backwards
            props.quickAccessLinks.splice(from, 1);
            props.quickAccessLinks.splice((to - 1), 0, props.selectedQuickAccessItem);
        }
        forceUpdate();
        props.selectedQuickAccessItem.reRender();
    }

    function formatUrl(url) {
        return url.substring(url.indexOf(".") + 1)
    }

    function localIcon(e) {
        const file = e.currentTarget.files[0];
        const imageType = /image.*/;
        if (file.type.match(imageType)) {


            const reader = new FileReader();
            reader.onload = e=> {


                const result = reader.result;
                props.selectedQuickAccessItem.image = result;
                props.selectedQuickAccessItem.reRender();
            }
            reader.readAsDataURL(file);
        }
        else {
            alert("File type not supported");
        }
    }
    function automaticIcon(e) {
        e.preventDefault();
        const init = {
            method: 'GET',
            mode: 'cors',
            cache: 'default'
        }
        fetch(`https://api.faviconkit.com/${formatUrl(props.selectedQuickAccessItem.url)}/64`, init)
            .then(res => res.blob())
            .then(blob => {
                const reader = new FileReader();
                reader.onload = function (e) {
                    const src = "data:image/png;base64," + btoa(reader.result);
                    props.selectedQuickAccessItem.image = src;
                    props.selectedQuickAccessItem.reRender();
                }
                reader.readAsBinaryString(blob);

            })
            .catch(() => {
                alert("Getting the icon automaticlly was not successful");

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
        props.QuickAccessLinks.splice(index, 1);
        save();
        history.push("/");
        

    }

    return (
        <React.Fragment>

            <div className="settings editQuickAccessItem" key={+ new Date()}>
                <div className="settingsReturn">
                    <Link to="/">←</Link>
                </div>

                <div className="settingsHeader">

                    <h1>Edit {props.selectedQuickAccessItem.name}</h1>
                </div>

                <div className="settingsBody">
                    <form ref={formEl}>


                        Name: <input placeholder={props.selectedQuickAccessItem.name} type="text" onChange={(e) => {
                            props.selectedQuickAccessItem.name = e.currentTarget.value;
                            props.selectedQuickAccessItem.reRender();
                        }} />
                        <br />
                        Url: <input placeholder={formatUrl(props.selectedQuickAccessItem.url)} type="text" onChange={(e) => {
                            props.selectedQuickAccessItem.url = urlInputFormatter(e);
                            props.selectedQuickAccessItem.reRender();



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
                        <span className="ImageUrl">Image Url: <input type="text" placeholder="Enter the image url for the image you want to use" onChange={e => {
                            if (e.currentTarget.value !== undefined) {
                                props.selectedQuickAccessItem.image = e.currentTarget.value;
                                props.selectedQuickAccessItem.reRender();

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

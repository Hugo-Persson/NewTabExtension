/*global chrome*/
import React, {useState, useRef, useEffect, useCallback} from 'react'
import {Link, Route} from "react-router-dom";
export default function EditQuickAccessItem(props) {


    const [, updateState] = useState();
    const forceUpdate = useCallback(() => updateState({}), []);
    const [imageSrc, setImageSrc] = useState(props.selectedQuickAccessItem.image);
    var index = (props.QuickAccessLinks.findIndex((element) => (element===props.selectedQuickAccessItem)))
    const formEl = useRef(null);
    console.log("rendering edit");
    function Save(){
        
        chrome.storage.sync.set({"QuickAccessLinks":props.QuickAccessLinks});
        
        
    }
    function MoveLink(from,to){
        console.log(from);
        console.log(to);
        if(to>from){
            //Move foward
            props.QuickAccessLinks.splice(to,0,props.selectedQuickAccessItem);
            props.QuickAccessLinks.splice(from,1);
            console.log("foward");
        }
        else{
            //Move backwards
            props.QuickAccessLinks.splice(from,1);
            props.QuickAccessLinks.splice((to-1),0,props.selectedQuickAccessItem);
            console.log("backwards");
            
        }
        forceUpdate();
        props.selectedQuickAccessItem.reRender();
    }
    function FormatUrl(url){
        console.log(url.substring(url.indexOf(".")+1));
        return url.substring(url.indexOf(".")+1)
    }
    var changeToPosition;
    
    
    function LocalIcon(e){
        var file = e.currentTarget.files[0];
        var imageType = /image.*/;
        if(file.type.match(imageType)){
            

            var reader = new FileReader();
            reader.onload = function(e){
                
                
                var result = reader.result;
                props.selectedQuickAccessItem.image = result;
                setImageSrc(result);
                props.selectedQuickAccessItem.reRender();
            }
            reader.readAsDataURL(file);
        }
        else{
            console.log("File type not supported");
        }
    }
    function AutomaticIcon(e){
        e.preventDefault();
        let init = {
            method: 'GET',
            mode: 'cors',
            cache: 'default'
        }
        fetch("https://api.faviconkit.com/"+FormatUrl(props.selectedQuickAccessItem.url)+"/64",init)
        .then((res) => res.blob())
        .then(blob=>{
            var reader = new FileReader();
            reader.onload = function(e){
                var src = "data:image/png;base64,"+btoa(reader.result);
            console.log(blob);
            props.selectedQuickAccessItem.image=src;
            console.log("Automatic icon was successful")
            setImageSrc(src);
            props.selectedQuickAccessItem.reRender();
            }
            reader.readAsBinaryString(blob);
            
        })
        .catch((error)=>{
            alert("Getting the icon automaticlly was not successful");
            
        });
        
            
        
        
    }

    function UrlInputFormatter(e){
        var text = e.currentTarget.value;
        var formattedText;
        if(text.substring(0,7)==="http://"||text.substring(0,7)==="https://"){
            formattedText= text;
            
        }
        else if(text.substring(0,4)==="www."){
            formattedText="https://"+text;
        }
        else{
            formattedText="https://www." + text;
        }
        return formattedText;
    }
    function Delete(history){
        history.push("/EditQuickAccessItem/Delete")
    }
    function ConfirmDeletion(history){
        props.QuickAccessLinks.splice(index,1);
        
        
        history.push("/");
        Save();

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


                            Name: <input placeholder={props.selectedQuickAccessItem.name}  type="text" onChange={(e) => {
                                props.selectedQuickAccessItem.name=e.currentTarget.value;
                                props.selectedQuickAccessItem.reRender();
                            }}/>
                            <br/>
                            Url: <input placeholder={FormatUrl(props.selectedQuickAccessItem.url)} type="text" onChange={(e) => {
                                props.selectedQuickAccessItem.url=UrlInputFormatter(e);
                                props.selectedQuickAccessItem.reRender();
                                
                                
                                
                            }}/>
                            <br/>
                            Position: <input placeholder={index+1} onBlur={(e) => {
                                if(e.currentTarget.value!==""){
                                    MoveLink(index,e.currentTarget.value);
                                }
                            }} type="text"/>
                            <br/>


                            Icon (Pick one): 
                            <br/>
                            <input name="file" id="file" className="uploadFile" type="file" onChange={(e) => {LocalIcon(e)}}/>
                                <label htmlFor ="file" className="uploadFileLabel">Upload Local Image</label>
                                
                                <br/>
                                <span className="ImageUrl">Image Url: <input type="text" placeholder="Enter the image url for the image you want to use" onChange={e=>{
                                    if(e.currentTarget.value!==undefined){
                                        props.selectedQuickAccessItem.image=e.currentTarget.value;
                                        props.selectedQuickAccessItem.reRender();
                                        
                                    }
                                }}/></span>

                                <div id="automaticIcon">

                                <button onClick={AutomaticIcon}>Automatic Icon</button>
                                <br/>
                                
                                </div>
                                
                            
                            
                        </form>
                        
                    </div>
                    <Route exact path="/EditQuickAccessItem" render={({history})=>(
                        <div className="deleteItem saveSettings" onClick={() => Delete(history)}>Delte Link</div>
                    )}/>
                    <Route path="/EditQuickAccessItem/Delete" render={({history}) =>(
                        <div className="deleteConfirm">
                            <span>Are you sure you want to delete this item permanently</span> 
                            <div className="deleteOptions">
                                <div className="no" onClick={()=>{
                                    history.push("/EditQuickAccessItem")
                                }}>No</div>
                                <div className="yes" onClick={()=>ConfirmDeletion(history)}>Yes</div>
                            </div>   
                        </div>
                    )}/>
                    
                    <div className="saveSettings" onClick={Save}>Save</div>
                    
                </div>
                </React.Fragment>
    )
}

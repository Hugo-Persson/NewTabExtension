import React, {useState, useRef, useEffect} from 'react'
import {Link} from "react-router-dom";
export default function EditQuickAccessItem(props) {
    var index = (props.QuickAccessLinks.findIndex((element) => (element===props.selectedQuickAccessItem)))
    const formEl = useRef(null);
    console.log("rendering edit");
    function Save(){
        
        if(changeToPosition!==undefined){
            if(changeToPosition>index){
                //Move foward
                props.QuickAccessLinks.splice(changeToPosition,0,props.selectedQuickAccessItem);
                props.QuickAccessLinks.splice(index,1);
            }
            else{
                //Move backwards
                props.QuickAccessLinks.splice(index,1);
                props.QuickAccessLinks.splice((changeToPosition-1),0,props.selectedQuickAccessItem);
                
            }
            
        }
        props.UpdateApp();
    }
    function FormatUrl(url){
        return url.substring(url.indexOf(".")+1)
    }
    var changeToPosition;
    
    function ClearForm(e){
        console.log("Load");
        e.currentTarget.reset();
    }
    function LocalIcon(e){
        var file = e.currentTarget.files[0];
        var imageType = /image.*/;
        if(file.type.match(imageType)){
            

            var reader = new FileReader();
            reader.onload = function(e){
                
                
                var result = reader.result;
                props.selectedQuickAccessItem.image = result;
            }
            reader.readAsDataURL(file);
        }
        else{
            console.log("File type not supported");
        }
    }
    function AutomaticIcon(){
        props.selectedQuickAccessItem.image="https://api.faviconkit.com/"+props.url+"/64"
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
                            }}/>
                            <br/>
                            Url: <input placeholder={FormatUrl(props.selectedQuickAccessItem.url)} type="text" onChange={(e) => {
                                var text = e.currentTarget.value;
                                if(text.substring(0,7)==="http://"||text.substring(0,7)==="https://"){
                                    props.selectedQuickAccessItem.url= text;
                                    
                                }
                                else if(text.substring(0,4)==="www."){
                                    props.selectedQuickAccessItem.url="https://"+text;
                                }
                                else{
                                    props.selectedQuickAccessItem.url="https://www." + text;
                                }
                                
                                
                                
                            }}/>
                            <br/>
                            Position: <input placeholder={index+1} onChange={(e) => (changeToPosition=e.currentTarget.value)} type="text"/>
                            <br/>


                            Icon: 
                            <br/>
                            <input name="file" id="file" className="uploadFile" type="file" onChange={(e) => {LocalIcon(e)}}/>
                                <label htmlFor ="file" className="uploadFileLabel">Upload Local Image</label>
                                
                                <br/>
                                <span className="ImageUrl">Image Url: <input type="text"/></span>

                                <div id="automaticIcon">

                                <button onClick={AutomaticIcon}>Automatic Icon</button>
                                </div>
                                
                            
                            
                        </form>
                        
                    </div>
                    <div className="saveSettings" onClick={Save}>Save</div>
                    
                </div>
                </React.Fragment>
    )
}

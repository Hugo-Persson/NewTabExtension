import React, {useState, useRef, useEffect} from 'react'
import {Link} from "react-router-dom";
export default function EditQuickAccessItem(props) {
    var index = (props.QuickAccessLinks.findIndex((element) => (element===props.selectedQuickAccessItem)))
    const formEl = useRef(null);
    console.log("rendering edit");
    function Save(){
        props.UpdateApp();
        if(changeToIndex!==undefined){
            props.ChangeIndex(props.selectedQuickAccessItem, changeToIndex);
        }
    }
    
    var changeToIndex;
    
    function ClearForm(e){
        console.log("Load");
        e.currentTarget.reset();
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
                            Url: <input placeholder={props.selectedQuickAccessItem.url} onChange={(e) => {
                                props.selectedQuickAccessItem.url= e.currentTarget.value;
                            }}/>
                            <br/>
                            Index: <input placeholder={index+1} onChange={(e) => (changeToIndex=e.currentTarget.value)} type="text"/>
                            <br/>
                            Icon: 
                            <input type="file" onChange={(e) => {
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
                            }}/>
                        </form>
                        
                    </div>
                    <div className="saveSettings" onClick={Save}>Save</div>
                    
                </div>
                </React.Fragment>
    )
}

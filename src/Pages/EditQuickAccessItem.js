import React, {useState} from 'react'
import {Link} from "react-router-dom";
export default function EditQuickAccessItem(props) {
    
    console.log("rendering edit");
    function Save(){
        props.UpdateApp();
    }
    
    return (
        <React.Fragment>
                
                <div className="settings editQuickAccessItem">
                    <div className="settingsReturn">
                        <Link to="/">←</Link>
                    </div>
                
                    <div className="settingsHeader">
                    
                    <h1>Edit {props.selectedQuickAccessItem.name}</h1>
                    </div>
                
                    <div className="settingsBody">
                        Name: <input placeholder={props.selectedQuickAccessItem.name} type="text" onChange={(e) => {
                            props.selectedQuickAccessItem.name=e.currentTarget.value;
                        }}/>
                        <br/>
                        Url: <input placeholder={props.selectedQuickAccessItem.url} onChange={(e) => {
                            props.selectedQuickAccessItem.url= e.currentTarget.value;
                        }}/>
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
                    </div>
                    <div className="saveSettings" onClick={Save}>Save</div>
                    
                </div>
                </React.Fragment>
    )
}

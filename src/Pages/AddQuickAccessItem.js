import React from 'react'
import {Link} from "react-router-dom";

export default function AddQuickAccessItem(props) {

    var obj = {
        name: undefined,
        url: undefined,
        image: undefined,
        reRender:undefined
    }
    var moveToPos = 9;
    
    function LocalIcon(e){
        var file = e.currentTarget.files[0];
        var imageType = /image.*/;
        if(file.type.match(imageType)){
            
    
            var reader = new FileReader();
            reader.onload = function(e){
                
                
                
                obj.image = reader.result;
                
            }
            reader.readAsDataURL(file);
        }
        else{
            alert("File type not supported");
        }
    }
    
    function FormatUrl(url){
        console.log(url.substring(url.indexOf(".")+1));
        return url.substring(url.indexOf(".")+1)
    }
    function AutomaticIcon(){
        
        let init = {
            method: 'GET',
            mode: 'cors',
            cache: 'default'
        }
        fetch("https://api.faviconkit.com/"+FormatUrl(obj.url)+"/64",init)
        .then((res) => res.blob())
        .then(blob=>{
            var reader = new FileReader();
            reader.onload = function(e){
                var src = "data:image/png;base64,"+btoa(reader.result);
            console.log(blob);
            obj.image=src;
            
            }
            reader.readAsBinaryString(blob);
            
        })
        .catch((error)=>{
            alert("Getting the icon automaticlly was not successful");
            
        });
    }
    function Add(){
        if(props.QuickAccessLinks.findIndex((element) => (element.name===obj.name))!==-1){
            alert("You can not have two links with the same name");
        }
        else{
            if(obj.image===undefined){
                AutomaticIcon();
            }
            props.QuickAccessLinks.splice(moveToPos,0,obj);
            props.UpdateApp();
        }
        
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
    return (
        <div className="settings editQuickAccessItem" key={+ new Date()}>
                    <div className="settingsReturn">
                        <Link to="/">←</Link>
                    </div>
                
                    <div className="settingsHeader">
                    
                    <h1>Create new Quick Access link</h1>
                    </div>
                
                    <div className="settingsBody">
                        


                            Name: <input placeholder="Enter a name for the link"  type="text" onChange={(e) => {
                                obj.name=e.currentTarget.value;
                            }}/>
                            <br/>
                            Url: <input placeholder="Enter a url for the link" type="text" onChange={(e) => {
                                if(e.currentTarget.value!==undefined){
                                    obj.url = UrlInputFormatter(e) ;
                                }
                                
                                
                                
                                
                            }}/>
                            <br/>
                            Position: <input placeholder="Enter the position for the item" onChange={(e) => {
                                
                                if(e.currentTarget.value!==undefined){
                                    moveToPos=e.currentTarget.value;
                                }
                            }} type="text"/>
                            <br/>


                            Icon: 
                            <br/>
                            <input name="file" id="file" className="uploadFile" type="file" onChange={(e) => {LocalIcon(e)}}/>
                                <label htmlFor ="file" className="uploadFileLabel">Upload Local Image</label>
                                
                                <br/>
                                <span className="ImageUrl">Image Url: <input type="text" placeholder="Enter the image url for the image you want to use" onChange={e=>{
                                    if(e.currentTarget.value!==undefined){
                                        obj.image=e.currentTarget.value;
                                    }
                                }}/></span>

                                <div id="automaticIcon">

                                <button onClick={AutomaticIcon}>Automatic Icon</button>
                                <br/>
                                
                                </div>
                                
                            
                            
                        
                        
                    </div>
                    <div className="saveSettings" onClick={Add}>Add and Save</div>
                    
                </div>
    )
}

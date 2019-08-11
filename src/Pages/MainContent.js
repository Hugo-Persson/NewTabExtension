/*global chrome*/
import React, {useState, useEffect} from 'react'
import QuickAccess from "./Components/QuickAccess"
import {Flipper, Flipped} from "react-flip-toolkit"
export default function MainContent(props) {


    
    
    useEffect(() =>{
        const fetchData = async () =>{
            //Integrate chrome storage api 
            chrome.storage.sync.get("links", function(data){
                console.log(data);
                QuickAccess=data;
            })
           
        };
        // fetchData();
       
    },[])
    
    console.log()
    return (
        <Flipper flipKey={props.QuickAccessLinks.map(e=>e.name).join()} className="main">
            
            
            <QuickAccess {...props}/>
            
            
            
        </Flipper>
        
    )
}

/*global chrome*/
import React, {useState, useEffect,useCallback} from 'react'
import QuickAccess from "./Components/QuickAccess"
import {Flipper, Flipped} from "react-flip-toolkit"
export default function MainContent(props) {


    
    


    
    useEffect(() =>{
        
        const fetchData = async () =>{
            //Integrate chrome storage api 
            chrome.storage.sync.get("links", function(data){
                console.log(data.links);
                QuickAccess=data.links;
            })
           
        };
         fetchData();
       
    },[])
    
    console.log()
    return (
        
            
            
            <QuickAccess {...props}/>
            
            
            
        
        
    )
}

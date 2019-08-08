
import React from 'react'
import {Route} from "react-router-dom"

export default function QuickAccess(props) {
    
    function RightClick(e, history, link){
        console.log("Right Click");
        e.preventDefault();
        
        props.UpdateApp();
        history.push("/EditQuickAccessItem");
        props.asignSelectedQuickAccessItem(link);
        console.log(props.selectedQuickAccessItem)
        
        

    }
    return props.QuickAccessLinks.map((link) => (
        <Route render={({history}) =>(
            <a className="quickAccessItem" onContextMenu={(e) => {RightClick(e,history, link)}} href={link.url}>
            <ul>
                <li><img src={link.image} alt={link.name}/></li>
                <li><span>{link.name}</span></li>
            </ul>
            
            
            
        </a>
            )}/>
        

    ));
        
    
    
}

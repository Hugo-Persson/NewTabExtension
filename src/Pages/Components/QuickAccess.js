
import React from 'react'
import {Route} from "react-router-dom"
import {Flipper, Flipped} from "react-flip-toolkit"
export default function QuickAccess(props) {
    
    function RightClick(e, history, link){
        console.log("Right Click");
        e.preventDefault();
        
        props.UpdateApp();
        history.push("/EditQuickAccessItem");
        props.asignSelectedQuickAccessItem(link);
        console.log(props.selectedQuickAccessItem)
        
        

    }
    console.log(props.QuickAccessLinks.map(e=>e.name).join(""));
    return(
        <Route render={({history}) =>(
            <Flipper flipKey={props.QuickAccessLinks.map(e=>e.name).join("")} className="main">
            {props.QuickAccessLinks.map(link => (
                <Flipped flipId={link.name} key={link.name}>
                    
                    <a className="quickAccessItem" onContextMenu={(e) => {RightClick(e,history, link)}} href={link.url}>
                    <ul>
                        <li><img src={link.image} alt={link.name}/></li>
                        <li><span>{link.name}</span></li>
                    </ul>
                    
                    
                    
                </a>
                    
                </Flipped>
                
                
        
            ))}
        </Flipper>
        )}/>
        
            
        
    )
     
        
    
    
}
